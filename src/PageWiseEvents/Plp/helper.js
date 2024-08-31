import { eventKeyConfig } from "../../config/eventKeyConfig";
import { __getSlotInfo } from "../../Services/service";

export const __L2_cat_data = (_variant = [], promotionName = '') => {
    try {
        if (!_variant || (_variant && _variant.length == 0)) return;
        let firebaseAttr = [];
        let itemPosition = 0;
        _variant && _variant.length > 0 && _variant.map((d, i) => {
            //itemPosition = (pageSize * lastPage) + i + 1;
            itemPosition = i + 1;
            const slotInfo = __getSlotInfo(itemPosition);
            firebaseAttr.push({
                [eventKeyConfig['item_name']]: d.name || '',
                [eventKeyConfig['item_id']]: d.id || '',
                [eventKeyConfig['item_brand']]: d.brName || '',
                [eventKeyConfig['item_variant']]: d.id || '',
                /* [eventKeyConfig['item_category']]: '', */
                [eventKeyConfig['item_category2']]: d.catName || '',
                /* [eventKeyConfig['item_category3']]: '',
                [eventKeyConfig['item_category4']]: '',
                [eventKeyConfig['item_category5']]: '', */
                [eventKeyConfig['price']]: d.offerPrice || '',
                [eventKeyConfig['quantity']]: 1,
                [eventKeyConfig['promotion_name']]: promotionName,
                ...slotInfo,
            });
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

const __create_category_item = (d, itemPosition) => {
    try {
        let slotInfo = __getSlotInfo(itemPosition);
        let temp = {
            [eventKeyConfig['item_name']]: d.name || '',
            [eventKeyConfig['item_id']]: d.id || '',
            [eventKeyConfig['item_brand']]: d.brName || '',
            [eventKeyConfig['item_variant']]: d.id || '',
            [eventKeyConfig['item_category2']]: d.catName || '',
            /* [eventKeyConfig['item_category3']]: '',
            [eventKeyConfig['item_category4']]: '',
            [eventKeyConfig['item_category5']]: '', */
            [eventKeyConfig['price']]: d.offerPrice || '',
            [eventKeyConfig['quantity']]: 1,
            ...slotInfo,
        };
        return temp;
    } catch (err) {
        console.log(err);
    }

};

export const __L2_cat_item_props = (d, itemPosition) => {
    try {
        if (!d) return;
        let firebaseAttr = [];
        let firebaseItem = __create_category_item(d, itemPosition);
        firebaseAttr.push(firebaseItem);
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

export const __category_item_props = (d, itemPosition) => {
    try {
        if (!d) return;
        let firebaseAttr = [];
        let firebaseItem = __create_category_item(d, itemPosition);
        firebaseAttr.push(firebaseItem);
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