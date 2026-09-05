import { firebaseConfig } from "./firebase-config.js";

const COLOR_META = {
  think: {
    label: "THINK",
    thai: "คิด",
    color: "#426cff",
    title: "THINK · นักคิดเชิงระบบ",
    subtitle: "คุณเด่นด้านการคิด วิเคราะห์ วางแผน และเชื่อมโยงข้อมูลก่อนตัดสินใจ",
    strength: "มองภาพรวมได้ดี จับประเด็นเก่ง ชอบเหตุผลและโครงสร้างที่ชัดเจน",
    teamwork: "จะทำงานได้ดีที่สุดเมื่อมีข้อมูล เป้าหมาย และเวลาสำหรับคิดอย่างเพียงพอ",
    watch: "ระวังคิดนานเกินไป หรือมองหาความสมบูรณ์จนเริ่มลงมือช้า"
  },
  fight: {
    label: "FIGHT",
    thai: "ลุย",
    color: "#ff455d",
    title: "FIGHT · นักขับเคลื่อน",
    subtitle: "คุณเด่นด้านพลังการตัดสินใจ ความรับผิดชอบ และการผลักดันให้สิ่งต่าง ๆ เดินหน้า",
    strength: "กล้าตัดสินใจ รับแรงกดดันได้ดี และพร้อมรับผิดชอบต่อผลลัพธ์",
    teamwork: "เหมาะกับบทบาทที่ต้องตั้งเป้าหมาย ตัดสินใจเร็ว และปลุกพลังทีม",
    watch: "ระวังเร่งจังหวะเร็วเกินไปจนคนที่ต้องการเวลาคิดหรือรายละเอียดตามไม่ทัน"
  },
  fine: {
    label: "FINE",
    thai: "ละเอียด",
    color: "#ffc938",
    title: "FINE · นักใส่ใจคุณค่า",
    subtitle: "คุณเด่นด้านความละเอียด ความเข้าใจคน ความเสมอภาค และบรรยากาศที่ดี",
    strength: "รับรู้อารมณ์และความต้องการของคนรอบตัว เก็บรายละเอียด และคำนึงถึงคุณภาพ",
    teamwork: "ช่วยประสานทีม ลดความขัดแย้ง และทำให้งานมีความรอบคอบมากขึ้น",
    watch: "ระวังเกรงใจหรือให้ความสำคัญกับทุกมุมมากเกินไปจนตัดสินใจช้า"
  },
  do: {
    label: "DO",
    thai: "ทำ",
    color: "#37d889",
    title: "DO · นักลงมือสร้างผลลัพธ์",
    subtitle: "คุณเด่นด้านการลงมือทำ การจัดขั้นตอน และเปลี่ยนแนวคิดให้กลายเป็นผลลัพธ์จริง",
    strength: "ทำงานเป็นขั้นตอน แก้ปัญหาหน้างานได้ และชอบเห็นความคืบหน้าที่จับต้องได้",
    teamwork: "เหมาะกับงานปฏิบัติ การจัดระบบ กระบวนการ และการทำให้แผนเกิดขึ้นจริง",
    watch: "ระวังรีบลงมือก่อนเห็นภาพรวม หรือให้ความสำคัญกับการทำจนลืมทบทวนทิศทาง"
  }
};

