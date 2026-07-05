import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
   apiKey: "AIzaSyBamlpjQ66SvBeAbwkvrzWld3Y9Z6lsOGc",
  authDomain: "anastasis-technologies-pvt-ltd.firebaseapp.com",
  projectId: "anastasis-technologies-pvt-ltd",
  storageBucket: "anastasis-technologies-pvt-ltd.firebasestorage.app",
  messagingSenderId: "1076972692429",
  appId: "1:1076972692429:web:7f4d7200b1f3a705aeda84",
};

// Initialize App Node instances
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);