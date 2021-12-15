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
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export type DocumentReference =
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

export async function getUserWithUsername(username: string) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

export function postToJSON(doc: any) {
  const data = doc.data();

  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.createdAt.toMillis(),
  };
}

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
