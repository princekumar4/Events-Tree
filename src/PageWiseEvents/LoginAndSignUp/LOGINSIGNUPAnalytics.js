import { eventNameConfig } from "@/config/eventNameConfig";
import { FireBase_Login_and_SignUp, FireBase_Signup_initiation_Successful, FireBase_Signup_initiation_Unsuccessful, FireBase_Signup_Successful, FireBase_Signup_unsuccessful, FireBase_user_attr } from "@/FirebaseEvents/components/fireBaseUniversalAnalytics";
import { __UserAnalyticsPromotion } from "./helper";
import { __localStorageGet } from "@/Services/service";
import { eventKeyConfig } from "@/config/eventKeyConfig";

export const SetUserDataFirebaseEvent = (userData, isSignUpCall) => {
    let eventAttr;
    if (isSignUpCall) {
        eventAttr = __UserAnalyticsPromotion(userData || {}, eventNameConfig['sign_up']);
        FireBase_Login_and_SignUp(false);
    }
    else {
        eventAttr = __UserAnalyticsPromotion(userData || {}, eventNameConfig['login']);
        FireBase_Login_and_SignUp(true);
    }
    eventAttr && eventAttr.fireBaseData && FireBase_user_attr(eventAttr.fireBaseData);
}

export const UserLogoutOutFirebaseEvent = () => {
    let userData = __localStorageGet('userData');
    let eventAttr = __UserAnalyticsPromotion(userData || {}, eventNameConfig['logout']);
    eventAttr && eventAttr.fireBaseData && FireBase_user_attr(eventAttr.fireBaseData);
}

export const SignupInitiationSuccessFullFirebaseEvent = (mobileNumber) => {
    let firebaseObj = {
        [eventKeyConfig['mobileNumber']]: mobileNumber
    };
    FireBase_Signup_initiation_Successful(firebaseObj);
}

export const SignupInitiationUnSuccessFullFirebaseEvent = (mobileNumber, errorMsg) => {
    let firebaseObj = {
        [eventKeyConfig['mobileNumber']]: mobileNumber,
        [eventKeyConfig['error']]: errorMsg,
    };
    FireBase_Signup_initiation_Unsuccessful(firebaseObj);
}

export const FireBaseSignupSuccessful = (mobileNumber) => {
    let firebaseObj = {
        [eventKeyConfig['mobileNumber']]: mobileNumber
    };
    FireBase_Signup_Successful(firebaseObj);
}

export const FireBaseSignupUnSuccessful = (mobileNumber, errorMessage) => {
    let firebaseObj = {
        [eventKeyConfig['mobileNumber']]: mobileNumber,
        [eventKeyConfig['error']]: errorMessage,
    };
    FireBase_Signup_unsuccessful(firebaseObj);
}