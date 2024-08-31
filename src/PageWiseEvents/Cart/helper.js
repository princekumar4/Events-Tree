import { eventKeyConfig } from "../../config/eventKeyConfig";
import { __getSlotInfo } from "../../Services/service";
import { __getPackAttrProps } from "../Pdp/helper";

export const cartItmsFireBaseObj = (d, itemPosition, filter, btnflow, packAttr = null, promotion_name = '', isCartFreebies = '') => {
    try {
        if (!d) return;
        let slotInfo = __getSlotInfo(itemPosition);
        let item = {
            [eventKeyConfig['item_name']]: (d.sv_nm || d.pckName) || '',
            [eventKeyConfig['item_id']]: (d.sv_id || d.id) || '',
            [eventKeyConfig['item_brand']]: ((packAttr && packAttr.brand) || d.brand) || '',
            [eventKeyConfig['item_variant']]: (d.sv_id || d.id) || '',
            [eventKeyConfig['item_category']]: '',
            [eventKeyConfig['item_category2']]: ((packAttr && packAttr.catName) || d.catName) || '',
            [eventKeyConfig['item_category3']]: ((packAttr && packAttr.secondary_category) || d.secondary_category) || '',
            [eventKeyConfig['item_category4']]: btnflow || '',
            [eventKeyConfig['item_category5']]: ((d.spCartFreebie && d.spCartFreebie.length > 0 ? ' Inline Freebies ' : '') + (d.vrnt_freebies && d.vrnt_freebies.length > 0 ? ' Variant Freebies ' : '') + (isCartFreebies)) || '',
            [eventKeyConfig['price']]: d.totOffPr || 0,
            [eventKeyConfig['quantity']]: d.qty,
            [eventKeyConfig['promotion_name']]: promotion_name,
            [eventKeyConfig['est_delivery_date']]: ((packAttr && packAttr.estDeliveryDate) || (d.hkrDeliveryResponse && d.hkrDeliveryResponse.estDeliveryDate)) || '',
            ...slotInfo
        };
        if (packAttr) {
            item[eventKeyConfig['item_list_name']] = packAttr['item_list_name'] || '';
            item[eventKeyConfig['item_list_id']] = packAttr['item_list_id'] || '';
        }

        return item;
    } catch (err) {
        console.log(err);
    }
};

export const clickedCartItem = (data, dataIndex, promotion_name) => {
    try {
        let firebaseAttr = [];
        // let itemPosition = 0;
        let temp = cartItmsFireBaseObj(data, dataIndex, null, null, null, promotion_name);
        firebaseAttr.push(temp);
        let Obj = {
            fireBaseData: {
                items: firebaseAttr || []
            }
        };
        return Obj;
    } catch (err) {
        console.log(err);
    }
};

