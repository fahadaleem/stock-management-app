// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSIW2dKjuDYdNFCOb5GwBbZGDJjcTe80I",
  authDomain: "stockmanagementapp-hamza.firebaseapp.com",
  projectId: "stockmanagementapp-hamza",
  storageBucket: "stockmanagementapp-hamza.appspot.com",
  messagingSenderId: "974921860577",
  appId: "1:974921860577:web:9077e414e3a087e35abea0",
  measurementId: "G-X0WCCFM67V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);
const auth = getAuth(app);

export { storage, auth };
