import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

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
// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Firestore exports
export const firestore = firebase.firestore();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

// Storage exports
export const storage = firebase.storage();

/// Helper functions
/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
 export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}
/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
 export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}