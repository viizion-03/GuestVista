
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {//firebase config object
    apiKey: "AIzaSyAM6XelTYtg4EaKvYM4L6k96FMI3IDSftw",
    authDomain: "guestvista-4308f.firebaseapp.com",
    projectId: "guestvista-4308f",
    storageBucket: "guestvista-4308f.appspot.com",
    messagingSenderId: "935264390170",
    appId: "1:935264390170:web:1b74417f1a14f7609f95a3",
    measurementId: "G-RVEK214LJ7"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);



  export default auth;