'use strict';
// Dados do estudo: manter estáveis durante uma recolha. Cores com escolha múltipla.
const CATEGORIES = [
 {id:'peixe',name:'Peixe e marisco',description:'Peixe e marisco frescos, como sardinha, salmão, camarão e amêijoas.'},
 {id:'hortofruticolas',name:'Fruta e legumes',description:'Fruta fresca, verduras e outros legumes frescos.'},
 {id:'carne',name:'Carne',description:'Carne fresca de vaca, porco, frango e outras aves.'},
 {id:'lacteos',name:'Leite e derivados',description:'Leite, queijo, iogurtes e outros produtos derivados do leite.'},
 {id:'padaria',name:'Pão e pastelaria',description:'Pão, bolos, croissants e outros produtos de padaria e pastelaria.'},
 {id:'congelados',name:'Congelados',description:'Alimentos vendidos congelados, como refeições, vegetais, peixe e gelados.'},
 {id:'bebidas',name:'Bebidas',description:'Água, refrigerantes, sumos e outras bebidas não alcoólicas.'}
];
const COLORS=[['vermelho','Vermelho','#ff0000'],['amarelo','Amarelo','#f3e600'],['laranja','Laranja','#ff8a00'],['verde','Verde','#00b80b'],['azul','Azul','#418dca'],['roxo','Roxo','#9e60b6'],['castanho','Castanho','#9d6242'],['rosa','Rosa','#ef80b4'],['branco','Branco','#ffffff'],['preto','Preto','#000000']];
const REASONS=[['alimento','Cor dos alimentos.'],['embalagem','Embalagens ou marcas.'],['supermercado','Cores das secções.'],['ideia','Sensação ou ideia associada.'],['preferencia','Preferência pessoal.'],['nao_sei','Não sei explicar.'],['outra','Outra razão.']];
const $=id=>document.getElementById(id);
const shuffle=arr=>{arr=[...arr];for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}return arr;};
const config=window.STUDY_CONFIG||{};
const online=()=>studyRuntime.online;
let order=[],answers=[],index=0,selected=new Set(),noAssociation=false,busy=false;
let participant=crypto.randomUUID();
const colorIds=()=>COLORS.filter(c=>selected.has(c[0])).map(c=>c[0]);
const selectionLabel=()=>noAssociation?t("Não associo nenhuma cor"):COLORS.filter(c=>selected.has(c[0])).map(c=>t(c[1])).join(', ');
$('mode').textContent=online()?'Estudo académico · Respostas enviadas ao concluir.':'MODO DE DEMONSTRAÇÃO · As respostas não são enviadas.';
$('consent').onchange=()=>{$('start').disabled=!$('consent').checked;};
$('start').onclick=()=>{if(!$('consent').checked)return;$('welcome').hidden=true;$('instructions').hidden=false;$('instructions-title').focus({preventScroll:true});window.scrollTo(0,0);};
$('begin-quiz').onclick=async()=>{
 await studyReady;
 if(!$('consent').checked)return;
 order=config.randomizeCategories===false?[...CATEGORIES]:shuffle(CATEGORIES);
 document.body.classList.remove('is-onboarding');document.body.classList.add('is-questionnaire');
 $('instructions').hidden=true;$('quiz').hidden=false;render();
};
function render(){
 selected=new Set();noAssociation=false;
 $('color-section').hidden=false;$('reason-section').hidden=true;$('error').textContent='';$('other').value='';$('other-wrap').hidden=true;
 $('step').textContent=`${String(index+1).padStart(2,'0')}/${String(order.length).padStart(2,'0')}`;
 $('progress').style.width=`${(index+1)/order.length*100}%`;$('category-progress').setAttribute('aria-valuenow',String(index+1));
 $('category').textContent=t(order[index].name);$('description').textContent=t(order[index].description);
 $('category-icon').src=`assets/categories/${order[index].id}.svg`;
 $('category-prompt').textContent=t("Seleciona as cores");
 $('palette').replaceChildren();
 COLORS.forEach(([id,name,hex])=>{
  const button=document.createElement('button');button.type='button';button.className='color-swatch';button.style.setProperty('--swatch',hex);button.setAttribute('aria-label',t(name));button.title=t(name);button.setAttribute('aria-pressed','false');button.dataset.color=id;
  const mark=document.createElement('span');mark.className='swatch-check';mark.setAttribute('aria-hidden','true');mark.textContent='✓';button.append(mark);
  button.onclick=()=>{if(selected.has(id))selected.delete(id);else selected.add(id);noAssociation=false;updateSelection();};
  $('palette').append(button);
 });
 updateSelection();$('reasons').replaceChildren();
 REASONS.forEach(([value,label])=>{
  const wrap=document.createElement('label');wrap.className='reason-option';if(value==='outra')wrap.classList.add('reason-other');const input=document.createElement('input');input.type='checkbox';input.value=value;input.name='reason';
  input.onchange=()=>{
   if(input.checked&&value==='nao_sei')document.querySelectorAll('[name=reason]').forEach(x=>{if(x!==input)x.checked=false;});
   else if(input.checked)document.querySelector('[value=nao_sei]').checked=false;
   $('other-wrap').hidden=!document.querySelector('[value=outra]').checked;
  };wrap.append(input,document.createTextNode(t(label)));$('reasons').append(wrap);
 });
 $('next').textContent=index===order.length-1?t("Concluir participação"):t("Continuar");
 window.scrollTo(0,0);$('category').focus({preventScroll:true});
}
function updateSelection(){
 $('palette').querySelectorAll('button').forEach(button=>button.setAttribute('aria-pressed',String(selected.has(button.dataset.color))));
 paintIcon();
 $('confirm').disabled=selected.size===0;
 $('chosen').textContent=selected.size?`${selected.size} ${selected.size===1?t('cor selecionada'):t('cores selecionadas')}: ${selectionLabel()}`:t("Escolhe uma ou mais cores.");
}
function showReasons(){
 $('color-section').hidden=true;$('reason-section').hidden=false;$('category-prompt').textContent=t("Conta-nos porquê");
 $('reason-icon').src=`assets/categories/${order[index].id}.svg`;$('reason-category').textContent=t(order[index].name);$('reason-selection').textContent=selectionLabel();
 $('reason-title').textContent=noAssociation?t("Queres explicar porquê?"):t("O que influenciou a tua escolha?");
 $('reason-hint').textContent=noAssociation?t("Explicar é opcional."):t("Podes escolher vários motivos.");
 window.scrollTo(0,0);$('reason-title').focus({preventScroll:true});
}
$('none').onclick=()=>{selected.clear();noAssociation=true;updateSelection();showReasons();};
$('confirm').onclick=()=>{if(selected.size)showReasons();};
$('edit-colors').onclick=()=>{
 if(busy)return;noAssociation=false;$('reason-section').hidden=true;$('color-section').hidden=false;$('category-prompt').textContent=t("Seleciona as cores");updateSelection();window.scrollTo(0,0);
};
$('next').onclick=async()=>{
 if(busy)return;
 const reasons=[...document.querySelectorAll('[name=reason]:checked')].map(x=>x.value);$('error').textContent='';
 if(!noAssociation&&!selected.size){$('error').textContent=t("Escolhe uma cor ou indica que não associas nenhuma.");return;}
 if(!noAssociation&&!reasons.length){$('error').textContent=t("Seleciona um motivo ou “Não sei explicar”.");return;}
 if(reasons.includes('outra')&&!$('other').value.trim()){$('error').textContent=t("Escreve a outra razão ou desmarca essa opção.");return;}
 const answer={category:order[index].id,colors:colorIds(),hex:COLORS.filter(c=>selected.has(c[0])).map(c=>c[2]),noAssociation,reasons,other:reasons.includes('outra')?$('other').value.trim():'',position:index+1};
 if(index<order.length-1){answers.push(answer);index++;render();return;}
 const complete=[...answers,answer];busy=true;$('next').disabled=true;$('edit-colors').disabled=true;$('exit-quiz').disabled=true;$('next').textContent=online()?t("A guardar…"):t("A concluir…");
 try{
  await saveParticipation({participant,version:config.version,language:getLanguage(),consent:true,submittedAt:new Date().toISOString(),answers:complete,order:order.map(x=>x.id)});
  answers=complete;$('quiz').hidden=true;$('finish').hidden=false;document.body.classList.remove('is-questionnaire');document.body.classList.add('is-finished');
  $('finish-title').focus({preventScroll:true});
  window.scrollTo(0,0);
 }catch{$('error').textContent=t('Não foi possível guardar. As escolhas continuam nesta página. Verifica a ligação ou o armazenamento do navegador e tenta novamente.');$('next').textContent=t("Tentar guardar novamente");}
 finally{busy=false;$('next').disabled=false;$('edit-colors').disabled=false;$('exit-quiz').disabled=false;}
};
$('exit-quiz').onclick=()=>{if(!busy)$('exit-dialog').showModal();};
$('resume-quiz').onclick=()=>{$('exit-dialog').close();};
$('discard-quiz').onclick=()=>{
 $('exit-dialog').close();answers=[];order=[];index=0;selected.clear();participant=crypto.randomUUID();
 $('quiz').hidden=true;$('instructions').hidden=false;document.body.classList.remove('is-questionnaire');document.body.classList.add('is-onboarding');window.scrollTo(0,0);$('instructions-title').focus({preventScroll:true});
};

// SVG alpha mask preserves the artwork silhouette. Equal vertical bands share its width.
function paintIcon(){
 const ids=colorIds(),file=`assets/categories/${order[index].id}.svg`;
 $('category-icon').hidden=ids.length>0;$('category-tint').toggleAttribute('hidden',ids.length===0);
 $('mask-image').setAttribute('href',file);$('shade-image').setAttribute('href',file);
 $('color-stripes').replaceChildren();
 ids.forEach((id,i)=>{const rect=document.createElementNS('http://www.w3.org/2000/svg','rect');rect.setAttribute('x',String(i*220/ids.length));rect.setAttribute('y','0');rect.setAttribute('width',String(220/ids.length+.1));rect.setAttribute('height','223');rect.setAttribute('fill',COLORS.find(c=>c[0]===id)[2]);$('color-stripes').append(rect);});
}
$('language').onchange=()=>{applyLanguage($('language').value);$('consent').checked=false;$('start').disabled=true;};
$('return-home').onclick=()=>location.reload();
applyLanguage(getLanguage());
