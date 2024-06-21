// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2ajL9-W5MinlOV1Tjq50LWFC76OFqSRI",
  authDomain: "mobileproject-boer.firebaseapp.com",
  projectId: "mobileproject-boer",
  storageBucket: "mobileproject-boer.appspot.com",
  messagingSenderId: "1050227824810",
  appId: "1:1050227824810:web:95801181242bdfae6518d3",
  measurementId: "G-1XJEPD23N7",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
