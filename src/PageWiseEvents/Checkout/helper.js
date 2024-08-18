import { eventKeyConfig } from "@/config/eventKeyConfig";
import { __getSlotInfo } from "@/Services/service";
import { __getPackAttrs } from "../Pdp/helper";

export const getStepTitle = (step) => {
    switch (step) {
        case 1:
            return 'Proceed to Buy';
        case 2:
            return 'Select Address';
        case 3:
            return 'Securely Pay';
        default:
            return '';
    }
};

export const createFirebaseDataLayer = (obj, indexPosition, /* btnFlow, filter */) => {
    let slotInfo = __getSlotInfo(indexPosition);
    const packAttr = (obj.variants && obj.variants.length > 0 && __getPackAttrs(obj.variants || [])) || null;
    let item = {
        [eventKeyConfig['item_name']]: (obj.name || obj.sv_nm || obj.pckName) || '',
        [eventKeyConfig['item_id']]: (obj.sv_id || obj.id) || "",
        [eventKeyConfig['item_brand']]: (packAttr && packAttr.brand) || obj.brand || "",
        [eventKeyConfig['item_variant']]: (obj.sv_id || obj.id) || "",
        /* [eventKeyConfig['item_category']]: '', */
        [eventKeyConfig['item_category2']]: (packAttr && packAttr.catName) || obj.catName || "",
        /* [eventKeyConfig['item_category3']]: '',
        [eventKeyConfig['item_category4']]: '',
        [eventKeyConfig['item_category5']]: '', */
        [eventKeyConfig['price']]: obj.totOffPr || 0,
        [eventKeyConfig['quantity']]: 1,
        ...slotInfo
    };
    if (packAttr) {
        item[eventKeyConfig['item_list_name']] = packAttr['item_list_name'] || '';
        item[eventKeyConfig['item_list_id']] = packAttr['item_list_id'] || '';
    }
    return item;
};