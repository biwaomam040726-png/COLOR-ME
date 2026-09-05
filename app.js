import { firebaseConfig } from "./firebase-config.js";

const DEFAULT_COLOR_META = {
  think:{label:"THINK",thai:"คิด",color:"#426cff",title:"THINK · นักคิดเชิงระบบ",subtitle:"คุณเด่นด้านการคิด วิเคราะห์ วางแผน และเชื่อมโยงข้อมูลก่อนตัดสินใจ",strength:"มองภาพรวมได้ดี จับประเด็นเก่ง ชอบเหตุผลและโครงสร้างที่ชัดเจน",teamwork:"จะทำงานได้ดีที่สุดเมื่อมีข้อมูล เป้าหมาย และเวลาสำหรับคิดอย่างเพียงพอ",watch:"ระวังคิดนานเกินไป หรือมองหาความสมบูรณ์จนเริ่มลงมือช้า"},
  fight:{label:"FIGHT",thai:"ลุย",color:"#ff455d",title:"FIGHT · นักขับเคลื่อน",subtitle:"คุณเด่นด้านพลังการตัดสินใจ ความรับผิดชอบ และการผลักดันให้สิ่งต่าง ๆ เดินหน้า",strength:"กล้าตัดสินใจ รับแรงกดดันได้ดี และพร้อมรับผิดชอบต่อผลลัพธ์",teamwork:"เหมาะกับบทบาทที่ต้องตั้งเป้าหมาย ตัดสินใจเร็ว และปลุกพลังทีม",watch:"ระวังเร่งจังหวะเร็วเกินไปจนคนที่ต้องการเวลาคิดหรือรายละเอียดตามไม่ทัน"},
  fine:{label:"FINE",thai:"ละเอียด",color:"#ffc938",title:"FINE · นักใส่ใจคุณค่า",subtitle:"คุณเด่นด้านความละเอียด ความเข้าใจคน ความเสมอภาค และบรรยากาศที่ดี",strength:"รับรู้อารมณ์และความต้องการของคนรอบตัว เก็บรายละเอียด และคำนึงถึงคุณภาพ",teamwork:"ช่วยประสานทีม ลดความขัดแย้ง และทำให้งานมีความรอบคอบมากขึ้น",watch:"ระวังเกรงใจหรือให้ความสำคัญกับทุกมุมมากเกินไปจนตัดสินใจช้า"},
  do:{label:"DO",thai:"ทำ",color:"#37d889",title:"DO · นักลงมือสร้างผลลัพธ์",subtitle:"คุณเด่นด้านการลงมือทำ การจัดขั้นตอน และเปลี่ยนแนวคิดให้กลายเป็นผลลัพธ์จริง",strength:"ทำงานเป็นขั้นตอน แก้ปัญหาหน้างานได้ และชอบเห็นความคืบหน้าที่จับต้องได้",teamwork:"เหมาะกับงานปฏิบัติ การจัดระบบ กระบวนการ และการทำให้แผนเกิดขึ้นจริง",watch:"ระวังรีบลงมือก่อนเห็นภาพรวม หรือให้ความสำคัญกับการทำจนลืมทบทวนทิศทาง"}
};
const COMMUNICATION = {
  think:{think:"ใช้ข้อมูล เหตุผล และโครงสร้างที่ชัดเจน",fight:"สรุปประเด็นให้สั้น พร้อมทางเลือกและผลลัพธ์",fine:"อธิบายเหตุผลควบคู่ผลกระทบต่อคน",do:"แปลงแนวคิดให้เป็นขั้นตอนและเกณฑ์ปฏิบัติ"},
  fight:{think:"ชะลอจังหวะให้ข้อมูลก่อนขอการตัดสินใจ",fight:"คุยตรง ประเด็นชัด และตกลงเป้าหมาย",fine:"ลดน้ำเสียงกดดัน เปิดพื้นที่ให้ความรู้สึก",do:"กำหนดเป้าหมายพร้อมเส้นตายและอำนาจตัดสินใจ"},
  fine:{think:"บอกบริบทและข้อมูลให้ครบ ไม่ใช้ความรู้สึกอย่างเดียว",fight:"พูดตรงขึ้น ระบุสิ่งที่ต้องการและกรอบเวลา",fine:"สร้างพื้นที่ปลอดภัย รับฟัง และยืนยันความเข้าใจ",do:"ตกลงขั้นตอนให้ชัด ลดความคลุมเครือ"},
  do:{think:"บอกข้อมูลที่ต้องใช้และจุดตัดสินใจ",fight:"รับเป้าหมายให้ชัด แล้วรายงานความคืบหน้าเป็นระยะ",fine:"อธิบายผลกระทบต่อคน ไม่เน้นงานอย่างเดียว",do:"คุยด้วยขั้นตอน เจ้าของงาน และกำหนดเวลา"}
};

const DEFAULT_WORDS = [
  {id:1,text:"ปัญญา",primary:"think",secondary:"fine"},{id:2,text:"วางแผน",primary:"think",secondary:"do"},
  {id:3,text:"ดี",primary:"fine",secondary:"think"},{id:4,text:"คิด",primary:"think",secondary:"fine"},
  {id:5,text:"ฉับไว",primary:"fight",secondary:"do"},{id:6,text:"ตรงประเด็น",primary:"think",secondary:"fight"},
  {id:7,text:"รับผิดชอบ",primary:"fight",secondary:"do"},{id:8,text:"สร้างโอกาส",primary:"fight",secondary:"think"},
  {id:9,text:"ทำ",primary:"do",secondary:"fight"},{id:10,text:"เห็นอกเห็นใจ",primary:"fine",secondary:"do"},
  {id:11,text:"รักอิสระ",primary:"think",secondary:"fight"},{id:12,text:"เสมอภาค",primary:"fine",secondary:"think"},
  {id:13,text:"พัฒนาแนวคิด",primary:"think",secondary:"fight"},{id:14,text:"ลงมือ",primary:"do",secondary:"fight"},
  {id:15,text:"ขั้นตอน",primary:"do",secondary:"think"},{id:16,text:"มนุษยธรรม",primary:"fine",secondary:"do"},
  {id:17,text:"วิเคราะห์",primary:"think",secondary:"fine"},{id:18,text:"เป็นระบบ",primary:"do",secondary:"think"},
  {id:19,text:"ไหวพริบ",primary:"fight",secondary:"think"},{id:20,text:"ลุย",primary:"fight",secondary:"do"},
  {id:21,text:"สร้างระบบ",primary:"do",secondary:"think"},{id:22,text:"เข้าใจ",primary:"fine",secondary:"think"}
];

const DEFAULT_CONFIG={
  gameTitle:"COLOR ME",
  gameTagline:"5 WORDS · 4 COLORS",
  heroSubtitle:"เลือกคำที่ “ตรงกับความเป็นเรา” มากที่สุด 5 คำ แล้วระบบจะถอดรหัสออกมาเป็นพลัง 4 สี พร้อมกราฟใยแมงมุม จุดแข็ง และคำแนะนำในการทำงานร่วมกับผู้อื่น",
  logoUrl:"",
  retentionDays:365,
  privacyEmail:"",
  privacyNotice:"ระบบจะจัดเก็บชื่อ–นามสกุล หน่วยงาน/สังกัด รหัสผู้เข้าร่วม คำที่เลือก และผลคะแนน 4 สี เพื่อใช้ในการสรุปผลกิจกรรมและการเรียนรู้ร่วมกัน\n\nข้อมูลจะไม่ถูกเปิดเผยใน Projector Mode และผู้เข้าร่วมทั่วไปไม่สามารถดูข้อมูลของผู้อื่นได้\n\nหากต้องการแก้ไขหรือลบข้อมูล โปรดติดต่อผู้ดูแลกิจกรรม",
  words:DEFAULT_WORDS
};

let state={
  profile:{},selected:[],result:null,responses:[],sessions:[],activeSession:null,selectedResponseIds:[],liveUpdatedAt:null,
  demoMode:false,firebaseReady:false,currentAdmin:null,config:structuredClone(DEFAULT_CONFIG),
  unsubscribeResponses:null,unsubscribeSessions:null,projectorTimer:null,projectorSlideTimer:null,projectorSlide:0,projectorMode:"tv",chartMotionStarted:false,audioReady:false,audioStarted:false,soundEnabled:true,musicTimer:null,analysisAudioTimer:null,initialResponsesLoaded:false,projectorLastSignature:"",projectorNewIds:new Set(),scannerAudioTimer:null,scannerAudioStopTimer:null,musicStep:0,musicNextTime:0,musicStarting:false
};
let charts={result:null,adminRadar:null,adminDoughnut:null,detail:null,team:null,projector:null,projectorDoughnut:null,projectorTeam:null};
let fb={};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const COLORS=["think","fight","fine","do"];
const META=()=>DEFAULT_COLOR_META;
const WORDS=()=>state.config.words||DEFAULT_WORDS;

