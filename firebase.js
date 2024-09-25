import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyASS_Iewz5mQ3h7SSErHtrHKKO1Pb1OQ9E",
    authDomain: "lab4-cf9ec.firebaseapp.com",
    projectId: "lab4-cf9ec",
    storageBucket: "lab4-cf9ec.appspot.com",
    messagingSenderId: "720119911671",
    appId: "1:720119911671:web:3d38ea2563cc67f699eff2",
    measurementId: "G-32RKZSDMTX"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app); // Khởi tạo Firestore

// Export Firestore and other services
export { db, analytics };