// 22 คำอิงจากภาพตัวอย่างของผู้ใช้
// primary = สีหลักของคำนั้น, secondary = น้ำหนักเสริม เพื่อให้กราฟมีมิติมากกว่าการนับคำแบบ 1:1
const WORDS = [
  { id:1, text:"ปัญญา", primary:"think", secondary:"fine" },
  { id:2, text:"วางแผน", primary:"think", secondary:"do" },
  { id:3, text:"ดี", primary:"fine", secondary:"think" },
  { id:4, text:"คิด", primary:"think", secondary:"fine" },
  { id:5, text:"ฉับไว", primary:"fight", secondary:"do" },
  { id:6, text:"ตรงประเด็น", primary:"think", secondary:"fight" },
  { id:7, text:"รับผิดชอบ", primary:"fight", secondary:"do" },
  { id:8, text:"สร้างโอกาส", primary:"fight", secondary:"think" },
  { id:9, text:"ทำ", primary:"do", secondary:"fight" },
  { id:10, text:"เห็นอกเห็นใจ", primary:"fine", secondary:"do" },
  { id:11, text:"รักอิสระ", primary:"think", secondary:"fight" },
  { id:12, text:"เสมอภาค", primary:"fine", secondary:"think" },
  { id:13, text:"พัฒนาแนวคิด", primary:"think", secondary:"fight" },
  { id:14, text:"ลงมือ", primary:"do", secondary:"fight" },
  { id:15, text:"ขั้นตอน", primary:"do", secondary:"think" },
  { id:16, text:"มนุษยธรรม", primary:"fine", secondary:"do" },
  { id:17, text:"วิเคราะห์", primary:"think", secondary:"fine" },
  { id:18, text:"เป็นระบบ", primary:"do", secondary:"think" },
  { id:19, text:"ไหวพริบ", primary:"fight", secondary:"think" },
  { id:20, text:"ลุย", primary:"fight", secondary:"do" },
  { id:21, text:"สร้างระบบ", primary:"do", secondary:"think" },
  { id:22, text:"เข้าใจ", primary:"fine", secondary:"think" }
];

let state = {
  profile: {},
  selected: [],
  result: null,
  responses: [],
  demoMode: false,
  firebaseReady: false,
  currentAdmin: null
};
let charts = { result:null, adminRadar:null, adminDoughnut:null, detail:null };
let fb = {};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function isConfigured(){
  return firebaseConfig.apiKey && !firebaseConfig.apiKey.includes("PASTE_") &&
         firebaseConfig.projectId && !firebaseConfig.projectId.includes("PASTE_");
}

async function initFirebase(){
  if(!isConfigured()){
    state.demoMode = true;
    $("#modeBadge").classList.remove("hidden");
    $("#btnDemoDashboard").classList.remove("hidden");
    console.info("Firebase ยังไม่ได้ตั้งค่า: ระบบอยู่ใน Demo mode");
    return;
  }
  try{
    const appMod = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js");
    const authMod = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js");
    const fsMod = await import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js");
    const app = appMod.initializeApp(firebaseConfig);
    fb.auth = authMod.getAuth(app);
    fb.db = fsMod.getFirestore(app);
    fb.authFns = authMod;
    fb.fsFns = fsMod;
    state.firebaseReady = true;
  }catch(err){
    console.error(err);
    state.demoMode = true;
    $("#modeBadge").classList.remove("hidden");
    $("#btnDemoDashboard").classList.remove("hidden");
    toast("เชื่อมต่อ Firebase ไม่สำเร็จ — เปิด Demo mode");
  }
}

