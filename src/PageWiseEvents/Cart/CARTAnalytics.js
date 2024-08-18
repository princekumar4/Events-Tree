import { eventNameConfig } from "@/config/eventNameConfig";
import { __sessionStorageSet } from "@/FactoryMethods/service";
import { FireBase_add_to_cart, FireBase_add_to_wishlist, FireBase_buy_now, FireBase_cart_update, FireBase_select_promotion, FireBase_view_all_less, FireBase_view_cart } from "@/FirebaseEvents/components/fireBaseUniversalAnalytics";
import { __availableCartItemsObj, __cartActionObj, __Freebieitem_item_props, __updateCartItemProps, cart_view_less_more_coupons } from "./helper";

export const _CartPageData = (data, noItemsInCart, promotion_name = '') => {
    const customUserAttr = {
        noItemsInCart: noItemsInCart
    };
    __sessionStorageSet('customUserAttr', customUserAttr);
    const cartPricing = data.cartPricing;
    if (!cartPricing) return;
    const btnflow = '';
    const availableCartItems = __availableCartItemsObj(cartPricing, btnflow, promotion_name);
    let Obj = {
        actionField: {
            /* 'value': (cartPricing.totPay) || 0, */
            'tax': '0',
            'shipping': (cartPricing.totShip) || 0,
            'coupon': (cartPricing.appliedCouponCode) || ''
        },
        ...availableCartItems
    };
    const fireBaseObj = {
        ...Obj.actionField,
        ...Obj.fireBaseData
    };
    FireBase_view_cart(fireBaseObj);
};

export const CartItemSelectEvent = (data, dataIndex) => {
    /* cart_page_item */
    let Obj = clickedCartItem(data, dataIndex + 1, '');
    const fireBaseObj = {
        ...Obj.fireBaseData,
    };
    FireBase_select_promotion(fireBaseObj);
}

export const WishListActionData = (data, promotion_name = '') => {
    const cartPricing = (data.cartPricing) || (data.cartSummary && data.cartSummary.cartPricing);
    if (!cartPricing) return;
    let actionField = { 'value': 0, 'tax': '0', 'shipping': 0, 'coupon': '' };
    const flow = eventNameConfig['action_wishList'];
    const availableCartItems = __availableCartItemsObj(cartPricing, flow, promotion_name);
    let Obj = {
        actionField: actionField,
        ...availableCartItems
    };
    const fireBaseObj = {
        ...Obj.actionField,
        ...Obj.fireBaseData
    };
    FireBase_add_to_wishlist(fireBaseObj);
}

export const WidgitItemWishlistAction = (data) => {
    if (!data) return;
    let actionField = { 'value': 0, 'tax': '0', 'shipping': 0, 'coupon': '' };
    const availableCartItems = __cartActionObj(data, eventNameConfig['action_wishList']);
    let Obj = {
        actionField: actionField,
        ...availableCartItems
    };
    const fireBaseObj = {
        ...Obj.actionField,
        ...Obj.fireBaseData
    };
    FireBase_add_to_wishlist(fireBaseObj);
}

export const CartUpdateFirebaseEvent = (data, itemPositon, promotion_name, packItem = null, comboItem = null) => {
    if (!data) return;
    const availableCartItems = __updateCartItemProps(data, itemPositon, promotion_name, packItem, comboItem);
    let Obj = {
        actionField: {
            /* 'value': (cartPricing.totPay) || 0, */
            'tax': '0',
            'shipping': (data.totShip) || 0,
            'coupon': (data.appliedCouponCode) || ''
        },
        ...availableCartItems
    };
    const fireBaseObj = {
        ...Obj.actionField,
        ...Obj.fireBaseData
    };
    FireBase_cart_update(fireBaseObj, promotion_name);
}

export const AddToCartFirebaseEvent = (d, flow = '') => {
    let Obj = __cartActionObj(d, flow);
    const fireBaseObj = {
        ...Obj.fireBaseData
    };
    FireBase_add_to_cart(fireBaseObj);
}

export const BuyNowFirebaseEvent = () => {
    let Obj = __cartActionObj(d, flow);
    const fireBaseObj = {
        ...Obj.fireBaseData
    };
    FireBase_buy_now(fireBaseObj);
}

export const ExpandCollapseTryCartAndCheckout = (d, itemPosition, promotion_name, creative_name, event_name) => {
    let Obj = __Freebieitem_item_props(d, itemPosition = d['Positional_of_Widgit'], promotion_name = d['promotion_name'], creative_name = d['creative_name'], event_name = d['event_name']);
    const fireBaseObj = {
        ...Obj.fireBaseData
    };
    FireBase_view_all_less(fireBaseObj);
}

export const ViewAllCouponsOffersClick = (d, itemPosition, promotion_name, creative_name, item_category5, event_name) => {
    let Obj = cart_view_less_more_coupons(d, itemPosition = d['Positional_of_Widgit'], promotion_name = d['promotion_name'], creative_name = d['creative_name'], item_category5 = '', event_name = d['event_name'])
    const fireBaseObj = {
        ...Obj.fireBaseData
    };
    FireBase_view_all_less(fireBaseObj);
}

export const ClubOfferApplied = (d, itemPosition, promotion_name, creative_name, item_category5, event_name, creative_slot) => {
    let Obj = cart_view_less_more_coupons(d, itemPosition = d['Positional_of_Widgit'], promotion_name = d['promotion_name'], creative_name = d['creative_name'], item_category5 = '', event_name = d['event_name'], creative_slot = d['creative_slot'])
    const fireBaseObj = {
        ...Obj.fireBaseData
    };
    FireBase_view_all_less(fireBaseObj);
}

export const MBCashCheckedUnChecked = (d, promotion_name, creative_name, item_category5, event_name, creative_slot) => {
    let Obj = cart_view_less_more_coupons(d, promotion_name = d['promotion_name'], creative_name = d['creative_name'], item_category5 = '', event_name = d['event_name'], creative_slot = d['creative_slot'])
    const fireBaseObj = {
        ...Obj.fireBaseData
    };
    FireBase_view_all_less(fireBaseObj);
}