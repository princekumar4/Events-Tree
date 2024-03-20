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