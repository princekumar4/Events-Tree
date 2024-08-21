import { FireBase_purchase } from "@/FirebaseEvents/components/fireBaseUniversalAnalytics";
import { __getCookie, __isMobile } from "@/Services/service";
import { createFireBaseObj } from "./helper";
import { __getPackAttrs } from "../Pdp/helper";

export const OrderSuccessDataFirebaseEvent = (orderData) => {
    let itemPosition = 0;
    let firebaseAttr = [];
    let btnflow = localStorage.getItem('Flow');
    let filter = '';
    if (__isMobile()) {
        filter = sessionStorage.getItem("mobilefilter");
    } else {
        filter = sessionStorage.getItem("filterClicked");
    }
    const orderPlacedDetails = orderData && orderData.orderPlacedDetails || '';
    if (orderPlacedDetails) {
        orderPlacedDetails.orderVar && orderPlacedDetails.orderVar.length > 0 && orderPlacedDetails.orderVar.map((d) => {
            itemPosition = itemPosition + 1;
            const fireBaseObj = createFireBaseObj(d, itemPosition, filter, btnflow, orderData, null);
            firebaseAttr.push(fireBaseObj);

        });
        orderPlacedDetails.packVar && orderPlacedDetails.packVar.length > 0 && orderPlacedDetails.packVar.forEach((d) => {
            itemPosition = itemPosition + 1;
            const packAttr = __getPackAttrs(d.variants || []);
            const fireBaseObj = createFireBaseObj(d, itemPosition, filter, btnflow, orderData, packAttr);
            firebaseAttr.push(fireBaseObj);
        });
    }
    const affiliateName = __getCookie("affiliateName") || '';

    let Obj = {
        actionField: {
            'id': orderData.gId || (orderPlacedDetails && orderPlacedDetails.gId) || '',
            'affiliation': affiliateName,
            'revenue': (orderPlacedDetails && orderPlacedDetails.totPay) || 0,
            'tax': '0',
            'shipping': (orderPlacedDetails && orderPlacedDetails.shippingCh) || 0,
            'coupon': (orderPlacedDetails && orderPlacedDetails.appliedCouponCod) || ''
        },
        fireBaseData: {
            items: firebaseAttr || []
        }
    };
    const firebaseData = {
        currency: 'INR',
        transaction_id: orderData.gId || (orderPlacedDetails && orderPlacedDetails.gId) || '',
        affiliation: affiliateName,
        value: (orderPlacedDetails && orderPlacedDetails.totPay) || 0,
        tax: 0,
        shipping: (orderPlacedDetails && orderPlacedDetails.shippingCh) || 0,
        coupon: (orderPlacedDetails && orderPlacedDetails.appliedCouponCod) || '',
        items: Obj.fireBaseData || [],
    };
    FireBase_purchase(firebaseData);
};