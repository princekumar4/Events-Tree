import { eventKeyConfig } from "../../config/eventKeyConfig";
import { __createHomeTopCategoriesItem, __getSlotInfo, __getTabInfo } from "../../Services/service";

export const HomeTopCategoriesItemsProps = (data = [], promotion_name = '', parentTabInfo = {}) => {
    let firebaseAttr = [];
    if (data && data.length > 0) {
        const tabInfo = __getTabInfo(parentTabInfo);
        data.map((d, i) => {
            const imgItm = d && d.imgItm;
            if (!imgItm) return null;
            let rest = __createHomeTopCategoriesItem(imgItm, (i + 1), promotion_name);
            const firebaseitem = {
                ...tabInfo,
                ...rest
            };
            firebaseAttr.push(firebaseitem);
        });
        let Obj = {
            fireBaseData: {
                items: firebaseAttr || []
            }
        };
        return Obj;
    } else {
        return;
    }
};

export const __HomeCategoriesPromotions = (data = [], promotion_name = '', parentTabInfo = {}) => {
    let firebaseAttr = [];
    if (data && data.length > 0) {
        const tabInfo = __getTabInfo(parentTabInfo);
        data.map((d, i) => {
            if (!d) return null;
            let slotInfo = __getSlotInfo(i + 1);
            const firebaseitem = {
                ...tabInfo,
                ...slotInfo,
                [eventKeyConfig['item_name']]: d.dis_nm || '',
                [eventKeyConfig['url']]: d.imgItm && d.imgItm.lp,
                [eventKeyConfig['promotion_name']]: promotion_name,
            };
            firebaseAttr.push(firebaseitem);
        });
        let Obj = {
            fireBaseData: {
                items: firebaseAttr || []
            }
        };
        return Obj;
    } else {
        return;
    }
};

