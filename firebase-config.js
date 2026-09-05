// 1) ไปที่ Firebase Console > Project settings > Your apps > Web app
// 2) คัดลอกค่า firebaseConfig มาแทนที่ด้านล่าง
// 3) เปิด Authentication: Anonymous + Email/Password
// 4) สร้าง Firestore Database และวางกฎจากไฟล์ firestore.rules

export const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};
