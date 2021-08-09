import firebase from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
const EmailAuthProvider = firebase.auth.EmailAuthProvider;
const db = firebase.firestore();

//Set auth state to persist until user logs out
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export { auth, GoogleAuthProvider, EmailAuthProvider, db };
export default app; //MAY NOT BE USED?
