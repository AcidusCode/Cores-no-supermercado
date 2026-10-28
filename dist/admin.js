'use strict';
const categoryNames={peixe:'Peixe e marisco',hortofruticolas:'Fruta e legumes',carne:'Carne',lacteos:'Leite e derivados',padaria:'Pão e pastelaria',congelados:'Congelados',bebidas:'Bebidas'};
const colors=[['vermelho','Vermelho','#ff0000'],['amarelo','Amarelo','#f3e600'],['laranja','Laranja','#ff8a00'],['verde','Verde','#00b80b'],['azul','Azul','#418dca'],['roxo','Roxo','#9e60b6'],['castanho','Castanho','#9d6242'],['rosa','Rosa','#ef80b4'],['branco','Branco','#fff'],['preto','Preto','#000'],['cinzento','Cinzento','#9e9e9e'],['bege','Bege','#e8d5b0']];
const profileLabels={gender:{feminino:'Feminino',masculino:'Masculino',nao_binario:'Não-binário',outro:'Outro',prefiro_nao_dizer:'Prefiro não dizer'},frequency:{diaria:'Todos os dias',varias_semana:'Várias vezes por semana',semanal:'Uma vez por semana',quinzenal:'Quinzenal',mensal:'Uma vez por mês',raramente:'Raramente',nunca:'Nunca'},market:{supermercado:'Supermercado',loja:'Loja de bairro',mercado_fresco:'Mercado de frescos',online:'Online'}};
const reasonNames={alimento:'Cor dos alimentos',embalagem:'Embalagens ou marcas',supermercado:'Cores das secções',ideia:'Sensação ou ideia',preferencia:'Preferência pessoal',nao_sei:'Não sei explicar',outra:'Outra razão'};
const el=id=>document.getElementById(id),make=(tag,text,cls)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;if(cls)node.className=cls;return node;};
let records=[],filtered=[],page=0,server=false;
Object.entries(categoryNames).forEach(([id,name])=>{const option=make('option',name);option.value=id;el('filter-category').append(option);});
async function load(){
 el('data-source').textContent='A carregar…';
 try{
  await studyReady;server=studyRuntime.online;
  if(server){const response=await fetch('/api/admin/responses',{cache:'no-store'});if(response.status===401){el('login').hidden=false;el('dashboard').hidden=true;el('data-source').textContent='SQLite no servidor · Acesso reservado à equipa.';return;}if(!response.ok)throw Error();const data=await response.json();records=data.records;el('logout').hidden=false;}
  else records=JSON.parse(localStorage.getItem(DEMO_RECORDS_KEY)||'[]');
  el('login').hidden=true;el('dashboard').hidden=false;el('data-source').textContent=server?'SQLite · Respostas completas guardadas no servidor.':'Demonstração local: apenas respostas deste navegador. A recolha entre dispositivos requer o servidor SQLite.';
  render();
 }catch{el('data-source').textContent='Não foi possível ler os dados. Verifica a ligação e tenta atualizar.';}
}
function localDay(iso){const d=new Date(iso);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function render(){
 const cat=el('filter-category').value,lang=el('filter-language').value,from=el('filter-from').value,to=el('filter-to').value,search=el('search').value.trim().toLowerCase();
 filtered=records.filter(r=>(!lang||r.language===lang)&&(!from||localDay(r.submittedAt)>=from)&&(!to||localDay(r.submittedAt)<=to)&&(!search||r.participant.toLowerCase().includes(search)));
 const answers=filtered.flatMap(r=>r.answers.filter(a=>!cat||a.category===cat));
 el('stat-people').textContent=filtered.length;el('stat-answers').textContent=answers.length;
 el('stat-colors').textContent=answers.length?(answers.reduce((n,a)=>n+a.colors.length,0)/answers.length).toFixed(1):'0';
 el('stat-none').textContent=(answers.length?Math.round(answers.filter(a=>a.noAssociation).length/answers.length*100):0)+'%';
 renderHeatmap(answers,cat);renderReasons(answers);renderEntries(cat);
 el('export').disabled=!answers.length;
}
function renderHeatmap(answers,category){
 const table=el('heatmap');table.replaceChildren();table.append(make('caption','Associações de cores por categoria'));
 const head=make('thead'),row=make('tr');row.append(make('th','Categoria'));
 colors.forEach(([,name,hex])=>{const th=make('th');th.scope='col';const dot=make('i',undefined,'header-dot');dot.style.background=hex;th.append(dot,document.createTextNode(name));row.append(th);});head.append(row);table.append(head);
 const body=make('tbody');Object.entries(categoryNames).filter(([id])=>!category||category===id).forEach(([id,name])=>{const data=answers.filter(a=>a.category===id),tr=make('tr'),label=make('th',`${name} (n=${data.length})`);label.scope='row';tr.append(label);colors.forEach(([color])=>{const count=data.filter(a=>a.colors.includes(color)).length,pct=data.length?Math.round(count/data.length*100):null,td=make('td',pct===null?'—':`${pct}%`,'heat-cell');td.title=`${count} / ${data.length}`;if(pct!==null){td.style.background=`hsl(0 0% ${96-pct*.66}%)`;td.style.color=pct>60?'#fff':'#343434';};tr.append(td);});body.append(tr);});table.append(body);
}
function renderReasons(answers){
 const root=el('reason-bars');root.replaceChildren();Object.entries(reasonNames).forEach(([id,name])=>{const count=answers.filter(a=>a.reasons.includes(id)).length,pct=answers.length?Math.round(count/answers.length*100):0,row=make('div',undefined,'reason-row'),track=make('div',undefined,'reason-track'),bar=make('div',undefined,'reason-fill');bar.style.width=pct+'%';track.append(bar);row.append(make('span',name),track,make('small',`${count} · ${pct}%`));root.append(row);});
}
function renderEntries(cat){
 const root=el('entries-list');root.replaceChildren();const maxPage=Math.max(0,Math.ceil(filtered.length/10)-1);page=Math.min(page,maxPage);
 el('result-count').textContent=`${filtered.length} participações · ${cat?categoryNames[cat]:'todas as categorias'}`;
 if(!filtered.length)root.append(make('div','Ainda sem respostas neste intervalo. Completa o questionário para começar.', 'empty'));
 [...filtered].sort((a,b)=>b.submittedAt.localeCompare(a.submittedAt)).slice(page*10,page*10+10).forEach(record=>{
  const detail=make('details',undefined,'entry'),summary=make('summary'),code=make('span',record.participant.slice(0,8), 'entry-code');code.title=record.participant;
  summary.append(code,make('span',`${new Date(record.submittedAt).toLocaleString('pt-PT')} · ${(record.language||'pt').toUpperCase()}`,'entry-date'));detail.append(summary,make('p',`Código completo: ${record.participant}`,'entry-code'));
  const pr=record.profile;detail.append(make('p',pr?`Perfil: ${pr.age} anos · ${pr.country} · ${profileLabels.gender[pr.gender]||pr.gender} · ${profileLabels.frequency[pr.frequency]||pr.frequency} · ${(pr.marketTypes||[]).map(m=>profileLabels.market[m]||m).join(', ')}`:'Perfil: não indicado','entry-code'));
  record.answers.filter(a=>!cat||a.category===cat).forEach(answer=>{const line=make('div',undefined,'entry-answer'),content=make('div');line.append(make('strong',categoryNames[answer.category]||answer.category));
   if(answer.noAssociation)content.append(make('span','Sem associação'));
   else answer.colors.forEach(id=>{const color=colors.find(c=>c[0]===id);if(!color)return;const chip=make('span',undefined,'entry-color'),dot=make('i');dot.style.background=color[2];chip.append(dot,document.createTextNode(color[1]));content.append(chip);});
   content.append(make('p',answer.reasons.map(r=>reasonNames[r]||r).join(' · ')||'Sem motivo indicado'));
   if(answer.other)content.append(make('p',answer.other));if(answer.comment)content.append(make('p',`Comentário: ${answer.comment}`));line.append(content);detail.append(line);
  });root.append(detail);
 });
 el('page-info').textContent=filtered.length?`${page+1} / ${maxPage+1}`:'0 / 0';el('previous-page').disabled=page===0;el('next-page').disabled=page>=maxPage;
}
el('login').onsubmit=async e=>{e.preventDefault();el('login-error').textContent='';try{const response=await fetch('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:el('admin-password').value})});el('admin-password').value='';if(!response.ok)throw Error();await load();}catch{el('login-error').textContent='Não foi possível entrar. Verifica a palavra-passe ou tenta mais tarde.';}};
el('logout').onclick=async()=>{await fetch('/api/admin/logout',{method:'POST'});records=[];filtered=[];el('export').disabled=true;el('logout').hidden=true;await load();};
for(const id of ['filter-category','filter-language','filter-from','filter-to','search'])el(id).oninput=()=>{page=0;render();};
el('clear-filters').onclick=()=>{for(const id of ['filter-category','filter-language','filter-from','filter-to','search'])el(id).value='';page=0;render();};
el('previous-page').onclick=()=>{page--;render();};el('next-page').onclick=()=>{page++;render();};el('refresh').onclick=load;
el('export').onclick=()=>{
 const fields=['participant','submitted_at','language','category','colors','no_association','reasons','other','position','age','country','gender','frequency','market_types','comment'];
 const safe=value=>{let s=String(value??'');if(/^[\s]*[=+@\-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"';};
 const rows=filtered.flatMap(r=>r.answers.filter(a=>!el('filter-category').value||a.category===el('filter-category').value).map(a=>[r.participant,r.submittedAt,r.language,a.category,a.colors.join('|'),a.noAssociation,a.reasons.join('|'),a.other,a.position,r.profile?.age,r.profile?.country,r.profile?.gender,r.profile?.frequency,(r.profile?.marketTypes||[]).join('|'),a.comment]));
 const csv='\ufeff'+[fields,...rows].map(row=>row.map(safe).join(',')).join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='cores-respostas.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
load();
