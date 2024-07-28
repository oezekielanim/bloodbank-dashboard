import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AlzaSyDB5qYJ_5RROaDP-1PsTw43fyCyjGsFxGO",
  authDomain: "bloodbank-29eb7.firebaseapp.com",
  projectId: "bloodbank-29eb7",
  storageBucket: "bloodbank-29eb7.appspot.com",
  messagingSenderId: "212059890150",
  appId: "1:212059890150:web:6400a38c913f419046f627"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

// Function to get donation requests
export const getDonationRequests = async () => {
  const querySnapshot = await getDocs(collection(db, "donationRequests"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Function to get appointments
export const getAppointments = async () => {
  const querySnapshot = await getDocs(collection(db, "appointments"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

export const logOut = () => {
    return signOut(auth);
  };

export const authStateChanged = (callback) => {
    return auth.onAuthStateChanged(callback);
  };
  
export { firebaseApp, db, auth, onAuthStateChanged };
