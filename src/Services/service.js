import { eventKeyConfig } from "@/config/eventKeyConfig";

const chekIfJsonOrString = (data) => {
    var ret = true;
    try {
        JSON.parse(data);
    } catch (e) {
        ret = false;
    }
    return ret;
};

export const __getCookie = (cname = '') => {
    if (typeof window !== 'undefined') {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
        }
    }
    return false;
};

export const __isMobile = () => {
    let check = false;
    (function (a) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(a))
            check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

export const __localStorageGet = (key) => {
    let temp = null;
    let data = null;
    if (typeof window !== 'undefined') {
        data = localStorage.getItem(key);
        if (data && typeof data == "boolean") {
            temp = data;
        } else {
            let isJSON = (data && chekIfJsonOrString(data)) || false;
            if (isJSON) {
                temp = (data && JSON.parse(data)) || null;
            } else {
                temp = data;
            }
        }
    }
    return temp;
};

export const __setCookie = (cname, cvalue, exdays, setDefaultExpiry, inHrs) => {
    if (typeof window !== 'undefined') {
        let _domain = window.location.hostname.indexOf('healthkart.com') > -1 ? window.location.hostname.match(/[^.]+\.[^.]+$/) : null;
        _domain = (_domain !== null && _domain.indexOf('qa') === -1 && _domain.indexOf('stag') === -1) ? '.' + _domain[0] : false;
        if (inHrs) {
            let expires = "expires=" + exdays.toUTCString();
            if (_domain)
                document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=" + _domain + ";path=/";
            else
                document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
        } else {
            const d = new Date();
            if (setDefaultExpiry) {
                d.setDate(exdays);
            } else {
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            }
            let expires = "expires=" + d.toGMTString();
            if (_domain)
                document.cookie = cname + "=" + cvalue + "; " + expires + ";domain=" + _domain + ";path=/";
            else
                document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
        }
    }
};

export const __setCookieLoggedIn = (userid, isTemp) => {
    __setCookie('isUserLoggedIn', '"' + userid + '"', 365);
    if (isTemp) {
        __setCookie('isTMPUser', '"' + isTemp + '"', 365);
    }
};

export const __loggedIn = () => {
    try {
        let userStatus = false;
        if (typeof window != 'undefined') {
            let _cookie = __getCookie('assumeAuth') || __getCookie('authtoken');
            let _localValue = __getCookie('assumeId') || localStorage.getItem('isUserLoggedIn');
            userStatus = _localValue && _cookie && !localStorage.getItem('isTMPUser') ? _localValue : false;
            userStatus = userStatus !== 'false' ? userStatus : false;
            //====SSR HANDLING===========
            if (localStorage.getItem('isUserLoggedIn') && !__getCookie('isUserLoggedIn')) {
                if (localStorage.getItem('isTMPUser') && !__getCookie('isTMPUser')) {
                    __setCookieLoggedIn(localStorage.getItem('isUserLoggedIn', 1));
                } else {
                    __setCookieLoggedIn(localStorage.getItem('isUserLoggedIn'));
                }
            }
        }
        return userStatus;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};

export const __sessionStorageGet = (key) => {
    let temp = null;
    let data = null;
    if (typeof window !== 'undefined') {
        data = sessionStorage.getItem(key);
        if (data && typeof data == "boolean") {
            temp = data;
        } else {
            let isJSON = (data && chekIfJsonOrString(data)) || false;
            if (isJSON) {
                temp = (data && JSON.parse(data)) || null;
            } else {
                temp = data;
            }
        }
    }
    return temp;
};

export const __sessionStorageSet = (key, value) => {
    let temp;
    if ((value == null) || (value == undefined)) {
        return;
    }
    if (!value || (value && typeof value == "boolean") || (value && (typeof value == 'string' || value instanceof String))) {
        temp = value;
    } else {
        temp = JSON.stringify(value);
    }
    sessionStorage && sessionStorage.setItem(key, temp);
};

export const __getTabInfo = (parentTabInfo) => {
    let tabInfo = {};
    if (parentTabInfo && parentTabInfo.creative_name) {
        tabInfo[eventKeyConfig['creative_slot']] = parentTabInfo.creative_slot || 0;
        tabInfo[eventKeyConfig['creative_name']] = parentTabInfo.creative_name || '';
    }
    return tabInfo;
};

export const __getSlotInfo = (indexPosition) => {
    let temp = {};
    let isListIndex = false;
    if (window.pageType === "menuLanding" || window.pageType === "search" || window.pageType === "clearance" || window.pageType === "brandCatalog" || window.pageType === 'search' || window.pageType === 'catPageNew') {
        isListIndex = true;
    }
    if (isListIndex) {
        temp[eventKeyConfig['item_list_index']] = indexPosition;
        temp[eventKeyConfig['promotion_slot']] = indexPosition || '';
        temp[eventKeyConfig['promotion_id']] = indexPosition || '';
    } else {
        temp[eventKeyConfig['promotion_slot']] = indexPosition || '';
        temp[eventKeyConfig['promotion_id']] = indexPosition || '';
    }
    return temp;
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

export const __createHomeTopCategoriesItem = (imgItm, itemPosition, promotion_name) => {
    const slotInfo = __getSlotInfo(itemPosition);
    let item = {
        [eventKeyConfig['item_name']]: imgItm.alt || '',
        [eventKeyConfig['url']]: imgItm.lp || '',
        [eventKeyConfig['promotion_name']]: promotion_name,
        ...slotInfo,
    };
    return item;
};

export const __urlMaker = (fragment, navkey, itracker) => {
    itracker = itracker || false;
    let _start = '';
    if (navkey) {
        if (navkey.indexOf('BR-') > -1) {
            _start = '';
        } else if (navkey.indexOf('VRNT-') > -1) {
            _start = '/sv';
        } else if (navkey.indexOf('PA-') > -1) {
            _start = '/pk';
        }
    }
    let _url = _start + fragment;
    if (navkey && _url.indexOf('navKey') === -1) {
        _url = _start + fragment + (navkey ? '?navKey=' + navkey : '');
    }
    _url += itracker ? '&' + __itracker(...itracker) : '';
    _url = _url.replace(process.env.REACT_APP_ACTUAL_PUBLIC_URL, "");
    _url = _url.replace('https://www.muscleblaze.com', "");
    return _url;
};

export const __getSearchParmas = (string, ssrQuery) => {
    let result = {};
    if (typeof window !== 'undefined') {
        string = string || window.location.href;
        var url = URL(string, true);
        result = url.query;
    } else {
        result = ssrQuery || {};
    }
    return result;
};