export const HomeBannerPromotionList = (data = [], promotion_name = '') => {
    try {
        if (!data || (data && data.length == 0)) return;
        let firebaseAttr = [];
        let itemPosition = 0;
        data.map((d, i) => {
            if (!d) return;
            itemPosition = i + 1;
            const slotInfo = __getSlotInfo(itemPosition);
            firebaseAttr.push({
                [eventKeyConfig['item_name']]: d.title || '',
                [eventKeyConfig['url']]: d.link || '',
                [eventKeyConfig['promotion_name']]: promotion_name,
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

export const HomeWidgitPromotions = (data = [], promotion_name = '', parentTabInfo = {}) => {
    let firebaseAttr = [];
    if (data && data.length > 0) {
        const tabInfo = __getTabInfo(parentTabInfo);
        data.map((item, i) => {
            const d = item.catItem || item;
            if (!d) return null;
            let url;
            if (d.urlFragment) {
                url = d.pk_type ? '/pk' + d.urlFragment : '/sv' + d.urlFragment;
                url += `?navKey=${d.navKey}`;
            }
            let spName = d.nm || d.spName;
            let slotInfo = __getSlotInfo(i + 1);
            let firebaseitem = {
                ...tabInfo,
                ...slotInfo,
                [eventKeyConfig['item_name']]: spName || '',
                [eventKeyConfig['url']]: url || '',
                [eventKeyConfig['promotion_name']]: promotion_name,
                [eventKeyConfig['item_id']]: d.id || '',
                [eventKeyConfig['item_brand']]: d.brName || '',
                [eventKeyConfig['item_variant']]: d.id || '',
                /* [eventKeyConfig['item_category']]: '', */
                [eventKeyConfig['item_category2']]: d.catName || '',
                [eventKeyConfig['item_category3']]: d.secondary_category || '',
                /* [eventKeyConfig['item_category4']]: '',
                [eventKeyConfig['item_category5']]: '', */
                [eventKeyConfig['price']]: d.offer_pr || '',
                [eventKeyConfig['quantity']]: 1,
                /* [eventKeyConfig['item_list_id']]: '', */
                /* [eventKeyConfig['item_list_name']]: '', */
            };
            firebaseAttr.push(firebaseitem);
        });
        let Obj = {
            fireBaseData: {
                items: firebaseAttr || []
            }
        };
        return Obj;
    } else {
        return;
    }
};

export const HomeBannerItemProps = (d, itemPosition, promotion_name = '') => {
    try {
        if (!d) return;
        let firebaseAttr = [];
        let slotInfo = __getSlotInfo(itemPosition);
        firebaseAttr.push({
            [eventKeyConfig['item_name']]: d.title || '',
            [eventKeyConfig['url']]: d.link || '',
            [eventKeyConfig['promotion_name']]: promotion_name,
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

export const ___HomeWidgitItemProps = (item, itemPosition, promotion_name = '', parentTabInfo = {}) => {
    try {
        /* Home page widit on clic */
        if (!item) return;
        let firebaseAttr = [];
        const d = item.catItem || item;
        if (!d) return null;
        let url;
        if (d.urlFragment) {
            url = d.pk_type ? '/pk' + d.urlFragment : '/sv' + d.urlFragment;
            url += `?navKey=${d.navKey}`;
        }
        let spName = d.nm || d.spName;
        const tabInfo = __getTabInfo(parentTabInfo);
        const slotInfo = __getSlotInfo(itemPosition);
        firebaseAttr.push({
            ...tabInfo,
            [eventKeyConfig['item_name']]: spName || '',
            [eventKeyConfig['url']]: url || '',
            [eventKeyConfig['promotion_name']]: promotion_name,
            [eventKeyConfig['item_id']]: d.id || '',
            [eventKeyConfig['item_brand']]: d.brName || '',
            [eventKeyConfig['item_variant']]: d.id || '',
            //[eventKeyConfig['item_category']]: '',
            [eventKeyConfig['item_category2']]: d.catName || '',
            [eventKeyConfig['item_category3']]: d.secondary_category || '',
            //[eventKeyConfig['item_category4']]: '',
            //[eventKeyConfig['item_category5']]: '',
            [eventKeyConfig['price']]: d.offer_pr || '',
            [eventKeyConfig['quantity']]: 1,
            //[eventKeyConfig['item_list_id']]: '',
            //[eventKeyConfig['item_list_name']]: '',
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

export const __HomeCategoryItemProps = (d, itemPosition, promotion_name = '', parentTabInfo = {}) => {
    try {
        if (!d) return;
        let firebaseAttr = [];
        const tabInfo = __getTabInfo(parentTabInfo);
        const slotInfo = __getSlotInfo(itemPosition);
        const firebaseitem = {
            ...tabInfo,
            [eventKeyConfig['item_name']]: d.dis_nm || '',
            [eventKeyConfig['url']]: d.imgItm && d.imgItm.lp,
            [eventKeyConfig['promotion_name']]: promotion_name,
            ...slotInfo,
        };
        firebaseAttr.push(firebaseitem);
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

export const __createShopByFlavourItemProps = (d, itemPosition, promotion_name = '', parentTabInfo = {}) => {
    const tabInfo = __getTabInfo(parentTabInfo);
    const slotInfo = __getSlotInfo(itemPosition);
    let item = {
        ...tabInfo,
        [eventKeyConfig['item_name']]: d.dis_nm || (d.imgItm && d.imgItm.alt) || '',
        [eventKeyConfig['url']]: d.imgItm && d.imgItm.lp,
        [eventKeyConfig['promotion_name']]: promotion_name,
        ...slotInfo,
    };
    return item;
};

export const __HomeTopCategoriesItemProps = (d, itemPosition, promotion_name = '', parentTabInfo = {}) => {
    try {
        let firebaseAttr = [];
        const imgItm = d && d.imgItm;
        if (!imgItm) return null;
        const tabInfo = __getTabInfo(parentTabInfo);
        const firebaseitem = {
            ...tabInfo,
            ...__createHomeTopCategoriesItem(imgItm, itemPosition, promotion_name)
        };
        firebaseAttr.push(firebaseitem);
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