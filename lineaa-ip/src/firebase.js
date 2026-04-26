import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcn6yB9snROekAWi-a17A7MxdMSQRzlNo",
  authDomain: "lineaa-jewelry.firebaseapp.com",
  projectId: "lineaa-jewelry",
  storageBucket: "lineaa-jewelry.firebasestorage.app",
  messagingSenderId: "474536431081",
  appId: "1:474536431081:web:730a34892a2e580d3b8f78",
  measurementId: "G-C70XWYX2ND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
