import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FireBaseLogEvent from "./firebaseLogEvent";

const isProd = process.env.NEXT_PUBLIC_FIREBASE_CONFIG === "production" || false;
console.log(isProd, "prod environment or not");
const firebaseConfig = {
    apiKey: "AIzaSyDO9qDQYJJpLPbFQp5HBFTTdj3avB2__Gs",
    authDomain: "webbetamuscleblaze.firebaseapp.com",
    projectId: "webbetamuscleblaze",
    storageBucket: "webbetamuscleblaze.appspot.com",
    messagingSenderId: "47916220971",
    appId: "1:47916220971:web:3b6221dec6029935cc206e",
    measurementId: "G-BJF6KTKLJM",
};

const FireBaseInit = (callback, eventname, eventData) => {
    try {
        // if (ISPROD) {
        if (typeof window !== "undefined") {
            const app = initializeApp(firebaseConfig);
            window.firebaseAnalytics = getAnalytics(app);
            if (callback) {
                setTimeout(() => {
                    FireBaseLogEvent(eventname, eventData);
                }, 100);
            }
        }
        // console.log('>\x1b[30m\x1b[42mFireBase is disabled for local environment\x1b[0m\n');
    } catch (error) {
        console.log("Error:", error);
    }
};

export default FireBaseInit;