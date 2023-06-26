import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence } from 'firebase/auth/react-native';

const firebaseConfig = {
    apiKey: "AIzaSyAjiwzuZNpTnLoeln-oQMhPDNWAJ_JI860",
    authDomain: "caronas-ufpr.firebaseapp.com",
    projectId: "caronas-ufpr",
    storageBucket: "caronas-ufpr.appspot.com",
    messagingSenderId: "1087197652792",
    appId: "1:1087197652792:web:c8c84e3cf1cccbbaa783cd",
    measurementId: "G-QW5N0EDX3Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default auth;