function showScreen(id){
  $$(".screen").forEach(s=>s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}
function openModal(id){ $(id).classList.add("open"); $(id).setAttribute("aria-hidden","false"); }
function closeModal(m){ m.classList.remove("open"); m.setAttribute("aria-hidden","true"); }
function toast(msg){
  const t=$("#toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(t._timer); t._timer=setTimeout(()=>t.classList.remove("show"),2600);
}
function escapeHtml(s=""){
  return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
}
function formatDate(v){
  let d;
  if(!v) return "—";
  if(v?.toDate) d=v.toDate();
  else d=new Date(v);
  if(Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("th-TH",{dateStyle:"medium",timeStyle:"short"}).format(d);
}

function renderWords(){
  const cloud=$("#wordCloud");
  cloud.innerHTML=WORDS.map((w,i)=>`
    <button type="button" class="word-card" data-id="${w.id}" data-color="${w.primary}"
      style="animation:fadeUp .45s ease ${i*0.025}s both">
      ${w.text}
    </button>`).join("");
  cloud.querySelectorAll(".word-card").forEach(btn=>{
    btn.addEventListener("click",()=>toggleWord(Number(btn.dataset.id)));
  });
  syncWordUI();
}
function toggleWord(id){
  if(state.selected.includes(id)){
    state.selected=state.selected.filter(x=>x!==id);
  }else{
    if(state.selected.length>=5){ toast("เลือกได้สูงสุด 5 คำ"); return; }
    state.selected.push(id);
  }
  syncWordUI();
}
function syncWordUI(){
  $("#pickCount").textContent=state.selected.length;
  $$(".word-card").forEach(b=>b.classList.toggle("selected",state.selected.includes(Number(b.dataset.id))));
  const selected=state.selected.map(id=>WORDS.find(w=>w.id===id));
  $("#selectedChips").innerHTML=selected.length ? selected.map(w=>`<b>${w.text}</b>`).join("") : "<i>ยังไม่ได้เลือก</i>";
  $("#btnAnalyze").disabled=state.selected.length!==5;
}

function analyze(){
  const raw={think:0,fight:0,fine:0,do:0};
  const chosen=state.selected.map(id=>WORDS.find(w=>w.id===id));
  // primary 1.0 + secondary 0.35 ต่อคำ
  chosen.forEach(w=>{ raw[w.primary]+=1; raw[w.secondary]+=.35; });
  const total=Object.values(raw).reduce((a,b)=>a+b,0);
  const scores=Object.fromEntries(Object.entries(raw).map(([k,v])=>[k,Math.round(v/total*100)]));
  // แก้ rounding ให้รวม 100
  const sum=Object.values(scores).reduce((a,b)=>a+b,0);
  if(sum!==100){
    const maxKey=Object.keys(scores).sort((a,b)=>raw[b]-raw[a])[0];
    scores[maxKey]+=100-sum;
  }
  const ranking=Object.keys(scores).sort((a,b)=>scores[b]-scores[a] || ["think","fight","fine","do"].indexOf(a)-["think","fight","fine","do"].indexOf(b));
  return { scores, dominant:ranking[0], secondary:ranking[1], selectedWords:chosen.map(w=>w.text) };
}

async function saveResponse(result){
  const payload={
    fullName:state.profile.fullName,
    organization:state.profile.organization||"",
    participantCode:state.profile.participantCode||"",
    email:state.profile.email||"",
    selectedWords:result.selectedWords,
    scores:result.scores,
    dominant:result.dominant,
    secondary:result.secondary,
    consent:true,
    version:"1.0.0"
  };
  if(state.firebaseReady){
    try{
      const {signInAnonymously}=fb.authFns;
      const {collection,addDoc,serverTimestamp}=fb.fsFns;
      if(!fb.auth.currentUser) await signInAnonymously(fb.auth);
      await addDoc(collection(fb.db,"responses"),{...payload,uid:fb.auth.currentUser.uid,createdAt:serverTimestamp()});
      return true;
    }catch(err){ console.error(err); toast("บันทึกออนไลน์ไม่สำเร็จ แต่ยังแสดงผลให้คุณได้"); return false; }
  }else{
    const demo=JSON.parse(localStorage.getItem("talentColorDemoResponses")||"[]");
    demo.push({...payload,id:crypto.randomUUID?.()||String(Date.now()),createdAt:new Date().toISOString()});
    localStorage.setItem("talentColorDemoResponses",JSON.stringify(demo));
    return true;
  }
}

function renderResult(){
  const r=state.result, primary=COLOR_META[r.dominant], second=COLOR_META[r.secondary];
  $("#resultTitle").textContent=primary.title;
  $("#resultTitle").style.color=primary.color;
  $("#resultSubtitle").textContent=`สีรองของคุณคือ ${second.label} · ${second.thai} — เมื่อสองพลังนี้อยู่ด้วยกัน คุณจึงมีสไตล์เฉพาะตัวที่ทั้ง ${primary.thai} และ ${second.thai} ในแบบของคุณ`;
  $("#resultScorePills").innerHTML=["think","fight","fine","do"].map(k=>`<span class="score-pill"><b style="color:${COLOR_META[k].color}">${COLOR_META[k].label}</b> ${r.scores[k]}%</span>`).join("");
  $("#resultWords").innerHTML=r.selectedWords.map(w=>`<span class="result-word">${escapeHtml(w)}</span>`).join("");
  $("#insightContent").innerHTML=`
    <div class="insight-block"><h4>✦ จุดแข็งที่เด่น</h4><p>${primary.strength}</p></div>
    <div class="insight-block"><h4>✦ เวลาทำงานกับทีม</h4><p>${primary.teamwork}</p></div>
    <div class="insight-block"><h4>✦ พลังเสริมจาก ${second.label}</h4><p>${second.strength}</p></div>
    <div class="insight-block"><h4>✦ จุดที่ควรระวัง</h4><p>${primary.watch}</p></div>`;
  drawRadar("resultRadar",r.scores,"result");
  const gradient=`radial-gradient(circle at 50% 0%,${primary.color}30,transparent 48%)`;
  $("#screenResult").style.backgroundImage=gradient;
}

function radarData(scores){
  return {
    labels:["THINK · คิด","FIGHT · ลุย","FINE · ละเอียด","DO · ทำ"],
    datasets:[{
      label:"พลังของคุณ",
      data:[scores.think,scores.fight,scores.fine,scores.do],
      borderWidth:2,
      pointRadius:4,
      pointHoverRadius:6,
      fill:true,
      backgroundColor:"rgba(116,129,255,.20)",
      borderColor:"rgba(145,164,255,.95)",
      pointBackgroundColor:["#426cff","#ff455d","#ffc938","#37d889"],
      pointBorderColor:"#07111f"
    }]
  };
}
function baseChartOptions(){
  return {
    responsive:true,maintainAspectRatio:false,
    scales:{r:{
      min:0,max:100,ticks:{display:false,stepSize:20},
      grid:{color:"rgba(255,255,255,.09)"},
      angleLines:{color:"rgba(255,255,255,.09)"},
      pointLabels:{color:"#c3cfdf",font:{family:"Prompt",size:11}}
    }},
    plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>`${c.raw}%`}}},
    animation:{duration:1100,easing:"easeOutQuart"}
  };
}
function drawRadar(canvasId,scores,key){
  if(charts[key]) charts[key].destroy();
  const ctx=document.getElementById(canvasId);
  if(!ctx || !window.Chart) return;
  charts[key]=new Chart(ctx,{type:"radar",data:radarData(scores),options:baseChartOptions()});
}

