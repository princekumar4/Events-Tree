import { logEvent } from "firebase/analytics";
import FireBaseInit from '../index';
import config from "../../config/config";
import { eventKeyConfig } from "../../config/eventKeyConfig";
import {
    __getCookie,
    __isMobile,
    __localStorageGet,
    __loggedIn,
    __sessionStorageGet,
} from "../../factoryMethods/service";

const getDefaultParam = (eventname) => {
    let pagename = __localStorageGet("prevScreenName");
    let currScreenName = __localStorageGet("currScreenName");
    const pageMapping = {
        'home': 'Home Page',
        'storeVariant': 'PDP Page',
        'pack': 'PDP Page',
        'menuLanding': 'Listing Page',
        'clearance': 'Listing Page',
        'brandCatalog': 'Listing Page',
        'search': 'SEARCH_PAGE',
    };
    if (pagename || currScreenName) {
        for (const key in pageMapping) {
            if (pagename && pagename == key) {
                pagename = pageMapping[key];
            }
            if (currScreenName && currScreenName == key) {
                currScreenName = pageMapping[key];
            }
        }
    }

    let deviceid = __localStorageGet("deviceId");
    const user_id = __loggedIn();
    if (!deviceid) {
        deviceid = Math.floor(Math.random() * Math.pow(16, 15)).toString(16);
        localStorage.setItem('deviceId', deviceid);
    }
    const pincode = __getCookie('hkPincode') || '';
    let queryparam = (window.location.search || "").slice(0, 199);
    if (window.pageType === config.pageTypes.campaign.retailRefill) {
        queryparam = 'retail-refill-campaign-queryparam';
    }
    let networktype = '';
    if (navigator.connection) {
        networktype = (navigator.connection.effectiveType) ? navigator.connection.effectiveType : '';
    }
    const utm_source = __getCookie("affiliateName") || '';
    const utm_medium = __getCookie("affiliateMedium") || '';
    const utm_campaign = __getCookie("affiliateCampaign") || '';
    const userData = __localStorageGet('userData');
    const customUserAttr = __sessionStorageGet('customUserAttr');
    let tot_redeem_pts = 0;
    if (userData) {
        tot_redeem_pts = userData.tot_redeem_pts;
    }
    const isMobile = __isMobile();
    let platform = isMobile ? 'Mobile' : 'Desktiop';
    let _defaults = {
        [eventKeyConfig['deviceid']]: deviceid,
        [eventKeyConfig['user_id']]: user_id,
        [eventKeyConfig['pincode']]: pincode,
        [eventKeyConfig['queryparam']]: queryparam,
        [eventKeyConfig['screenname']]: currScreenName,
        [eventKeyConfig['pagename']]: pagename,
        [eventKeyConfig['networktype']]: networktype,
        [eventKeyConfig['utm_campaign']]: utm_campaign,
        [eventKeyConfig['utm_medium']]: utm_medium,
        [eventKeyConfig['utm_source']]: utm_source,
        [eventKeyConfig['est_delivery_date']]: '',
        /* [eventKeyConfig['status']]: '', */
        //[eventKeyConfig['keyword']]: '',
        [eventKeyConfig['reward_points_available']]: tot_redeem_pts,
        [eventKeyConfig['value']]: '',
        //[eventKeyConfig['is_active_user']]: '',
        //[eventKeyConfig['searchaction']]: '',
        [eventKeyConfig['source_cfa_id']]: '',
        [eventKeyConfig['sourcepin']]: '',
        [eventKeyConfig['total_item_quantity']]: '',
        [eventKeyConfig['purchase_revenue']]: '',
        [eventKeyConfig['refund_value']]: '',
        [eventKeyConfig['shipping_value']]: '',
        //[eventKeyConfig['tax_value']]: '',
        [eventKeyConfig['transaction_id']]: '',
        [eventKeyConfig['platform']]: platform,
        [eventKeyConfig['currency']]: 'INR',
    };
    if (eventname) {
        _defaults['event_name'] = eventname;
    }
    if (customUserAttr) {
        if (customUserAttr.noItemsInCart) {
            _defaults[eventKeyConfig['value']] = customUserAttr.noItemsInCart;
        }
    }
    return _defaults;
};

const FireBaseLogEvent = (eventname, eventData, firebaseConfigState = {}) => {
    let defaultParam = getDefaultParam(eventname);
    let payload = { ...defaultParam, ...eventData };
    if (window.firebaseAnalytics) {
        //console.log('>\x1b[30m\x1b[42mFireBase is disabled for local environment\x1b[0m\n');
        // console.log(`payload:v1 ----for ${eventname} event is `, payload);
        logEvent(window.firebaseAnalytics, eventname, payload);
    } else {
        FireBaseInit(firebaseConfigState, true, eventname, eventData);
    }
};

export default FireBaseLogEvent;