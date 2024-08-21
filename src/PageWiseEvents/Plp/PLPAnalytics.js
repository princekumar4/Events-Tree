import { FireBase_view_item_list } from "@/FirebaseEvents/components/fireBaseUniversalAnalytics";
import { __category_item_props, __L2_cat_data, __L2_cat_item_props, __other_Impression_data } from "./helper";

export const CatL2 = (variant, data, pgSeoH1, CART) => {
    let firebaseItems;
    if (variant && variant.length > 0) {
        firebaseItems = variant;
    } else if (data && data.salePage && data.salePage.vhd && data.salePage.vhd.length > 0 && data.salePage.vhd[0].vhd_itms) {
        firebaseItems = data.salePage.vhd[0].vhd_itms;
    }
    let eventAttr = __L2_cat_data(firebaseItems, (pgSeoH1 || ''));
    if (eventAttr && eventAttr.fireBaseData) {
        if (CART && CART.noItemsInCart) {
            FireBase_view_item_list(eventAttr.fireBaseData, CART);
        } else {
            setTimeout(() => {
                FireBase_view_item_list(eventAttr.fireBaseData, CART);
            }, 500);
        }
    }
}

export const L2CatSelectItem = (data, itemPosition = 1) => {
    try {
        if (!data) return;
        let Obj = __L2_cat_item_props(data, itemPosition);
        const fireBaseObj = {
            ...Obj.fireBaseData
        };
        FireBase_select_item(fireBaseObj);
    } catch (err) {
        console.log(err);
    }
};

export const CategorySelectItem = (data, itemPosition) => {
    try {
        if (!data) return;
        let Obj = __category_item_props(data, itemPosition);
        const fireBaseObj = {
            ...Obj.fireBaseData
        };
        FireBase_select_item(fireBaseObj);
    } catch (err) {
        console.log(err);
    }
};