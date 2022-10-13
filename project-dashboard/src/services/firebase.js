//import firebase from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyDpsQLdcD3flRFPt62BhrrWBTcgAX9FxXA",
    authDomain: "test-57f58.firebaseapp.com",
    databaseURL: "https://test-57f58-default-rtdb.firebaseio.com",
    projectId: "test-57f58",
    storageBucket: "test-57f58.appspot.com",
    messagingSenderId: "248103002375",
    appId: "1:248103002375:web:2cffce6b698189ebea25a2",
    measurementId: "G-QHTPR8MM0B"
  };

  firebase.initializeApp(config);

  export const firestore = firebase.firestore();
  
  
  export default firestore;