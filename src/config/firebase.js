import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage" 

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyDWLi5HbMCq3DXCiDDm3wFhvKni3cSd9f8",
  authDomain: "react-project-5130e.firebaseapp.com",
  projectId: "react-project-5130e",
  storageBucket: "react-project-5130e.appspot.com",
  messagingSenderId: "703952360317",
  appId: "1:703952360317:web:731eb70d162db44eb17214"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app);