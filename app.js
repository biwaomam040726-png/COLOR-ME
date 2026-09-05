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
  privacyNotice:"ระบบจะจัดเก็บชื่อ–นามสกุล หน่วยงาน/กลุ่ม รหัสผู้เข้าร่วม คำที่เลือก และผลคะแนน 4 สี เพื่อใช้ในการสรุปผลกิจกรรมและการเรียนรู้ร่วมกัน\n\nข้อมูลจะไม่ถูกเปิดเผยใน Projector Mode และผู้เข้าร่วมทั่วไปไม่สามารถดูข้อมูลของผู้อื่นได้\n\nหากต้องการแก้ไขหรือลบข้อมูล โปรดติดต่อผู้ดูแลกิจกรรม",
  words:DEFAULT_WORDS
};

let state={
  profile:{},selected:[],result:null,responses:[],sessions:[],activeSession:null,selectedResponseIds:[],
  demoMode:false,firebaseReady:false,currentAdmin:null,config:structuredClone(DEFAULT_CONFIG),
  unsubscribeResponses:null,unsubscribeSessions:null
};
let charts={result:null,adminRadar:null,adminDoughnut:null,detail:null,team:null,projector:null};
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
function formatDate(v){let d;if(!v)return"—";if(v?.toDate)d=v.toDate();else d=new Date(v);if(Number.isNaN(d.getTime()))return"—";return new Intl.DateTimeFormat("th-TH",{dateStyle:"medium",timeStyle:"short"}).format(d);}
function selectedSessionId(){return $("#adminSessionFilter")?.value||"";}
function filteredResponses(){const sid=selectedSessionId();return sid?state.responses.filter(r=>r.sessionId===sid):state.responses;}
function participantFilteredRows(){
  const q=$("#adminSearch")?.value?.trim().toLowerCase()||"",cf=$("#adminColorFilter")?.value||"";
  return filteredResponses().filter(r=>{const hay=[r.fullName,r.organization,r.email,r.sessionName].join(" ").toLowerCase();return(!q||hay.includes(q))&&(!cf||r.dominant===cf);});
}
function isResponseSelected(id){return state.selectedResponseIds.includes(String(id));}
function setResponseSelected(id,selected){const sid=String(id);const set=new Set(state.selectedResponseIds.map(String));selected?set.add(sid):set.delete(sid);state.selectedResponseIds=[...set];}
function clearResponseSelection(){state.selectedResponseIds=[];syncParticipantSelectionUI();}
function toggleAllFilteredResponses(selected){participantFilteredRows().forEach(r=>setResponseSelected(r.id,selected));syncParticipantSelectionUI();renderTable();}
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
async function renderStaticRadar(canvas,scores,labelSize=16){if(!canvas||!window.Chart||!scores)return null;const chart=new Chart(canvas,{type:"radar",data:radarData(scores,"พลัง"),options:baseChartOptions({animation:false,plugins:{legend:{display:false},tooltip:{enabled:false}},scales:{r:{min:0,max:100,ticks:{display:false,stepSize:20},grid:{color:"rgba(255,255,255,.10)"},angleLines:{color:"rgba(255,255,255,.10)"},pointLabels:{color:"#dce6f2",font:{family:"Prompt",size:labelSize}}}}})});await sleep(50);return chart;}
async function captureElementPng(node,opts){await document.fonts.ready;await sleep(260);return html2canvas(node,{backgroundColor:opts.backgroundColor||"#06111e",scale:2,useCORS:true,logging:false,width:opts.width,height:opts.height,windowWidth:opts.width,windowHeight:opts.height});}
function downloadCanvasPng(canvas,filename){const a=document.createElement("a");a.download=filename;a.href=canvas.toDataURL("image/png",1);a.click();}

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
  $("#privacyMiniText").textContent=`ข้อมูลจะเก็บประมาณ ${state.config.retentionDays||365} วัน เพื่อใช้สรุปกิจกรรม`;
  $("#privacyNoticeText").textContent=(state.config.privacyNotice||DEFAULT_CONFIG.privacyNotice)+(state.config.privacyEmail?`\n\nติดต่อผู้ดูแลข้อมูล: ${state.config.privacyEmail}`:"");
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
    email:state.profile.email||"",
    selectedWords:result.selectedWords,
    scores:result.scores,
    dominant:result.dominant,
    secondary:result.secondary,
    sessionId,
    sessionName:state.activeSession?.name||"Open session",
    consent:true,
    version:"7.0.0"
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
}
function communicationCards(primary){
  return COLORS.map(k=>`<div class="comm-item"><b style="color:${META()[k].color}">${META()[k].label}</b><p>${COMMUNICATION[primary][k]}</p></div>`).join("");
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
  drawRadar("resultRadar",r.scores,"result");
}
function radarData(scores,label="พลัง"){
  return{labels:["THINK · คิด","FIGHT · ลุย","FINE · ละเอียด","DO · ทำ"],datasets:[{label,data:[scores.think,scores.fight,scores.fine,scores.do],borderWidth:3,pointRadius:4.5,pointHoverRadius:6.5,fill:true,backgroundColor:"rgba(116,129,255,.22)",borderColor:"rgba(145,164,255,.98)",pointBackgroundColor:["#426cff","#ff455d","#ffc938","#37d889"],pointBorderColor:"#07111f",pointBorderWidth:2}]};
}
function baseChartOptions(extra={}){
  return{responsive:true,maintainAspectRatio:false,interaction:{mode:"nearest",intersect:false},elements:{line:{tension:.22}},scales:{r:{min:0,max:100,ticks:{display:false,stepSize:20},grid:{color:"rgba(255,255,255,.09)"},angleLines:{color:"rgba(255,255,255,.09)"},pointLabels:{color:"#c3cfdf",font:{family:"Prompt",size:11}}}},plugins:{legend:{display:false},tooltip:{backgroundColor:"rgba(7,17,31,.96)",borderColor:"rgba(132,170,220,.35)",borderWidth:1,titleColor:"#fff",bodyColor:"#dce8f5",padding:10}},animation:{duration:1400,easing:"easeOutQuart"},transitions:{active:{animation:{duration:250}}},...extra};
}
function buildAnimatedRadar(canvas,datasets,key,extraOptions={}){
  if(charts[key])charts[key].destroy();
  const labels=["THINK","FIGHT","FINE","DO"];
  const startSets=datasets.map(ds=>({...ds,data:ds.data.map(()=>0)}));
  charts[key]=new Chart(canvas,{type:"radar",data:{labels,datasets:startSets},options:baseChartOptions(extraOptions)});
  requestAnimationFrame(()=>requestAnimationFrame(()=>{charts[key].data.datasets=datasets.map(ds=>({...ds,data:[...ds.data]}));charts[key].update();}));
  return charts[key];
}
function drawRadar(id,scores,key,label){const el=document.getElementById(id);if(!el||!window.Chart)return;buildAnimatedRadar(el,[radarData(scores,label).datasets[0]],key);}

