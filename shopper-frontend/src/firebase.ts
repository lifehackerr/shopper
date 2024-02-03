
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXvlQMQxjX52TgAmfHDf-r9JVwzbb7Dvo",
  authDomain: "shopper-mern.firebaseapp.com",
  projectId: "shopper-mern",
  storageBucket: "shopper-mern.appspot.com",
  messagingSenderId: "266073552456",
  appId: "1:266073552456:web:e9af9db5b923c00ada0a7d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);