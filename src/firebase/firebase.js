const firebase = require("firebase/app"); // import * as firebase from 'firebase';

require('firebase/auth');
require('firebase/database');
// require("firebase/messaging");
// require("firebase/functions");
// console.log('accessed firebase config file');

const config = {
    apiKey: "AIzaSyCX0ZPeQO5eSQqZR3i43Vcx1EiFOX82wTc",
    authDomain: "expensify-4a98e.firebaseapp.com",
    databaseURL: "https://expensify-4a98e.firebaseio.com",
    projectId: "expensify-4a98e",
    storageBucket: "expensify-4a98e.appspot.com",
    messagingSenderId: "760636718951"
};
firebase.initializeApp(config);

const db = firebase.database();



export {firebase, db as default};