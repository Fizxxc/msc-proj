// Firebase 9 Modular - Versi Stabil

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBl9NUxK72jOvMqFvQXN4vOFkCOS5qw_BM",
  authDomain: "msc-prj-f6fa5.firebaseapp.com",
  projectId: "msc-prj-f6fa5",
  storageBucket: "msc-prj-f6fa5.firebasestorage.app",
  messagingSenderId: "285282351508",
  appId: "1:285282351508:web:55cecf2b37dad81285f781",
  measurementId: "G-25YMRKDNZN"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export function nowISO() {
  return new Date().toISOString();
}
