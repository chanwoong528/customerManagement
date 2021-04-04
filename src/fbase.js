import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyCP8IBcRuVYA2ZtS4CmOcCKXb1-cNEAicM",
    authDomain: "customerlist-2bc62.firebaseapp.com",
    projectId: "customerlist-2bc62",
    storageBucket: "customerlist-2bc62.appspot.com",
    messagingSenderId: "829332383909",
    appId: "1:829332383909:web:edf2d2aaeb9b62eb60854c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();