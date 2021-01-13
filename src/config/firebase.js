import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCENzshjArP0YQwdZFQPncEgmwD5KAxC6M",
  authDomain: "andideve-notes-app.firebaseapp.com",
  projectId: "andideve-notes-app",
  storageBucket: "andideve-notes-app.appspot.com",
  messagingSenderId: "921227114187",
  appId: "1:921227114187:web:772bad087b2714b4898d4e"
};
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();

export default firebase;
