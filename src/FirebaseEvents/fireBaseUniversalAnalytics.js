import { eventKeyConfig } from "../config/eventKeyConfig";
import FireBaseLogEvent from "./firebaseLogEvent";
import { eventNameConfig } from "../config/eventNameConfig";

export const FireBase_view_promotion_list = (data, cartReducer = '', isNoCart) => {
    let cart_value = 0;
    if (cartReducer && cartReducer.cartVariantSummaryList && cartReducer.cartVariantSummaryList.length > 0) {
        cartReducer.cartVariantSummaryList.map((item) => {
            cart_value = cart_value + item.variantPrice;
        });
    }
    let eventData = {
        [eventKeyConfig['cart_value']]: cart_value,
        'currency': 'INR',
        ...data
    };
    if (isNoCart) {
        delete eventData[[eventKeyConfig['cart_value']]];
    }
    console.log("Fired from events-tree");
    FireBaseLogEvent(eventNameConfig['view_promotion'], eventData);
};

export const __FireBase_view_item_list = (data, cartReducer, isNoCart) => {
    let cart_value = 0;
    if (cartReducer && cartReducer.cartVariantSummaryList && cartReducer.cartVariantSummaryList.length > 0) {
        cartReducer.cartVariantSummaryList.map((item) => {
            cart_value = cart_value + item.variantPrice;
        });
    }
    //     const slicedArray = data && data.items && data.items.slice(0, 50);
    // data.items=slicedArray;
    let eventData = {
        [eventKeyConfig['cart_value']]: cart_value,
        'currency': 'INR',
        ...data
    };
    if (isNoCart) {
        delete eventData[[eventKeyConfig['cart_value']]];
    }
    FireBaseLogEvent(eventNameConfig['view_item_list'], eventData);
};

export const __FireBase_view_item = (data) => {
    const eventData = {
        currency: 'INR',
        ...data
    };
    FireBaseLogEvent(eventNameConfig['view_item'], eventData);
};

export const __FireBase_select_item = (data) => {
    const eventData = {
        currency: 'INR',
        ...data
    };
    FireBaseLogEvent(eventNameConfig['select_item'], eventData);
};

export const __FireBase_select_promotion = (data) => {
    const eventData = {
        currency: 'INR',
        ...data
    };
    FireBaseLogEvent(eventNameConfig['select_promotion'], eventData);
};

export const __FireBase_begin_checkout = (data, step, option) => {
    const eventData = {
        currency: 'INR',
        'actionField': { 'step': step, 'option': option },
        ...data
    };
    FireBaseLogEvent(eventNameConfig['begin_checkout'], eventData);
};

export const __FireBase_add_shipping_info = (data, step, option) => {
    const eventData = {
        currency: 'INR',
        'actionField': { 'step': step, 'option': option },
        ...data
    };
    FireBaseLogEvent(eventNameConfig['add_shipping_info'], eventData);
};

export const __FireBase_add_payment_info = (data, step, option) => {
    const eventData = {
        currency: 'INR',
        'actionField': { 'step': step, 'option': option },
        ...data
    };
    FireBaseLogEvent(eventNameConfig['add_payment_info'], eventData);
};

export const __FireBase_order_initiated = (data, step, option) => {
    const eventData = {
        currency: 'INR',
        'actionField': { 'step': step, 'option': option },
        ...data
    };
    FireBaseLogEvent(eventNameConfig['order_initiated'], eventData);
};

export const __FireBase_user_attr = (data) => {
    const eventData = {
        ...data
    };
    FireBaseLogEvent(data.event_name, eventData);
};

export const __FireBase_purchase = (data) => {
    const eventData = {
        currency: 'INR',
        transaction_id: data.actionField.id,
        affiliation: data.actionField.affiliation,
        value: data.actionField.revenue,
        tax: 0,
        shipping: data.actionField.shipping,
        coupon: data.actionField.coupon,
        items: data.fireBaseData.items || []
    };
    FireBaseLogEvent(eventNameConfig['purchase'], eventData);
};

export const __FireBase_view_cart = (data) => {
    const eventData = {
        currency: 'INR',
        ...data
    };
    FireBaseLogEvent(eventNameConfig['view_cart'], eventData);
};

export const __FireBase_add_to_wishlist = (data) => {
    const eventData = {
        currency: 'INR',
        ...data
    };
    FireBaseLogEvent(eventNameConfig['add_to_wishlist'], eventData);
};

export const __FireBase_cart_update = (data, promotion_name) => {
    if(promotion_name=='quantity increase'){
        __FireBase_add_to_cart(data);
    }else if(promotion_name =='quantity decrease'){
        __FireBase_remove_from_cart(data);
    }
};

export const __FireBase_remove_from_cart = (data) => {
    const eventData = {
        currency: 'INR',
        ...data
    };
    FireBaseLogEvent(eventNameConfig['remove_from_cart'], eventData);
};

export const __FireBase_add_to_cart = (data) => {
    const eventData = {
        currency: 'INR',
        ...data
    };
    FireBaseLogEvent(eventNameConfig['add_to_cart'], eventData);
};

export const __FireBase_buy_now = (data) => {
    const eventData = {
        currency: 'INR',
        ...data
    };
    FireBaseLogEvent(eventNameConfig['add_to_cart'], eventData);
};