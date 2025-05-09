import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdf5AKFgLXgK2PYERHw1hgF_HsMmuTfuo",
  authDomain: "noproblem-55b97.firebaseapp.com",
  projectId: "noproblem-55b97",
  storageBucket: "noproblem-55b97.appspot.com",
  messagingSenderId: "316010224446",
  appId: "1:316010224446:web:5d7e7f792e53ee4b396a6f",
  measurementId: "G-VKSGWBRKVL"
};

const app = initializeApp(firebaseConfig); // تهيئة التطبيق
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };  // تصدير db بشكل صحيح