function isConfigured(){return firebaseConfig.apiKey&&!firebaseConfig.apiKey.includes("PASTE_")&&firebaseConfig.projectId&&!firebaseConfig.projectId.includes("PASTE_");}
function escapeHtml(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function slug(s=""){return String(s).trim().toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9ก-๙_-]/g,"");}
function getDeviceId(){
  let id=localStorage.getItem("colorMeDeviceId");
  if(!id){id=(crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`);localStorage.setItem("colorMeDeviceId",id);}
  return id;
}
async function sha256(text){const b=new TextEncoder().encode(text);const h=await crypto.subtle.digest("SHA-256",b);return [...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,"0")).join("");}
function showScreen(id){$$(".screen").forEach(s=>s.classList.remove("active"));$(id).classList.add("active");window.scrollTo({top:0,behavior:"smooth"});}
function openModal(id){$(id).classList.add("open");$(id).setAttribute("aria-hidden","false");}
function closeModal(m){m.classList.remove("open");m.setAttribute("aria-hidden","true");}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(t._timer);t._timer=setTimeout(()=>t.classList.remove("show"),2600);}
function setLiveUpdatedNow(){state.liveUpdatedAt=new Date();}
function formatTimeOnly(v){const d=v instanceof Date?v:new Date(v);if(Number.isNaN(d.getTime()))return"—";return new Intl.DateTimeFormat("th-TH",{timeStyle:"medium"}).format(d);}
function openConfirmModal({title="ยืนยันการทำรายการ",message="โปรดยืนยันการทำรายการนี้",confirmText="ยืนยัน",danger=true}={}){
  return new Promise(resolve=>{
    const modal=$("#modalConfirm"),titleEl=$("#confirmTitle"),msgEl=$("#confirmMessage"),ok=$("#btnConfirmOk"),cancel=$("#btnConfirmCancel");
    titleEl.textContent=title;msgEl.textContent=message;ok.textContent=confirmText;ok.classList.toggle("btn-danger",danger);ok.classList.toggle("btn-primary",!danger);
    const cleanup=(result)=>{ok.onclick=null;cancel.onclick=null;modal.querySelectorAll('[data-close-confirm]').forEach(el=>el.onclick=null);closeModal(modal);resolve(result);};
    ok.onclick=()=>cleanup(true);cancel.onclick=()=>cleanup(false);modal.querySelectorAll('[data-close-confirm]').forEach(el=>el.onclick=()=>cleanup(false));
    openModal("#modalConfirm");
  });
}
function openNoticeModal({title="สำเร็จแล้ว",message="รายการของคุณดำเนินการเรียบร้อยแล้ว",tone="success",eyebrow="ACTION COMPLETED",buttonText="ตกลง"}={}){
  return new Promise(resolve=>{
    const modal=$("#modalNotice"),icon=$("#noticeIcon"),t=$("#noticeTitle"),m=$("#noticeMessage"),e=$("#noticeEyebrow"),ok=$("#btnNoticeOk");
    const toneText={success:"✓",danger:"🗑",info:"★"};
    icon.className=`notice-icon ${tone}`; icon.textContent=toneText[tone]||"✓"; t.textContent=title; m.textContent=message; e.textContent=eyebrow; ok.textContent=buttonText;
    const cleanup=()=>{ok.onclick=null;modal.querySelectorAll('[data-close-notice]').forEach(el=>el.onclick=null);closeModal(modal);resolve(true);};
    ok.onclick=cleanup; modal.querySelectorAll('[data-close-notice]').forEach(el=>el.onclick=cleanup); openModal("#modalNotice");
  });
}
function flashProjectorRefresh(){return;}
function formatDate(v){let d;if(!v)return"—";if(v?.toDate)d=v.toDate();else d=new Date(v);if(Number.isNaN(d.getTime()))return"—";return new Intl.DateTimeFormat("th-TH",{dateStyle:"medium",timeStyle:"short"}).format(d);}
function selectedSessionId(){return $("#adminSessionFilter")?.value||"";}
function filteredResponses(){const sid=selectedSessionId();return sid?state.responses.filter(r=>r.sessionId===sid):state.responses;}
function participantFilteredRows(){
  const q=$("#adminSearch")?.value?.trim().toLowerCase()||"",cf=$("#adminColorFilter")?.value||"";
  return filteredResponses().filter(r=>{const hay=[r.fullName,r.organization,r.sessionName].join(" ").toLowerCase();return(!q||hay.includes(q))&&(!cf||r.dominant===cf);});
}
function isResponseSelected(id){return state.selectedResponseIds.includes(String(id));}
function setResponseSelected(id,selected){const sid=String(id);const set=new Set(state.selectedResponseIds.map(String));selected?set.add(sid):set.delete(sid);state.selectedResponseIds=[...set];}
function clearResponseSelection(){state.selectedResponseIds=[];syncParticipantSelectionUI();}
function toggleAllFilteredResponses(selected){participantFilteredRows().forEach(r=>setResponseSelected(r.id,selected));syncParticipantSelectionUI();renderTable();}
function selectAllResponsesSystem(){state.responses.forEach(r=>setResponseSelected(r.id,true));syncParticipantSelectionUI();renderTable();toast(`เลือกข้อมูลทั้งระบบ ${state.responses.length} รายการแล้ว`);}
function selectAllResponsesInSession(){const rows=filteredResponses();rows.forEach(r=>setResponseSelected(r.id,true));syncParticipantSelectionUI();renderTable();toast(`เลือกข้อมูลใน Session ${rows.length} รายการแล้ว`);}
function clearSelectedResponses(){clearResponseSelection();renderTable();}
function syncParticipantSelectionUI(){
  const count=state.selectedResponseIds.length;
  const visible=participantFilteredRows();
  const visibleCount=visible.filter(r=>isResponseSelected(r.id)).length;
  const allVisible=visible.length>0 && visibleCount===visible.length;
  const head=$("#selectAllResponsesHead"),bar=$("#selectAllResponses"),countEl=$("#selectedRowsCount"),delBtn=$("#btnDeleteSelected");
  if(head){head.checked=allVisible;head.indeterminate=visibleCount>0 && visibleCount<visible.length;}
  if(bar){bar.checked=allVisible;bar.indeterminate=visibleCount>0 && visibleCount<visible.length;}
  if(countEl)countEl.textContent=count?`เลือกแล้ว ${count} รายการ`:"ยังไม่ได้เลือก";
  if(delBtn)delBtn.disabled=!count;
}
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function resultDataForExport(){
  if(!state.result)return null;
  const primary=META()[state.result.dominant],secondary=META()[state.result.secondary];
  return {result:state.result,primary,secondary,fullName:state.profile.fullName||"ผู้เข้าร่วม",meta:[state.profile.organization,state.activeSession?.name].filter(Boolean).join(" · ")||"COLOR ME participant",dateText:new Intl.DateTimeFormat("th-TH",{dateStyle:"medium"}).format(new Date())};
}
function exportScorePills(scores,clsName="story-pill"){return COLORS.map(k=>`<span class="${clsName}"><b style="color:${META()[k].color}">${META()[k].label}</b> ${scores[k]}%</span>`).join("");}
function exportWordPills(words,clsName="story-word"){return (words||[]).map(w=>`<span class="${clsName}">${escapeHtml(w)}</span>`).join("");}
function createExportHost(innerHtml,width,height){const host=document.createElement("div");host.className="export-clone-host";host.style.width=`${width}px`;host.style.height=`${height}px`;host.innerHTML=innerHtml;document.body.appendChild(host);return host;}
async function renderStaticRadar(canvas,scores,labelSize=16){
  if(!canvas||!window.Chart||!scores)return null;
  const chart=new Chart(canvas,{type:"radar",plugins:[CONTINUOUS_CHART_PLUGIN],data:radarData(scores,"พลัง"),options:baseChartOptions({animation:false,plugins:{legend:{display:false},tooltip:{enabled:false}},scales:{r:{min:0,max:100,ticks:{display:false,stepSize:20},grid:{color:"rgba(255,255,255,.12)"},angleLines:{color:"rgba(255,255,255,.12)"},pointLabels:{color:"#dce6f2",font:{family:"Prompt",size:labelSize}}}}})});
  await sleep(50);return chart;
}
async function renderStaticGroupRadar(canvas,scores,labelSize=16){
  if(!canvas||!window.Chart||!scores)return null;
  const chart=new Chart(canvas,{type:"radar",plugins:[CONTINUOUS_CHART_PLUGIN],data:{labels:RADAR_LABELS,datasets:groupRadarDatasets(scores)},options:baseChartOptions({animation:false,plugins:{legend:{display:false},tooltip:{enabled:false}},scales:{r:{min:0,max:100,ticks:{display:false,stepSize:20},grid:{color:"rgba(255,255,255,.12)"},angleLines:{color:"rgba(255,255,255,.12)"},pointLabels:{color:"#dce6f2",font:{family:"Prompt",size:labelSize}}}}})});
  await sleep(50);return chart;
}
async function renderStaticDoughnut(canvas,rows){
  if(!canvas||!window.Chart)return null; const data=COLORS.map(k=>rows.filter(r=>r.dominant===k).length);
  const chart=new Chart(canvas,{type:"doughnut",plugins:[CONTINUOUS_CHART_PLUGIN,COLOR_MIX_PLUGIN],data:{labels:["THINK","FIGHT","FINE","DO"],datasets:[{data,backgroundColor:["#426cff","#ff455d","#ffc938","#37d889"],borderColor:"#0b182a",borderWidth:4,hoverOffset:8}]},options:{responsive:true,maintainAspectRatio:false,cutout:"68%",plugins:{legend:{position:"bottom",labels:{color:"#b7c5d7",usePointStyle:true,font:{family:"Prompt"}}},tooltip:doughnutTooltipOptions()},animation:false}});
  await sleep(50); return chart;
}
async function captureElementPng(node,opts){await document.fonts.ready;await sleep(260);return html2canvas(node,{backgroundColor:opts.backgroundColor||"#06111e",scale:2,useCORS:true,logging:false,width:opts.width,height:opts.height,windowWidth:opts.width,windowHeight:opts.height});}
function downloadCanvasPng(canvas,filename){const a=document.createElement("a");a.download=filename;a.href=canvas.toDataURL("image/png",1);a.click();}
const RADAR_LABELS=["THINK · คิด","FIGHT · ลุย","FINE · ละเอียด","DO · ทำ"];
const COLOR_MIX_PLUGIN={
  id:"colorMixCenterText",
  afterDatasetsDraw(chart){
    if(chart.config.type!=="doughnut")return;
    const {ctx}=chart;const meta=chart.getDatasetMeta(0);if(!meta?.data?.length)return;
    const values=chart.data.datasets[0].data||[];const total=values.reduce((a,b)=>a+Number(b||0),0);
    const active=chart.getActiveElements?.()||[];
    const index=active.length?active[0].index:values.reduce((best,val,idx,arr)=>Number(val)>Number(arr[best]||-1)?idx:best,0);
    const label=chart.data.labels[index]||"TOTAL";const value=Number(values[index]||0);const pct=total?Math.round(value/total*100):0;const x=meta.data[0].x,y=meta.data[0].y;
    ctx.save();ctx.textAlign="center";ctx.fillStyle="#8fa9c6";ctx.font='600 16px Prompt';ctx.fillText(active.length?"Hover":"Dominant",x,y-14);ctx.fillStyle="#ffffff";ctx.font='700 30px Kanit';ctx.fillText(`${label} ${pct}%`,x,y+16);ctx.restore();
  }
};
function doughnutTooltipOptions(){return{callbacks:{label(ctx){const values=ctx.dataset.data||[];const total=values.reduce((a,b)=>a+Number(b||0),0);const value=Number(ctx.raw||0);const pct=total?Math.round(value/total*100):0;return `${ctx.label}: ${value} คน (${pct}%)`;}}};}
function markChartLoading(canvas){const wrap=canvas?.parentElement;if(!wrap)return;wrap.classList.add("chart-loading");clearTimeout(wrap._loadingTimer);wrap._loadingTimer=setTimeout(()=>wrap.classList.remove("chart-loading"),1700);}
function renderColorMixLegend(rows){
  const el=$("#colorMixLegend");if(!el)return;const total=rows.length||0;
  el.innerHTML=COLORS.map(k=>{const count=rows.filter(r=>r.dominant===k).length;const pct=total?Math.round(count/total*100):0;return `<div class="color-mix-item"><b><i style="background:${META()[k].color}"></i>${META()[k].label}</b><span>${count} คน</span><strong>${pct}%</strong></div>`;}).join("");
}
function pointOnClosedPath(points,progress){
  if(!points?.length)return null;const segs=[];let total=0;
  for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length],len=Math.hypot(b.x-a.x,b.y-a.y);segs.push({a,b,len});total+=len;}
  let d=((progress%1)+1)%1*total;
  for(const s of segs){if(d<=s.len){const u=s.len?d/s.len:0;return{x:s.a.x+(s.b.x-s.a.x)*u,y:s.a.y+(s.b.y-s.a.y)*u};}d-=s.len;}
  return{x:points[0].x,y:points[0].y};
}
const CONTINUOUS_CHART_PLUGIN={
  id:"continuousChartMotion",
  afterDraw(chart){
    const ctx=chart.ctx; const t=performance.now()/1000;
    if(chart.config.type==="radar"){
      const scale=chart.scales?.r; if(!scale) return;
      const cx=scale.xCenter, cy=scale.yCenter, radius=scale.drawingArea || Math.min(chart.width,chart.height)*0.32;
      ctx.save();ctx.translate(cx,cy);ctx.rotate((t/5)% (Math.PI*2));const g=ctx.createLinearGradient(-radius,0,radius,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.45,'rgba(100,200,255,.08)');g.addColorStop(.5,'rgba(122,232,255,.34)');g.addColorStop(.55,'rgba(100,200,255,.08)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.strokeStyle=g;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-radius,0);ctx.lineTo(radius,0);ctx.stroke();ctx.restore();
      const mainMeta=chart.getDatasetMeta(0),pts=mainMeta?.data||[];
      if(pts.length>2){
        ctx.save();ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i].x,pts[i].y);ctx.closePath();ctx.lineWidth=2.5;ctx.strokeStyle=`rgba(145,198,255,${.55+.2*Math.sin(t*1.8)})`;ctx.shadowColor='rgba(80,175,255,.95)';ctx.shadowBlur=14+6*Math.sin(t*1.8);ctx.stroke();ctx.restore();
        const head=((t/3.2)%1);const trail=18;
        for(let i=trail;i>=0;i--){const pos=pointOnClosedPath(pts,head-i*.008);if(!pos)continue;const a=(1-i/trail)*.95;const r=2.5+(1-i/trail)*4.5;ctx.save();ctx.globalAlpha=a;ctx.fillStyle=i<5?'#dff7ff':'#71cfff';ctx.shadowColor='#52c8ff';ctx.shadowBlur=18;ctx.beginPath();ctx.arc(pos.x,pos.y,r,0,Math.PI*2);ctx.fill();ctx.restore();}
      }
      chart.data.datasets.forEach((ds,di)=>{if(di!==0)return;const meta=chart.getDatasetMeta(di);meta?.data?.forEach((pt,idx)=>{const pulse=5+(Math.sin(t*2.8+idx*.9)+1)*2.3;const col=(Array.isArray(ds.pointBackgroundColor)?ds.pointBackgroundColor[idx]:ds.pointBackgroundColor)||'#8fb5ff';ctx.save();ctx.fillStyle=col;ctx.globalAlpha=.15;ctx.shadowColor=col;ctx.shadowBlur=20;ctx.beginPath();ctx.arc(pt.x,pt.y,pulse+5,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.06;ctx.beginPath();ctx.arc(pt.x,pt.y,pulse+12,0,Math.PI*2);ctx.fill();ctx.restore();});});
      ctx.save();ctx.strokeStyle='rgba(115,188,255,.10)';ctx.lineWidth=1;for(let i=0;i<3;i++){const rr=radius*(.72+i*.11)+Math.sin(t*1.3+i)*4;ctx.beginPath();ctx.arc(cx,cy,rr,0,Math.PI*2);ctx.stroke();}ctx.restore();
    }
    if(chart.config.type==="line"){
      const meta=chart.getDatasetMeta(0),pts=meta?.data||[];
      if(pts.length>1){
        const segs=[];let total=0;for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1],len=Math.hypot(b.x-a.x,b.y-a.y);segs.push({a,b,len});total+=len;}
        let d=((t/2.7)%1)*total,pos=pts[0];for(const seg of segs){if(d<=seg.len){const u=seg.len?d/seg.len:0;pos={x:seg.a.x+(seg.b.x-seg.a.x)*u,y:seg.a.y+(seg.b.y-seg.a.y)*u};break;}d-=seg.len;}
        ctx.save();ctx.strokeStyle=`rgba(143,181,255,${.55+.2*Math.sin(t*2)})`;ctx.lineWidth=3;ctx.shadowColor='rgba(84,174,255,.9)';ctx.shadowBlur=12;ctx.beginPath();ctx.moveTo(pts[0].x,pts[0].y);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i].x,pts[i].y);ctx.stroke();ctx.restore();
        for(let i=10;i>=0;i--){const alpha=(1-i/10)*.85;const trailDist=Math.max(0,((t/2.7)%1)-i*.018);let td=trailDist*total,tp=pts[0];for(const seg of segs){if(td<=seg.len){const u=seg.len?td/seg.len:0;tp={x:seg.a.x+(seg.b.x-seg.a.x)*u,y:seg.a.y+(seg.b.y-seg.a.y)*u};break;}td-=seg.len;}ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle=i<3?'#effcff':'#72cfff';ctx.shadowColor='#58c9ff';ctx.shadowBlur=18;ctx.beginPath();ctx.arc(tp.x,tp.y,2+(1-i/10)*4,0,Math.PI*2);ctx.fill();ctx.restore();}
        ctx.save();ctx.fillStyle='#f5fdff';ctx.shadowColor='#72d6ff';ctx.shadowBlur=22;ctx.beginPath();ctx.arc(pos.x,pos.y,6+Math.sin(t*5)*1.2,0,Math.PI*2);ctx.fill();ctx.restore();
      }
    }
    if(chart.config.type==="doughnut"){
      const arc=chart.getDatasetMeta(0)?.data?.[0]; if(!arc) return; const {x,y,outerRadius}=arc; const sweep=(t/2.5)%(Math.PI*2);
      ctx.save();ctx.strokeStyle='rgba(133,210,255,.34)';ctx.lineWidth=9;ctx.lineCap='round';ctx.shadowColor='rgba(92,191,255,.8)';ctx.shadowBlur=14;ctx.beginPath();ctx.arc(x,y,outerRadius+10,sweep,sweep+.5);ctx.stroke();ctx.restore();
    }
  }
};
function startChartMotionLoop(){
  if(state.chartMotionStarted) return; state.chartMotionStarted=true;
  const step=()=>{Object.values(charts).forEach(chart=>{if(chart?.canvas?.isConnected) try{chart.draw();}catch(e){}}); requestAnimationFrame(step);};
  requestAnimationFrame(step);
}

async function initFirebase(){
  if(!isConfigured()){state.demoMode=true;$("#modeBadge").classList.remove("hidden");$("#btnDemoDashboard").classList.remove("hidden");loadDemoConfig();await resolveSession();return;}
  try{
    const appMod=await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js");
    const authMod=await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    const fsMod=await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
    const app=appMod.initializeApp(firebaseConfig);fb.auth=authMod.getAuth(app);fb.db=fsMod.getFirestore(app);fb.authFns=authMod;fb.fsFns=fsMod;state.firebaseReady=true;
    await ensureAnon();await loadPublicConfig();await resolveSession();
  }catch(e){console.error(e);state.demoMode=true;$("#modeBadge").classList.remove("hidden");$("#btnDemoDashboard").classList.remove("hidden");loadDemoConfig();await resolveSession();toast("เชื่อมต่อ Firebase ไม่สำเร็จ — เปิด Demo mode");}
}
async function ensureAnon(){if(!fb.auth.currentUser)await fb.authFns.signInAnonymously(fb.auth);}
function loadDemoConfig(){const saved=localStorage.getItem("talentColorConfig");state.config=saved?JSON.parse(saved):structuredClone(DEFAULT_CONFIG);applyBranding();}
async function loadPublicConfig(){
  try{
    const {doc,getDoc}=fb.fsFns;const snap=await getDoc(doc(fb.db,"publicConfig","main"));
    if(snap.exists())state.config={...structuredClone(DEFAULT_CONFIG),...snap.data(),words:snap.data().words||DEFAULT_WORDS};
  }catch(e){console.warn(e);}
  applyBranding();
}
function applyBranding(){
  $("#brandTitle").textContent=state.config.gameTitle||"COLOR ME";
  $("#brandTagline").textContent=state.config.gameTagline||"5 WORDS · 4 COLORS";
  $("#heroSubtitle").textContent=state.config.heroSubtitle||DEFAULT_CONFIG.heroSubtitle;
  const privacyMini=$("#privacyMiniText"),privacyNotice=$("#privacyNoticeText");
  if(privacyMini)privacyMini.textContent=`ข้อมูลจะเก็บประมาณ ${state.config.retentionDays||365} วัน เพื่อใช้สรุปกิจกรรม`;
  if(privacyNotice)privacyNotice.textContent=(state.config.privacyNotice||DEFAULT_CONFIG.privacyNotice)+(state.config.privacyEmail?`

ติดต่อผู้ดูแลข้อมูล: ${state.config.privacyEmail}`:"");
  renderWords();renderMappingEditor();
}
async function resolveSession(){
  const params=new URLSearchParams(location.search);const sid=params.get("session");
  if(!sid){state.activeSession=null;$("#sessionChip").classList.add("hidden");$("#sessionStatusBox").classList.add("hidden");return;}
  if(state.demoMode){
    const sessions=JSON.parse(localStorage.getItem("talentColorSessions")||"[]");state.activeSession=sessions.find(s=>s.id===sid||s.code===sid)||null;
  }else{
    try{
      const {doc,getDoc,collection,query,where,getDocs}=fb.fsFns;
      let snap=await getDoc(doc(fb.db,"sessions",sid));
      if(snap.exists())state.activeSession={id:snap.id,...snap.data()};
      else{
        const qs=await getDocs(query(collection(fb.db,"sessions"),where("code","==",sid)));
        if(!qs.empty){const d=qs.docs[0];state.activeSession={id:d.id,...d.data()};}
      }
    }catch(e){console.error(e);}
  }
  if(state.activeSession){
    $("#sessionChip").textContent=state.activeSession.name;$("#sessionChip").classList.remove("hidden");
    const box=$("#sessionStatusBox");box.classList.remove("hidden");
    box.className="session-status"+(state.activeSession.isOpen===false?" closed":"");
    box.innerHTML=`<b>${escapeHtml(state.activeSession.name)}</b><br><small>${escapeHtml(state.activeSession.description||"")}</small>${state.activeSession.isOpen===false?`<div>Session นี้ปิดรับคำตอบแล้ว</div>`:""}`;
    $("#btnStart").disabled=state.activeSession.isOpen===false;
  }else{toast("ไม่พบ Session ที่ระบุ");}
}
function renderWords(){
  const cloud=$("#wordCloud");if(!cloud)return;
  cloud.innerHTML=WORDS().map((w,i)=>`<button type="button" class="word-card" data-id="${w.id}" style="animation:fadeUp .45s ease ${i*.02}s both">${escapeHtml(w.text)}</button>`).join("");
  cloud.querySelectorAll(".word-card").forEach(b=>b.addEventListener("click",()=>toggleWord(Number(b.dataset.id))));
  syncWordUI();
}
function toggleWord(id){if(state.selected.includes(id))state.selected=state.selected.filter(x=>x!==id);else{if(state.selected.length>=5){toast("เลือกได้สูงสุด 5 คำ");return;}state.selected.push(id);}syncWordUI();}
function syncWordUI(){$("#pickCount").textContent=state.selected.length;$$(".word-card").forEach(b=>b.classList.toggle("selected",state.selected.includes(Number(b.dataset.id))));const sel=state.selected.map(id=>WORDS().find(w=>w.id===id));$("#selectedChips").innerHTML=sel.length?sel.map(w=>`<b>${escapeHtml(w.text)}</b>`).join(""):"<i>ยังไม่ได้เลือก</i>";$("#btnAnalyze").disabled=state.selected.length!==5;}
function analyze(){
  const raw={think:0,fight:0,fine:0,do:0};const chosen=state.selected.map(id=>WORDS().find(w=>w.id===id));
  chosen.forEach(w=>{raw[w.primary]+=1;raw[w.secondary]+=.35;});const total=Object.values(raw).reduce((a,b)=>a+b,0);
  const scores=Object.fromEntries(Object.entries(raw).map(([k,v])=>[k,Math.round(v/total*100)]));const sum=Object.values(scores).reduce((a,b)=>a+b,0);
  if(sum!==100){const maxKey=Object.keys(scores).sort((a,b)=>raw[b]-raw[a])[0];scores[maxKey]+=100-sum;}
  const ranking=COLORS.slice().sort((a,b)=>scores[b]-scores[a]||COLORS.indexOf(a)-COLORS.indexOf(b));
  return{scores,dominant:ranking[0],secondary:ranking[1],selectedWords:chosen.map(w=>w.text)};
}
async function checkDuplicateAndSave(result){
  const sessionId=state.activeSession?.id||"open";
  if(state.firebaseReady && !fb.auth.currentUser) await ensureAnon();

  // ป้องกันซ้ำแบบ "คนเดิมในรอบเดิม" แทนการล็อกทั้งอุปกรณ์
  // ทำให้คอม/แท็บเล็ตเครื่องเดียวสามารถให้หลายคนทำต่อกันได้
  const normalizeIdentity=(value="")=>String(value)
    .trim()
    .toLocaleLowerCase("th-TH")
    .replace(/\s+/g," ");
  const nameKey=normalizeIdentity(state.profile.fullName);
  const orgKey=normalizeIdentity(state.profile.organization||"");
  const identity=`${nameKey}|${orgKey}`;
  const responseId=await sha256(`${sessionId}|${identity}`);

  const payload={
    fullName:state.profile.fullName,
    organization:state.profile.organization||"",
    selectedWords:result.selectedWords,
    scores:result.scores,
    dominant:result.dominant,
    secondary:result.secondary,
    sessionId,
    sessionName:state.activeSession?.name||"Open session",
    version:"12.0.0"
  };

  if(state.firebaseReady){
    const {doc,setDoc,serverTimestamp}=fb.fsFns;
    try{
      if(!fb.auth.currentUser)await ensureAnon();
      await setDoc(doc(fb.db,"responses",responseId),{
        ...payload,
        uid:fb.auth.currentUser.uid,
        createdAt:serverTimestamp()
      });
      return true;
    }catch(e){
      console.error(e);
      if(String(e.code||"").includes("permission-denied")){
        throw new Error("ชื่อนี้ส่งคำตอบในรอบกิจกรรมนี้แล้ว หรือรอบกิจกรรมปิดรับคำตอบ");
      }
      throw new Error("บันทึกข้อมูลไม่สำเร็จ");
    }
  }else{
    const arr=JSON.parse(localStorage.getItem("talentColorDemoResponses")||"[]");
    if(arr.some(r=>r.id===responseId)){
      throw new Error("ชื่อนี้ส่งคำตอบในรอบกิจกรรมนี้แล้ว");
    }
    arr.push({...payload,id:responseId,createdAt:new Date().toISOString()});
    localStorage.setItem("talentColorDemoResponses",JSON.stringify(arr));
    return true;
  }
}
let revealTimer=null;
function stopRevealAnimation(){
  if(revealTimer){clearInterval(revealTimer);revealTimer=null;}
}
function renderReveal(){
  stopRevealAnimation();
  playAnalysisStart();
  startScannerAudio(3500,720,1.0);
  const words=state.result?.selectedWords||[];
  const positions=[
    {x:18,y:23},{x:82,y:23},{x:14,y:72},{x:86,y:72},{x:50,y:10}
  ];
  const nodes=$("#analysisWordNodes"), lines=$("#analysisLines");
  if(!nodes||!lines)return;
  nodes.innerHTML=words.map((w,i)=>`<span class="analysis-word-node" data-analysis-node="${i}" style="left:${positions[i].x}%;top:${positions[i].y}%">${escapeHtml(w)}</span>`).join("");
  lines.innerHTML=words.map((w,i)=>`<line class="analysis-line" data-analysis-line="${i}" x1="50" y1="52" x2="${positions[i].x}" y2="${positions[i].y}"></line>`).join("");
  const current=$("#analysisCurrentWord"), status=$("#analysisStatus"), bar=$("#analysisProgressBar"), progressText=$("#analysisProgressText");
  let step=-1,cycle=0;
  const messages=[
    "กำลังตรวจจับรูปแบบของคำที่เลือก...",
    "กำลังเชื่อมโยงความหมายและพฤติกรรม...",
    "กำลังเปรียบเทียบมิติ THINK · FIGHT · FINE · DO...",
    "กำลังคำนวณลายเซ็นความเป็นคุณ..."
  ];
  const pulse=()=>{
    step=(step+1)%Math.max(words.length,1);cycle++;
    document.querySelectorAll("[data-analysis-node]").forEach((n,i)=>n.classList.toggle("active",i===step));
    document.querySelectorAll("[data-analysis-line]").forEach((n,i)=>n.classList.toggle("active",i===step));
    if(current)current.textContent=words[step]||"—";
    const pct=Math.min(94,8+cycle*11);
    if(bar)bar.style.width=`${pct}%`;
    if(progressText)progressText.textContent=`${pct}%`;
    if(status)status.textContent=messages[Math.min(messages.length-1,Math.floor(cycle/2))];
    playAnalysisPulse(step,cycle);
  };
  pulse();
  revealTimer=setInterval(pulse,440);
}
function finishReveal(){
  stopRevealAnimation();
  document.querySelectorAll("[data-analysis-node]").forEach(n=>n.classList.add("active"));
  document.querySelectorAll("[data-analysis-line]").forEach(n=>n.classList.add("active"));
  const bar=$("#analysisProgressBar"),txt=$("#analysisProgressText"),status=$("#analysisStatus"),current=$("#analysisCurrentWord");
  if(bar)bar.style.width="100%";
  if(txt)txt.textContent="100%";
  if(status)status.textContent="วิเคราะห์เสร็จแล้ว กำลังเปิดลายเซ็นความเป็นคุณ...";
  if(current)current.textContent="COMPLETE";
  playAnalysisComplete();
  setTimeout(()=>stopScannerAudio(),220);
}
function communicationCards(primary){
  return COLORS.map(k=>`<div class="comm-item"><b style="color:${META()[k].color}">${META()[k].label}</b><p>${COMMUNICATION[primary][k]}</p></div>`).join("");
}
function startResultGraphEngine(){
  const wrap=document.querySelector('#screenResult .result-chart-wrap');if(!wrap)return;
  wrap.querySelector('.result-graph-engine')?.remove();
  startScannerAudio(2750,680,.9);
  const overlay=document.createElement('div');overlay.className='result-graph-engine';overlay.innerHTML=`<div class="result-engine-core"><div class="result-engine-ring"></div><div class="result-engine-scan"></div><div class="result-engine-label">กำลังสร้างกราฟ<small>COLOR SIGNATURE SYNC</small></div><span class="result-engine-node n1">THINK</span><span class="result-engine-node n2">FIGHT</span><span class="result-engine-node n3">FINE</span><span class="result-engine-node n4">DO</span></div>`;wrap.appendChild(overlay);
  setTimeout(()=>overlay.classList.add('done'),2100);setTimeout(()=>overlay.remove(),2850);
}
function renderResult(){
  const r=state.result,p=META()[r.dominant],s=META()[r.secondary];
  $("#resultPersonName").textContent=state.profile.fullName||"ผู้เข้าร่วม";
  const meta=[state.profile.organization,state.activeSession?.name].filter(Boolean).join(" · ");
  $("#resultPersonMeta").textContent=meta||"COLOR ME participant";
  $("#resultTitle").textContent=p.title;$("#resultTitle").style.color=p.color;
  $("#resultSubtitle").textContent=`พลังรอง ${s.label} · ${s.thai} ช่วยเสริมให้สไตล์ของคุณมีทั้ง ${p.thai} และ ${s.thai} ในแบบเฉพาะตัว`;
  $("#resultScorePills").innerHTML=COLORS.map(k=>`<span class="score-pill"><b style="color:${META()[k].color}">${META()[k].label}</b> ${r.scores[k]}%</span>`).join("");
  $("#resultWords").innerHTML=r.selectedWords.map(w=>`<span class="result-word">${escapeHtml(w)}</span>`).join("");
  $("#insightContent").innerHTML=`<div class="insight-block"><h4>✦ จุดแข็งที่เด่น</h4><p>${p.strength}</p></div><div class="insight-block"><h4>✦ เวลาทำงานกับทีม</h4><p>${p.teamwork}</p></div><div class="insight-block"><h4>✦ พลังเสริมจาก ${s.label}</h4><p>${s.strength}</p></div><div class="insight-block"><h4>✦ จุดที่ควรระวัง</h4><p>${p.watch}</p></div>`;
  $("#communicationGrid").innerHTML=communicationCards(r.dominant);
  drawGroupRadar("resultRadar",r.scores,"result");
  startResultGraphEngine();
}
function radarData(scores,label="พลัง"){
  return{labels:RADAR_LABELS,datasets:[{label,data:[scores.think,scores.fight,scores.fine,scores.do],borderWidth:3,pointRadius:5,pointHoverRadius:7,fill:true,backgroundColor:"rgba(116,129,255,.24)",borderColor:"rgba(160,177,255,.98)",pointBackgroundColor:["#426cff","#ff455d","#ffc938","#37d889"],pointBorderColor:"#07111f",pointBorderWidth:2}]};
}
function groupRadarDatasets(scores){
  const values=[scores.think,scores.fight,scores.fine,scores.do];
  const gradientFill=(ctx)=>{const chart=ctx.chart,area=chart.chartArea;if(!area)return"rgba(116,129,255,.20)";const g=chart.ctx.createLinearGradient(area.left,area.top,area.right,area.bottom);g.addColorStop(0,"rgba(66,108,255,.42)");g.addColorStop(.34,"rgba(255,69,93,.34)");g.addColorStop(.66,"rgba(255,201,56,.30)");g.addColorStop(1,"rgba(55,216,137,.38)");return g;};
  return [
    {label:"Group DNA",data:values,borderWidth:3,pointRadius:6,pointHoverRadius:8,fill:true,backgroundColor:gradientFill,borderColor:"rgba(226,235,255,.95)",pointBackgroundColor:["#426cff","#ff455d","#ffc938","#37d889"],pointBorderColor:"#07111f",pointBorderWidth:2},
    {label:"Energy layer 1",data:values.map(v=>Math.max(0,Math.round(v*.86))),borderWidth:1.4,pointRadius:0,fill:true,backgroundColor:"rgba(91,120,255,.08)",borderColor:"rgba(103,145,255,.28)"},
    {label:"Energy layer 2",data:values.map(v=>Math.max(0,Math.round(v*.68))),borderWidth:1.2,pointRadius:0,fill:true,backgroundColor:"rgba(255,93,124,.045)",borderColor:"rgba(255,101,128,.20)"},
    {label:"Energy layer 3",data:values.map(v=>Math.max(0,Math.round(v*.50))),borderWidth:1,pointRadius:0,fill:true,backgroundColor:"rgba(70,224,176,.035)",borderColor:"rgba(70,224,176,.18)"}
  ];
}
function baseChartOptions(extra={}){
  return{responsive:true,maintainAspectRatio:false,interaction:{mode:"nearest",intersect:false},elements:{line:{tension:.28}},scales:{r:{min:0,max:100,ticks:{display:false,stepSize:20},grid:{color:"rgba(255,255,255,.10)"},angleLines:{color:"rgba(255,255,255,.12)"},pointLabels:{color:"#d7e5f4",font:{family:"Prompt",size:12,weight:"600"}}}},plugins:{legend:{display:false},tooltip:{backgroundColor:"rgba(7,17,31,.96)",borderColor:"rgba(132,170,220,.35)",borderWidth:1,titleColor:"#fff",bodyColor:"#dce8f5",padding:10}},animation:{duration:1800,easing:"easeOutExpo"},transitions:{active:{animation:{duration:280}}},...extra};
}
function buildAnimatedRadar(canvas,datasets,key,extraOptions={}){
  const existing=charts[key];
  if(existing&&existing.canvas===canvas){
    const next=datasets.map(ds=>ds.data.map(v=>Number(v)||0));
    const current=existing.data.datasets.map(ds=>(ds.data||[]).map(v=>Number(v)||0));
    const changed=JSON.stringify(next)!==JSON.stringify(current);
    if(changed){
      existing.data.datasets.forEach((ds,i)=>{if(datasets[i]){Object.assign(ds,datasets[i]);ds.data=[...datasets[i].data];}});
      existing.update("none");
    }
    return existing;
  }
  existing?.destroy?.();
  markChartLoading(canvas);
  const startSets=datasets.map(ds=>({...ds,data:ds.data.map(()=>0)}));
  charts[key]=new Chart(canvas,{type:"radar",plugins:[CONTINUOUS_CHART_PLUGIN],data:{labels:RADAR_LABELS,datasets:startSets},options:baseChartOptions(extraOptions)});
  requestAnimationFrame(()=>requestAnimationFrame(()=>{charts[key].data.datasets=datasets.map(ds=>({...ds,data:[...ds.data]}));charts[key].update();}));
  return charts[key];
}
function drawRadar(id,scores,key,label){const el=document.getElementById(id);if(!el||!window.Chart)return;buildAnimatedRadar(el,[radarData(scores,label).datasets[0]],key);}
function drawGroupRadar(id,scores,key){const el=document.getElementById(id);if(!el||!window.Chart)return;buildAnimatedRadar(el,groupRadarDatasets(scores),key,{plugins:{legend:{display:false},tooltip:{filter:item=>item.datasetIndex===0}}});}

async function adminLogin(email,password){
  if(!state.firebaseReady)throw new Error("ยังไม่ได้ตั้งค่า Firebase");
  const {signInWithEmailAndPassword}=fb.authFns,{doc,getDoc}=fb.fsFns;
  const cred=await signInWithEmailAndPassword(fb.auth,email,password);const ad=await getDoc(doc(fb.db,"admins",cred.user.uid));
  if(!ad.exists()){await fb.authFns.signOut(fb.auth);throw new Error("บัญชีนี้ยังไม่ได้รับสิทธิ์ผู้ดูแล");}
  state.currentAdmin=cred.user;startAdminRealtime();showScreen("#screenAdmin");
}
function startAdminRealtime(){
  if(state.demoMode){loadDemoAdmin();return;}
  state.initialResponsesLoaded=false;
  const {collection,query,orderBy,onSnapshot}=fb.fsFns;
  state.unsubscribeResponses?.();state.unsubscribeSessions?.();
  state.unsubscribeResponses=onSnapshot(query(collection(fb.db,"responses"),orderBy("createdAt","desc")),snap=>{
    const added=state.initialResponsesLoaded?snap.docChanges().filter(c=>c.type==="added").map(c=>({id:c.doc.id,...c.doc.data()})):[];
    state.responses=snap.docs.map(d=>({id:d.id,...d.data()}));
    setLiveUpdatedNow();
    if(isProjectorOpen()){
      renderProjector();
      pulseProjectorRealtime(added.length);
    }
    renderAdmin();
    if(added.length)notifyProjectorNewData(added);
    state.initialResponsesLoaded=true;
  });
  state.unsubscribeSessions=onSnapshot(query(collection(fb.db,"sessions"),orderBy("createdAt","desc")),snap=>{state.sessions=snap.docs.map(d=>({id:d.id,...d.data()}));setLiveUpdatedNow();renderSessions();fillSessionSelectors();renderAdmin();});
  loadAdminConfig();
}
function loadDemoAdmin(){
  const local=JSON.parse(localStorage.getItem("talentColorDemoResponses")||"[]");
  const sessions=JSON.parse(localStorage.getItem("talentColorSessions")||"[]");
  if(!sessions.length){
    sessions.push({id:"demo-r1",name:"รุ่นที่ 1 · สตท.1",code:"R1",description:"รอบตัวอย่าง",isOpen:true,createdAt:new Date().toISOString()},{id:"demo-r2",name:"รุ่นที่ 2 · สตท.2",code:"R2",description:"รอบตัวอย่าง",isOpen:false,createdAt:new Date().toISOString()});
  }
  const seeds=[
    {id:"d1",fullName:"ตัวอย่าง ก.",organization:"กลุ่ม A",selectedWords:["คิด","วางแผน","วิเคราะห์","เข้าใจ","สร้างระบบ"],scores:{think:48,fight:10,fine:19,do:23},dominant:"think",secondary:"do",sessionId:sessions[0].id,sessionName:sessions[0].name,createdAt:new Date(Date.now()-3600000).toISOString()},
    {id:"d2",fullName:"ตัวอย่าง ข.",organization:"กลุ่ม B",selectedWords:["ลุย","ฉับไว","รับผิดชอบ","ลงมือ","สร้างโอกาส"],scores:{think:12,fight:47,fine:6,do:35},dominant:"fight",secondary:"do",sessionId:sessions[0].id,sessionName:sessions[0].name,createdAt:new Date(Date.now()-7200000).toISOString()},
    {id:"d3",fullName:"ตัวอย่าง ค.",organization:"กลุ่ม A",selectedWords:["เห็นอกเห็นใจ","เสมอภาค","ดี","เข้าใจ","มนุษยธรรม"],scores:{think:18,fight:3,fine:60,do:19},dominant:"fine",secondary:"do",sessionId:sessions[1].id,sessionName:sessions[1].name,createdAt:new Date(Date.now()-10800000).toISOString()},
    {id:"d4",fullName:"ตัวอย่าง ง.",organization:"กลุ่ม C",selectedWords:["ทำ","ลงมือ","ขั้นตอน","เป็นระบบ","สร้างระบบ"],scores:{think:20,fight:18,fine:3,do:59},dominant:"do",secondary:"think",sessionId:sessions[1].id,sessionName:sessions[1].name,createdAt:new Date(Date.now()-14400000).toISOString()}
  ];
  state.sessions=sessions;state.responses=[...local,...seeds];state.currentAdmin={email:"demo@local"};setLiveUpdatedNow();renderSessions();fillSessionSelectors();renderAdmin();showScreen("#screenAdmin");
}
function averageScores(rows){const a={think:0,fight:0,fine:0,do:0};if(!rows.length)return a;COLORS.forEach(k=>a[k]=Math.round(rows.reduce((s,r)=>s+(Number(r.scores?.[k])||0),0)/rows.length));return a;}
function renderAdmin(){
  const rows=filteredResponses();
  $("#statTotal").textContent=rows.length;
  COLORS.forEach(k=>{$("#stat"+k[0].toUpperCase()+k.slice(1)).textContent=rows.filter(r=>r.dominant===k).length;});
  $("#adminHello").textContent=`บริหารกิจกรรมและดูสรุปแบบเรียลไทม์ · อัปเดตล่าสุด ${formatTimeOnly(state.liveUpdatedAt||new Date())}`;
  drawGroupRadar("adminRadar",averageScores(rows),"adminRadar");
  drawDoughnut(rows);
  renderColorMixLegend(rows);
  renderLivePeopleList(rows);
  renderTable();
  renderTeamDNA();
  renderProjector();
  syncParticipantSelectionUI();
}
function drawDoughnut(rows){
  const canvas=$("#adminDoughnut");
  const finalData=COLORS.map(k=>rows.filter(r=>r.dominant===k).length);
  if(charts.adminDoughnut&&charts.adminDoughnut.canvas===canvas){
    const current=(charts.adminDoughnut.data.datasets[0].data||[]).map(Number);
    if(JSON.stringify(current)!==JSON.stringify(finalData)){
      charts.adminDoughnut.data.datasets[0].data=[...finalData];
      charts.adminDoughnut.update("none");
    }
    return;
  }
  charts.adminDoughnut?.destroy?.();
  markChartLoading(canvas);
  charts.adminDoughnut=new Chart(canvas,{type:"doughnut",plugins:[CONTINUOUS_CHART_PLUGIN,COLOR_MIX_PLUGIN],data:{labels:["THINK","FIGHT","FINE","DO"],datasets:[{data:[0,0,0,0],backgroundColor:["#426cff","#ff455d","#ffc938","#37d889"],borderColor:"#0b182a",borderWidth:4,hoverOffset:12}]},options:{responsive:true,maintainAspectRatio:false,cutout:"68%",plugins:{legend:{position:"bottom",labels:{color:"#b7c5d7",usePointStyle:true,font:{family:"Prompt"}}},tooltip:doughnutTooltipOptions()},animation:{animateRotate:true,animateScale:true,duration:1700,easing:"easeOutExpo"}}});
  requestAnimationFrame(()=>requestAnimationFrame(()=>{charts.adminDoughnut.data.datasets[0].data=finalData;charts.adminDoughnut.update();}));
}
function drawDoughnutCanvas(id,rows,key){
  const canvas=document.getElementById(id); if(!canvas||!window.Chart)return;
  const finalData=COLORS.map(k=>rows.filter(r=>r.dominant===k).length);
  if(charts[key]&&charts[key].canvas===canvas){
    const current=(charts[key].data.datasets[0].data||[]).map(Number);
    if(JSON.stringify(current)!==JSON.stringify(finalData)){
      charts[key].data.datasets[0].data=[...finalData];
      charts[key].update("none");
    }
    return;
  }
  charts[key]?.destroy?.(); markChartLoading(canvas);
  charts[key]=new Chart(canvas,{type:"doughnut",plugins:[CONTINUOUS_CHART_PLUGIN,COLOR_MIX_PLUGIN],data:{labels:["THINK","FIGHT","FINE","DO"],datasets:[{data:[0,0,0,0],backgroundColor:["#426cff","#ff455d","#ffc938","#37d889"],borderColor:"#07111f",borderWidth:4,hoverOffset:14}]},options:{responsive:true,maintainAspectRatio:false,cutout:"66%",plugins:{legend:{display:false},tooltip:doughnutTooltipOptions()},animation:{animateRotate:true,animateScale:true,duration:1700,easing:"easeOutExpo"}}});
  requestAnimationFrame(()=>requestAnimationFrame(()=>{charts[key].data.datasets[0].data=finalData;charts[key].update();}));
}
function renderProjectorColorLegend(rows){const el=$("#projectorColorLegend");if(!el)return;const total=rows.length||0;el.innerHTML=COLORS.map(k=>{const count=rows.filter(r=>r.dominant===k).length;const pct=total?Math.round(count/total*100):0;return `<div class="projector-color-item"><b><i style="background:${META()[k].color}"></i>${META()[k].label}</b><strong style="color:${META()[k].color}">${pct}%</strong><span>${count} คน</span></div>`;}).join("");}
function renderRecentPeopleMarkup(rows,compact=false){
  const list=[...rows].sort((a,b)=>new Date(b.createdAt?.toDate?b.createdAt.toDate():b.createdAt)-new Date(a.createdAt?.toDate?a.createdAt.toDate():a.createdAt)).slice(0,compact?5:8);
  if(!list.length)return compact?'<div class="projector-participant-card"><b>ยังไม่มีผู้เข้าร่วม</b><p>เมื่อมีการส่งข้อมูล รายชื่อจะแสดงตรงนี้แบบสด</p></div>':'<div class="live-person-item"><div class="live-person-name">ยังไม่มีผู้เข้าร่วม</div><div class="live-person-meta">เมื่อมีการส่งข้อมูล รายชื่อจะขึ้นที่นี่</div></div>';
  return compact?list.map(r=>{
    const dom=META()[r.dominant]||META().think;
    return `<article class="projector-participant-card ${state.projectorNewIds.has(String(r.id))?"is-new":""}"><b>${escapeHtml(r.fullName||"—")}</b><p>${escapeHtml(r.organization||"ไม่ระบุสังกัด")} · ${escapeHtml(r.sessionName||"-")}</p><div class="mini-row"><span>${formatTimeOnly(r.createdAt?.toDate?r.createdAt.toDate():r.createdAt)}</span><span class="mini-badge" style="color:${dom.color}">${dom.label} ${r.scores?.[r.dominant]??0}%</span></div></article>`;
  }).join(''):list.map(r=>{
    const dom=META()[r.dominant]||META().think;
    const secondary=META()[r.secondary]||META().do;
    return `<article class="live-person-item"><div class="live-person-top"><div><div class="live-person-name">${escapeHtml(r.fullName||"—")}</div><div class="live-person-meta">${escapeHtml(r.organization||"ไม่ระบุสังกัด")} · ${escapeHtml(r.sessionName||"-")}</div></div><div class="live-person-time">${formatDate(r.createdAt)}</div></div><div class="live-person-badges"><span class="color-badge cb-${r.dominant}">${dom.label} ${r.scores?.[r.dominant]??0}%</span><span class="color-badge cb-${r.secondary}">รอง ${secondary.label}</span></div><div class="live-person-words">${(r.selectedWords||[]).slice(0,5).map(w=>`<span class="live-person-word">${escapeHtml(w)}</span>`).join('')}</div></article>`;
  }).join('');
}
function renderLivePeopleList(rows){const el=$("#adminLivePeople");if(!el)return;el.innerHTML=renderRecentPeopleMarkup(rows,false);}
function renderProjectorParticipants(rows){const el=$("#projectorParticipantList");if(!el)return;el.innerHTML=`<div><span class="eyebrow">LIVE PEOPLE</span><h4>ผู้เข้าร่วมล่าสุด</h4></div><div class="projector-participant-scroll">${renderRecentPeopleMarkup(rows,true)}</div>`;}
function renderTable(){
  const rows=participantFilteredRows();
  $("#adminTableBody").innerHTML=rows.length?rows.map(r=>`<tr class="${isResponseSelected(r.id)?"participant-row-selected":""}"><td class="col-check"><input class="response-check" data-response-check="${r.id}" type="checkbox" ${isResponseSelected(r.id)?"checked":""} /></td><td><div class="person-name">${escapeHtml(r.fullName||"—")}</div></td><td>${escapeHtml(r.sessionName||"—")}</td><td>${escapeHtml(r.organization||"—")}</td><td>${(r.selectedWords||[]).map(escapeHtml).join(" · ")}</td><td><span class="color-badge cb-${r.dominant}">${META()[r.dominant]?.label||"—"}</span></td><td><div class="score-mini">${COLORS.map(k=>`<i>${META()[k].label[0]} ${r.scores?.[k]??0}%</i>`).join("")}</div></td><td>${formatDate(r.createdAt)}</td><td><div class="row-actions"><button class="btn btn-ghost btn-sm" data-detail="${r.id}">ดูกราฟ</button><button class="btn btn-soft-danger btn-sm" data-delete-response="${r.id}">ลบ</button></div></td></tr>`).join(""):`<tr><td colspan="9" style="text-align:center;color:#7d8da2;padding:36px">ไม่พบข้อมูล</td></tr>`;
  $$('[data-detail]').forEach(b=>b.addEventListener('click',()=>showDetail(b.dataset.detail)));
  $$('[data-delete-response]').forEach(b=>b.addEventListener('click',()=>deleteResponse(b.dataset.deleteResponse)));
  $$('[data-response-check]').forEach(ch=>ch.addEventListener('change',()=>{setResponseSelected(ch.dataset.responseCheck,ch.checked);syncParticipantSelectionUI();renderTable();}));
  syncParticipantSelectionUI();
}
function showDetail(id){const r=state.responses.find(x=>String(x.id)===String(id));if(!r)return;$("#detailContent").innerHTML=`<span class="eyebrow">INDIVIDUAL RESULT</span><h3 class="detail-title">${escapeHtml(r.fullName||"—")}</h3><div class="detail-meta">${escapeHtml(r.sessionName||"")} · ${escapeHtml(r.organization||"")} · ${formatDate(r.createdAt)}</div><div class="detail-words">${(r.selectedWords||[]).map(w=>`<span class="result-word">${escapeHtml(w)}</span>`).join("")}</div>`;openModal("#modalDetail");setTimeout(()=>drawRadar("detailRadar",r.scores||averageScores([]),"detail"),50);}

function fillSessionSelectors(){
  const opts=['<option value="">ทุก Session</option>',...state.sessions.map(s=>`<option value="${s.id}">${escapeHtml(s.name)}</option>`)].join("");
  const old=$("#adminSessionFilter").value;$("#adminSessionFilter").innerHTML=opts;$("#adminSessionFilter").value=state.sessions.some(s=>s.id===old)?old:"";
  const pair=['<option value="">เลือก Session</option>',...state.sessions.map(s=>`<option value="${s.id}">${escapeHtml(s.name)}</option>`)].join("");
  const a=$("#dnaSessionA").value,b=$("#dnaSessionB").value;$("#dnaSessionA").innerHTML=pair;$("#dnaSessionB").innerHTML=pair;
  if(state.sessions[0])$("#dnaSessionA").value=a||state.sessions[0].id;if(state.sessions[1])$("#dnaSessionB").value=b||state.sessions[1].id;
}
function renderSessions(){
  const wrap=$("#sessionCards");if(!wrap)return;
  wrap.innerHTML=state.sessions.length?state.sessions.map(s=>`<article class="session-card"><h4>${escapeHtml(s.name)}</h4><p>${escapeHtml(s.description||"ไม่มีคำอธิบาย")}</p><div class="session-meta"><span class="session-code">${escapeHtml(s.code||s.id)}</span><span class="session-state ${s.isOpen===false?"closed":"open"}">${s.isOpen===false?"ปิดรับ":"เปิดรับ"}</span></div><div class="session-card-actions"><button class="btn btn-ghost btn-sm" data-session-qr="${s.id}">QR</button><button class="btn btn-ghost btn-sm" data-session-toggle="${s.id}">${s.isOpen===false?"เปิดรับ":"ปิดรับ"}</button><button class="btn btn-ghost btn-sm" data-session-edit="${s.id}">แก้ไข</button><button class="btn btn-soft-danger btn-sm" data-session-clear="${s.id}">ลบผลลัพธ์</button><button class="btn btn-soft-danger btn-sm" data-session-delete="${s.id}">ลบทั้ง Session</button></div></article>`).join(""):`<div style="color:#7d8da2">ยังไม่มี Session</div>`;
  $$("[data-session-qr]").forEach(b=>b.addEventListener("click",()=>showQr(b.dataset.sessionQr)));
  $$("[data-session-toggle]").forEach(b=>b.addEventListener("click",()=>toggleSession(b.dataset.sessionToggle)));
  $$("[data-session-edit]").forEach(b=>b.addEventListener("click",()=>openSessionModal(b.dataset.sessionEdit)));
  $$("[data-session-clear]").forEach(b=>b.addEventListener("click",()=>deleteSessionResponses(b.dataset.sessionClear)));
  $$("[data-session-delete]").forEach(b=>b.addEventListener("click",()=>deleteSessionAndData(b.dataset.sessionDelete)));
}
function openSessionModal(id=""){const s=state.sessions.find(x=>x.id===id);$("#sessionEditId").value=s?.id||"";$("#sessionName").value=s?.name||"";$("#sessionCode").value=s?.code||"";$("#sessionDescription").value=s?.description||"";$("#sessionOpen").value=String(s?.isOpen!==false);$("#sessionModalTitle").textContent=s?"แก้ไข Session":"สร้าง Session";openModal("#modalSession");}
async function saveSession(){
  const id=$("#sessionEditId").value||crypto.randomUUID(),obj={name:$("#sessionName").value.trim(),code:slug($("#sessionCode").value),description:$("#sessionDescription").value.trim(),isOpen:$("#sessionOpen").value==="true"};
  if(state.firebaseReady){const {doc,setDoc,serverTimestamp}=fb.fsFns;await setDoc(doc(fb.db,"sessions",id),{...obj,createdAt:serverTimestamp()},{merge:true});}
  else{let arr=JSON.parse(localStorage.getItem("talentColorSessions")||"[]");const i=arr.findIndex(x=>x.id===id);if(i>=0)arr[i]={...arr[i],...obj};else arr.push({id,...obj,createdAt:new Date().toISOString()});localStorage.setItem("talentColorSessions",JSON.stringify(arr));state.sessions=arr;renderSessions();fillSessionSelectors();}
}
async function toggleSession(id){const s=state.sessions.find(x=>x.id===id);if(!s)return;const next=!s.isOpen;if(state.firebaseReady){await fb.fsFns.updateDoc(fb.fsFns.doc(fb.db,"sessions",id),{isOpen:next});}else{s.isOpen=next;localStorage.setItem("talentColorSessions",JSON.stringify(state.sessions));renderSessions();}}

function sessionRows(id){return state.responses.filter(r=>r.sessionId===id);}
function colorCounts(rows){return Object.fromEntries(COLORS.map(k=>[k,rows.filter(r=>r.dominant===k).length]));}
function colorCountPercents(rows){const counts=colorCounts(rows),total=rows.length||1;return Object.fromEntries(COLORS.map(k=>[k,Math.round((counts[k]/total)*100)]));}
function buildTeamLineChart(canvas,datasets,key,{showLegend=true}={}){
  if(!canvas||!window.Chart)return null;
  const existing=charts[key];
  const normalized=datasets.map(ds=>({...ds,data:[...ds.data],tension:.36,fill:false,borderWidth:4,pointRadius:7,pointHoverRadius:9,pointBorderWidth:2,pointBorderColor:'#07111f'}));
  if(existing&&existing.canvas===canvas&&existing.config.type==='line'){
    existing.data.labels=['THINK','FIGHT','FINE','DO'];
    existing.data.datasets=normalized;
    existing.update();
    return existing;
  }
  existing?.destroy?.();
  markChartLoading(canvas);
  charts[key]=new Chart(canvas,{type:'line',plugins:[CONTINUOUS_CHART_PLUGIN],data:{labels:['THINK','FIGHT','FINE','DO'],datasets:normalized.map(ds=>({...ds,data:ds.data.map(()=>0)}))},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'nearest',intersect:false},plugins:{legend:{display:showLegend,labels:{color:'#c3cfdf',usePointStyle:true,font:{family:'Prompt'}}},tooltip:{backgroundColor:'rgba(7,17,31,.97)',borderColor:'rgba(132,170,220,.35)',borderWidth:1,titleColor:'#fff',bodyColor:'#dce8f5',padding:11,callbacks:{label:(ctx)=>`${ctx.dataset.label}: ${ctx.parsed.y} คน`}}},scales:{x:{grid:{color:'rgba(255,255,255,.07)'},ticks:{color:'#d7e5f4',font:{family:'Prompt',weight:'600'}}},y:{beginAtZero:true,suggestedMax:5,grid:{color:'rgba(255,255,255,.08)'},ticks:{precision:0,color:'#9fb2c7',font:{family:'Prompt'}}}},animation:{duration:1200,easing:'easeOutQuart'}}});
  requestAnimationFrame(()=>requestAnimationFrame(()=>{charts[key].data.datasets=normalized;charts[key].update();}));
  return charts[key];
}
function renderTeamDNA(){
  const a=$("#dnaSessionA").value,b=$("#dnaSessionB").value;if(!a&&!b)return;
  const sa=state.sessions.find(s=>s.id===a),sb=state.sessions.find(s=>s.id===b),rowsA=sessionRows(a),rowsB=sessionRows(b),cntA=colorCounts(rowsA),cntB=colorCounts(rowsB);
  const datasets=[];
  if(a)datasets.push({label:sa?.name||"A",data:COLORS.map(k=>cntA[k]),borderColor:'#75a0ff',backgroundColor:'#75a0ff',pointBackgroundColor:['#426cff','#ff455d','#ffc938','#37d889']});
  if(b)datasets.push({label:sb?.name||"B",data:COLORS.map(k=>cntB[k]),borderColor:'#ff8e9b',backgroundColor:'#ff8e9b',pointBackgroundColor:['#426cff','#ff455d','#ffc938','#37d889']});
  buildTeamLineChart($("#teamRadar"),datasets,"team",{showLegend:true});
  const targetRows=a?rowsA:rowsB,target=colorCounts(targetRows),pct=colorCountPercents(targetRows),sorted=COLORS.slice().sort((x,y)=>target[y]-target[x]),high=sorted[0],low=sorted.at(-1);
  $("#dnaInsight").innerHTML=`<div class="dna-note"><b>สีที่ผู้ใช้ได้มากที่สุด</b><p><span style="color:${META()[high].color}">${META()[high].label}</span> ${target[high]} คน (${pct[high]}%)</p></div><div class="dna-note"><b>สีที่มีน้อยที่สุด</b><p><span style="color:${META()[low].color}">${META()[low].label}</span> ${target[low]} คน (${pct[low]}%)</p></div><div class="dna-note"><b>ข้อเสนอแนะ</b><p>${teamAdvice(colorCountPercents(targetRows))}</p></div>`;
}
function teamAdvice(avg){const sorted=COLORS.slice().sort((a,b)=>avg[b]-avg[a]);const hi=sorted[0],lo=sorted.at(-1);if(avg[hi]-avg[lo]>=20)return `ทีมเอนเอียงไปทาง ${META()[hi].label} ชัดเจน ควรสร้างพื้นที่ให้ ${META()[lo].label} มีบทบาทมากขึ้น เพื่อสมดุลการคิด การตัดสินใจ คน และการลงมือทำ`;return"ทีมมีองค์ประกอบ 4 สีค่อนข้างสมดุล เหมาะกับการแบ่งบทบาทตามจุดแข็งและจับคู่คนต่างสีให้ทำงานร่วมกัน";}

function showQr(sessionId){
  const s=state.sessions.find(x=>x.id===sessionId)||state.sessions.find(x=>x.id===selectedSessionId())||state.activeSession;
  if(!s){toast("กรุณาเลือก Session ก่อน");return;}
  const u=new URL(location.href);u.searchParams.set("session",s.id);u.hash="";
  $("#qrBox").innerHTML="";new QRCode($("#qrBox"),{text:u.toString(),width:220,height:220,colorDark:"#07111f",colorLight:"#fff",correctLevel:QRCode.CorrectLevel.H});$("#qrUrl").textContent=u.toString();$("#qrSessionTitle").textContent=s.name;openModal("#modalQr");
}

function csvData(rows){return [["ชื่อ-นามสกุล","Session","หน่วยงาน/สังกัด","คำที่เลือก","สีเด่น","สีรอง","THINK","FIGHT","FINE","DO","เวลา"],...rows.map(r=>[r.fullName||"",r.sessionName||"",r.organization||"",(r.selectedWords||[]).join("|"),r.dominant||"",r.secondary||"",r.scores?.think??0,r.scores?.fight??0,r.scores?.fine??0,r.scores?.do??0,formatDate(r.createdAt)])];}
function exportCsv(){const lines=csvData(filteredResponses()).map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");const blob=new Blob(["\ufeff"+lines],{type:"text/csv;charset=utf-8"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`talent-color-${Date.now()}.csv`;a.click();URL.revokeObjectURL(a.href);}
function exportXlsx(){const ws=XLSX.utils.aoa_to_sheet(csvData(filteredResponses())),wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,"Results");XLSX.writeFile(wb,`talent-color-${Date.now()}.xlsx`);}
async function exportPdf(){ await exportDashboardPdf(); }

async function removeResponsesByIds(ids){
  const unique=[...new Set((ids||[]).map(String))];
  if(!unique.length)return 0;
  if(state.demoMode){
    let arr=JSON.parse(localStorage.getItem("talentColorDemoResponses")||"[]");
    arr=arr.filter(r=>!unique.includes(String(r.id)));
    localStorage.setItem("talentColorDemoResponses",JSON.stringify(arr));
  }else{
    for(const id of unique) await fb.fsFns.deleteDoc(fb.fsFns.doc(fb.db,"responses",id));
  }
  state.responses=state.responses.filter(r=>!unique.includes(String(r.id)));
  state.selectedResponseIds=state.selectedResponseIds.filter(id=>!unique.includes(String(id)));
  return unique.length;
}
async function deleteResponse(id){
  const row=state.responses.find(r=>String(r.id)===String(id));
  if(!row)return;
  if(!await openConfirmModal({title:"ลบข้อมูลผู้ใช้",message:`ต้องการลบข้อมูลของ ${row.fullName||"ผู้ใช้งาน"} ใช่หรือไม่?`,confirmText:"ลบข้อมูล",danger:true}))return;
  const removed=await removeResponsesByIds([id]);
  renderAdmin();
  toast(`ลบข้อมูลผู้ใช้แล้ว ${removed} รายการ`);openNoticeModal({title:'ลบข้อมูลสำเร็จ',message:`ลบข้อมูลผู้ใช้แล้ว ${removed} รายการ`,tone:'danger',eyebrow:'DELETE COMPLETED'});
}
async function deleteSelectedResponses(){
  const ids=[...state.selectedResponseIds];
  if(!ids.length)return toast("กรุณาเลือกข้อมูลก่อน");
  if(!await openConfirmModal({title:"ลบหลายรายการ",message:`ต้องการลบข้อมูลผู้เข้าร่วมที่เลือก ${ids.length} รายการ ใช่หรือไม่?`,confirmText:"ลบที่เลือก",danger:true}))return;
  const removed=await removeResponsesByIds(ids);
  renderAdmin();
  toast(`ลบข้อมูลที่เลือกแล้ว ${removed} รายการ`);openNoticeModal({title:'ลบหลายรายการสำเร็จ',message:`ลบข้อมูลที่เลือกแล้ว ${removed} รายการ`,tone:'danger',eyebrow:'DELETE COMPLETED'});
}
async function deleteSessionResponses(sessionId){
  if(!sessionId){toast("กรุณาเลือก Session ก่อน");return;}
  const session=state.sessions.find(s=>s.id===sessionId);
  const rows=state.responses.filter(r=>r.sessionId===sessionId);
  if(!rows.length){toast("Session นี้ยังไม่มีข้อมูลให้ลบ");return;}
  if(!await openConfirmModal({title:"ลบผลลัพธ์ทั้ง Session",message:`ต้องการลบข้อมูลผู้เข้าร่วมทั้งหมด ${rows.length} รายการ ของ ${session?.name||'Session นี้'} ใช่หรือไม่?`,confirmText:"ลบผลลัพธ์",danger:true}))return;
  const removed=await removeResponsesByIds(rows.map(r=>r.id));
  renderAdmin();
  toast(`ลบข้อมูล ${removed} รายการแล้ว`);openNoticeModal({title:'ลบข้อมูล Session สำเร็จ',message:`ลบข้อมูล ${removed} รายการแล้ว`,tone:'danger',eyebrow:'SESSION CLEANED'});
}
async function deleteSessionAndData(sessionId){
  if(!sessionId){toast("กรุณาเลือก Session ก่อน");return;}
  const session=state.sessions.find(s=>s.id===sessionId);
  if(!session)return toast("ไม่พบ Session นี้");
  const rows=state.responses.filter(r=>r.sessionId===sessionId);
  if(!await openConfirmModal({title:"ลบ Session",message:`ต้องการลบทั้ง Session "${session.name}" และข้อมูลผู้เข้าร่วม ${rows.length} รายการ ใช่หรือไม่?`,confirmText:"ลบทั้ง Session",danger:true}))return;
  await removeResponsesByIds(rows.map(r=>r.id));
  if(state.demoMode){
    const sessions=JSON.parse(localStorage.getItem("talentColorSessions")||"[]").filter(s=>s.id!==sessionId);
    localStorage.setItem("talentColorSessions",JSON.stringify(sessions));
  }else{
    await fb.fsFns.deleteDoc(fb.fsFns.doc(fb.db,"sessions",sessionId));
  }
  state.sessions=state.sessions.filter(s=>s.id!==sessionId);
  if($("#adminSessionFilter")?.value===sessionId) $("#adminSessionFilter").value="";
  if($("#dnaSessionA")?.value===sessionId) $("#dnaSessionA").value="";
  if($("#dnaSessionB")?.value===sessionId) $("#dnaSessionB").value="";
  fillSessionSelectors();
  renderSessions();
  renderAdmin();
  toast(`ลบ Session ${session.name} เรียบร้อยแล้ว`);openNoticeModal({title:'ลบ Session สำเร็จ',message:`ลบ Session ${session.name} และข้อมูลที่เกี่ยวข้องเรียบร้อยแล้ว`,tone:'danger',eyebrow:'SESSION DELETED'});
}

async function loadAdminConfig(){
  const gameTitle=$("#setGameTitle"),gameTagline=$("#setGameTagline"),heroSubtitle=$("#setHeroSubtitle"),logoUrl=$("#setLogoUrl");
  if(gameTitle)gameTitle.value=state.config.gameTitle||"";
  if(gameTagline)gameTagline.value=state.config.gameTagline||"";
  if(heroSubtitle)heroSubtitle.value=state.config.heroSubtitle||"";
  if(logoUrl)logoUrl.value=state.config.logoUrl||"";
  const privacyNotice=$("#setPrivacyNotice"),retentionDays=$("#setRetentionDays"),privacyEmail=$("#setPrivacyEmail");
  if(privacyNotice)privacyNotice.value=state.config.privacyNotice||"";
  if(retentionDays)retentionDays.value=state.config.retentionDays||365;
  if(privacyEmail)privacyEmail.value=state.config.privacyEmail||"";
  renderMappingEditor();
}
function renderMappingEditor(){
  const el=$("#mappingEditor");if(!el)return;
  const options=COLORS.map(k=>`<option value="${k}">${META()[k].label}</option>`).join("");
  el.innerHTML=WORDS().map(w=>`<div class="mapping-row"><b>${escapeHtml(w.text)}</b><select data-map-primary="${w.id}">${options}</select><select data-map-secondary="${w.id}">${options}</select></div>`).join("");
  WORDS().forEach(w=>{const p=$(`[data-map-primary="${w.id}"]`),s=$(`[data-map-secondary="${w.id}"]`);if(p)p.value=w.primary;if(s)s.value=w.secondary;});
}
async function saveConfig(partial){
  state.config={...state.config,...partial};
  if(state.firebaseReady){await fb.fsFns.setDoc(fb.fsFns.doc(fb.db,"publicConfig","main"),state.config,{merge:true});}
  else localStorage.setItem("talentColorConfig",JSON.stringify(state.config));
  applyBranding();toast("บันทึกการตั้งค่าแล้ว");openNoticeModal({title:'บันทึกการตั้งค่าแล้ว',message:'อัปเดตหน้าจอเกมเรียบร้อยแล้ว',tone:'success',eyebrow:'SETTINGS UPDATED'});
}
async function deleteExpired(){
  const days=Number(state.config.retentionDays||365),cutoff=Date.now()-days*86400000;
  if(!await openConfirmModal({title:"ลบข้อมูลเกินกำหนด",message:`ต้องการลบข้อมูลที่เก่ากว่า ${days} วัน ใช่หรือไม่?`,confirmText:"ลบข้อมูลเก่า",danger:true}))return;
  if(state.demoMode){let arr=JSON.parse(localStorage.getItem("talentColorDemoResponses")||"[]");arr=arr.filter(r=>new Date(r.createdAt).getTime()>=cutoff);localStorage.setItem("talentColorDemoResponses",JSON.stringify(arr));state.responses=arr;setLiveUpdatedNow();renderAdmin();toast("ลบข้อมูล Demo ที่เกินกำหนดแล้ว");openNoticeModal({title:'ลบข้อมูลเก่าพ้นกำหนดแล้ว',message:'จัดการข้อมูลในโหมด Demo เรียบร้อยแล้ว',tone:'danger',eyebrow:'RETENTION APPLIED'});return;}
  const old=state.responses.filter(r=>{const d=r.createdAt?.toDate?r.createdAt.toDate():new Date(r.createdAt);return d.getTime()<cutoff;});
  for(const r of old)await fb.fsFns.deleteDoc(fb.fsFns.doc(fb.db,"responses",r.id));toast(`ลบ ${old.length} รายการแล้ว`);openNoticeModal({title:'ลบข้อมูลเก่าพ้นกำหนดแล้ว',message:`ลบ ${old.length} รายการแล้ว`,tone:'danger',eyebrow:'RETENTION APPLIED'});
}

function showProjectorSlide(index,animate=true){
  const slides=$$("[data-projector-slide]");if(!slides.length)return;state.projectorSlide=((index%slides.length)+slides.length)%slides.length;
  slides.forEach((slide,i)=>{slide.classList.toggle("active",i===state.projectorSlide);slide.classList.toggle("exit-left",animate&&i<state.projectorSlide);});
  $$('[data-projector-dot]').forEach((dot,i)=>dot.classList.toggle('active',i===state.projectorSlide));
}
function startProjectorSlideshow(){clearInterval(state.projectorSlideTimer);state.projectorSlideTimer=null;}
async function openProjector(mode="tv"){
  state.projectorMode="tv";state.projectorSlide=0;const p=$("#projector");p.classList.remove("hidden");p.classList.add("tv-mode");document.body.style.overflow="hidden";$("#projectorModeLabel").innerHTML='<i></i> PROJEC DISPLAY · REALTIME';showProjectorSlide(0,false);renderProjector();clearInterval(state.projectorTimer);state.projectorTimer=setInterval(()=>{if(isProjectorOpen())$("#projectorUpdatedAt").textContent=`Projec Display แบบเรียลไทม์ · ข้อมูลล่าสุด ${formatTimeOnly(state.liveUpdatedAt||new Date())}`;},1000);clearInterval(state.projectorSlideTimer);state.projectorSlideTimer=null;
  if(document.documentElement.requestFullscreen){try{await document.documentElement.requestFullscreen();}catch(e){}}
}
async function closeProjector(){const p=$("#projector");p.classList.add("hidden");p.classList.remove("tv-mode");document.body.style.overflow="";clearInterval(state.projectorTimer);clearInterval(state.projectorSlideTimer);state.projectorTimer=null;state.projectorSlideTimer=null;if(document.fullscreenElement){try{await document.exitFullscreen();}catch(e){}}}
function renderProjector(){
  if($("#projector").classList.contains("hidden"))return;
  const rows=filteredResponses(),avg=averageScores(rows),sid=selectedSessionId(),s=state.sessions.find(x=>x.id===sid);
  $("#projectorSessionName").textContent=s?.name||"ผลรวมทุก Session";
  $("#projectorUpdatedAt").textContent=`Projec Display แบบเรียลไทม์ · ข้อมูลล่าสุด ${formatTimeOnly(state.liveUpdatedAt||new Date())}`;
  $("#projTotal").textContent=rows.length;
  COLORS.forEach(k=>$("#proj"+k[0].toUpperCase()+k.slice(1)).textContent=rows.filter(r=>r.dominant===k).length);
  drawGroupRadar("projectorRadar",avg,"projector");
  drawDoughnutCanvas("projectorDoughnut",rows,"projectorDoughnut");
  const teamCounts=colorCounts(rows),teamPct=colorCountPercents(rows);
  buildTeamLineChart($("#projectorTeamRadar"),[{label:'จำนวนผู้ใช้',data:COLORS.map(k=>teamCounts[k]),borderColor:'#8fb5ff',backgroundColor:'#8fb5ff',pointBackgroundColor:['#426cff','#ff455d','#ffc938','#37d889']}],"projectorTeam",{showLegend:false});
  renderProjectorColorLegend(rows);
  renderProjectorParticipants(rows);
  const sorted=COLORS.slice().sort((a,b)=>avg[b]-avg[a]),hi=sorted[0],lo=sorted.at(-1);
  const teamSorted=COLORS.slice().sort((a,b)=>teamCounts[b]-teamCounts[a]),teamHi=teamSorted[0],teamLo=teamSorted.at(-1);
  $("#projectorInsight").innerHTML=`<div class="dna-note"><b>พลังเด่นของกลุ่ม</b><p><span style="color:${META()[hi].color}">${META()[hi].label}</span> เฉลี่ย ${avg[hi]}%</p></div><div class="dna-note"><b>พลังที่น้อยที่สุด</b><p><span style="color:${META()[lo].color}">${META()[lo].label}</span> เฉลี่ย ${avg[lo]}%</p></div><div class="dna-note"><b>Team insight</b><p>${teamAdvice(avg)}</p></div>`;
  $("#projectorTeamInsight").innerHTML=`<div class="dna-note"><b>สีที่ผู้ใช้ได้มากที่สุด</b><p><span style="color:${META()[teamHi].color}">${META()[teamHi].label}</span> ${teamCounts[teamHi]} คน (${teamPct[teamHi]}%)</p></div><div class="dna-note"><b>สีที่ควรเติมในทีม</b><p><span style="color:${META()[teamLo].color}">${META()[teamLo].label}</span> ${teamCounts[teamLo]} คน (${teamPct[teamLo]}%)</p></div><div class="dna-note"><b>Team insight</b><p>${teamAdvice(teamPct)}</p></div>`;
}


function landscapeExportMarkup(){
  const data=resultDataForExport();if(!data)return"";const primary=data.primary,secondary=data.secondary,r=data.result;
  return `<div class="landscape-export-card"><div class="result-card-header"><div class="result-person-block"><span class="eyebrow">COLOR SIGNATURE RESULT</span><h2>${escapeHtml(data.fullName)}</h2><p>${escapeHtml(data.meta)}</p></div><div class="result-main-block"><span class="result-kicker">พลังหลักของคุณคือ</span><h1 style="color:${primary.color}">${primary.title}</h1><p class="result-subtitle">พลังรอง ${secondary.label} · ${secondary.thai} ช่วยเสริมให้สไตล์ของคุณมีทั้ง ${primary.thai} และ ${secondary.thai} ในแบบเฉพาะตัว</p></div><div class="score-pills result-score-pills">${exportScorePills(r.scores,'score-pill')}</div></div><div class="result-dashboard-grid"><article class="result-panel result-radar-panel"><div class="card-head compact-head"><div><span class="eyebrow">YOUR RADAR</span><h3>กราฟพลัง 4 สี</h3></div><span class="mini-tag">0–100%</span></div><div class="chart-wrap result-chart-wrap"><canvas id="landscapeExportRadar"></canvas></div></article><article class="result-panel result-insight-panel"><div class="card-head compact-head"><div><span class="eyebrow">PERSONAL INSIGHT</span><h3>ลายเซ็นความเป็นคุณ</h3></div></div><div class="compact-insights"><div class="insight-block"><h4>✦ จุดแข็งที่เด่น</h4><p>${escapeHtml(primary.strength)}</p></div><div class="insight-block"><h4>✦ เวลาทำงานกับทีม</h4><p>${escapeHtml(primary.teamwork)}</p></div><div class="insight-block"><h4>✦ พลังเสริมจาก ${secondary.label}</h4><p>${escapeHtml(secondary.strength)}</p></div><div class="insight-block"><h4>✦ จุดที่ควรระวัง</h4><p>${escapeHtml(primary.watch)}</p></div></div></article><article class="result-panel result-comm-panel"><div class="card-head compact-head"><div><span class="eyebrow">COMMUNICATION GUIDE</span><h3>ควรสื่อสารอย่างไร</h3></div></div><div class="communication-grid compact-communication">${communicationCards(r.dominant)}</div></article></div><div class="result-card-footer"><div class="result-word-area"><span class="eyebrow">YOUR 5 WORDS</span><div class="result-words">${exportWordPills(r.selectedWords,'result-word')}</div></div><div class="result-brand-signature"><b>COLOR ME</b><span>5 WORDS · 4 COLORS</span></div></div></div>`;
}
function canvasRoundRect(ctx,x,y,w,h,r,fill,stroke){
  ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke();}
}
function canvasWrapLines(ctx,text,maxWidth,maxLines=99){
  const raw=String(text||'');const tokens=raw.split(/\s+/).filter(Boolean);const lines=[];let line='';
  const pushLine=()=>{if(line&&lines.length<maxLines){lines.push(line);line='';}};
  for(const token of tokens){
    const candidate=line?`${line} ${token}`:token;
    if(ctx.measureText(candidate).width<=maxWidth){line=candidate;continue;}
    if(line)pushLine();if(lines.length>=maxLines)break;
    if(ctx.measureText(token).width<=maxWidth){line=token;continue;}
    let chunk='';for(const ch of [...token]){const next=chunk+ch;if(ctx.measureText(next).width<=maxWidth){chunk=next;}else{line=chunk;pushLine();if(lines.length>=maxLines)break;chunk=ch;}}if(lines.length>=maxLines)break;line=chunk;
  }
  pushLine();if(lines.length===maxLines){let last=lines[maxLines-1];while(ctx.measureText(last+'…').width>maxWidth&&last.length>1)last=last.slice(0,-1);lines[maxLines-1]=last+'…';}return lines;
}
function canvasText(ctx,text,x,y,maxWidth,lineHeight,maxLines=99){const lines=canvasWrapLines(ctx,text,maxWidth,maxLines);lines.forEach((ln,i)=>ctx.fillText(ln,x,y+i*lineHeight));return y+lines.length*lineHeight;}
function drawStaticRadarCanvas(ctx,cx,cy,radius,scores){
  const vals=[scores.think,scores.fight,scores.fine,scores.do];const cols=['#426cff','#ff455d','#ffc938','#37d889'];
  ctx.save();
  for(let ring=1;ring<=5;ring++){const rr=radius*ring/5;ctx.beginPath();ctx.moveTo(cx,cy-rr);ctx.lineTo(cx+rr,cy);ctx.lineTo(cx,cy+rr);ctx.lineTo(cx-rr,cy);ctx.closePath();ctx.strokeStyle='rgba(215,232,255,.13)';ctx.lineWidth=1.4;ctx.stroke();}
  ctx.strokeStyle='rgba(215,232,255,.12)';ctx.beginPath();ctx.moveTo(cx,cy-radius);ctx.lineTo(cx,cy+radius);ctx.moveTo(cx-radius,cy);ctx.lineTo(cx+radius,cy);ctx.stroke();
  const pts=[[cx,cy-radius*vals[0]/100],[cx+radius*vals[1]/100,cy],[cx,cy+radius*vals[2]/100],[cx-radius*vals[3]/100,cy]];
  const fill=ctx.createLinearGradient(cx-radius,cy-radius,cx+radius,cy+radius);fill.addColorStop(0,'rgba(66,108,255,.58)');fill.addColorStop(.34,'rgba(255,69,93,.42)');fill.addColorStop(.68,'rgba(255,201,56,.34)');fill.addColorStop(1,'rgba(55,216,137,.48)');
  ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);ctx.closePath();ctx.fillStyle=fill;ctx.fill();ctx.strokeStyle='rgba(222,236,255,.95)';ctx.lineWidth=4;ctx.shadowColor='rgba(92,171,255,.65)';ctx.shadowBlur=16;ctx.stroke();ctx.shadowBlur=0;
  pts.forEach((pt,i)=>{ctx.fillStyle=cols[i];ctx.beginPath();ctx.arc(pt[0],pt[1],7,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#07111f';ctx.lineWidth=3;ctx.stroke();});
  ctx.textAlign='center';ctx.fillStyle='#dce8f5';ctx.font='600 16px Prompt';ctx.fillText('THINK · คิด',cx,cy-radius-26);ctx.fillText('FINE · ละเอียด',cx,cy+radius+40);ctx.textAlign='left';ctx.fillText('FIGHT · ลุย',cx+radius+20,cy+6);ctx.textAlign='right';ctx.fillText('DO · ทำ',cx-radius-20,cy+6);ctx.restore();
}
async function generateLandscapeCardCanvas(){
  const data=resultDataForExport();if(!data)throw new Error('ยังไม่มีผลลัพธ์ให้สร้างการ์ด');await document.fonts.ready;
  const W=1920,H=1080,S=2,canvas=document.createElement('canvas');canvas.width=W*S;canvas.height=H*S;const ctx=canvas.getContext('2d');ctx.scale(S,S);
  const primary=data.primary,secondary=data.secondary,r=data.result;
  const bg=ctx.createLinearGradient(0,0,W,H);bg.addColorStop(0,'#091a2e');bg.addColorStop(.58,'#071525');bg.addColorStop(1,'#06111e');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);
  const glow1=ctx.createRadialGradient(250,90,0,250,90,420);glow1.addColorStop(0,'rgba(76,119,255,.16)');glow1.addColorStop(1,'rgba(76,119,255,0)');ctx.fillStyle=glow1;ctx.fillRect(0,0,W,H);const glow2=ctx.createRadialGradient(1700,930,0,1700,930,520);glow2.addColorStop(0,'rgba(55,216,137,.10)');glow2.addColorStop(1,'rgba(55,216,137,0)');ctx.fillStyle=glow2;ctx.fillRect(0,0,W,H);
  ctx.fillStyle='#65d8ff';ctx.font='700 12px Prompt';ctx.fillText('COLOR SIGNATURE RESULT',60,72);ctx.fillStyle='#ffffff';ctx.font='700 42px Kanit';ctx.fillText(data.fullName,60,118);ctx.fillStyle='#9fb4c9';ctx.font='500 14px Prompt';ctx.fillText(data.meta,60,148);
  ctx.fillStyle='#8fa6bc';ctx.font='500 13px Prompt';ctx.fillText('พลังหลักของคุณคือ',520,65);ctx.fillStyle=primary.color;ctx.font='700 64px Kanit';ctx.fillText(primary.title,520,125);ctx.fillStyle='#b8c8d9';ctx.font='500 14px Prompt';canvasText(ctx,`พลังรอง ${secondary.label} · ${secondary.thai} ช่วยเสริมให้สไตล์ของคุณมีทั้ง ${primary.thai} และ ${secondary.thai} ในแบบเฉพาะตัว`,520,154,720,22,2);
  let px=1500,py=54;COLORS.forEach(k=>{const txt=`${META()[k].label} ${r.scores[k]}%`;ctx.font='700 13px Prompt';const w=ctx.measureText(txt).width+24;if(px+w>1870){px=1500;py+=44;}canvasRoundRect(ctx,px,py,w,34,17,'rgba(255,255,255,.045)','rgba(255,255,255,.08)');ctx.fillStyle=META()[k].color;ctx.fillText(txt,px+12,py+22);px+=w+9;});
  ctx.strokeStyle='rgba(255,255,255,.08)';ctx.beginPath();ctx.moveTo(60,190);ctx.lineTo(1860,190);ctx.stroke();
  const y=220,h=720,gap=20,x1=50,w1=530,x2=x1+w1+gap,w2=590,x3=x2+w2+gap,w3=660;
  [[x1,w1],[x2,w2],[x3,w3]].forEach(([x,w])=>canvasRoundRect(ctx,x,y,w,h,28,'rgba(255,255,255,.026)','rgba(255,255,255,.08)'));
  ctx.fillStyle='#65d8ff';ctx.font='700 11px Prompt';ctx.fillText('YOUR RADAR',x1+28,y+38);ctx.fillStyle='#fff';ctx.font='700 26px Kanit';ctx.fillText('กราฟพลัง 4 สี',x1+28,y+72);canvasRoundRect(ctx,x1+w1-96,y+25,68,28,14,'rgba(255,255,255,.035)','rgba(255,255,255,.07)');ctx.fillStyle='#a8bad0';ctx.font='600 10px Prompt';ctx.fillText('0–100%',x1+w1-80,y+43);drawStaticRadarCanvas(ctx,x1+w1/2,y+400,190,r.scores);
  ctx.fillStyle='#65d8ff';ctx.font='700 11px Prompt';ctx.fillText('PERSONAL INSIGHT',x2+28,y+38);ctx.fillStyle='#fff';ctx.font='700 26px Kanit';ctx.fillText('ลายเซ็นความเป็นคุณ',x2+28,y+72);
  const insights=[['✦ จุดแข็งที่เด่น',primary.strength],['✦ เวลาทำงานกับทีม',primary.teamwork],[`✦ พลังเสริมจาก ${secondary.label}`,secondary.strength],['✦ จุดที่ควรระวัง',primary.watch]];let iy=y+100;insights.forEach(([title,body])=>{canvasRoundRect(ctx,x2+24,iy,w2-48,132,18,'rgba(255,255,255,.025)','rgba(255,255,255,.05)');ctx.fillStyle='#f0f6ff';ctx.font='700 15px Prompt';ctx.fillText(title,x2+42,iy+30);ctx.fillStyle='#c7d3df';ctx.font='500 12px Prompt';canvasText(ctx,body,x2+42,iy+56,w2-84,19,4);iy+=146;});
  ctx.fillStyle='#65d8ff';ctx.font='700 11px Prompt';ctx.fillText('COMMUNICATION GUIDE',x3+28,y+38);ctx.fillStyle='#fff';ctx.font='700 26px Kanit';ctx.fillText('ควรสื่อสารอย่างไร',x3+28,y+72);
  const cardW=(w3-70)/2,cardH=250;COLORS.forEach((k,i)=>{const cx=x3+24+(i%2)*(cardW+18),cy=y+102+Math.floor(i/2)*(cardH+18);canvasRoundRect(ctx,cx,cy,cardW,cardH,18,'rgba(255,255,255,.025)','rgba(255,255,255,.05)');ctx.fillStyle=META()[k].color;ctx.font='700 15px Prompt';ctx.fillText(META()[k].label,cx+18,cy+32);ctx.fillStyle='#d1dce7';ctx.font='500 12px Prompt';canvasText(ctx,COMMUNICATION[r.dominant][k],cx+18,cy+60,cardW-36,19,7);});
  ctx.strokeStyle='rgba(255,255,255,.08)';ctx.beginPath();ctx.moveTo(60,965);ctx.lineTo(1860,965);ctx.stroke();ctx.fillStyle='#65d8ff';ctx.font='700 10px Prompt';ctx.fillText('YOUR 5 WORDS',60,995);let wx=168;ctx.font='600 12px Prompt';r.selectedWords.forEach(word=>{const ww=ctx.measureText(word).width+24;canvasRoundRect(ctx,wx,976,ww,34,12,'rgba(255,255,255,.04)','rgba(255,255,255,.07)');ctx.fillStyle='#e6eef7';ctx.fillText(word,wx+12,998);wx+=ww+8;});ctx.textAlign='right';ctx.fillStyle='#fff';ctx.font='700 24px Kanit';ctx.fillText('COLOR ME',1860,995);ctx.fillStyle='#8098b0';ctx.font='600 9px Prompt';ctx.fillText('5 WORDS · 4 COLORS',1860,1015);ctx.textAlign='left';
  return canvas;
}
async function saveResultCard(){
  if(!state.result)return toast("ยังไม่มีผลลัพธ์ให้สร้างการ์ด");
  toast("กำลังสร้าง Result Card แนวนอน…");
  try{const canvas=await generateLandscapeCardCanvas();const safeName=(state.profile.fullName||"color-me").replace(/[\/:*?"<>|]+/g,"-");downloadCanvasPng(canvas,`COLOR-ME-LANDSCAPE-${safeName}-${Date.now()}.png`);toast("สร้าง Result Card แล้ว");openNoticeModal({title:'สร้างการ์ดแนวนอนแล้ว',message:'บันทึกการ์ดผลลัพธ์แนวนอนเรียบร้อยแล้ว',tone:'success',eyebrow:'CARD EXPORTED'});}
  catch(e){console.error(e);toast("สร้าง Result Card ไม่สำเร็จ");}
}
async function saveResultPdfCard(){
  if(!state.result)return toast("ยังไม่มีผลลัพธ์ให้ส่งออก PDF");
  toast("กำลังสร้างการ์ด PDF…");
  try{const canvas=await generateLandscapeCardCanvas();const {jsPDF}=window.jspdf;const pdf=new jsPDF({orientation:'landscape',unit:'px',format:[1920,1080]});pdf.addImage(canvas.toDataURL('image/png',1),'PNG',0,0,1920,1080);const safeName=(state.profile.fullName||"color-me").replace(/[\/:*?"<>|]+/g,"-");pdf.save(`COLOR-ME-CARD-${safeName}-${Date.now()}.pdf`);toast("Export PDF สำเร็จแล้ว");openNoticeModal({title:'Export การ์ด PDF สำเร็จ',message:'สร้างไฟล์ PDF ของการ์ดผลลัพธ์เรียบร้อยแล้ว',tone:'success',eyebrow:'CARD EXPORTED'});}
  catch(e){console.error(e);toast("Export PDF ไม่สำเร็จ");}
}
async function saveStoryCard(){
  const data=resultDataForExport();if(!data)return toast("ยังไม่มีผลลัพธ์ให้สร้างการ์ด");
  toast("กำลังสร้างการ์ดมือถือ 9:16…");
  let host=null,chart=null;
  try{
    const primary=data.primary,secondary=data.secondary,r=data.result;
    host=createExportHost(`<div class="story-export-card"><div class="story-brand"><div><span class="story-mini">COLOR SIGNATURE</span><h1 style="color:${primary.color}">${primary.title}</h1><p>${escapeHtml(data.fullName)}</p><p style="font-size:20px">${escapeHtml(data.meta)}</p></div><div class="story-pill-row">${exportScorePills(r.scores)}</div></div><div class="story-panel"><span class="eyebrow">POWER SUMMARY</span><h3>พลังหลัก ${primary.label} · พลังรอง ${secondary.label}</h3><div class="story-word-list">${exportWordPills(r.selectedWords)}</div></div><div class="story-panel story-chart"><span class="eyebrow">YOUR RADAR</span><h3>กราฟพลัง 4 สี</h3><canvas id="storyExportRadar"></canvas></div><div class="story-grid"><div class="story-panel"><span class="eyebrow">PERSONAL INSIGHT</span><h3>ลายเซ็นความเป็นคุณ</h3><div class="story-insight-list"><div class="story-card-item"><b>จุดแข็งเด่น</b><p>${escapeHtml(primary.strength)}</p></div><div class="story-card-item"><b>ทำงานร่วมกับทีม</b><p>${escapeHtml(primary.teamwork)}</p></div><div class="story-card-item"><b>พลังเสริมจาก ${secondary.label}</b><p>${escapeHtml(secondary.strength)}</p></div></div></div><div class="story-panel"><span class="eyebrow">COMMUNICATION GUIDE</span><h3>คุณควรสื่อสารอย่างไร</h3><div class="story-comm-list">${COLORS.map(k=>`<div class="story-card-item"><b style="color:${META()[k].color}">${META()[k].label}</b><p>${escapeHtml(COMMUNICATION[r.dominant][k])}</p></div>`).join("")}</div></div></div><div class="story-footer"><div class="signature"><b>COLOR ME</b><span>5 WORDS · 4 COLORS</span></div><div class="signature" style="text-align:right">${escapeHtml(data.dateText)}<br/>Result card for social sharing</div></div></div>`,1080,1920);
    chart=await renderStaticRadar(host.querySelector('#storyExportRadar'),r.scores,18);
    const canvas=await captureElementPng(host.firstElementChild,{backgroundColor:'#06111e',width:1080,height:1920});
    const safeName=data.fullName.replace(/[\/:*?"<>|]+/g,'-');
    downloadCanvasPng(canvas,`COLOR-ME-STORY-${safeName}-${Date.now()}.png`);
    toast("สร้างการ์ดมือถือ 9:16 แล้ว");openNoticeModal({title:'สร้างการ์ดมือถือสำเร็จ',message:'สร้างการ์ดแนวตั้ง 9:16 สำหรับแชร์ลงมือถือเรียบร้อยแล้ว',tone:'success',eyebrow:'CARD EXPORTED'});
  }catch(e){console.error(e);toast("สร้างการ์ดมือถือไม่สำเร็จ");}
  finally{chart?.destroy?.();host?.remove?.();}
}

function dashboardExportMarkup(rows){
  const avg=averageScores(rows); const total=rows.length; const sessionName=selectedSessionId()? (state.sessions.find(s=>s.id===selectedSessionId())?.name||"Session") : "ทุก Session";
  return `<div class="dashboard-export-card"><div class="dashboard-export-head"><div><span class="eyebrow">LIVE ACTIVITY OVERVIEW</span><h1>Talent Color Dashboard</h1><p>สรุปผลกิจกรรมแบบเรียลไทม์ · ขอบเขตข้อมูล: ${escapeHtml(sessionName)}</p></div><div class="export-stamp"><span class="live-chip"><i></i> LIVE DASHBOARD</span><div class="stamp-text">สร้างเมื่อ ${escapeHtml(formatDate(new Date()))}<br/>อัปเดตล่าสุด ${escapeHtml(formatTimeOnly(state.liveUpdatedAt||new Date()))}</div></div></div><div class="dashboard-stat-grid"><article class="stat-card"><span>ผู้ทำกิจกรรม</span><strong>${total}</strong><small>รายการทั้งหมด</small></article>${COLORS.map(k=>`<article class="stat-card stat-${k==='think'?'blue':k==='fight'?'red':k==='fine'?'yellow':'green'}"><span>${META()[k].label}</span><strong>${rows.filter(r=>r.dominant===k).length}</strong><small>${META()[k].thai}</small></article>`).join('')}</div><div><div class="dashboard-export-grid"><article class="result-panel"><div class="card-head compact-head"><div><span class="eyebrow">GROUP DNA</span><h3>กราฟเฉลี่ยของกลุ่ม</h3></div><span class="live-chip"><i></i> เคลื่อนไหวต่อเนื่อง</span></div><div class="chart-wrap admin-radar"><canvas id="dashboardExportRadar"></canvas></div></article><article class="result-panel"><div class="card-head compact-head"><div><span class="eyebrow">COLOR MIX</span><h3>สัดส่วนสีเด่น</h3></div><span class="live-chip"><i></i> อัปเดตสด</span></div><div class="chart-wrap admin-radar"><canvas id="dashboardExportDoughnut"></canvas></div><div class="color-mix-legend">${COLORS.map(k=>{const count=rows.filter(r=>r.dominant===k).length;const pct=total?Math.round(count/total*100):0;return `<div class="color-mix-item"><b><i style="background:${META()[k].color}"></i>${META()[k].label}</b><span>${count} คน</span><strong>${pct}%</strong></div>`;}).join('')}</div><div class="dashboard-footer-note"><span>ค่าเฉลี่ยรวม: THINK ${avg.think}% · FIGHT ${avg.fight}% · FINE ${avg.fine}% · DO ${avg.do}%</span><div><b>COLOR ME</b><br/>5 WORDS · 4 COLORS</div></div></article></div></div></div>`;
}
async function generateDashboardCanvas(){
  const rows=filteredResponses(); const host=createExportHost(dashboardExportMarkup(rows),1920,1080); let radar=null,doughnut=null;
  try{radar=await renderStaticGroupRadar(host.querySelector('#dashboardExportRadar'),averageScores(rows),16); doughnut=await renderStaticDoughnut(host.querySelector('#dashboardExportDoughnut'),rows); return await captureElementPng(host.firstElementChild,{backgroundColor:'#06111e',width:1920,height:1080});}
  finally{radar?.destroy?.(); doughnut?.destroy?.(); host?.remove?.();}
}
async function exportDashboardPng(){
  toast('กำลังสร้าง Dashboard PNG…');
  try{const canvas=await generateDashboardCanvas(); downloadCanvasPng(canvas,`COLOR-ME-DASHBOARD-${Date.now()}.png`); toast('Export Dashboard PNG แล้ว'); openNoticeModal({title:'Export PNG สำเร็จ',message:'สร้างภาพสรุป Dashboard เรียบร้อยแล้ว',tone:'success',eyebrow:'DASHBOARD EXPORTED'});}
  catch(e){console.error(e); toast('Export Dashboard PNG ไม่สำเร็จ');}
}
async function exportDashboardPdf(){
  toast('กำลังสร้าง Dashboard PDF…');
  try{const canvas=await generateDashboardCanvas(); const {jsPDF}=window.jspdf; const pdf=new jsPDF({orientation:'landscape',unit:'px',format:[1920,1080]}); pdf.addImage(canvas.toDataURL('image/png',1),'PNG',0,0,1920,1080); pdf.save(`COLOR-ME-DASHBOARD-${Date.now()}.pdf`); toast('Export Dashboard PDF แล้ว'); openNoticeModal({title:'Export PDF สำเร็จ',message:'สร้างไฟล์ PDF ของ Dashboard เรียบร้อยแล้ว',tone:'success',eyebrow:'DASHBOARD EXPORTED'});}
  catch(e){console.error(e); toast('Export Dashboard PDF ไม่สำเร็จ');}
}

function switchTab(name){$$(".admin-tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===name));$$(".admin-tab-pane").forEach(p=>p.classList.toggle("active",p.id===`tab-${name}`));if(name==="teamdna")renderTeamDNA();}
function wireEvents(){
  $("#btnStart").addEventListener("click",()=>{if(state.activeSession?.isOpen===false)return toast("Session นี้ปิดรับคำตอบแล้ว");showScreen("#screenProfile");});
  $("#btnHow").addEventListener("click",()=>openModal("#modalHow"));if($("#btnPrivacy"))$("#btnPrivacy").addEventListener("click",()=>openModal("#modalPrivacy"));$("#btnAdmin").addEventListener("click",()=>showScreen("#screenAdminLogin"));
  $$("[data-go-home]").forEach(b=>b.addEventListener("click",()=>showScreen("#screenHome")));$$("[data-close-modal]").forEach(b=>b.addEventListener("click",()=>closeModal(b.closest(".modal"))));$$(".modal-x").forEach(b=>b.addEventListener("click",()=>closeModal(b.closest(".modal"))));
  $("#profileForm").addEventListener("submit",e=>{e.preventDefault();state.profile={fullName:$("#fullName").value.trim(),organization:$("#organization").value.trim()};renderWords();showScreen("#screenWords");});
  $("#btnAnalyze").addEventListener("click",async()=>{if(state.selected.length!==5)return;$("#btnAnalyze").disabled=true;state.result=analyze();try{await checkDuplicateAndSave(state.result);}catch(e){$("#btnAnalyze").disabled=false;return toast(e.message);}renderReveal();showScreen("#screenReveal");setTimeout(()=>finishReveal(),3500);setTimeout(()=>{renderResult();showScreen("#screenResult");setTimeout(()=>playSuccessChime(),2350);$("#btnAnalyze").disabled=false;},3900);});
  $("#btnRestart").addEventListener("click",()=>{state.selected=[];state.result=null;renderWords();showScreen("#screenWords");});$("#btnResultBack")?.addEventListener("click",()=>{renderWords();showScreen("#screenWords");});if($("#btnSaveImage"))$("#btnSaveImage").addEventListener("click",saveResultCard);if($("#btnSaveStory"))$("#btnSaveStory").addEventListener("click",saveStoryCard);if($("#btnSavePdfCard"))$("#btnSavePdfCard").addEventListener("click",saveResultPdfCard);
  $("#btnBackToProfile")?.addEventListener("click",()=>showScreen("#screenProfile"));$("#btnBackToProfileBottom")?.addEventListener("click",()=>showScreen("#screenProfile"));

  $("#adminLoginForm").addEventListener("submit",async e=>{e.preventDefault();$("#adminLoginError").textContent="";try{await adminLogin($("#adminEmail").value.trim(),$("#adminPassword").value);}catch(ex){$("#adminLoginError").textContent=ex.message||"เข้าสู่ระบบไม่สำเร็จ";}});
  $("#btnDemoDashboard").addEventListener("click",loadDemoAdmin);$("#btnAdminLogout").addEventListener("click",async()=>{state.unsubscribeResponses?.();state.unsubscribeSessions?.();if(state.firebaseReady&&fb.auth.currentUser)await fb.authFns.signOut(fb.auth);state.currentAdmin=null;showScreen("#screenHome");});
  $$(".admin-tab").forEach(b=>b.addEventListener("click",()=>switchTab(b.dataset.tab)));
  $("#adminSessionFilter").addEventListener("change",()=>{clearResponseSelection();renderAdmin();});$("#adminSearch").addEventListener("input",()=>{clearResponseSelection();renderTable();});$("#adminColorFilter").addEventListener("change",()=>{clearResponseSelection();renderTable();});$("#selectAllResponses").addEventListener("change",e=>toggleAllFilteredResponses(e.target.checked));$("#selectAllResponsesHead").addEventListener("change",e=>toggleAllFilteredResponses(e.target.checked));$("#btnDeleteSelected").addEventListener("click",deleteSelectedResponses);$("#btnSelectAllSystem").addEventListener("click",selectAllResponsesSystem);$("#btnSelectAllSession").addEventListener("click",selectAllResponsesInSession);$("#btnClearSelected").addEventListener("click",clearSelectedResponses);
  $("#btnQr").addEventListener("click",()=>showQr(selectedSessionId()));$("#btnExportCsv").addEventListener("click",exportCsv);$("#btnExportXlsx").addEventListener("click",exportXlsx);$("#btnExportPdf").addEventListener("click",exportPdf);$("#btnExportDashboardPng").addEventListener("click",exportDashboardPng);$("#btnExportDashboardPdf").addEventListener("click",exportDashboardPdf);
  $("#btnNewSession").addEventListener("click",()=>openSessionModal());$("#sessionForm").addEventListener("submit",async e=>{e.preventDefault();await saveSession();closeModal($("#modalSession"));toast("บันทึก Session แล้ว");openNoticeModal({title:'บันทึก Session สำเร็จ',message:'สร้างหรือแก้ไข Session เรียบร้อยแล้ว',tone:'success',eyebrow:'SESSION SAVED'});});
  $("#dnaSessionA").addEventListener("change",renderTeamDNA);$("#dnaSessionB").addEventListener("change",renderTeamDNA);$("#btnDeleteDnaA").addEventListener("click",()=>deleteSessionResponses($("#dnaSessionA").value));$("#btnDeleteDnaB").addEventListener("click",()=>deleteSessionResponses($("#dnaSessionB").value));
  $("#gameSettingsForm").addEventListener("submit",async e=>{e.preventDefault();const words=WORDS().map(w=>({...w,primary:$(`[data-map-primary="${w.id}"]`).value,secondary:$(`[data-map-secondary="${w.id}"]`).value}));await saveConfig({gameTitle:$("#setGameTitle").value.trim(),gameTagline:$("#setGameTagline").value.trim(),heroSubtitle:$("#setHeroSubtitle").value.trim(),logoUrl:$("#setLogoUrl").value.trim(),words});});
  if($("#privacySettingsForm"))$("#privacySettingsForm").addEventListener("submit",async e=>{e.preventDefault();await saveConfig({privacyNotice:$("#setPrivacyNotice").value.trim(),retentionDays:Number($("#setRetentionDays").value||365),privacyEmail:$("#setPrivacyEmail").value.trim()});});
  if($("#btnDeleteExpired"))$("#btnDeleteExpired").addEventListener("click",deleteExpired);$("#btnProjector").addEventListener("click",()=>openProjector("tv"));if($("#btnTvDisplay"))$("#btnTvDisplay").addEventListener("click",()=>openProjector("tv"));$("#btnCloseProjector").addEventListener("click",closeProjector);$$('[data-projector-dot]').forEach(dot=>dot.addEventListener('click',()=>{showProjectorSlide(Number(dot.dataset.projectorDot));startProjectorSlideshow();}));
}

function updateSoundButton(){
  const btn=$("#btnSound"),icon=$("#soundIcon"),label=$("#soundLabel");
  if(!btn)return;
  btn.setAttribute("aria-pressed",state.soundEnabled?"true":"false");
  btn.classList.toggle("sound-on",state.soundEnabled&&state.audioStarted);
  if(!state.soundEnabled){if(icon)icon.textContent="🔇";if(label)label.textContent="ปิดเสียง";return;}
  if(icon)icon.textContent=state.audioStarted?"🔊":"♫";
  if(label)label.textContent=state.audioStarted?"เสียงเปิด":"เสียงพร้อม";
}
function ensureAudio(){
  if(state.audioReady)return true;
  try{
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(!Ctx)return false;
    const ctx=new Ctx();

    // Smooth master chain: remove the harsh high-frequency spikes that can sound like mic crackle.
    const masterFilter=ctx.createBiquadFilter();
    masterFilter.type="lowpass";masterFilter.frequency.value=8600;masterFilter.Q.value=.18;
    const compressor=ctx.createDynamicsCompressor();
    compressor.threshold.value=-17;compressor.knee.value=22;compressor.ratio.value=6;compressor.attack.value=.006;compressor.release.value=.28;
    const master=ctx.createGain();master.gain.value=state.soundEnabled?.58:0;

    const music=ctx.createGain();music.gain.value=0;
    const musicFilter=ctx.createBiquadFilter();musicFilter.type="lowpass";musicFilter.frequency.value=6200;musicFilter.Q.value=.2;
    const sfx=ctx.createGain();sfx.gain.value=.72;
    const sfxFilter=ctx.createBiquadFilter();sfxFilter.type="lowpass";sfxFilter.frequency.value=7200;sfxFilter.Q.value=.15;

    music.connect(musicFilter);musicFilter.connect(compressor);
    sfx.connect(sfxFilter);sfxFilter.connect(compressor);
    compressor.connect(masterFilter);masterFilter.connect(master);master.connect(ctx.destination);
    state.audio={ctx,master,music,sfx,compressor,masterFilter,musicFilter,sfxFilter};
    state.audioReady=true;updateSoundButton();return true;
  }catch(e){console.warn("Audio init failed",e);return false;}
}
function audioRamp(param,value,time=.12){
  if(!state.audio?.ctx)return;
  const now=state.audio.ctx.currentTime;
  try{param.cancelScheduledValues(now);param.setValueAtTime(Math.max(.0001,param.value||.0001),now);param.linearRampToValueAtTime(value,now+time);}catch(e){}
}
async function resumeAudio(){
  if(!state.soundEnabled||!ensureAudio())return false;
  try{if(state.audio.ctx.state==="suspended")await state.audio.ctx.resume();return state.audio.ctx.state==="running";}catch(e){return false;}
}
function connectWithPan(node,dest,pan=0){
  const ctx=state.audio?.ctx;
  if(ctx&&ctx.createStereoPanner){const p=ctx.createStereoPanner();p.pan.value=Math.max(-1,Math.min(1,pan));node.connect(p);p.connect(dest);return p;}
  node.connect(dest);return null;
}
function playCleanGuitar(root,when,accent=1,pan=0){
  if(!state.audio?.ctx||!state.audio?.music)return;
  const {ctx,music}=state.audio;
  const bus=ctx.createGain(),filter=ctx.createBiquadFilter(),delay=ctx.createDelay(.35),feedback=ctx.createGain();
  bus.gain.value=.72*accent;filter.type='lowpass';filter.frequency.setValueAtTime(4300,when);filter.frequency.exponentialRampToValueAtTime(1750,when+.34);filter.Q.value=.32;
  delay.delayTime.value=.135;feedback.gain.value=.10;
  bus.connect(filter);connectWithPan(filter,music,pan);filter.connect(delay);delay.connect(feedback);feedback.connect(delay);delay.connect(music);
  [1,1.4983,2,2.9966].forEach((ratio,i)=>{
    const osc=ctx.createOscillator(),g=ctx.createGain();
    osc.type=i<2?'triangle':'sine';osc.frequency.value=root*ratio;osc.detune.value=(i-1.5)*1.6;
    const peak=[.040,.026,.018,.010][i]*accent;
    g.gain.setValueAtTime(.0001,when);g.gain.exponentialRampToValueAtTime(peak,when+.009+i*.002);g.gain.exponentialRampToValueAtTime(.0001,when+.32+i*.035);
    osc.connect(g);g.connect(bus);osc.start(when);osc.stop(when+.48);
  });
}
function playPianoPluck(freq,when,accent=1,pan=0){
  if(!state.audio?.ctx||!state.audio?.music)return;
  const {ctx,music}=state.audio;const bus=ctx.createGain(),filter=ctx.createBiquadFilter();
  filter.type='lowpass';filter.frequency.value=4800;filter.Q.value=.25;bus.gain.value=.8*accent;bus.connect(filter);connectWithPan(filter,music,pan);
  [1,2,3.01].forEach((ratio,i)=>{
    const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type='sine';osc.frequency.value=freq*ratio;
    const peak=[.040,.015,.006][i]*accent;
    gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(peak,when+.006);gain.gain.exponentialRampToValueAtTime(.0001,when+.42+(i*.08));
    osc.connect(gain);gain.connect(bus);osc.start(when);osc.stop(when+.65);
  });
}
function playSoftBass(freq,when,accent=1){
  const {ctx,music}=state.audio;const osc=ctx.createOscillator(),sub=ctx.createOscillator(),gain=ctx.createGain(),subGain=ctx.createGain(),filter=ctx.createBiquadFilter();
  osc.type='triangle';sub.type='sine';osc.frequency.value=freq;sub.frequency.value=freq/2;filter.type='lowpass';filter.frequency.value=560;filter.Q.value=.45;
  gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(.050*accent,when+.014);gain.gain.exponentialRampToValueAtTime(.0001,when+.34);
  subGain.gain.setValueAtTime(.0001,when);subGain.gain.exponentialRampToValueAtTime(.018*accent,when+.02);subGain.gain.exponentialRampToValueAtTime(.0001,when+.30);
  osc.connect(gain);sub.connect(subGain);gain.connect(filter);subGain.connect(filter);filter.connect(music);osc.start(when);sub.start(when);osc.stop(when+.38);sub.stop(when+.34);
}
function playSoftKick(when,accent=1){
  const {ctx,music}=state.audio;const osc=ctx.createOscillator(),gain=ctx.createGain(),filter=ctx.createBiquadFilter();
  osc.type='sine';osc.frequency.setValueAtTime(92,when);osc.frequency.exponentialRampToValueAtTime(48,when+.13);filter.type='lowpass';filter.frequency.value=850;
  gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(.070*accent,when+.008);gain.gain.exponentialRampToValueAtTime(.0001,when+.18);
  osc.connect(filter);filter.connect(gain);gain.connect(music);osc.start(when);osc.stop(when+.20);
}
function playSoftDrum(when,type='hat',accent=1){
  const {ctx,music}=state.audio;
  const duration=type==='snare'?.105:.030;
  const buf=ctx.createBuffer(1,Math.max(32,Math.floor(ctx.sampleRate*duration)),ctx.sampleRate),data=buf.getChannelData(0);
  for(let i=0;i<data.length;i++){const env=(1-i/data.length);data[i]=(Math.random()*2-1)*env*env;}
  const src=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();src.buffer=buf;
  filter.type=type==='snare'?'bandpass':'highpass';filter.frequency.value=type==='snare'?1150:4700;filter.Q.value=type==='snare'?.55:.22;
  const level=(type==='snare'?.025:.0085)*accent;gain.gain.setValueAtTime(level,when);gain.gain.exponentialRampToValueAtTime(.0001,when+duration);
  src.connect(filter);filter.connect(gain);gain.connect(music);src.start(when);src.stop(when+duration+.01);
  if(type==='snare'){
    const tone=ctx.createOscillator(),tg=ctx.createGain();tone.type='sine';tone.frequency.value=190;tg.gain.setValueAtTime(.0001,when);tg.gain.exponentialRampToValueAtTime(.018*accent,when+.004);tg.gain.exponentialRampToValueAtTime(.0001,when+.10);tone.connect(tg);tg.connect(music);tone.start(when);tone.stop(when+.12);
  }
}
function scheduleMusicStep(step,when){
  const roots=[146.83,123.47,98.00,110.00]; // D - Bm - G - A: upbeat pop-rock energy
  const bass=[73.42,61.74,49.00,55.00];
  const melody=[587.33,659.25,739.99,659.25,587.33,493.88,554.37,659.25];
  const chord=Math.floor(step/8)%roots.length,beat=step%8;
  playSoftDrum(when,'hat',beat%2===0?1:.72);
  if(beat===0||beat===4)playSoftKick(when,beat===0?1.12:.92);
  if(beat===2||beat===6)playSoftDrum(when,'snare',1.0);
  if([0,3,4,6].includes(beat))playCleanGuitar(roots[chord]*2,when+.008,beat===0?1.0:.82,beat%2?-.18:.18);
  if(beat===0||beat===4)playSoftBass(bass[chord],when+.004,beat===0?1:.86);
  if([1,5,7].includes(beat))playPianoPluck(melody[(step+chord)%melody.length],when+.025,beat===7?.92:.66,beat===1?-.22:.22);
}
async function startAmbientMusic(){
  if(state.audioStarted||state.musicStarting||!state.soundEnabled)return;
  state.musicStarting=true;
  if(!await resumeAudio()){state.musicStarting=false;return;}
  const {ctx,music}=state.audio;
  state.audioStarted=true;state.musicStarting=false;state.musicStep=0;state.musicNextTime=ctx.currentTime+.06;
  audioRamp(music.gain,.74,.9);
  clearInterval(state.musicTimer);
  const stepDuration=(60/128)/2; // 128 BPM, eighth-note scheduler
  const scheduler=()=>{
    if(!state.soundEnabled||!state.audioStarted||!state.audio?.ctx||ctx.state!=="running")return;
    const horizon=ctx.currentTime+.16;
    while(state.musicNextTime<horizon){scheduleMusicStep(state.musicStep,state.musicNextTime);state.musicStep++;state.musicNextTime+=stepDuration;}
  };
  scheduler();state.musicTimer=setInterval(scheduler,28);updateSoundButton();
}
async function attemptAutoStartMusic(){
  state.soundEnabled=true;localStorage.setItem('colorMeSound','on');ensureAudio();
  const started=await resumeAudio();if(started)await startAmbientMusic();
  const unlock=async()=>{state.soundEnabled=true;await resumeAudio();await startAmbientMusic();updateSoundButton();};
  document.addEventListener('pointerdown',unlock,{once:true,capture:true});document.addEventListener('keydown',unlock,{once:true,capture:true});
}
async function setSoundEnabled(enabled){
  state.soundEnabled=!!enabled;localStorage.setItem("colorMeSound",state.soundEnabled?"on":"off");
  if(!ensureAudio()){updateSoundButton();return;}
  if(state.soundEnabled){await resumeAudio();audioRamp(state.audio.master.gain,.58,.25);await startAmbientMusic();}
  else audioRamp(state.audio.master.gain,0,.18);
  updateSoundButton();
}
function playTone(freq,when,duration=.14,level=.06,type='sine',pan=0,dest='sfx'){
  if(!state.audio?.ctx)return;const {ctx}=state.audio,nodeDest=state.audio[dest]||state.audio.sfx;
  const osc=ctx.createOscillator(),gain=ctx.createGain(),filter=ctx.createBiquadFilter();osc.type=type;osc.frequency.value=freq;filter.type='lowpass';filter.frequency.value=6000;filter.Q.value=.12;
  gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(level,when+.007);gain.gain.exponentialRampToValueAtTime(.0001,when+duration);
  osc.connect(filter);filter.connect(gain);connectWithPan(gain,nodeDest,pan);osc.start(when);osc.stop(when+duration+.03);
}
function playUiClick(type="default"){
  if(!state.soundEnabled||!ensureAudio())return;resumeAudio();startAmbientMusic();
  const {ctx}=state.audio,now=ctx.currentTime;
  if(type==='back'){playTone(420,now,.12,.052,'sine',-.12);playTone(330,now+.035,.15,.040,'sine',.12);return;}
  if(type==='word'){playTone(660,now,.10,.058,'triangle',-.12);playTone(880,now+.025,.12,.046,'sine',.12);return;}
  if(type==='confirm'){playTone(523.25,now,.14,.070,'triangle',-.18);playTone(659.25,now+.035,.16,.060,'sine',0);playTone(783.99,now+.070,.18,.054,'sine',.18);return;}
  playTone(520,now,.09,.047,'sine',-.10);playTone(680,now+.022,.11,.036,'sine',.10);
}
function playSuccessChime(){
  if(!state.soundEnabled||!ensureAudio())return;resumeAudio();startAmbientMusic();
  const {ctx}=state.audio,now=ctx.currentTime;[659.25,783.99,987.77,1174.66].forEach((f,i)=>playTone(f,now+i*.07,.32,.082-(i*.008),i===0?'triangle':'sine',(i-1.5)*.12));
}
function playScannerSweep(intensity=1,duration=.62){
  if(!state.soundEnabled||!ensureAudio())return;resumeAudio();
  const {ctx,sfx}=state.audio,now=ctx.currentTime;
  const osc=ctx.createOscillator(),gain=ctx.createGain(),filter=ctx.createBiquadFilter();osc.type='sine';osc.frequency.setValueAtTime(180,now);osc.frequency.exponentialRampToValueAtTime(1250,now+duration);filter.type='bandpass';filter.frequency.setValueAtTime(420,now);filter.frequency.exponentialRampToValueAtTime(2350,now+duration);filter.Q.value=1.25;
  gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.058*intensity,now+.045);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
  osc.connect(filter);filter.connect(gain);connectWithPan(gain,sfx,-.55);osc.start(now);osc.stop(now+duration+.04);
  const air=ctx.createOscillator(),ag=ctx.createGain(),af=ctx.createBiquadFilter();air.type='sine';air.frequency.setValueAtTime(900,now);air.frequency.exponentialRampToValueAtTime(2100,now+duration*.85);af.type='lowpass';af.frequency.value=3400;ag.gain.setValueAtTime(.0001,now);ag.gain.exponentialRampToValueAtTime(.026*intensity,now+.08);ag.gain.exponentialRampToValueAtTime(.0001,now+duration*.92);air.connect(af);af.connect(ag);connectWithPan(ag,sfx,.55);air.start(now);air.stop(now+duration+.04);
}
function stopScannerAudio(){clearInterval(state.scannerAudioTimer);clearTimeout(state.scannerAudioStopTimer);state.scannerAudioTimer=null;state.scannerAudioStopTimer=null;}
function startScannerAudio(durationMs=3000,intervalMs=760,intensity=1){
  stopScannerAudio();playScannerSweep(intensity);
  state.scannerAudioTimer=setInterval(()=>playScannerSweep(intensity),intervalMs);
  state.scannerAudioStopTimer=setTimeout(()=>stopScannerAudio(),durationMs);
}
function playAnalysisStart(){
  if(!state.soundEnabled||!ensureAudio())return;resumeAudio();startAmbientMusic();
  const {ctx}=state.audio,now=ctx.currentTime;
  playTone(220,now,.38,.050,'sine',-.2);playTone(329.63,now+.10,.44,.048,'triangle',0);playTone(493.88,now+.22,.46,.042,'sine',.2);
}
function playAnalysisPulse(step=0,cycle=0){
  if(!state.soundEnabled||!ensureAudio())return;resumeAudio();
  const {ctx}=state.audio,now=ctx.currentTime;const scale=[392,493.88,587.33,659.25,783.99];const f=scale[step%scale.length]*(1+Math.min(cycle,8)*.007);
  playTone(f,now,.16,.052,'sine',(step%5-2)*.15);
}
function playAnalysisComplete(){
  if(!state.soundEnabled||!ensureAudio())return;resumeAudio();startAmbientMusic();
  const {ctx}=state.audio,now=ctx.currentTime;[392,523.25,659.25,783.99,1046.5].forEach((f,i)=>playTone(f,now+i*.055,.34,.070-(i*.006),i<2?'triangle':'sine',(i-2)*.10));
}
function playNewDataChime(count=1){
  if(!state.soundEnabled||!ensureAudio())return;resumeAudio();startAmbientMusic();
  const {ctx}=state.audio,now=ctx.currentTime;[523.25,659.25,783.99,1046.5].forEach((f,i)=>playTone(f,now+i*.055,.28,.078-(i*.006),i===0?'triangle':'sine',(i-1.5)*.12));
  if(count>1)setTimeout(()=>playUiClick("confirm"),300);
}
function isProjectorOpen(){const p=$("#projector");return !!p&&!p.classList.contains("hidden");}
function pulseProjectorRealtime(newCount=0){
  const p=$("#projector");if(!p||p.classList.contains("hidden"))return;
  p.classList.remove("realtime-pulse");void p.offsetWidth;p.classList.add("realtime-pulse");
  const label=$("#projectorModeLabel");
  if(label){
    label.classList.remove("realtime-hit");void label.offsetWidth;label.classList.add("realtime-hit");
    label.innerHTML=`<i></i> PROJEC DISPLAY · REALTIME${newCount?` +${newCount}`:""}`;
    setTimeout(()=>{if(isProjectorOpen())label.innerHTML='<i></i> PROJEC DISPLAY · REALTIME';},1900);
  }
}
function showProjectorNewDataToast(rows=[]){
  const p=$("#projector");if(!p||p.classList.contains("hidden"))return;
  p.querySelector('.projector-new-data-toast')?.remove();const latest=rows[0];const el=document.createElement('div');el.className='projector-new-data-toast';el.innerHTML=`<span class="new-data-icon">✦</span><div><b>ได้รับข้อมูลใหม่${rows.length>1?` ${rows.length} รายการ`:''}</b><small>${escapeHtml(latest?.fullName||'ผู้เข้าร่วม')} · ${escapeHtml(latest?.organization||'')}</small></div>`;p.appendChild(el);requestAnimationFrame(()=>el.classList.add('show'));setTimeout(()=>el.classList.remove('show'),2800);setTimeout(()=>el.remove(),3300);
}
function notifyProjectorNewData(rows=[]){
  if(!rows.length||!isProjectorOpen())return;
  rows.forEach(r=>state.projectorNewIds.add(String(r.id)));
  renderProjectorParticipants(filteredResponses());
  playNewDataChime(rows.length);
  showProjectorNewDataToast(rows);
  setTimeout(()=>{rows.forEach(r=>state.projectorNewIds.delete(String(r.id)));renderProjectorParticipants(filteredResponses());},3600);
}
function bindUiSounds(){
  updateSoundButton();
  $("#btnSound")?.addEventListener("click",async e=>{
    e.preventDefault();e.stopPropagation();
    if(!state.audioStarted){state.soundEnabled=true;localStorage.setItem("colorMeSound","on");await resumeAudio();await startAmbientMusic();playSuccessChime();updateSoundButton();return;}
    await setSoundEnabled(!state.soundEnabled);
    if(state.soundEnabled)playSuccessChime();
  });
  document.addEventListener("pointerdown",e=>{
    const target=e.target.closest("button,.word-card,.admin-tab,.text-btn,.brand");
    if(!target||target.id==="btnSound")return;
    if(state.soundEnabled){resumeAudio();startAmbientMusic();}
    let type="default";
    if(target.classList.contains("word-card"))type="word";
    else if(target.matches("[data-go-home],#btnBackToProfile,#btnBackToProfileBottom,#btnRestart,#btnCloseProjector"))type="back";
    else if(target.classList.contains("btn-primary"))type="confirm";
    playUiClick(type);
  },{passive:true});
  document.addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&state.soundEnabled)playUiClick("default");});
}

function setupPremiumMotion(){
  const hero=document.querySelector('.hero');
  const visual=document.querySelector('.hero-visual');
  if(!hero||!visual)return;
  let targetX=0,targetY=0,currentX=0,currentY=0;
  const render=()=>{
    currentX+=(targetX-currentX)*0.055;
    currentY+=(targetY-currentY)*0.055;
    visual.style.transform=`translate3d(${currentX*5}px,${currentY*4}px,0) rotateY(${currentX*1.8}deg) rotateX(${currentY*-1.4}deg)`;
    requestAnimationFrame(render);
  };
  hero.addEventListener('pointermove',e=>{
    const rect=hero.getBoundingClientRect();
    targetX=((e.clientX-rect.left)/rect.width-.5)*2;
    targetY=((e.clientY-rect.top)/rect.height-.5)*2;
  });
  hero.addEventListener('pointerleave',()=>{targetX=0;targetY=0;});
  if(!document.body.dataset.motionReady){document.body.dataset.motionReady='1';render();}
}

(async function boot(){wireEvents();renderWords();setupPremiumMotion();bindUiSounds();startChartMotionLoop();attemptAutoStartMusic();await initFirebase();})();
