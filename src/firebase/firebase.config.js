import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVIdyHD_LKl9IEdSufQg0ONLmtf2Ui00c",
  authDomain: "gowheels-990.firebaseapp.com",
  projectId: "gowheels-990",
  storageBucket: "gowheels-990.firebasestorage.app",
  messagingSenderId: "181942108722",
  appId: "1:181942108722:web:a43d037e0886b8ac58f22b",
  measurementId: "G-GEQV3B0SBB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;