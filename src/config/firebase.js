import { getAuth} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBehIS7f7RnBCvmVKvBFUQ9f0tbqpwvvwY",
  authDomain: "guest-vista-e47a4.firebaseapp.com",
  projectId: "guest-vista-e47a4",
  storageBucket: "guest-vista-e47a4.appspot.com",
  messagingSenderId: "791250202823",
  appId: "1:791250202823:web:34e8524b1bede0ba478ee2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()