async function adminLogin(email,password){
  if(!state.firebaseReady)throw new Error("ยังไม่ได้ตั้งค่า Firebase");
  const {signInWithEmailAndPassword}=fb.authFns,{doc,getDoc}=fb.fsFns;
  const cred=await signInWithEmailAndPassword(fb.auth,email,password);const ad=await getDoc(doc(fb.db,"admins",cred.user.uid));
  if(!ad.exists()){await fb.authFns.signOut(fb.auth);throw new Error("บัญชีนี้ยังไม่ได้รับสิทธิ์ผู้ดูแล");}
  state.currentAdmin=cred.user;startAdminRealtime();showScreen("#screenAdmin");
}
function startAdminRealtime(){
  if(state.demoMode){loadDemoAdmin();return;}
  const {collection,query,orderBy,onSnapshot}=fb.fsFns;
  state.unsubscribeResponses?.();state.unsubscribeSessions?.();
  state.unsubscribeResponses=onSnapshot(query(collection(fb.db,"responses"),orderBy("createdAt","desc")),snap=>{state.responses=snap.docs.map(d=>({id:d.id,...d.data()}));renderAdmin();});
  state.unsubscribeSessions=onSnapshot(query(collection(fb.db,"sessions"),orderBy("createdAt","desc")),snap=>{state.sessions=snap.docs.map(d=>({id:d.id,...d.data()}));renderSessions();fillSessionSelectors();});
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
  state.sessions=sessions;state.responses=[...local,...seeds];state.currentAdmin={email:"demo@local"};renderSessions();fillSessionSelectors();renderAdmin();showScreen("#screenAdmin");
}
function averageScores(rows){const a={think:0,fight:0,fine:0,do:0};if(!rows.length)return a;COLORS.forEach(k=>a[k]=Math.round(rows.reduce((s,r)=>s+(Number(r.scores?.[k])||0),0)/rows.length));return a;}
function renderAdmin(){
  const rows=filteredResponses();$("#statTotal").textContent=rows.length;COLORS.forEach(k=>{$("#stat"+k[0].toUpperCase()+k.slice(1)).textContent=rows.filter(r=>r.dominant===k).length;});
  drawRadar("adminRadar",averageScores(rows),"adminRadar");drawDoughnut(rows);renderTable();renderTeamDNA();renderProjector();syncParticipantSelectionUI();
}
function drawDoughnut(rows){
  if(charts.adminDoughnut)charts.adminDoughnut.destroy();
  const finalData=COLORS.map(k=>rows.filter(r=>r.dominant===k).length);
  charts.adminDoughnut=new Chart($("#adminDoughnut"),{type:"doughnut",data:{labels:["THINK","FIGHT","FINE","DO"],datasets:[{data:[0,0,0,0],backgroundColor:["#426cff","#ff455d","#ffc938","#37d889"],borderColor:"#0b182a",borderWidth:4,hoverOffset:10}]},options:{responsive:true,maintainAspectRatio:false,cutout:"68%",plugins:{legend:{position:"bottom",labels:{color:"#b7c5d7",usePointStyle:true,font:{family:"Prompt"}}}},animation:{animateRotate:true,animateScale:true,duration:1500,easing:"easeOutQuart"}}});
  requestAnimationFrame(()=>requestAnimationFrame(()=>{charts.adminDoughnut.data.datasets[0].data=finalData;charts.adminDoughnut.update();}));
}
function renderTable(){
  const rows=participantFilteredRows();
  $("#adminTableBody").innerHTML=rows.length?rows.map(r=>`<tr class="${isResponseSelected(r.id)?"participant-row-selected":""}"><td class="col-check"><input class="response-check" data-response-check="${r.id}" type="checkbox" ${isResponseSelected(r.id)?"checked":""} /></td><td><div class="person-name">${escapeHtml(r.fullName||"—")}</div><div class="person-sub">${escapeHtml(r.email||"")}</div></td><td>${escapeHtml(r.sessionName||"—")}</td><td>${escapeHtml(r.organization||"—")}</td><td>${(r.selectedWords||[]).map(escapeHtml).join(" · ")}</td><td><span class="color-badge cb-${r.dominant}">${META()[r.dominant]?.label||"—"}</span></td><td><div class="score-mini">${COLORS.map(k=>`<i>${META()[k].label[0]} ${r.scores?.[k]??0}%</i>`).join("")}</div></td><td>${formatDate(r.createdAt)}</td><td><div class="row-actions"><button class="btn btn-ghost btn-sm" data-detail="${r.id}">ดูกราฟ</button><button class="btn btn-soft-danger btn-sm" data-delete-response="${r.id}">ลบ</button></div></td></tr>`).join(""):`<tr><td colspan="9" style="text-align:center;color:#7d8da2;padding:36px">ไม่พบข้อมูล</td></tr>`;
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
function renderTeamDNA(){
  const a=$("#dnaSessionA").value,b=$("#dnaSessionB").value;if(!a&&!b)return;
  const sa=state.sessions.find(s=>s.id===a),sb=state.sessions.find(s=>s.id===b),avA=averageScores(sessionRows(a)),avB=averageScores(sessionRows(b));
  const datasets=[];
  if(a)datasets.push({label:sa?.name||"A",data:[avA.think,avA.fight,avA.fine,avA.do],borderColor:"#75a0ff",backgroundColor:"rgba(66,108,255,.12)",pointBackgroundColor:"#75a0ff",pointBorderColor:"#07111f",pointBorderWidth:2,borderWidth:3,fill:true});
  if(b)datasets.push({label:sb?.name||"B",data:[avB.think,avB.fight,avB.fine,avB.do],borderColor:"#ff8e9b",backgroundColor:"rgba(255,69,93,.08)",pointBackgroundColor:"#ff8e9b",pointBorderColor:"#07111f",pointBorderWidth:2,borderWidth:3,fill:true});
  buildAnimatedRadar($("#teamRadar"),datasets,"team",{plugins:{legend:{display:true,labels:{color:"#c3cfdf",usePointStyle:true,font:{family:"Prompt"}}}}});
  const target=a?avA:avB;const sorted=COLORS.slice().sort((x,y)=>target[y]-target[x]),high=sorted[0],low=sorted.at(-1);
  $("#dnaInsight").innerHTML=`<div class="dna-note"><b>พลังเด่นของทีม</b><p><span style="color:${META()[high].color}">${META()[high].label}</span> สูงสุดเฉลี่ย ${target[high]}% — ${META()[high].teamwork}</p></div><div class="dna-note"><b>พลังที่มีน้อยที่สุด</b><p><span style="color:${META()[low].color}">${META()[low].label}</span> เฉลี่ย ${target[low]}% ควรเพิ่มบทบาท/มุมมองแบบ ${META()[low].thai} ในทีม</p></div><div class="dna-note"><b>ข้อเสนอแนะ</b><p>${teamAdvice(target)}</p></div>`;
}
function teamAdvice(avg){const sorted=COLORS.slice().sort((a,b)=>avg[b]-avg[a]);const hi=sorted[0],lo=sorted.at(-1);if(avg[hi]-avg[lo]>=20)return `ทีมเอนเอียงไปทาง ${META()[hi].label} ชัดเจน ควรสร้างพื้นที่ให้ ${META()[lo].label} มีบทบาทมากขึ้น เพื่อสมดุลการคิด การตัดสินใจ คน และการลงมือทำ`;return"ทีมมีองค์ประกอบ 4 สีค่อนข้างสมดุล เหมาะกับการแบ่งบทบาทตามจุดแข็งและจับคู่คนต่างสีให้ทำงานร่วมกัน";}

function showQr(sessionId){
  const s=state.sessions.find(x=>x.id===sessionId)||state.sessions.find(x=>x.id===selectedSessionId())||state.activeSession;
  if(!s){toast("กรุณาเลือก Session ก่อน");return;}
  const u=new URL(location.href);u.searchParams.set("session",s.id);u.hash="";
  $("#qrBox").innerHTML="";new QRCode($("#qrBox"),{text:u.toString(),width:220,height:220,colorDark:"#07111f",colorLight:"#fff",correctLevel:QRCode.CorrectLevel.H});$("#qrUrl").textContent=u.toString();$("#qrSessionTitle").textContent=s.name;openModal("#modalQr");
}

function csvData(rows){return [["ชื่อ-นามสกุล","Session","หน่วยงาน/กลุ่ม","อีเมล","คำที่เลือก","สีเด่น","สีรอง","THINK","FIGHT","FINE","DO","เวลา"],...rows.map(r=>[r.fullName||"",r.sessionName||"",r.organization||"",r.email||"",(r.selectedWords||[]).join("|"),r.dominant||"",r.secondary||"",r.scores?.think??0,r.scores?.fight??0,r.scores?.fine??0,r.scores?.do??0,formatDate(r.createdAt)])];}
function exportCsv(){const lines=csvData(filteredResponses()).map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");const blob=new Blob(["\ufeff"+lines],{type:"text/csv;charset=utf-8"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`talent-color-${Date.now()}.csv`;a.click();URL.revokeObjectURL(a.href);}
function exportXlsx(){const ws=XLSX.utils.aoa_to_sheet(csvData(filteredResponses())),wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,"Results");XLSX.writeFile(wb,`talent-color-${Date.now()}.xlsx`);}
async function exportPdf(){
  const {jsPDF}=window.jspdf;const doc=new jsPDF({orientation:"landscape",unit:"mm",format:"a4"});doc.setFontSize(16);doc.text("Talent Color Activity Summary",14,14);doc.setFontSize(10);
  const rows=filteredResponses();doc.text(`Participants: ${rows.length}`,14,22);const counts=COLORS.map(k=>`${META()[k].label}: ${rows.filter(r=>r.dominant===k).length}`).join("   ");doc.text(counts,14,29);
  const canvas=$("#adminRadar");const img=canvas.toDataURL("image/png",1);doc.addImage(img,"PNG",14,36,90,78);doc.text("See exported CSV/XLSX for participant-level detail.",115,45);doc.save(`talent-color-summary-${Date.now()}.pdf`);
}

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
  if(!confirm(`ลบข้อมูลของ ${row.fullName||"ผู้ใช้งาน"} ใช่หรือไม่?`))return;
  const removed=await removeResponsesByIds([id]);
  renderAdmin();
  toast(`ลบข้อมูลผู้ใช้แล้ว ${removed} รายการ`);
}
async function deleteSelectedResponses(){
  const ids=[...state.selectedResponseIds];
  if(!ids.length)return toast("กรุณาเลือกข้อมูลก่อน");
  if(!confirm(`ลบข้อมูลผู้เข้าร่วมที่เลือก ${ids.length} รายการ ใช่หรือไม่?`))return;
  const removed=await removeResponsesByIds(ids);
  renderAdmin();
  toast(`ลบข้อมูลที่เลือกแล้ว ${removed} รายการ`);
}
async function deleteSessionResponses(sessionId){
  if(!sessionId){toast("กรุณาเลือก Session ก่อน");return;}
  const session=state.sessions.find(s=>s.id===sessionId);
  const rows=state.responses.filter(r=>r.sessionId===sessionId);
  if(!rows.length){toast("Session นี้ยังไม่มีข้อมูลให้ลบ");return;}
  if(!confirm(`ลบข้อมูลผู้เข้าร่วมทั้งหมด ${rows.length} รายการ ของ ${session?.name||'Session นี้'} ใช่หรือไม่?`))return;
  const removed=await removeResponsesByIds(rows.map(r=>r.id));
  renderAdmin();
  toast(`ลบข้อมูล ${removed} รายการแล้ว`);
}
async function deleteSessionAndData(sessionId){
  if(!sessionId){toast("กรุณาเลือก Session ก่อน");return;}
  const session=state.sessions.find(s=>s.id===sessionId);
  if(!session)return toast("ไม่พบ Session นี้");
  const rows=state.responses.filter(r=>r.sessionId===sessionId);
  if(!confirm(`ต้องการลบทั้ง Session "${session.name}" และข้อมูลผู้เข้าร่วม ${rows.length} รายการ ใช่หรือไม่?`))return;
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
  toast(`ลบ Session ${session.name} เรียบร้อยแล้ว`);
}

