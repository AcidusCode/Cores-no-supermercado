export const categories=['peixe','hortofruticolas','carne','lacteos','padaria','congelados','bebidas'];
export const colors=['vermelho','amarelo','laranja','verde','azul','roxo','castanho','rosa','branco','preto'];
export const reasons=['alimento','embalagem','supermercado','ideia','preferencia','nao_sei','outra'];
export function validateRecord(input){
 const fail=()=>{throw new Error('Invalid participation');};
 if(!input||! /^[a-f0-9-]{36}$/.test(input.participant||'')||input.consent!==true||!['pt','en','es'].includes(input.language)||typeof input.version!=='string'||input.version.length>80)fail();
 if(!Array.isArray(input.answers)||input.answers.length!==7||new Set(input.answers.map(a=>a.category)).size!==7)fail();
 const answers=input.answers.map((a,i)=>{
  if(!categories.includes(a.category)||a.position!==i+1||typeof a.noAssociation!=='boolean'||!Array.isArray(a.colors)||a.colors.length>10||new Set(a.colors).size!==a.colors.length||a.colors.some(c=>!colors.includes(c)))fail();
  if((a.noAssociation&&a.colors.length)||(!a.noAssociation&&!a.colors.length))fail();
  if(!Array.isArray(a.reasons)||a.reasons.length>7||new Set(a.reasons).size!==a.reasons.length||a.reasons.some(r=>!reasons.includes(r))||(!a.noAssociation&&!a.reasons.length)||(a.reasons.includes('nao_sei')&&a.reasons.length>1))fail();
  if(typeof a.other!=='string'||a.other.length>400||(a.reasons.includes('outra')&&!a.other.trim()))fail();
  return {category:a.category,position:i+1,colors:a.colors,noAssociation:a.noAssociation,reasons:a.reasons,other:a.reasons.includes('outra')?a.other.trim():''};
 });
 return {participant:input.participant,language:input.language,version:input.version,consent:true,submittedAt:new Date().toISOString(),order:answers.map(a=>a.category),answers};
}
