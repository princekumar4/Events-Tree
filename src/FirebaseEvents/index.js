import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import FireBaseLogEvent from "./components/firebaseLogEvent";
import { useState } from "react";

const FireBaseInit = (firebaseConfig, callback, eventname, eventData) => {

    const [firebaseConfigState] = useState(firebaseConfig);

    try {
        // if (ISPROD) {
        if (typeof window !== "undefined") {
            const app = initializeApp(firebaseConfigState);
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