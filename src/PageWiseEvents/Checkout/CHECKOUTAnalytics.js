import { __getSearchParmas, __isMobile } from "@/Services/service";
import { createFirebaseDataLayer, getStepTitle } from "./helper";
import { FireBase_add_payment_info, FireBase_add_shipping_info, FireBase_begin_checkout } from "@/FirebaseEvents/components/fireBaseUniversalAnalytics";

export const CheckoutStepEvent = (firebaseData, step) => {
    let index = 0;
    let iteIndex = 0;
    let firebaseAttr = [];
    let itemNames = [], ids = [], prices = [];
    const isMobile = __isMobile();
    const expressCheckout = __getSearchParmas().expressCheckout === "true";
    let filter;
    if (isMobile) {
        filter = sessionStorage.getItem("mobilefilter");
    } else {
        filter = sessionStorage.getItem("filterClicked");
    }
    let btnFlow;
    let flowdata = localStorage.getItem('Flow');
    if (expressCheckout) {
        btnFlow = "Buy Now Flow";
    } else {
        btnFlow = flowdata;
    }
    if (firebaseData && firebaseData.cartPacks && firebaseData.cartPacks.length > 0) {
        firebaseData.cartPacks.forEach(item => {
            iteIndex = iteIndex + 1;
            let temp = createFirebaseDataLayer(item, iteIndex, btnFlow, filter);
            firebaseAttr.push(temp);
        });
    }
    if (firebaseData && firebaseData.cartVar && firebaseData.cartVar.length > 0) {
        firebaseData.cartVar.forEach((vrn) => {
            iteIndex = iteIndex + 1;
            index = index + 1;
            itemNames.push(vrn.sv_nm);
            ids.push(vrn.sv_id);
            prices.push(vrn.totOffPr);
            firebaseAttr.push(createFirebaseDataLayer(vrn, iteIndex, btnFlow, filter));
        });
    }
    let Obj = {
        fireBaseData: {
            items: firebaseAttr || []
        }
    };
    const option = getStepTitle(step);
    if (step === 3) {
        FireBase_add_payment_info(Obj.fireBaseData, step, option);
        return {
            itemNames: itemNames,
            ids: ids,
            prices: prices
        };
    } else {
        if (step) {
            if (step === 1) {
                FireBase_begin_checkout(Obj.fireBaseData, step, option);
            } else if (step === 2) {
                FireBase_add_shipping_info(Obj.fireBaseData, step, option);
            }
            return;
        } else if (expressCheckout) {
            FireBase_begin_checkout(Obj.fireBaseData, 1, option);
            FireBase_add_shipping_info(Obj.fireBaseData, 2, option);
            return;
        }

    }
    if (step === 3) {
        return {
            itemNames: itemNames,
            ids: ids,
            prices: prices
        };
    } else {
        return;
    }
}