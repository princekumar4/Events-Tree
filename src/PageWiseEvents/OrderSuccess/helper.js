import { eventKeyConfig } from "../../config/eventKeyConfig";
import { __getSlotInfo } from "../../Services/service";

export const createFireBaseObj = (d, itemPosition, filter, btnflow, orderData, packAttr = null) => {
    const slotInfo = __getSlotInfo(itemPosition);
    let item = {
        [eventKeyConfig['item_name']]: (d.sv_nm || d.pckName) || '',
        [eventKeyConfig['item_id']]: (d.sv_id || d.id) || '',
        [eventKeyConfig['item_brand']]: ((packAttr && packAttr.brand) || d.brand) || '',
        [eventKeyConfig['item_variant']]: (d.sv_id || d.id) || '',
        [eventKeyConfig['item_category']]: (orderData.gId || (orderData.orderPlacedDetails && orderData.orderPlacedDetails.gId)) || '',
        [eventKeyConfig['item_category2']]: ((packAttr && packAttr.catName) || d.catName) || '',
        [eventKeyConfig['item_category3']]: ((packAttr && packAttr.secondary_category) || d.secondary_category) || '',
        [eventKeyConfig['item_category4']]: btnflow || '',
        [eventKeyConfig['item_category5']]: '',
        [eventKeyConfig['price']]: d.totOffPr || 0,
        [eventKeyConfig['quantity']]: d.qty,
        ...slotInfo,
    };
    if (packAttr) {
        item[eventKeyConfig['item_list_name']] = packAttr['item_list_name'] || '';
        item[eventKeyConfig['item_list_id']] = packAttr['item_list_id'] || '';
    }
    return item;
};