import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect, 
  GoogleAuthProvider 
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD07LZOcocqimGUv-LaDmwKVTc80kM1N_A",
  authDomain: "clothing-shop-db-49a3a.firebaseapp.com",
  projectId: "clothing-shop-db-49a3a",
  storageBucket: "clothing-shop-db-49a3a.appspot.com",
  messagingSenderId: "1004468274503",
  appId: "1:1004468274503:web:7f08a81550048714e9b862"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  
  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('Error - ', error.message);
    }
  }
  return userDocRef;
}