export const __cartActionObj = (d, flow = '', promotion_name = null) => {
    try {
        if (!d) return;
        let firebaseAttr = [];
        let slotInfo = __getSlotInfo(d.itemPosition);

        let fbItem = {
            [eventKeyConfig['item_name']]: d.nm || '',
            [eventKeyConfig['item_id']]: d.id || '',
            [eventKeyConfig['item_brand']]: d.brName || '',
            [eventKeyConfig['item_variant']]: d.id || '',
            /* [eventKeyConfig['item_category']]: '', */
            [eventKeyConfig['item_category2']]: d.catName || '',
            [eventKeyConfig['item_category3']]: d.secondary_category || '',
            [eventKeyConfig['item_category4']]: flow,
            /* [eventKeyConfig['item_category5']]: '', */
            [eventKeyConfig['price']]: d.offer_pr || d.offerPrice || 0,
            [eventKeyConfig['quantity']]: d.qty || 1,
            [eventKeyConfig['promotion_name']]: (d.widgitName || promotion_name) || '',
            [eventKeyConfig['est_delivery_date']]: d.hkrDeliveryResponse && d.hkrDeliveryResponse.estDeliveryDate || '',
            ...slotInfo
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
        return Obj;
    } catch (err) {
        console.log(err);
    }
};

export const __updateCartItemProps = (d, itemPositon, promotion_name = null, packItem = null, comboItem = null) => {
    try {
        if (!d) return;
        let firebaseAttr = [];
        let slotInfo = __getSlotInfo(itemPositon);
        let packAttr = {};
        if (packItem && packItem.variants && packItem.variants.length > 0) {
            packAttr = __getPackAttrProps(packItem.variants);
        }
        if (comboItem) {/*  */ }
        let fbItem = {
            [eventKeyConfig['item_name']]: d.sv_nm || '',
            [eventKeyConfig['item_id']]: d.sv_id || '',
            [eventKeyConfig['item_brand']]: d.brand || '',
            [eventKeyConfig['item_variant']]: d.sv_id || '',
            /* [eventKeyConfig['item_category']]: '', */
            [eventKeyConfig['item_category2']]: d.catName || '',
            [eventKeyConfig['item_category3']]: d.secondary_category || '',
            //[eventKeyConfig['item_category4']]: flow,
            /* [eventKeyConfig['item_category5']]: '', */
            [eventKeyConfig['price']]: d.totOffPr || d.offer_pr || d.offerPrice || 0,
            [eventKeyConfig['quantity']]: d.qty || 1,
            [eventKeyConfig['promotion_name']]: promotion_name || '',
            [eventKeyConfig['est_delivery_date']]: d.hkrDeliveryResponse && d.hkrDeliveryResponse.estDeliveryDate || '',
            ...slotInfo,
            ...packAttr
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
        return Obj;
    } catch (err) {
        console.log(err);
    }
};

export const __availableCartItemsObj = (cartPricing, btnflow, promotion_name) => {
    try {
        if (!cartPricing) return;
        let firebaseAttr = [];
        let itemPosition = 0;
        const filter = '';
        let isCartFreebies = cartPricing.cartFreebies && cartPricing.cartFreebies.length > 0 ? ' CartFreebie ' : ''
        cartPricing && cartPricing.cartVar && cartPricing.cartVar.length > 0 && cartPricing.cartVar.map((d) => {
            itemPosition = itemPosition + 1;
            const fireBaseObj = cartItmsFireBaseObj(d, itemPosition, filter, btnflow, null, promotion_name, isCartFreebies);
            firebaseAttr.push(fireBaseObj);
        });
        cartPricing && cartPricing.cartPacks && cartPricing.cartPacks.length > 0 && cartPricing.cartPacks.map((d) => {
            itemPosition = itemPosition + 1;
            const packAttr = __getPackAttrs(d.variants || []);
            const fireBaseObj = cartItmsFireBaseObj(d, itemPosition, filter, btnflow, packAttr, promotion_name);
            firebaseAttr.push(fireBaseObj);
        });
        let Obj = {
            fireBaseData: {
                items: firebaseAttr || []
            }
        };
        return Obj;
    } catch (err) {
        console.log(err);
    }
};

export const __Freebieitem_item_props = (d, itemPosition, promotion_name = '') => {
    try {
        if (!d) return;
        let firebaseAttr = [];
        let slotInfo = __getSlotInfo(itemPosition);
        firebaseAttr.push({
            [eventKeyConfig['item_name']]: d.title || '',
            [eventKeyConfig['url']]: d.link || '',
            [eventKeyConfig['promotion_name']]: promotion_name,
            [eventKeyConfig['item_category5']]: d.item_category5 || '',
            [eventKeyConfig['creative_name']]: d.creative_name,
            [eventKeyConfig['event_name']]: d.event_name,
            ...slotInfo
        });
        let Obj = {
            fireBaseData: {
                items: firebaseAttr || []
            }
        };
        return Obj;
    } catch (err) {
        console.log(err);
    }
};

export const cart_view_less_more_coupons = (d, flow = '', promotion_name = null) => {
    try {
        if (!d) return;
        let firebaseAttr = [];
        let slotInfo = __getSlotInfo(d.itemPosition);

        let fbItem = {
            [eventKeyConfig['item_name']]: d.nm || '',
            [eventKeyConfig['item_id']]: d.id || '',
            [eventKeyConfig['item_brand']]: d.brName || '',
            [eventKeyConfig['item_variant']]: d.id || '',
            /* [eventKeyConfig['item_category']]: '', */
            [eventKeyConfig['item_category2']]: d.catName || '',
            [eventKeyConfig['item_category3']]: d.secondary_category || '',
            [eventKeyConfig['item_category4']]: flow,
            /* [eventKeyConfig['item_category5']]: '', */
            [eventKeyConfig['promotion_name']]: d.promotion_name || (d.widgitName || promotion_name) || '',
            [eventKeyConfig['creative_name']]: d.creative_name || '',
            [eventKeyConfig['position_of_widgit']]: d.itemPosition || '',
            [eventKeyConfig['event_name']]: d.event_name || '',
            [eventKeyConfig['creative_slot']]: d.creative_slot || '',
            [eventKeyConfig['item_brand']]: d.item_brand || '',
            [eventKeyConfig['item_name']]: (d.sv_nm || d.pckName) || '',
            [eventKeyConfig['item_variant']]: (d.sv_id || d.id) || '',
            [eventKeyConfig['price']]: d.totOffPr || 0,
            [eventKeyConfig['coupon']]: d.coupon || '',
            ...slotInfo
        };
        if (d.parentTabInfo) {
            fbItem[eventKeyConfig['creative_name']] = d.parentTabInfo && d.parentTabInfo.creative_name || '';
        }
        firebaseAttr.push(fbItem);
        let Obj = {
            fireBaseData: {
                items: firebaseAttr || []
            }
        };
        return Obj;
    } catch (err) {
        console.log(err);
    }
};
