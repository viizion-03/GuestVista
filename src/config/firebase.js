import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyAM6XelTYtg4EaKvYM4L6k96FMI3IDSftw",
  authDomain: "guestvista-4308f.firebaseapp.com",
  databaseURL: "https://guestvista-4308f-default-rtdb.firebaseio.com",
  projectId: "guestvista-4308f",
  storageBucket: "guestvista-4308f.appspot.com",
  messagingSenderId: "935264390170",
  appId: "1:935264390170:web:1b74417f1a14f7609f95a3",
  measurementId: "G-RVEK214LJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const analytics = getAnalytics(app);