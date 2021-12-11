import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig: Object = {
  apiKey: "AIzaSyDqzUWZpHjAJciws9BgL2uuYKKGHuVcnS8",
  authDomain: "readnext-1.firebaseapp.com",
  projectId: "readnext-1",
  storageBucket: "readnext-1.appspot.com",
  messagingSenderId: "483103238376",
  appId: "1:483103238376:web:c74084a00e28eb52c3c15d",
  measurementId: "${config.measurementId}",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
