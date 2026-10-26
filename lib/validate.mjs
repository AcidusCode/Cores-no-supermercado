export const categories=['peixe','hortofruticolas','carne','lacteos','padaria','congelados','bebidas'];
export const colors=['vermelho','amarelo','laranja','verde','azul','roxo','castanho','rosa','branco','preto','cinzento','bege'];
export const reasons=['alimento','embalagem','supermercado','ideia','preferencia','nao_sei','outra'];
export const profileOptions={gender:['feminino','masculino','nao_binario','outro','prefiro_nao_dizer'],frequency:['diaria','varias_semana','semanal','quinzenal','mensal','raramente'],marketTypes:['supermercado','loja','mercado_fresco','online']};
// Profile is optional (old clients stay valid, stored as null) but, when present, must be fully valid.
function validateProfile(p){
 const ok=p&&typeof p==='object'&&!Array.isArray(p)&&Number.isInteger(p.age)&&p.age>=18&&p.age<=120&&typeof p.country==='string'&&/^[A-Z]{2}$/.test(p.country)&&profileOptions.gender.includes(p.gender)&&profileOptions.frequency.includes(p.frequency)&&Array.isArray(p.marketTypes)&&p.marketTypes.length>0&&new Set(p.marketTypes).size===p.marketTypes.length&&p.marketTypes.every(m=>profileOptions.marketTypes.includes(m));
 if(!ok)throw new Error('Invalid participation');
 return {age:p.age,country:p.country,gender:p.gender,frequency:p.frequency,marketTypes:p.marketTypes};
}
// Fills fields added after the first release on records stored earlier.
export const withDefaults=r=>({...r,profile:r.profile??null,...(Array.isArray(r.answers)&&{answers:r.answers.map(a=>({...a,comment:a.comment??''}))})});
export function validateRecord(input){
 const fail=()=>{throw new Error('Invalid participation');};
 if(!input||! /^[a-f0-9-]{36}$/.test(input.participant||'')||input.consent!==true||!['pt','en','es','it'].includes(input.language)||typeof input.version!=='string'||input.version.length>80)fail();
 if(!Array.isArray(input.answers)||input.answers.length!==7||new Set(input.answers.map(a=>a.category)).size!==7)fail();
 const answers=input.answers.map((a,i)=>{
  if(!categories.includes(a.category)||a.position!==i+1||typeof a.noAssociation!=='boolean'||!Array.isArray(a.colors)||a.colors.length>10||new Set(a.colors).size!==a.colors.length||a.colors.some(c=>!colors.includes(c)))fail();
  if((a.noAssociation&&a.colors.length)||(!a.noAssociation&&!a.colors.length))fail();
  if(!Array.isArray(a.reasons)||a.reasons.length>7||new Set(a.reasons).size!==a.reasons.length||a.reasons.some(r=>!reasons.includes(r))||(!a.noAssociation&&!a.reasons.length)||(a.reasons.includes('nao_sei')&&a.reasons.length>1))fail();
  if(typeof a.other!=='string'||a.other.length>400||(a.reasons.includes('outra')&&!a.other.trim()))fail();
  if(a.comment!==undefined&&(typeof a.comment!=='string'||a.comment.length>400))fail();
  return {category:a.category,position:i+1,colors:a.colors,noAssociation:a.noAssociation,reasons:a.reasons,other:a.reasons.includes('outra')?a.other.trim():'',comment:(a.comment||'').trim()};
 });
 const profile=input.profile===undefined?null:validateProfile(input.profile);
 return {participant:input.participant,language:input.language,version:input.version,consent:true,submittedAt:new Date().toISOString(),order:answers.map(a=>a.category),profile,answers};
}
