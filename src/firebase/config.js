import app from "firebase/app"
import firebase from "firebase";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC2MqaEM1g096MVoINNzqza9wP66nPDSV4",
    authDomain: "programacion-c0ee6.firebaseapp.com",
    projectId: "programacion-c0ee6",
    storageBucket: "programacion-c0ee6.appspot.com",
    messagingSenderId: "558088026112",
    appId: "1:558088026112:web:736872d5cc7658f7a900e5"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const db = app.firestore()
export const storage = app.storage()
