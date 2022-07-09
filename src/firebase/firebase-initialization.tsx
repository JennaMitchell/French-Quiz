// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCd8ZOUk98N_sU6VpS9scPeX80j9zdKYrk",

  authDomain: "french-quiz-4be26.firebaseapp.com",

  projectId: "french-quiz-4be26",

  storageBucket: "french-quiz-4be26.appspot.com",

  messagingSenderId: "611620933988",

  appId: "1:611620933988:web:c22e5f2bbc55fe1147aa71",

  measurementId: "G-X4PLCLDR18",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const databaseTest = getDatabase(app);
const storage = getStorage(app);
const exportObject: any = [databaseTest, storage];

export default exportObject;
