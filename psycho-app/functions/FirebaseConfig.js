import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "__FILTERED__",
    authDomain: "__FILTERED__.firebaseapp.com",
    databaseURL: "https://__FILTERED__.firebaseio.com",
    projectId: "__FILTERED__",
    storageBucket: "__FILTERED__.appspot.com",
    messagingSenderId: "__FILTERED__",
    appId: "__FILTERED__",
    measurementId: "__FILTERED__"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export const db = firebase;
