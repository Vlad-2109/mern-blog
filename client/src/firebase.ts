// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'mern-blog-b0558.firebaseapp.com',
  projectId: 'mern-blog-b0558',
  storageBucket: 'mern-blog-b0558.appspot.com',
  messagingSenderId: '1098623153103',
  appId: '1:1098623153103:web:4f365d76debdd0cc3b18ba',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
