# COLOR ME V6 — เกมรู้จักตัวเองผ่าน 5 คำ

Static Web App สำหรับ **GitHub Pages + Firebase Authentication + Cloud Firestore**

เวอร์ชันนี้เพิ่มระบบสำหรับใช้งานกิจกรรมจริงครบตามรายการ:

## ฟีเจอร์ V2

### ฝั่งผู้เข้าร่วม
- เลือก 5 คำจาก 22 คำ
- Session / รุ่นกิจกรรมผ่าน URL เช่น `?session=SESSION_ID`
- QR แยก Session
- Admin เปิด/ปิดรับคำตอบได้
- ป้องกัน 1 รหัสผู้เข้าร่วมทำซ้ำใน Session เดียว
- Animation “วงล้อสีประกอบตัว” ก่อนเฉลย
- Result Radar / Spider Chart
- สีหลัก + สีรอง
- จุดแข็ง / จุดควรระวัง
- คู่มือสื่อสารกับ THINK / FIGHT / FINE / DO
- สร้าง Premium Result Card เป็น PNG
- Privacy Notice + Consent

### ฝั่ง Admin
- Dashboard แบบ Real-time
- กรองตาม Session
- สร้าง/แก้ไข Session
- เปิด/ปิด Session
- QR แยก Session
- Projector Mode ไม่แสดงชื่อ
- Team DNA
- เปรียบเทียบ Radar ของ 2 Session
- วิเคราะห์สีเด่น / สีที่ขาด / สมดุลทีม
- ดูผลรายบุคคลพร้อม Radar
- ค้นหา / กรองสี
- Export CSV
- Export Excel (.xlsx)
- Export PDF Summary
- ตั้งชื่อเกม / Tagline / ข้อความหน้าแรก
- Mapping สีหลักและสีรองของ 22 คำโดยไม่แก้โค้ด
- Privacy Notice
- กำหนด Data Retention เป็นจำนวนวัน
- ปุ่มลบข้อมูลที่เกินระยะเวลาทันที

---

# การตั้งค่า Firebase

## 1) สร้าง Firebase Project

Firebase Console > Add project

## 2) เพิ่ม Web App

Project Settings > Your apps > Web

คัดลอกค่าไปใส่ `firebase-config.js`

```js
export const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

## 3) Authentication

เปิด Sign-in providers:

- Anonymous
- Email/Password

Anonymous ใช้สำหรับผู้เข้าร่วม
Email/Password ใช้สำหรับ Admin

## 4) Firestore Database

สร้าง Cloud Firestore

จากนั้นเปิด Rules และวางเนื้อหาจาก:

`firestore.rules`

---

# สร้าง Admin

1. Firebase Authentication > Users > Add user
2. สร้าง Email/Password
3. คัดลอก UID
4. Firestore > สร้าง Collection ชื่อ `admins`
5. Document ID = UID ของ Admin
6. field:
   - `role`: `admin`
   - `name`: ชื่อผู้ดูแล

---

# สำคัญ: ต้องสร้าง Session ก่อนใช้งานจริง

หลัง Login Admin:

1. ไปแท็บ **รอบกิจกรรม**
2. กด `+ สร้าง Session`
3. ตั้งชื่อ เช่น
   - รุ่นที่ 1 · สตท.1
   - รุ่นที่ 2 · สตท.2
   - รุ่นที่ 3 · สตท.10
4. ตั้งรหัส
5. เลือก `เปิดรับ`
6. กด QR
7. ให้ผู้เข้าร่วมสแกน

URL จะเป็นรูปแบบ:

`https://USERNAME.github.io/REPO/?session=SESSION_ID`

---

# ป้องกันการทำซ้ำ

ระบบสร้าง Document ID ของผลลัพธ์จาก:

`SHA-256(sessionId + participantCode)`

ดังนั้นรหัสเดียวกันสามารถทำได้อีกใน Session อื่น
แต่ **ทำซ้ำใน Session เดิมไม่ได้**

Firestore Rules อนุญาต `create` แต่ไม่อนุญาต `update`
จึงไม่สามารถเขียนทับผลเดิมได้

---

# Firestore Collections

## `sessions`
ตัวอย่าง:

```json
{
  "name": "รุ่นที่ 1 · สตท.1",
  "code": "R1-CAD1",
  "description": "กิจกรรมช่วงเช้า",
  "isOpen": true,
  "createdAt": "timestamp"
}
```

## `responses`
```json
{
  "fullName": "สมชาย ตัวอย่าง",
  "organization": "สตท.1",
  "participantCode": "A001",
  "selectedWords": ["คิด", "วางแผน", "วิเคราะห์", "เข้าใจ", "เป็นระบบ"],
  "scores": {
    "think": 48,
    "fight": 8,
    "fine": 20,
    "do": 24
  },
  "dominant": "think",
  "secondary": "do",
  "sessionId": "...",
  "sessionName": "รุ่นที่ 1 · สตท.1",
  "consent": true,
  "createdAt": "timestamp"
}
```

