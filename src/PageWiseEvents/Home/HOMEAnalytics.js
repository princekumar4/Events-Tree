import { FireBase_select_item, FireBase_select_promotion, FireBase_view_promotion } from "../../FirebaseEvents/components/fireBaseUniversalAnalytics";
import { __createHomeTopCategoriesItem, __createShopByFlavourItemProps, __getSlotInfo, __getTabInfo } from "../../Services/service";
import { ___HomeWidgitItemProps, __HomeCategoriesPromotions, HomeBannerItemProps, HomeBannerPromotionList, HomeTopCategoriesItemsProps, HomeWidgitPromotions } from "./helper";

export const HomePageWidgetPromotions = (data, title, parentTabInfo, CARTReducer) => {
    let eventAttr = HomeWidgitPromotions(data, title, parentTabInfo);
    if (eventAttr && eventAttr.fireBaseData) {
        if (CARTReducer && CARTReducer.noItemsInCart) {
            FireBase_view_promotion(eventAttr.fireBaseData, CARTReducer, true);
        } else {
            setTimeout(() => {
                FireBase_view_promotion(eventAttr.fireBaseData, CARTReducer, true);
            }, 300);
        }
    }
}

export const HomeBannerPromotionLists = (items, promotion_name) => {
    let eventAttr = HomeBannerPromotionList(items, promotion_name);
    eventAttr && eventAttr.fireBaseData && FireBase_view_promotion(eventAttr.fireBaseData, null, true);
}

export const HomeCategoriesPromotions = (data, title, parentTabInfo) => {
    const eventAttr = __HomeCategoriesPromotions(data, title, parentTabInfo);
    if (eventAttr && eventAttr.fireBaseData) {
        FireBase_view_promotion(eventAttr.fireBaseData, '', true);
    }
}

export const HomeShopByFlavourPromotions = (data = [], promotion_name = '', parentTabInfo = {}) => {
    try {
        if (!data || (data && data.length == 0)) return;
        let firebaseAttr = [];
        data.map((d, i) => {
            if (!d) return;
            const shopByFlavourItemProps = __createShopByFlavourItemProps(d, (i + 1), promotion_name, parentTabInfo);
            firebaseAttr.push(shopByFlavourItemProps);
        });
        let Obj = {
            fireBaseData: {
                items: firebaseAttr || []
            }
        };
        const fireBaseObj = {
            ...Obj.fireBaseData
        };
        FireBase_view_promotion(fireBaseObj, null, true);
        return Obj;
    } catch (err) {
        console.log(err);
    }
};

export const HomeTopCategoriesPromotions = (data = [], promotion_name = '', parentTabInfo = {}, eventFor) => {
    if (data && data.length > 0) {
        let Obj = HomeTopCategoriesItemsProps(data, promotion_name, parentTabInfo);
        if (eventFor && eventFor.isFirebase) {
            const fireBaseObj = {
                ...Obj.fireBaseData
            };
            FireBase_view_promotion(fireBaseObj, null, true);
        }
    } else {
        return;
    }
};

export const CategoryClick = (scItms, title, obj) => {
    let eventAttr = HomeWidgitPromotions(scItms, title, obj);
    eventAttr && eventAttr.fireBaseData && FireBase_select_item(eventAttr.fireBaseData);
}

export const HomeBannerSelectItem = (data, itemPosition, promotion_name) => {
    let Obj = HomeBannerItemProps(data, itemPosition, promotion_name);
    const fireBaseObj = {
        ...Obj.fireBaseData
    };
    FireBase_select_promotion(fireBaseObj);
}

export const HomeWidgitSelectPromotion = (item, itemPosition, promotion_name, parentTabInfo) => {
    let Obj = ___HomeWidgitItemProps(item, itemPosition, promotion_name, parentTabInfo);
    const fireBaseObj = {
        ...Obj.fireBaseData
    };
    FireBase_select_promotion(fireBaseObj);
}

export const HomeCategoryItemClick = (d, itemPosition, promotion_name = '', parentTabInfo = {}) => {
    try {
        if (!d) return null;
        let Obj = __HomeCategoryItemProps(d, itemPosition, promotion_name, parentTabInfo);
        const fireBaseObj = {
            ...Obj.fireBaseData
        };
        FireBase_select_promotion(fireBaseObj);
    } catch (err) {
        console.log(err);
    }
};

export const HomeShopByFlavourClickAction = (d, promotion_name = '', itemPosition, parentTabInfo = {}) => {
    try {
        if (!d) return;
        let firebaseAttr = [];
        const shopByFlavourItemProps = __createShopByFlavourItemProps(d, itemPosition, promotion_name, parentTabInfo);
        firebaseAttr.push(shopByFlavourItemProps);
        let Obj = {
            fireBaseData: {
                items: firebaseAttr || []
            }
        };
        const fireBaseObj = {
            ...Obj.fireBaseData
        };
        FireBase_select_promotion(fireBaseObj, null, true);
    } catch (err) {
        console.log(err);
    }
};

export const HomeTopCategoriesItemPromotion = (item, itemPosition, promotion_name = '', parentTabInfo = {}, eventFor) => {
    try {
        if (!item) return;
        let Obj = __HomeTopCategoriesItemProps(item, itemPosition, promotion_name, parentTabInfo);
        if (eventFor && eventFor.isFirebase) {
            const fireBaseObj = {
                ...Obj.fireBaseData
            };
            FireBase_select_promotion(fireBaseObj, null, true);
        }
    } catch (err) {
        console.log(err);
    }
}