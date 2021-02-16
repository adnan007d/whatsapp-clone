import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAVNstN13HSN1gHJJrvWI4W1px_mKnSnjs",
  authDomain: "whatsapp-clone-e38a8.firebaseapp.com",
  projectId: "whatsapp-clone-e38a8",
  storageBucket: "whatsapp-clone-e38a8.appspot.com",
  messagingSenderId: "510278265459",
  appId: "1:510278265459:web:78660332318e089aaf9806",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { auth };
export default db;