## `publicConfig/main`
เก็บ:
- ชื่อเกม
- Tagline
- ข้อความหน้าแรก
- Privacy Notice
- Data retention
- Mapping 22 คำ

## `admins/{UID}`
กำหนดสิทธิ์ผู้ดูแล

---

# GitHub Pages

1. สร้าง GitHub Repository
2. Upload ไฟล์ทั้งหมด
3. Settings > Pages
4. Source = Deploy from branch
5. Branch = `main`
6. Folder = `/ (root)`
7. Save

---

# ทดสอบในเครื่อง

อย่าเปิดผ่าน `file:///`

ใช้ VS Code Live Server หรือ:

```bash
python -m http.server 8080
```

แล้วเปิด:

`http://localhost:8080`

---

# Projector Mode

Admin เลือก Session ที่ Dashboard ก่อน แล้วกด **Projector Mode**

จะแสดง:
- จำนวนผู้เข้าร่วม
- THINK / FIGHT / FINE / DO
- Radar เฉลี่ย
- สีเด่น/สีที่ขาด
- Team Insight

ไม่แสดงชื่อผู้เข้าร่วม

ข้อมูลอัปเดตแบบ Real-time เมื่อใช้ Firebase

---

# Data Retention

Admin > Privacy

กำหนดจำนวนวัน เช่น `365`

ปุ่ม **ลบข้อมูลที่เกินกำหนดตอนนี้** จะลบผลที่เก่ากว่าจำนวนวันที่กำหนด

> ถ้าต้องการลบอัตโนมัติโดยไม่ต้องกด Admin ควรเพิ่ม Firebase Cloud Functions / Scheduled Function ภายหลัง

---

# ข้อควรระวัง

ระบบนี้เป็นเครื่องมือ Self-reflection / Team learning ไม่ใช่แบบทดสอบ MBTI จริง และไม่ใช่เครื่องมือวินิจฉัยทางจิตวิทยา

หากต้องการใช้ในงานวิจัยหรือการประเมินบุคลิกภาพเชิงวิชาการ ควรพัฒนาข้อคำถาม ตรวจสอบ validity / reliability และกำหนด scoring model ตามระเบียบวิธีวิจัย


---

# GitHub Pages — สำคัญมากสำหรับชุดนี้

ให้อัปโหลดไฟล์ **ทั้งหมดที่อยู่ใน ZIP นี้โดยตรงไว้ที่ root ของ Repository**
ไม่ต้องสร้างโฟลเดอร์ซ้อน

หน้า Repository ต้องเห็นไฟล์เหล่านี้ทันที:

```text
404.html
README.md
app.js
firebase-config.js
firestore.rules
index.html
styles.css
```

หลังอัปโหลด:
1. Settings > Pages
2. Deploy from a branch
3. Branch = main
4. Folder = / (root)
5. Save
6. รอ Deploy แล้วกด Ctrl + F5

## Firebase Authorized domains

Firebase Console > Authentication > Settings > Authorized domains

เพิ่ม:

```text
biwaomam040726-png.github.io
```

ไม่ต้องใส่ `https://` และไม่ต้องใส่ `/COLOR-ME/`

## ตรวจว่าเว็บเชื่อม Firebase จริง

เมื่อเปิดเว็บแล้ว:
- ป้าย `DEMO` ต้องไม่แสดง
- หน้า Admin ต้องไม่ขึ้น `ยังไม่ได้ตั้งค่า Firebase`
- Login Admin ต้องใช้บัญชีจาก Firebase Authentication


## V4 UI
- พื้นหลังคลื่นแสงและ mesh gradient
- วงล้อเคลื่อนไหวแบบลอยตัว
- การ์ดลอยและ parallax ตามเมาส์
- ปุ่มเงาไลท์และ glassmorphism พรีเมียม


## V5 changes
- ลบกล่องคำอธิบาย THINK/FIGHT/FINE/DO ด้านล่างหน้าแรก
- ลบช่องรหัสผู้เข้าร่วม
- ป้องกันส่งซ้ำด้วย Firebase Anonymous UID ต่อ Session แทน
- เพิ่มปุ่มกลับในหน้าเลือกคำ
- UI ปรับเป็น corporate premium: คอมโพเนนต์นิ่งขึ้น แต่ ambient wave/background motion ชัดขึ้น
- อัปเดต firestore.rules ให้รองรับโครงสร้างใหม่


## V6 — Blind selection + shared-device fix
- ตอนเลือกคำ ทุกคำใช้สีเดียวกัน ไม่เปิดเผยว่าแต่ละคำอยู่ใน THINK/FIGHT/FINE/DO
- ยกเลิกการล็อกแบบ 1 อุปกรณ์ต่อ Session
- ป้องกันซ้ำด้วย Session + ชื่อ–นามสกุล + หน่วยงาน/กลุ่ม
- คอมเครื่องเดียวสามารถให้ผู้เข้าร่วมหลายคนทำต่อกันได้
- คนเดิมใน Session เดิมยังส่งซ้ำไม่ได้ เพื่อไม่ให้ข้อมูล Dashboard ซ้ำ
