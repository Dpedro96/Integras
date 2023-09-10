import { app } from "../common/FirebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword
} from "firebase/auth";

export const auth = getAuth(app);


export function loginUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function registerUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function sendResetPasswordEmail(email) {
  return sendPasswordResetEmail(auth, email);
}

export function getAuthInstance() {
  return auth;
}

export function observeAuthState(setUserFunction) {
  return auth.onAuthStateChanged(user => {
    setUserFunction(user);
  });
}
