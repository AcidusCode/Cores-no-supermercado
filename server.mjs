// Node 22.13+ / 24 LTS. Sem dependências externas. SQLite fica fora da pasta pública.
import http from 'node:http';
import {readFile,mkdir} from 'node:fs/promises';
import {resolve,dirname,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomBytes,timingSafeEqual,createHash} from 'node:crypto';
import {DatabaseSync} from 'node:sqlite';
import {validateRecord,withDefaults} from './lib/validate.mjs';
const base=dirname(fileURLToPath(import.meta.url)),publicRoot=resolve(base,'dist');
const databasePath=resolve(process.env.DATA_FILE||resolve(base,'data/respostas.db'));
const password=process.env.ADMIN_PASSWORD;
if(!password||password.length<12){console.error('Define ADMIN_PASSWORD com pelo menos 12 caracteres antes de iniciar.');process.exit(1);}
await mkdir(dirname(databasePath),{recursive:true});
const db=new DatabaseSync(databasePath);db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS participations (participant TEXT PRIMARY KEY, submitted_at TEXT NOT NULL, language TEXT NOT NULL, payload TEXT NOT NULL);');
const sessions=new Map(),attempts=new Map(),submissions=new Map();
const json=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
const hash=s=>createHash('sha256').update(s).digest();
function authorized(req){const cookie=req.headers.cookie?.split(';').map(s=>s.trim()).find(s=>s.startsWith('cores_admin='))?.slice(12);const expiry=sessions.get(cookie);if(expiry&&expiry>Date.now())return true;if(cookie)sessions.delete(cookie);return false;}
function limited(map,key,max,windowMs){const now=Date.now();let value=map.get(key);if(!value||now-value.at>windowMs){value={count:0,at:now};map.set(key,value);}value.count++;return value.count>max;}
setInterval(()=>{const now=Date.now();for(const [k,v]of sessions)if(v<now)sessions.delete(k);for(const map of [attempts,submissions])for(const [k,v]of map)if(now-v.at>3600000)map.delete(k);},60000).unref();
async function body(req){let length=0,chunks=[];for await(const chunk of req){length+=chunk.length;if(length>65536)throw Error('Too large');chunks.push(chunk);}return JSON.parse(Buffer.concat(chunks).toString());}
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.ttf':'font/ttf','.txt':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
 try{
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');res.setHeader('X-Frame-Options','SAMEORIGIN');
  const url=new URL(req.url,'http://localhost'),path=url.pathname;
  if(req.method==='POST'&&req.headers.origin){let source;try{source=new URL(req.headers.origin);}catch{return json(res,403,{ok:false});}if(source.host!==req.headers.host)return json(res,403,{ok:false});}
  if(path==='/api/status'&&req.method==='GET')return json(res,200,{storage:'sqlite'});
  if(path==='/api/admin/login'&&req.method==='POST'){
   const ip=req.socket.remoteAddress||'unknown';if(limited(attempts,ip,10,15*60000))return json(res,429,{ok:false});
   const input=await body(req);if(typeof input.password!=='string'||!timingSafeEqual(hash(input.password),hash(password)))return json(res,401,{ok:false});
   const token=randomBytes(32).toString('hex');sessions.set(token,Date.now()+8*3600000);
   res.setHeader('Set-Cookie',`cores_admin=${token}; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=28800${process.env.COOKIE_SECURE==='true'?'; Secure':''}`);return json(res,200,{ok:true});
  }
  if(path==='/api/admin/logout'&&req.method==='POST'){
   const token=req.headers.cookie?.split(';').map(s=>s.trim()).find(s=>s.startsWith('cores_admin='))?.slice(12);sessions.delete(token);res.setHeader('Set-Cookie','cores_admin=; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=0');return json(res,200,{ok:true});
  }
  if(path==='/api/admin/responses'&&req.method==='GET'){
   if(!authorized(req))return json(res,401,{ok:false});
   const rows=db.prepare('SELECT payload FROM participations ORDER BY submitted_at DESC').all();return json(res,200,{records:rows.map(row=>withDefaults(JSON.parse(row.payload)))});
  }
  if(path==='/api/responses'&&req.method==='POST'){
   if(limited(submissions,req.socket.remoteAddress||'unknown',240,3600000))return json(res,429,{ok:false});
   const input=await body(req);if(input.action!=='submit')return json(res,400,{ok:false});
   let record;try{record=validateRecord(input);}catch{return json(res,400,{ok:false});}
   // Participant UUID is an idempotency key: retrying never creates duplicate rows.
   db.prepare('INSERT INTO participations (participant,submitted_at,language,payload) VALUES (?,?,?,?) ON CONFLICT(participant) DO NOTHING').run(record.participant,record.submittedAt,record.language,JSON.stringify(record));return json(res,200,{ok:true});
  }
  if(path.startsWith('/api/'))return json(res,404,{ok:false});
  if(req.method!=='GET'&&req.method!=='HEAD')return json(res,405,{ok:false});
  const target=path==='/'?'/index.html':(path==='/admin'||path==='/admin/'?'/admin.html':path);
  const file=resolve(publicRoot,decodeURIComponent(target).slice(1));
  if(!file.startsWith(publicRoot+sep))return json(res,403,{ok:false});
  const bytes=await readFile(file);res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:bytes);
 }catch(error){json(res,error.code==='ENOENT'?404:400,{ok:false});}
});
server.listen(Number(process.env.PORT||3000),process.env.HOST||'127.0.0.1',()=>console.log(`Cores: http://${process.env.HOST||'127.0.0.1'}:${server.address().port} · administração em /admin.html`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>{db.close();process.exit(0);}));
