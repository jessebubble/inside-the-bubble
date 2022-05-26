import firebase from 'firebase/compat/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCz0UG_pTiHhVeINgBcEHgcxw0p-0G6Hs0",
    authDomain: "devbubble-f2269.firebaseapp.com",
    projectId: "devbubble-f2269",
    storageBucket: "devbubble-f2269.appspot.com",
    messagingSenderId: "272058335278",
    appId: "1:272058335278:web:d9a923c13b5397656d9fbf",
    measurementId: "G-P4Y2ZWXK84"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig) // only iniitalize app when length is zero
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();