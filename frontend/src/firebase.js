// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM_3Agefpj6dRVD1oM2gq4-eXsCTWKhAQ",
  authDomain: "minimediumimages.firebaseapp.com",
  projectId: "minimediumimages",
  storageBucket: "minimediumimages.appspot.com",
  messagingSenderId: "234056863838",
  appId: "1:234056863838:web:ca4ef11680dfff240124cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
