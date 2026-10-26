'use strict';
// Três ecrãs de apresentação. Os pontos permitem regressar sem perder o consentimento.
(() => {
 const byId = id => document.getElementById(id);
 const dots = [...document.querySelectorAll('.onboarding-dot')];
 const studyText = 'Um estudo académico sobre cores e alimentos. Participar é voluntário, sem nome nem email. Podes sair a qualquer momento antes de concluir.';
 const demoText = 'Modo de teste: respostas guardadas apenas neste navegador.';
 const slides = [
  ['Bem-vindo', 'Que cores associas aos alimentos? Partilha as tuas escolhas neste breve questionário.'],
  ['De que cor é o teu', studyText],
  ['Consentimento', '']
 ];
 let current = 0;
 function showSlide(next, focus = true) {
  current = next;
  byId('welcome').dataset.step = String(current);
  byId('onboarding-title').replaceChildren(document.createTextNode(t(slides[current][0])));
  if (current === 1) {
   const line = document.createElement('span');
   line.className = 'handwritten';
   line.textContent = t('supermercado?');
   byId('onboarding-title').append(line);
  }
  byId('onboarding-description').textContent = t(slides[current][1]) + (current===1&&!studyRuntime.online?' '+t(demoText):'');
  byId('language-control').hidden=current!==0;
  document.querySelector('.admin-entry').hidden=current!==0;
  dots.forEach((dot,i)=>dot.setAttribute('aria-label',`${i+1}/3`));
  byId('onboarding-description').hidden = current === 2;
  document.querySelector('.onboarding-logo').hidden = current !== 0;
  const illustration = byId('onboarding-illustration');
  illustration.hidden = current === 0;
  illustration.src = current === 2 ? 'assets/consentimento.png' : 'assets/apresentacao.png';
  byId('consent-panel').hidden = current !== 2;
  byId('onboarding-next').hidden = current === 2;
  byId('start').hidden = current !== 2;
  byId('onboarding-back').hidden = current === 0;
  dots.forEach((dot, i) => {
   dot.classList.toggle('is-active', i === current);
   if (i === current) dot.setAttribute('aria-current', 'step');
   else dot.removeAttribute('aria-current');
  });
  if (focus) byId('onboarding-title').focus({preventScroll:true});
  window.scrollTo({top:0, behavior:'instant'});
 }
 window.goOnboarding=n=>showSlide(n);
 window.renderOnboarding=focus=>showSlide(current,focus);
 applyLanguage(getLanguage());
 studyReady.then(()=>showSlide(current,false));
 byId('onboarding-back').onclick = () => showSlide(Math.max(current - 1, 0));
 byId('onboarding-next').onclick = () => showSlide(Math.min(current + 1, 2));
 dots.forEach(dot => {dot.onclick = () => showSlide(Number(dot.dataset.slide));});
})();