async function loadAdminConfig(){
  $("#setGameTitle").value=state.config.gameTitle||"";$("#setGameTagline").value=state.config.gameTagline||"";$("#setHeroSubtitle").value=state.config.heroSubtitle||"";$("#setLogoUrl").value=state.config.logoUrl||"";
  $("#setPrivacyNotice").value=state.config.privacyNotice||"";$("#setRetentionDays").value=state.config.retentionDays||365;$("#setPrivacyEmail").value=state.config.privacyEmail||"";renderMappingEditor();
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
  applyBranding();toast("บันทึกการตั้งค่าแล้ว");
}
async function deleteExpired(){
  const days=Number(state.config.retentionDays||365),cutoff=Date.now()-days*86400000;
  if(!confirm(`ลบข้อมูลที่เก่ากว่า ${days} วัน ใช่หรือไม่?`))return;
  if(state.demoMode){let arr=JSON.parse(localStorage.getItem("talentColorDemoResponses")||"[]");arr=arr.filter(r=>new Date(r.createdAt).getTime()>=cutoff);localStorage.setItem("talentColorDemoResponses",JSON.stringify(arr));toast("ลบข้อมูล Demo ที่เกินกำหนดแล้ว");return;}
  const old=state.responses.filter(r=>{const d=r.createdAt?.toDate?r.createdAt.toDate():new Date(r.createdAt);return d.getTime()<cutoff;});
  for(const r of old)await fb.fsFns.deleteDoc(fb.fsFns.doc(fb.db,"responses",r.id));toast(`ลบ ${old.length} รายการแล้ว`);
}

