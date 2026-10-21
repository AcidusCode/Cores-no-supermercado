'use strict';
window.DEMO_RECORDS_KEY='cores-demo-participations-v3';
window.studyRuntime={online:Boolean(window.STUDY_CONFIG?.endpoint),endpoint:window.STUDY_CONFIG?.endpoint||''};
window.studyReady=(async()=>{
 if(studyRuntime.online)return;
 try{const response=await fetch('/api/status',{cache:'no-store'});if(response.ok){const status=await response.json();if(status.storage==='sqlite'){studyRuntime.online=true;studyRuntime.endpoint='/api/responses';}}}catch{}
})();
window.saveParticipation=async record=>{
 await studyReady;
 if(studyRuntime.online){
  const response=await fetch(studyRuntime.endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'submit',...record})});
  if(!response.ok)throw Error('save');const result=await response.json();if(!result.ok)throw Error('save');
 }else{
  const records=JSON.parse(localStorage.getItem(DEMO_RECORDS_KEY)||'[]');
  if(!records.some(row=>row.participant===record.participant)){records.push(record);localStorage.setItem(DEMO_RECORDS_KEY,JSON.stringify(records));}
 }
};
