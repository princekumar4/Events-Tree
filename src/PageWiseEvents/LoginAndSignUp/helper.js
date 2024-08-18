import { eventKeyConfig } from "@/config/eventKeyConfig";

export const __UserAnalyticsPromotion = (userData = {}, fireBaseE) => {
    let Obj = {
        fireBaseData: {
            [eventKeyConfig['user_id']]: userData && userData.uH || '',
            [eventKeyConfig['event_name']]: fireBaseE,
        }
    };
    return Obj;
};