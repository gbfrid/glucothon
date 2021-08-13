import firebase from "firebase";

//Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyDKFjMZztPySPSdKILz-Y3_iaPzAJqZ3Qc",
  authDomain: "glucothon.firebaseapp.com",
  projectId: "glucothon",
  storageBucket: "glucothon.appspot.com",
  messagingSenderId: "503544722236",
  appId: "1:503544722236:web:31180abcb4a2f360f06439",
  // databaseURL: "https://glucothon-default-rtdb.firebaseio.com/",
  measurementId: "G-BDH5NWERE5"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();


//API

export const application_id = '58168d60';

export const application_key = '65a3322a4124fccabfce18b8b1ab7f8b';
