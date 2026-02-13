import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 🔐 Firebase Config (तुम्हारा असली config)
const firebaseConfig = {
  apiKey: "AIzaSyAbVpUncGYuGntuZslT3brB5rqCMJpiEfY",
  authDomain: "n-novel.firebaseapp.com",
  projectId: "n-novel",
  storageBucket: "n-novel.firebasestorage.app",
  messagingSenderId: "647987747126",
  appId: "1:647987747126:web:c9669690a1ad069762fb97",
  measurementId: "G-MSHVQW895M"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 📝 Signup
export async function signup(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      name: name,
      isPremium: false,
      role: "user",       // 👈 default role
      createdAt: new Date()
    });

    alert("Signup successful!");
  } catch (error) {
    console.error("Signup error:", error);
    alert(error.message);
  }
}

// 🔑 Login
export async function login(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message);
  }
}

// 👤 Auth State
export function checkAuthState(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// 🧠 Get User Data (role, premium etc.)
export async function getUserData(uid) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data();   // इसमें role + isPremium सब मिलेगा
  } else {
    return null;
  }
}
