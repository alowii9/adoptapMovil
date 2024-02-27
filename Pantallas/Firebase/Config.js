import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArdOd3a0RJi6T4OPyVa1Dnb_MAc80gfDY",
  authDomain: "adoptar-mascotas.firebaseapp.com",
  projectId: "adoptar-mascotas",
  storageBucket: "adoptar-mascotas.appspot.com",
  messagingSenderId: "721472218494",
  appId: "1:721472218494:web:541d7bce53301b38b33f2f",
  measurementId: "G-6XCG97PS44"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else{
  firebase.app();
}

const db = firebase.firestore();

export default db;