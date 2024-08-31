import { eventKeyConfig } from "../../config/eventKeyConfig";
import { FireBase_select_promotion, FireBase_view_all_less, FireBase_view_item, FireBase_view_promotion } from "../../FirebaseEvents/components/fireBaseUniversalAnalytics";
import { __getSlotInfo } from "../../Services/service";
import { __Offers_item_props, __other_Impression_data, __pdp_combo_item_props, __pdp_comboData_props, __PK_Impression_data, __SV_Impression_data, __yml_item_props, _pdp_mayLike_props } from "./helper";

export const PdpYouMayLikeWidget = (data, promotion_name) => {
    if (data && data.length > 0) {
        let eventAttr = _pdp_mayLike_props(data, promotion_name, parentTabInfo);
        if (eventAttr && eventAttr.fireBaseData) {
            FireBase_view_promotion(eventAttr.fireBaseData, null, true);
        }
    }
}

export const ProductClicked = (productType, productdata, pagetp) => {
    if (pagetp === "menuLanding" || pagetp === "search" || pagetp === "brandCatalog") {
        const eventAttr = __other_Impression_data(productdata);
        FireBase_select_promotion(eventAttr.fireBaseData);
        FireBase_view_item(eventAttr.fireBaseData);

    } else {
        if (productType === "pack") {
            const eventAttr = __PK_Impression_data(productdata);
            FireBase_view_item(eventAttr.fireBaseData);
        } else {
            const eventAttr = __SV_Impression_data(productdata);
            FireBase_view_item(eventAttr.fireBaseData);
        }
    }
}

export const PdpComboViewPromotion = (data, promotion_name = '', parentTabInfo) => {
    const packSv = data.packSv;
    let Obj = __pdp_comboData_props(packSv, promotion_name, parentTabInfo, data.nm || '');
    const fireBaseObj = Obj.fireBaseData;
    FireBase_view_promotion(fireBaseObj, null, true);
};

export const ComboSelectPromotion = (data, itemPosition, promotion_name = '', parentTabInfo) => {
    let firebaseAttr = [];
    let fireBaseItems = __pdp_combo_item_props(data, itemPosition, promotion_name, parentTabInfo);
    firebaseAttr.push(fireBaseItems);
    let Obj = {
        fireBaseData: {
            items: firebaseAttr
        }
    };
    const fireBaseObj = Obj.fireBaseData;
    FireBase_select_promotion(fireBaseObj);
}

export const YmlSelectPromotion = (item, itemPosition, title, widgetPosition, parentTabInfo, iscombo) => {
    if (!item) return;
    let d = __yml_item_props(item, itemPosition, title, widgetPosition, parentTabInfo, iscombo);
    let firebaseAttr = [];
    const slotInfo = __getSlotInfo(d.itemPosition);
    let fbItem = {
        [eventKeyConfig['item_name']]: d.nm || '',
        [eventKeyConfig['item_id']]: d.id || '',
        [eventKeyConfig['item_brand']]: d.brName || '',
        [eventKeyConfig['item_variant']]: d.id || '',
        [eventKeyConfig['item_category']]: '',
        [eventKeyConfig['item_category2']]: d.catName || '',
        [eventKeyConfig['item_category3']]: d.secondary_category || '',
        [eventKeyConfig['item_category4']]: '',
        [eventKeyConfig['item_category5']]: '',
        [eventKeyConfig['price']]: d.offer_pr || 0,
        [eventKeyConfig['quantity']]: d.qty || 1,
        [eventKeyConfig['promotion_name']]: d.widgitName || '',
        [eventKeyConfig['est_delivery_date']]: d.hkrDeliveryResponse && d.hkrDeliveryResponse.estDeliveryDate || '',
        ...slotInfo,
    };
    if (d.parentTabInfo) {
        fbItem[eventKeyConfig['creative_slot']] = d.parentTabInfo && d.parentTabInfo.creative_slot || 0;
        fbItem[eventKeyConfig['creative_name']] = d.parentTabInfo && d.parentTabInfo.creative_name || '';
    }
    firebaseAttr.push(fbItem);
    let Obj = {
        fireBaseData: {
            items: firebaseAttr || []
        }
    };
    const fireBaseObj = {
        ...Obj.fireBaseData
    };
    FireBase_select_promotion(fireBaseObj);
};

export const ExpandCollapseTrayFirebaseEvent = (d, flow = '', itemPosition, promotion_name, creative_name, event_name, creative_slot) => {
    let Obj = __Offers_item_props(d, itemPosition, promotion_name, '', creative_name, event_name, creative_slot);
    const fireBaseObj = {
        ...Obj.fireBaseData
    };
    FireBase_view_all_less(fireBaseObj);
}
