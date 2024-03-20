import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FireBaseLogEvent from "./firebaseLogEvent";

const isProd = process.env.NEXT_PUBLIC_FIREBASE_CONFIG === "production" || false;
const firebaseConfig = {
    apiKey: isProd ? "AIzaSyAXNEHxlN27x68X4rvtZKN5Mq91RVD8Vag" : "AIzaSyDO9qDQYJJpLPbFQp5HBFTTdj3avB2__Gs",
    authDomain: isProd ? "webwebmuscleblaze.firebaseapp.com" : "webbetamuscleblaze.firebaseapp.com",
    projectId: isProd ? "webwebmuscleblaze" : "webbetamuscleblaze",
    storageBucket: isProd ? "webwebmuscleblaze.appspot.com" : "webbetamuscleblaze.appspot.com",
    messagingSenderId: isProd ? "173635279784" : "47916220971",
    appId: isProd ? "1:173635279784:web:ca53c32b4b29b9abb8db9d" : "1:47916220971:web:3b6221dec6029935cc206e",
    measurementId: isProd ? "G-SF8VP2L1ZR" : "G-BJF6KTKLJM",
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