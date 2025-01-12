import { initializeApp } from 'firebase/app';



import {getAuth, GoogleAuthProvider,FacebookAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAjQlzrPdGtroyS_Sff14Om92WYsWp5WLc",
  authDomain: "btauth-94c78.firebaseapp.com",
  projectId: "btauth-94c78",
  storageBucket: "btauth-94c78.firebasestorage.app",
  messagingSenderId: "534967778139",
  appId: "1:534967778139:web:b75e40b8795d08598cb87e",
  measurementId: "G-G8YNH851Z5"
};
// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const facebookProvider = new FacebookAuthProvider();

export {auth, googleProvider,facebookProvider}