function openProjector(){$("#projector").classList.remove("hidden");document.body.style.overflow="hidden";renderProjector();}
function closeProjector(){$("#projector").classList.add("hidden");document.body.style.overflow="";}
function renderProjector(){
  if($("#projector").classList.contains("hidden"))return;const rows=filteredResponses(),avg=averageScores(rows),sid=selectedSessionId(),s=state.sessions.find(x=>x.id===sid);
  $("#projectorSessionName").textContent=s?.name||"ผลรวมทุก Session";$("#projTotal").textContent=rows.length;COLORS.forEach(k=>$("#proj"+k[0].toUpperCase()+k.slice(1)).textContent=rows.filter(r=>r.dominant===k).length);
  drawRadar("projectorRadar",avg,"projector");const sorted=COLORS.slice().sort((a,b)=>avg[b]-avg[a]),hi=sorted[0],lo=sorted.at(-1);
  $("#projectorInsight").innerHTML=`<div class="dna-note"><b>สีเด่นของกลุ่ม</b><p><span style="color:${META()[hi].color}">${META()[hi].label}</span> เฉลี่ย ${avg[hi]}%</p></div><div class="dna-note"><b>สีที่น้อยที่สุด</b><p><span style="color:${META()[lo].color}">${META()[lo].label}</span> เฉลี่ย ${avg[lo]}%</p></div><div class="dna-note"><b>Team insight</b><p>${teamAdvice(avg)}</p></div>`;
}

