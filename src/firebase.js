import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZQcCokNb0Ja3y1W75YPe8rcbJ9Nw6cwc",
  authDomain: "react-blog-51950.firebaseapp.com",
  projectId: "react-blog-51950",
  storageBucket: "react-blog-51950.appspot.com",
  messagingSenderId: "330105330923",
  appId: "1:330105330923:web:1de43c4f985e3cb7da32ae",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
