import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCfxNGW6AZtHvEYf1QP2sSPQE8v4Rkrmdg",
  authDomain: "ecommerce-app-7eec3.firebaseapp.com",
  projectId: "ecommerce-app-7eec3",
  storageBucket: "ecommerce-app-7eec3.appspot.com",
  messagingSenderId: "51946399490",
  appId: "1:51946399490:web:b4198f88db89fd2e76c41b",
  measurementId: "G-FLR574TZM3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Make these available to other modules if needed
window.firebase = { auth, db, storage };