async function enterAdmin(){
  showScreen("#screenAdminLogin");
}
async function adminLogin(email,password){
  if(!state.firebaseReady) throw new Error("ยังไม่ได้ตั้งค่า Firebase");
  const {signInWithEmailAndPassword}=fb.authFns;
  const {doc,getDoc}=fb.fsFns;
  const cred=await signInWithEmailAndPassword(fb.auth,email,password);
  const adminDoc=await getDoc(doc(fb.db,"admins",cred.user.uid));
  if(!adminDoc.exists()){
    await fb.authFns.signOut(fb.auth);
    throw new Error("บัญชีนี้ยังไม่ได้รับสิทธิ์ผู้ดูแล");
  }
  state.currentAdmin=cred.user;
  await loadAdminData();
  showScreen("#screenAdmin");
}
async function loadAdminData(){
  if(!state.firebaseReady) return;
  const {collection,getDocs,query,orderBy}=fb.fsFns;
  const snap=await getDocs(query(collection(fb.db,"responses"),orderBy("createdAt","desc")));
  state.responses=snap.docs.map(d=>({id:d.id,...d.data()}));
  renderAdmin();
}
function loadDemoAdmin(){
  const local=JSON.parse(localStorage.getItem("talentColorDemoResponses")||"[]");
  const seeds=[
    {id:"d1",fullName:"ตัวอย่าง ก.",organization:"กลุ่ม A",participantCode:"A001",selectedWords:["คิด","วางแผน","วิเคราะห์","เข้าใจ","สร้างระบบ"],scores:{think:48,fight:10,fine:19,do:23},dominant:"think",secondary:"do",createdAt:new Date(Date.now()-3600000).toISOString()},
    {id:"d2",fullName:"ตัวอย่าง ข.",organization:"กลุ่ม B",participantCode:"B014",selectedWords:["ลุย","ฉับไว","รับผิดชอบ","ลงมือ","สร้างโอกาส"],scores:{think:12,fight:47,fine:6,do:35},dominant:"fight",secondary:"do",createdAt:new Date(Date.now()-7200000).toISOString()},
    {id:"d3",fullName:"ตัวอย่าง ค.",organization:"กลุ่ม A",participantCode:"A019",selectedWords:["เห็นอกเห็นใจ","เสมอภาค","ดี","เข้าใจ","มนุษยธรรม"],scores:{think:18,fight:3,fine:60,do:19},dominant:"fine",secondary:"do",createdAt:new Date(Date.now()-10800000).toISOString()},
    {id:"d4",fullName:"ตัวอย่าง ง.",organization:"กลุ่ม C",participantCode:"C008",selectedWords:["ทำ","ลงมือ","ขั้นตอน","เป็นระบบ","สร้างระบบ"],scores:{think:20,fight:18,fine:3,do:59},dominant:"do",secondary:"think",createdAt:new Date(Date.now()-14400000).toISOString()}
  ];
  state.responses=[...local,...seeds];
  state.currentAdmin={email:"demo@local"};
  renderAdmin();
  showScreen("#screenAdmin");
}
function renderAdmin(){
  const rows=state.responses;
  $("#statTotal").textContent=rows.length;
  ["think","fight","fine","do"].forEach(k=>{
    const el=$("#stat"+k[0].toUpperCase()+k.slice(1));
    if(el) el.textContent=rows.filter(r=>r.dominant===k).length;
  });
  const avg={think:0,fight:0,fine:0,do:0};
  if(rows.length) Object.keys(avg).forEach(k=>avg[k]=Math.round(rows.reduce((s,r)=>s+(Number(r.scores?.[k])||0),0)/rows.length));
  drawRadar("adminRadar",avg,"adminRadar");
  drawDoughnut(rows);
  renderTable();
}
function drawDoughnut(rows){
  if(charts.adminDoughnut) charts.adminDoughnut.destroy();
  const counts=["think","fight","fine","do"].map(k=>rows.filter(r=>r.dominant===k).length);
  charts.adminDoughnut=new Chart($("#adminDoughnut"),{
    type:"doughnut",
    data:{labels:["THINK","FIGHT","FINE","DO"],datasets:[{data:counts,backgroundColor:["#426cff","#ff455d","#ffc938","#37d889"],borderColor:"#0b182a",borderWidth:4,hoverOffset:7}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:"68%",plugins:{legend:{position:"bottom",labels:{color:"#b7c5d7",usePointStyle:true,padding:18,font:{family:"Prompt",size:11}}}},animation:{duration:1000}}
  });
}
function renderTable(){
  const q=$("#adminSearch").value.trim().toLowerCase(), cf=$("#adminColorFilter").value;
  const rows=state.responses.filter(r=>{
    const hay=[r.fullName,r.organization,r.participantCode,r.email].join(" ").toLowerCase();
    return (!q||hay.includes(q)) && (!cf||r.dominant===cf);
  });
  $("#adminTableBody").innerHTML=rows.length?rows.map(r=>`
    <tr>
      <td><div class="person-name">${escapeHtml(r.fullName||"—")}</div><div class="person-sub">${escapeHtml(r.participantCode||r.email||"")}</div></td>
      <td>${escapeHtml(r.organization||"—")}</td>
      <td>${(r.selectedWords||[]).map(escapeHtml).join(" · ")}</td>
      <td><span class="color-badge cb-${r.dominant}">${COLOR_META[r.dominant]?.label||"—"}</span></td>
      <td><div class="score-mini">${["think","fight","fine","do"].map(k=>`<i>${COLOR_META[k].label[0]} ${r.scores?.[k]??0}%</i>`).join("")}</div></td>
      <td>${formatDate(r.createdAt)}</td>
      <td><button class="btn btn-ghost btn-sm" data-detail="${r.id}">ดูกราฟ</button></td>
    </tr>`).join(""):`<tr><td colspan="7" style="text-align:center;color:#7d8da2;padding:36px">ไม่พบข้อมูล</td></tr>`;
  $$("[data-detail]").forEach(b=>b.addEventListener("click",()=>showDetail(b.dataset.detail)));
}
function showDetail(id){
  const r=state.responses.find(x=>String(x.id)===String(id)); if(!r)return;
  $("#detailContent").innerHTML=`
    <span class="eyebrow">INDIVIDUAL RESULT</span>
    <h3 class="detail-title">${escapeHtml(r.fullName||"—")}</h3>
    <div class="detail-meta">${escapeHtml(r.organization||"ไม่ระบุหน่วยงาน")} · ${formatDate(r.createdAt)}</div>
    <div class="detail-words">${(r.selectedWords||[]).map(w=>`<span class="result-word">${escapeHtml(w)}</span>`).join("")}</div>`;
  openModal("#modalDetail");
  setTimeout(()=>drawRadar("detailRadar",r.scores||{think:0,fight:0,fine:0,do:0},"detail"),50);
}
function exportCsv(){
  const headers=["ชื่อ-นามสกุล","หน่วยงาน/กลุ่ม","รหัส","อีเมล","คำที่เลือก","สีเด่น","สีรอง","THINK","FIGHT","FINE","DO","เวลา"];
  const lines=[headers,...state.responses.map(r=>[
    r.fullName||"",r.organization||"",r.participantCode||"",r.email||"",
    (r.selectedWords||[]).join("|"),r.dominant||"",r.secondary||"",
    r.scores?.think??0,r.scores?.fight??0,r.scores?.fine??0,r.scores?.do??0,formatDate(r.createdAt)
  ])].map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
  const blob=new Blob(["\ufeff"+lines],{type:"text/csv;charset=utf-8"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=`talent-color-results-${Date.now()}.csv`; a.click(); URL.revokeObjectURL(a.href);
}
function showQr(){
  const url=location.href.split("#")[0];
  $("#qrBox").innerHTML="";
  new QRCode($("#qrBox"),{text:url,width:220,height:220,colorDark:"#07111f",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H});
  $("#qrUrl").textContent=url;
  openModal("#modalQr");
}

async function saveResultImage(){
  const target=$("#screenResult");
  toast("กำลังสร้างภาพผลลัพธ์…");
  try{
    const canvas=await html2canvas(target,{backgroundColor:"#07111f",scale:2,useCORS:true});
    const a=document.createElement("a");a.download=`color-me-${Date.now()}.png`;a.href=canvas.toDataURL("image/png");a.click();
  }catch(e){console.error(e);toast("สร้างภาพไม่สำเร็จในเบราว์เซอร์นี้");}
}

function wireEvents(){
  $("#btnStart").addEventListener("click",()=>showScreen("#screenProfile"));
  $("#btnHow").addEventListener("click",()=>openModal("#modalHow"));
  $("#btnAdmin").addEventListener("click",enterAdmin);
  $$("[data-go-home]").forEach(b=>b.addEventListener("click",()=>showScreen("#screenHome")));
  $$("[data-close-modal]").forEach(b=>b.addEventListener("click",()=>closeModal(b.closest(".modal"))));
  $$(".modal-x").forEach(b=>b.addEventListener("click",()=>closeModal(b.closest(".modal"))));

  $("#profileForm").addEventListener("submit",e=>{
    e.preventDefault();
    state.profile={
      fullName:$("#fullName").value.trim(),
      organization:$("#organization").value.trim(),
      participantCode:$("#participantCode").value.trim(),
      email:$("#email").value.trim()
    };
    if(!state.profile.fullName)return;
    renderWords(); showScreen("#screenWords");
  });

  $("#btnAnalyze").addEventListener("click",async()=>{
    if(state.selected.length!==5)return;
    $("#btnAnalyze").disabled=true; $("#btnAnalyze").textContent="กำลังอ่านลายเซ็นสี…";
    state.result=analyze();
    await saveResponse(state.result);
    renderResult();
    showScreen("#screenResult");
    $("#btnAnalyze").textContent="วิเคราะห์ตัวเรา ✦"; $("#btnAnalyze").disabled=false;
  });
  $("#btnRestart").addEventListener("click",()=>{
    state.selected=[]; state.result=null; renderWords(); showScreen("#screenWords");
  });
  $("#btnSaveImage").addEventListener("click",saveResultImage);

  $("#adminLoginForm").addEventListener("submit",async e=>{
    e.preventDefault();
    const err=$("#adminLoginError");err.textContent="";
    try{
      await adminLogin($("#adminEmail").value.trim(),$("#adminPassword").value);
    }catch(ex){err.textContent=ex.message||"เข้าสู่ระบบไม่สำเร็จ";}
  });
  $("#btnDemoDashboard").addEventListener("click",loadDemoAdmin);
  $("#btnAdminLogout").addEventListener("click",async()=>{
    if(state.firebaseReady&&fb.auth.currentUser)await fb.authFns.signOut(fb.auth);
    state.currentAdmin=null;showScreen("#screenHome");
  });
  $("#adminSearch").addEventListener("input",renderTable);
  $("#adminColorFilter").addEventListener("change",renderTable);
  $("#btnExportCsv").addEventListener("click",exportCsv);
  $("#btnQr").addEventListener("click",showQr);
}

(async function boot(){
  wireEvents();
  renderWords();
  await initFirebase();
})();
