// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyncX0RqUfXC5-3glgDCAWEMc2N1WQQVU",
  authDomain: "crm-system-645b4.firebaseapp.com",
  projectId: "crm-system-645b4",
  storageBucket: "crm-system-645b4.appspot.com",
  messagingSenderId: "730412061773",
  appId: "1:730412061773:web:8a376a377f7e427d3e3804"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);