async function saveResultCard(){
  const source=$("#shareCard");
  if(!source||!state.result)return toast("ยังไม่มีผลลัพธ์ให้สร้างการ์ด");
  toast("กำลังสร้าง Result Card แนวนอน…");
  let host=null,exportChart=null;
  try{
    host=document.createElement("div");
    host.className="export-clone-host";
    host.style.width="1920px";host.style.height="1080px";
    const clone=source.cloneNode(true);
    clone.classList.add("exporting");
    host.appendChild(clone);
    document.body.appendChild(host);
    const cloneCanvas=clone.querySelector("#resultRadar");
    if(cloneCanvas && window.Chart && state.result?.scores){
      cloneCanvas.width=620;cloneCanvas.height=620;cloneCanvas.classList.add("export-chart-canvas");
      exportChart=await renderStaticRadar(cloneCanvas,state.result.scores,16);
    }
    const canvas=await captureElementPng(clone,{backgroundColor:"#06111e",width:1920,height:1080});
    const safeName=(state.profile.fullName||"color-me").replace(/[\/:*?"<>|]+/g,"-");
    downloadCanvasPng(canvas,`COLOR-ME-LANDSCAPE-${safeName}-${Date.now()}.png`);
    toast("สร้าง Result Card แล้ว");
  }catch(e){console.error(e);toast("สร้าง Result Card ไม่สำเร็จ");}
  finally{exportChart?.destroy?.();host?.remove?.();}
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
    toast("สร้างการ์ดมือถือ 9:16 แล้ว");
  }catch(e){console.error(e);toast("สร้างการ์ดมือถือไม่สำเร็จ");}
  finally{chart?.destroy?.();host?.remove?.();}
}
async function saveCertificateCard(){
  const data=resultDataForExport();if(!data)return toast("ยังไม่มีผลลัพธ์ให้สร้างการ์ด");
  toast("กำลังสร้างการ์ดที่ระลึก / ประกาศนียบัตร…");
  let host=null,chart=null;
  try{
    const primary=data.primary,secondary=data.secondary,r=data.result;
    host=createExportHost(`<div class="certificate-export-card"><div class="gold-frame"></div><div class="certificate-header"><span class="eyebrow">CERTIFICATE OF COLOR SIGNATURE</span><h1>ประกาศนียบัตรลายเซ็นความเป็นคุณ</h1><p>เอกสารเชิงสร้างสรรค์นี้สรุปพลังเด่น บุคลิกการทำงาน การสื่อสาร และกราฟพลัง 4 สี จากกิจกรรม COLOR ME เพื่อใช้สะท้อนตัวตนและเก็บเป็นที่ระลึก</p></div><div class="certificate-name"><div class="label">ขอมอบให้แก่</div><h2>${escapeHtml(data.fullName)}</h2><div class="underline"></div></div><div class="certificate-main"><div class="certificate-panel"><div class="card-head compact-head"><div><span class="eyebrow">YOUR RADAR</span><h3>กราฟพลัง 4 สี</h3></div><span class="mini-tag">0–100%</span></div><div class="certificate-chart"><canvas id="certificateExportRadar"></canvas></div><div class="certificate-word-list">${exportWordPills(r.selectedWords,'certificate-word')}</div></div><div class="certificate-panel certificate-meta"><span class="eyebrow">SIGNATURE RESULT</span><h3 style="color:${primary.color}">${primary.title}</h3><div class="subtitle">พลังรอง <b>${secondary.label}</b> · ${secondary.thai} ช่วยเติมเต็มสไตล์ของคุณให้มีทั้งมุม ${primary.thai} และ ${secondary.thai} อย่างโดดเด่น</div><div class="certificate-score-row">${exportScorePills(r.scores,'certificate-score')}</div><div class="certificate-grid"><div class="certificate-block"><b>ลายเซ็นความเป็นคุณ</b><p>${escapeHtml(primary.strength)}</p></div><div class="certificate-block"><b>เมื่อทำงานร่วมกับทีม</b><p>${escapeHtml(primary.teamwork)}</p></div><div class="certificate-block"><b>คุณควรสื่อสารอย่างไร</b><p>${escapeHtml(COMMUNICATION[r.dominant][r.secondary]||COMMUNICATION[r.dominant].think)}</p></div><div class="certificate-block"><b>จุดที่ควรระวัง</b><p>${escapeHtml(primary.watch)}</p></div></div></div></div><div class="certificate-footer"><div class="certificate-sign"><i></i><b>${escapeHtml(data.meta||'COLOR ME Activity')}</b><span>Session / Organization</span></div><div class="certificate-sign"><i></i><b>${escapeHtml(data.dateText)}</b><span>วันที่ออกผลลัพธ์</span></div><div class="certificate-sign"><i></i><b>COLOR ME</b><span>Signature Experience</span></div></div></div>`,2000,1414);
    chart=await renderStaticRadar(host.querySelector('#certificateExportRadar'),r.scores,18);
    const canvas=await captureElementPng(host.firstElementChild,{backgroundColor:'#06111e',width:2000,height:1414});
    const safeName=data.fullName.replace(/[\/:*?"<>|]+/g,'-');
    downloadCanvasPng(canvas,`COLOR-ME-CERTIFICATE-${safeName}-${Date.now()}.png`);
    toast("สร้างการ์ดที่ระลึกแล้ว");
  }catch(e){console.error(e);toast("สร้างการ์ดที่ระลึกไม่สำเร็จ");}
  finally{chart?.destroy?.();host?.remove?.();}
}

function switchTab(name){$$(".admin-tab").forEach(b=>b.classList.toggle("active",b.dataset.tab===name));$$(".admin-tab-pane").forEach(p=>p.classList.toggle("active",p.id===`tab-${name}`));if(name==="teamdna")renderTeamDNA();}
function wireEvents(){
  $("#btnStart").addEventListener("click",()=>{if(state.activeSession?.isOpen===false)return toast("Session นี้ปิดรับคำตอบแล้ว");showScreen("#screenProfile");});
  $("#btnHow").addEventListener("click",()=>openModal("#modalHow"));$("#btnPrivacy").addEventListener("click",()=>openModal("#modalPrivacy"));$("#btnAdmin").addEventListener("click",()=>showScreen("#screenAdminLogin"));
  $$("[data-go-home]").forEach(b=>b.addEventListener("click",()=>showScreen("#screenHome")));$$("[data-close-modal]").forEach(b=>b.addEventListener("click",()=>closeModal(b.closest(".modal"))));$$(".modal-x").forEach(b=>b.addEventListener("click",()=>closeModal(b.closest(".modal"))));
  $("#profileForm").addEventListener("submit",e=>{e.preventDefault();state.profile={fullName:$("#fullName").value.trim(),organization:$("#organization").value.trim(),email:$("#email").value.trim()};renderWords();showScreen("#screenWords");});
  $("#btnAnalyze").addEventListener("click",async()=>{if(state.selected.length!==5)return;$("#btnAnalyze").disabled=true;state.result=analyze();try{await checkDuplicateAndSave(state.result);}catch(e){$("#btnAnalyze").disabled=false;return toast(e.message);}renderReveal();showScreen("#screenReveal");setTimeout(()=>finishReveal(),3500);setTimeout(()=>{renderResult();showScreen("#screenResult");$("#btnAnalyze").disabled=false;},3900);});
  $("#btnRestart").addEventListener("click",()=>{state.selected=[];state.result=null;renderWords();showScreen("#screenWords");});$("#btnSaveImage").addEventListener("click",saveResultCard);$("#btnSaveStory").addEventListener("click",saveStoryCard);$("#btnSaveCertificate").addEventListener("click",saveCertificateCard);
  $("#btnBackToProfile")?.addEventListener("click",()=>showScreen("#screenProfile"));$("#btnBackToProfileBottom")?.addEventListener("click",()=>showScreen("#screenProfile"));

  $("#adminLoginForm").addEventListener("submit",async e=>{e.preventDefault();$("#adminLoginError").textContent="";try{await adminLogin($("#adminEmail").value.trim(),$("#adminPassword").value);}catch(ex){$("#adminLoginError").textContent=ex.message||"เข้าสู่ระบบไม่สำเร็จ";}});
  $("#btnDemoDashboard").addEventListener("click",loadDemoAdmin);$("#btnAdminLogout").addEventListener("click",async()=>{state.unsubscribeResponses?.();state.unsubscribeSessions?.();if(state.firebaseReady&&fb.auth.currentUser)await fb.authFns.signOut(fb.auth);state.currentAdmin=null;showScreen("#screenHome");});
  $$(".admin-tab").forEach(b=>b.addEventListener("click",()=>switchTab(b.dataset.tab)));
  $("#adminSessionFilter").addEventListener("change",()=>{clearResponseSelection();renderAdmin();});$("#adminSearch").addEventListener("input",()=>{clearResponseSelection();renderTable();});$("#adminColorFilter").addEventListener("change",()=>{clearResponseSelection();renderTable();});$("#selectAllResponses").addEventListener("change",e=>toggleAllFilteredResponses(e.target.checked));$("#selectAllResponsesHead").addEventListener("change",e=>toggleAllFilteredResponses(e.target.checked));$("#btnDeleteSelected").addEventListener("click",deleteSelectedResponses);
  $("#btnQr").addEventListener("click",()=>showQr(selectedSessionId()));$("#btnExportCsv").addEventListener("click",exportCsv);$("#btnExportXlsx").addEventListener("click",exportXlsx);$("#btnExportPdf").addEventListener("click",exportPdf);
  $("#btnNewSession").addEventListener("click",()=>openSessionModal());$("#sessionForm").addEventListener("submit",async e=>{e.preventDefault();await saveSession();closeModal($("#modalSession"));toast("บันทึก Session แล้ว");});
  $("#dnaSessionA").addEventListener("change",renderTeamDNA);$("#dnaSessionB").addEventListener("change",renderTeamDNA);$("#btnDeleteDnaA").addEventListener("click",()=>deleteSessionResponses($("#dnaSessionA").value));$("#btnDeleteDnaB").addEventListener("click",()=>deleteSessionResponses($("#dnaSessionB").value));
  $("#gameSettingsForm").addEventListener("submit",async e=>{e.preventDefault();const words=WORDS().map(w=>({...w,primary:$(`[data-map-primary="${w.id}"]`).value,secondary:$(`[data-map-secondary="${w.id}"]`).value}));await saveConfig({gameTitle:$("#setGameTitle").value.trim(),gameTagline:$("#setGameTagline").value.trim(),heroSubtitle:$("#setHeroSubtitle").value.trim(),logoUrl:$("#setLogoUrl").value.trim(),words});});
  $("#privacySettingsForm").addEventListener("submit",async e=>{e.preventDefault();await saveConfig({privacyNotice:$("#setPrivacyNotice").value.trim(),retentionDays:Number($("#setRetentionDays").value||365),privacyEmail:$("#setPrivacyEmail").value.trim()});});
  $("#btnDeleteExpired").addEventListener("click",deleteExpired);$("#btnProjector").addEventListener("click",openProjector);$("#btnCloseProjector").addEventListener("click",closeProjector);
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

(async function boot(){wireEvents();renderWords();setupPremiumMotion();await initFirebase();})();
