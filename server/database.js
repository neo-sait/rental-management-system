const fb = require('firebase');

const firebaseConfig = {
    apiKey: "///Replace///",
    authDomain:"///Replace///",
    databaseURL: "///Replace///",
    projectId: "///Replace///",
    storageBucket: "///Replace///",
    messagingSenderId: "///Replace///",
    appId: "///Replace///",
    measurementId: "///Replace///",
  };

const db = fb.initializeApp(firebaseConfig);

module.exports = db;
