# COLOR ME — เกมรู้จักตัวเองผ่าน 5 คำ

เว็บกิจกรรมแบบ Static Web App สำหรับ GitHub Pages + Firebase

## สิ่งที่มีในชุดนี้

- หน้าเริ่มเกมแบบ Premium / Glass UI + Animation
- เก็บข้อมูลผู้เข้าร่วมก่อนเริ่ม
- เลือกคำได้ **5 คำจาก 22 คำ**
- ประมวลผลพลัง 4 สี
  - THINK — น้ำเงิน
  - FIGHT — แดง
  - FINE — เหลือง
  - DO — เขียว
- กราฟ Radar (Spider chart) รายบุคคล
- จุดแข็ง / การทำงานร่วมกับทีม / จุดที่ควรระวัง
- บันทึกผลเป็น PNG
- Admin Login ด้วย Firebase Authentication
- Admin Dashboard
  - จำนวนผู้เข้าร่วม
  - จำนวนสีเด่นแต่ละสี
  - Radar เฉลี่ยทั้งกลุ่ม
  - Doughnut สัดส่วนสีเด่น
  - ตารางรายบุคคล
  - ค้นหา / กรองสี
  - เปิดดู Radar รายคน
  - Export CSV
  - QR Code สำหรับเปิดหน้ากิจกรรม
- เก็บข้อมูลใน Cloud Firestore
- รองรับมือถือ
- Demo mode สำหรับพรีวิวก่อนตั้งค่า Firebase

> หมายเหตุ: ระบบนี้เป็นกิจกรรมเพื่อ Self-reflection / Team learning ไม่ใช่แบบทดสอบทางจิตวิทยามาตรฐาน

---

## 1. ตั้งค่า Firebase

### 1.1 สร้าง Project
เข้า Firebase Console แล้วสร้าง Project ใหม่

### 1.2 เพิ่ม Web App
Project settings > Your apps > Add app > Web

คัดลอก `firebaseConfig`

เปิดไฟล์:

`firebase-config.js`

แล้วแทนค่า:

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

### 1.3 เปิด Authentication
Firebase Console > Authentication > Sign-in method

เปิด 2 Provider:

1. **Anonymous** — สำหรับผู้เข้าร่วมกิจกรรม
2. **Email/Password** — สำหรับ Admin

### 1.4 สร้าง Firestore
Firestore Database > Create database

เลือก Region ที่เหมาะสมกับผู้ใช้ของคุณ

### 1.5 ใส่ Security Rules
Firestore > Rules

คัดลอกจากไฟล์ `firestore.rules` แล้วกด Publish

---

## 2. สร้างบัญชี Admin

1. Firebase Console > Authentication > Users > Add user
2. สร้างอีเมลและรหัสผ่านของ Admin
3. คัดลอก **UID** ของผู้ใช้นั้น
4. Firestore > Start collection
5. Collection ID = `admins`
6. Document ID = **UID ของ Admin**
7. เพิ่ม field เช่น:
   - `role` = `admin`
   - `name` = `ผู้ดูแลกิจกรรม`

จากนั้นบัญชีนี้จะเข้า `/หน้า Admin` ในเว็บได้

---

## 3. Collection ที่ระบบใช้

### `responses`
ตัวอย่างเอกสาร:

```json
{
  "fullName": "สมชาย ตัวอย่าง",
  "organization": "กลุ่ม A",
  "participantCode": "A001",
  "email": "",
  "selectedWords": ["คิด", "วางแผน", "วิเคราะห์", "เข้าใจ", "เป็นระบบ"],
  "scores": {
    "think": 48,
    "fight": 8,
    "fine": 20,
    "do": 24
  },
  "dominant": "think",
  "secondary": "do",
  "consent": true,
  "uid": "firebase-anonymous-uid",
  "createdAt": "server timestamp"
}
```

### `admins`
Document ID ต้องตรงกับ Firebase Authentication UID ของ Admin

---

## 4. อัปขึ้น GitHub Pages

### วิธีผ่านหน้าเว็บ GitHub
1. สร้าง Repository ใหม่ เช่น `color-me-game`
2. Upload ไฟล์ทั้งหมดจากโฟลเดอร์นี้ขึ้น Repository
3. ไปที่ **Settings > Pages**
4. Source: `Deploy from a branch`
5. Branch: `main`
6. Folder: `/ (root)`
7. Save
8. รอสักครู่ GitHub จะให้ URL เช่น

`https://USERNAME.github.io/color-me-game/`

กดปุ่ม `QR เข้าร่วม` ใน Dashboard เพื่อสร้าง QR จาก URL ที่กำลังเปิดอยู่

---

## 5. ทดสอบในเครื่อง

เพราะ `app.js` ใช้ ES Module ไม่ควรเปิดด้วย `file:///...`

ใช้วิธีใดวิธีหนึ่ง:

### VS Code
ติดตั้ง Live Server แล้วคลิก `Open with Live Server`

### Python
```bash
python -m http.server 8080
```

แล้วเปิด:

`http://localhost:8080`

---

## 6. วิธีคิดคะแนน

คำแต่ละคำมี:
- สีหลัก = 1.00 คะแนน
- สีรอง = 0.35 คะแนน

เมื่อเลือกครบ 5 คำ ระบบรวมคะแนนและแปลงเป็นเปอร์เซ็นต์ 4 สี

ข้อดีคือกราฟไม่แข็งเป็นการนับ 0–5 เพียงอย่างเดียว และสะท้อน “มิติรอง” ของคำได้ด้วย

แก้ mapping ได้ใน `app.js` ที่ตัวแปร `WORDS`

---

## 7. สิ่งที่แนะนำให้เพิ่มก่อนใช้จริงกับงานใหญ่

- หน้า Consent / Privacy Notice ฉบับเต็ม
- กำหนดรอบกิจกรรม เช่น รุ่น / ห้อง / Session ID
- เปิด/ปิดรับคำตอบจาก Admin
- จำกัด 1 ครั้งต่อรหัสผู้เข้าร่วม
- QR แยกตาม Session
- Dashboard เปรียบเทียบแต่ละกลุ่ม/หน่วยงาน
- Export Excel และ PDF Report
- Projector Mode สำหรับฉายผลรวมสดโดยไม่โชว์ชื่อ
- ตั้งชื่อกิจกรรม/โลโก้/สีธีมจากหน้า Admin
- ลบข้อมูลตามระยะเวลาที่กำหนด (Data retention)
- ถ้าต้องการใช้เป็นแบบประเมินเชิงวิชาการจริง ควรผ่านการออกแบบข้อคำถามและตรวจสอบความเที่ยงตรง/ความเชื่อมั่นก่อน

---

## โครงไฟล์

```text
talent-color-game/
├─ index.html
├─ styles.css
├─ app.js
├─ firebase-config.js
├─ firestore.rules
└─ README.md
```
