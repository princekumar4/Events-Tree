import { eventKeyConfig } from "@/config/eventKeyConfig";
import { __getSlotInfo, __isMobile, __urlMaker } from "@/Services/service";

export const __pdp_comboData_props = (data = [], promotion_name = '', parentTabInfo, nm) => {
    let firebaseAttr = [];
    if (data && data.length > 0) {
        data.map((d, i) => {
            const fireBaseObj = __pdp_combo_item_props({ ...d, nm: nm }, (i + 1), promotion_name, parentTabInfo);
            firebaseAttr.push(fireBaseObj);
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

export const __other_Impression_data = (productdata) => {
    let firebaseAttr = [];
    let indexPosition = sessionStorage.getItem("indexPosition") || 1;
    sessionStorage.removeItem('indexPosition');
    const slotInfo = __getSlotInfo(indexPosition);
    firebaseAttr.push({
        [eventKeyConfig['item_name']]: productdata.name || productdata.nm || '',
        [eventKeyConfig['item_id']]: productdata.id || '',
        [eventKeyConfig['item_brand']]: productdata.brName || '',
        [eventKeyConfig['item_variant']]: productdata.id || '',
        /* [eventKeyConfig['item_category']]: '', */
        [eventKeyConfig['item_category2']]: productdata.catName || '',
        [eventKeyConfig['item_category3']]: productdata.secondary_category || '',
        /* [eventKeyConfig['item_category4']]: '',
        [eventKeyConfig['item_category5']]: '', */
        [eventKeyConfig['price']]: productdata.offerPrice || productdata.offer_pr || '',
        [eventKeyConfig['quantity']]: 1,
        ...slotInfo,
    });
    let Obj = {
        fireBaseData: {
            items: firebaseAttr || []
        }
    };
    return Obj;
};

export const __PK_Impression_data = (productdata) => {
    let firebaseAttr = [];
    const indexPosition = sessionStorage.getItem("indexPosition") || 1;
    const packs = productdata && productdata.packs;
    let filter = '';
    if (__isMobile()) {
        filter = sessionStorage.getItem("mobilefilter");
    } else {
        filter = sessionStorage.getItem("filterClicked");
    }
    if (packs) {
        const packAttr = __getPDPPackAttrs(packs.packSv || []);
        const slotInfo = __getSlotInfo(indexPosition);
        const restInfo = {
            [eventKeyConfig['item_brand']]: (packAttr && packAttr.brand) || 'MuscleBlaze',
            [eventKeyConfig['item_category2']]: (packAttr && packAttr.catName) || '',
            [eventKeyConfig['item_category3']]: (packAttr && packAttr.secondary_category) || '',
            [eventKeyConfig['item_list_name']]: (packAttr && packAttr.item_list_name) || '',
            [eventKeyConfig['item_list_id']]: (packAttr && packAttr.item_list_id) || '',
        };
        firebaseAttr.push({
            [eventKeyConfig['item_name']]: packs.nm || packs.name || '',
            [eventKeyConfig['item_id']]: packs.id || '',
            [eventKeyConfig['item_variant']]: packs.id || '',
            [eventKeyConfig['price']]: (packs.offer_pr) || (packs.offerPrice) || 0,
            [eventKeyConfig['quantity']]: 1,
            ...restInfo,
            ...slotInfo,
        });
    }
    let Obj = {
        fireBaseData: {
            items: firebaseAttr || []
        }
    };
    return Obj;
};

export const __SV_Impression_data = (productdata) => {
    let firebaseAttr = [];
    firebaseAttr.push({
        [eventKeyConfig['item_name']]: productdata.name || productdata.nm || '',
        [eventKeyConfig['item_id']]: productdata.id || '',
        [eventKeyConfig['item_brand']]: productdata.brName || '',
        [eventKeyConfig['item_variant']]: productdata.id || '',
        [eventKeyConfig['item_category2']]: productdata.catName || '',
        [eventKeyConfig['item_category3']]: productdata.secondary_category || '',
        [eventKeyConfig['price']]: productdata.offerPrice || productdata.offer_pr || '',
        [eventKeyConfig['quantity']]: 1,
    });
    let Obj = {
        fireBaseData: {
            items: firebaseAttr || []
        }
    };
    return Obj;
};

export const _pdp_mayLike_props = (data = [], promotion_name = '', parentTabInfo = {}) => {
    let firebaseAttr = [];
    data.map((item, i) => {
        if (!item) return null;
        let url;
        if (item.urlFragment) {
            url = item.pk_type ? '/pk' + item.urlFragment : '/sv' + item.urlFragment;
            url += `?navKey=${item.navKey}`;
        }
        let spName = item.spName || item.nm || item.name;
        const slotInfo = __getSlotInfo(i + 1);
        firebaseAttr.push({
            [eventKeyConfig['item_name']]: spName || '',
            [eventKeyConfig['url']]: url || '',
            [eventKeyConfig['promotion_name']]: promotion_name,
            [eventKeyConfig['item_id']]: item.id || '',
            [eventKeyConfig['item_brand']]: item.brName || '',
            [eventKeyConfig['item_variant']]: item.id || '',
            [eventKeyConfig['item_category']]: '',
            [eventKeyConfig['item_category2']]: item.catName || '',
            [eventKeyConfig['item_category3']]: item.secondary_category || '',
            [eventKeyConfig['item_category4']]: '',
            [eventKeyConfig['item_category5']]: '',
            [eventKeyConfig['price']]: item.offer_pr || '',
            [eventKeyConfig['quantity']]: 1,
            [eventKeyConfig['item_list_id']]: '',
            [eventKeyConfig['item_list_name']]: '',
            [eventKeyConfig['creative_slot']]: parentTabInfo && parentTabInfo.creative_slot || 0,
            [eventKeyConfig['creative_name']]: parentTabInfo && parentTabInfo.creative_name || '',
            ...slotInfo,
        });
    });
    let Obj = {
        fireBaseData: {
            items: firebaseAttr || []
        }
    };
    return Obj;
};

export const __pdp_combo_item_props = (data, itemPosition, promotion_name = '', parentTabInfo) => {
    let item = data && data.sv_bsc;
    if (!item) return null;
    let url;
    if (item.urlFragment) {
        url = item.pk_type ? '/pk' + item.urlFragment : '/sv' + item.urlFragment;
        url += `?navKey=${item.navKey}`;
    }
    let categoryString = '';
    item.packSv && item.packSv.length > 0 && item.packSv.map((ele, index) => {
        categoryString += ` ${ele && ele.sv_bsc && ele.sv_bsc.catName} ${index === item.packSv.length - 1 ? '' : ','}`;
    });
    const slotInfo = __getSlotInfo(itemPosition);
    return {
        [eventKeyConfig['item_name']]: (item.spName || item.nm || item.name) || '',
        [eventKeyConfig['url']]: url || '',
        [eventKeyConfig['promotion_name']]: promotion_name,
        [eventKeyConfig['item_id']]: item.id || '',
        [eventKeyConfig['item_brand']]: item.brName || 'MuscleBlaze',
        [eventKeyConfig['item_variant']]: item.id || '',
        [eventKeyConfig['item_category']]: '',
        [eventKeyConfig['item_category2']]: item.catName || categoryString || '',
        [eventKeyConfig['item_category3']]: item.secondary_category || '',
        [eventKeyConfig['item_category4']]: '',
        [eventKeyConfig['item_category5']]: '',
        [eventKeyConfig['price']]: item.offer_pr || '',
        [eventKeyConfig['quantity']]: 1,
        /* [eventKeyConfig['item_list_id']]: '',
        [eventKeyConfig['item_list_name']]: item.nm || '', */
        [eventKeyConfig['creative_slot']]: parentTabInfo && parentTabInfo.creative_slot || 0,
        [eventKeyConfig['creative_name']]: parentTabInfo && parentTabInfo.creative_name || '',
        ...slotInfo,
    };
};

export const __yml_packAttr = (variants) => {
    let catName = [], brand = [], secondary_category = [], vendorName = [], estDeliveryDate = [];
    variants && variants.length > 0 && variants.map((variant) => {
        if (variant && variant.sv_bsc) {
            const item = variant.sv_bsc;
            const itemBrand = (item.brand && (item.brand.dis_nm || item.brand || ''));
            item.catName && catName.push(item.catName);
            itemBrand && brand.push(itemBrand);
            item.secondary_category && secondary_category.push(item.secondary_category);
            item.vendorName && vendorName.push(item.vendorName);
            item.hkrDeliveryResponse && item.hkrDeliveryResponse.estDeliveryDate && estDeliveryDate.push(item.hkrDeliveryResponse.estDeliveryDate);
        }
    });
    return {
        catName: catName.join('|'),
        brand: brand.join('|'),
        secondary_category: secondary_category.join('|'),
        vendorName: vendorName.join('|'),
        estDeliveryDate: estDeliveryDate.join('|'),
    };
};

export const __yml_item_props = (data, itemPosition, title, widgetPosition, parentTabInfo, iscombo) => {
    let url = '';
    if (data.urlFragment) {
        url = __urlMaker(data.urlFragment, data.navKey);
    }
    const isPack = data.pk_type || (data.packSv && data.packSv.length > 0);
    let packAttr = null;
    if (data.packSv && data.packSv.length > 0) {
        packAttr = __yml_packAttr(data.packSv);
    }
    let Obj = {
        id: data.id || "",
        name: data.nm || "",
        nm: data.nm || "",
        catName: ((packAttr && packAttr.catName) || data.catName) || "",
        catPre: data.catPre || "",
        secondary_category: ((packAttr && packAttr.secondary_category) || data.secondary_category) || "",
        brName: ((packAttr && packAttr.brName) || data.brName) || "",
        goal: data.goal || "",
        mrp: data.mrp || 0,
        offer_pr: data.offer_pr || 0,
        img: ((data.pckimage && data.pckimage.o_link) || (data.m_img && data.m_img.o_link)) || "",
        alt: ((data.pckimage && data.pckimage.alt) || (data.m_img && data.m_img.alt)) || "",
        vendorName: data.vendorName || "",
        navKey: data.navKey || "",
        hkrDeliveryResponse: data.hkrDeliveryResponse || null,
        hkUserLoyaltyPricingDto: data.hkUserLoyaltyPricingDto || null,
        loyaltyCash: data.loyaltyCash,
        oos: data.oos,
        url: url || "",
        isPack: isPack,
        iscombo: iscombo,
        itemPosition: itemPosition,
        widgitName: title,
        widgetPosition: widgetPosition,
        parentTabInfo: parentTabInfo
    };
    return Obj;
};

export const __getPDPPackAttrs = (variants) => {
    let catName = [], brand = [], secondary_category = [], vendorName = [], item_list_name = [], item_list_id = [], estDeliveryDate = [];
    variants && variants.length > 0 && variants.map((d) => {
        let item = d.sv_bsc;
        if (item) {
            let brandName = ((item.brand && item.brand.dis_nm) || item.brand) || '';
            item.catName && catName.push(item.catName);
            brandName && brand.push(brandName);
            item.secondary_category && secondary_category.push(item.secondary_category);
            item.vendorName && vendorName.push(item.vendorName);
            item.nm && item_list_name.push(item.nm);
            item.id && item_list_id.push(item.id);
            item.hkrDeliveryResponse && item.hkrDeliveryResponse.estDeliveryDate && estDeliveryDate.push(item.hkrDeliveryResponse.estDeliveryDate);
        }
    });
    return {
        catName: catName.join('|'),
        brand: brand.join('|'),
        secondary_category: secondary_category.join('|'),
        vendorName: vendorName.join('|'),
        item_list_name: item_list_name.join('|'),
        item_list_id: item_list_id.join('|'),
        estDeliveryDate: estDeliveryDate.join('|'),
    };
};

export const __getPackAttrProps = (variants) => {
    try {
        let catName = [], brand = [], secondary_category = [], vendorName = [], item_list_name = [], item_list_id = [], estDeliveryDate = [];
        variants && variants.length > 0 && variants.map((item) => {
            if (item) {
                let brandName = ((item.brand && item.brand.dis_nm) || item.brand) || '';
                item.catName && catName.push(item.catName);
                brandName && brand.push(brandName);
                item.secondary_category && secondary_category.push(item.secondary_category);
                item.vendorName && vendorName.push(item.vendorName);
                item.sv_nm && item_list_name.push(item.sv_nm);
                item.sv_id && item_list_id.push(item.sv_id);
                item.hkrDeliveryResponse && item.hkrDeliveryResponse.estDeliveryDate && estDeliveryDate.push(item.hkrDeliveryResponse.estDeliveryDate);
            }
        });
        return {
            [eventKeyConfig['item_category2']]: catName.join('|'),
            [eventKeyConfig['item_category3']]: secondary_category.join('|'),
            [eventKeyConfig['item_brand']]: brand.join('|'),
            vendorName: vendorName.join('|'),
            [eventKeyConfig['item_list_name']]: item_list_name.join('|'),
            [eventKeyConfig['item_list_id']]: item_list_id.join('|'),
            [eventKeyConfig['est_delivery_date']]: estDeliveryDate.join('|'),
        };
    } catch (err) {
        console.log(err);
    }
};

export const __getPackAttrs = (variants) => {
    try {
        let catName = [], brand = [], secondary_category = [], vendorName = [], item_list_name = [], item_list_id = [], estDeliveryDate = [];
        variants && variants.length > 0 && variants.map((item) => {
            if (item) {
                let brandName = ((item.brand && item.brand.dis_nm) || item.brand) || '';
                item.catName && catName.push(item.catName);
                brandName && brand.push(brandName);
                item.secondary_category && secondary_category.push(item.secondary_category);
                item.vendorName && vendorName.push(item.vendorName);
                item.sv_nm && item_list_name.push(item.sv_nm);
                item.sv_id && item_list_id.push(item.sv_id);
                item.hkrDeliveryResponse && item.hkrDeliveryResponse.estDeliveryDate && estDeliveryDate.push(item.hkrDeliveryResponse.estDeliveryDate);
            }
        });
        return {
            catName: catName.join('|'),
            brand: brand.join('|'),
            secondary_category: secondary_category.join('|'),
            vendorName: vendorName.join('|'),
            item_list_name: item_list_name.join('|'),
            item_list_id: item_list_id.join('|'),
            estDeliveryDate: estDeliveryDate.join('|'),
        };
    } catch (err) {
        console.log(err);
    }
};

export const __Offers_item_props = (d, itemPosition, promotion_name = '', item_category5 = '', creative_name, event_name, creative_slot) => {
    try {
        if (!d) return;
        let firebaseAttr = [];
        let slotInfo = __getSlotInfo(itemPosition);
        firebaseAttr.push({
            [eventKeyConfig['item_name']]: d.title || '',
            [eventKeyConfig['url']]: d.link || '',
            [eventKeyConfig['promotion_name']]: promotion_name,
            [eventKeyConfig['item_category5']]: d.item_category5 || '',
            [eventKeyConfig['creative_name']]: creative_name,
            [eventKeyConfig['event_name']]: event_name,
            [eventKeyConfig['item_name']]: d.spName || '',
            [eventKeyConfig['url']]: '' || '',
            [eventKeyConfig['promotion_name']]: promotion_name,
            [eventKeyConfig['item_id']]: d.id || '',
            [eventKeyConfig['item_brand']]: d.brName || '',
            [eventKeyConfig['item_variant']]: d.id || '',
            [eventKeyConfig['item_category']]: '',
            [eventKeyConfig['item_category2']]: d.catName || '',
            [eventKeyConfig['item_category3']]: d.secondary_category || '',
            [eventKeyConfig['item_category4']]: '',
            [eventKeyConfig['item_category5']]: '',
            [eventKeyConfig['price']]: d.offer_pr || '',
            [eventKeyConfig['coupon']]: creative_name || '',
            [eventKeyConfig['creative_slot']]: creative_slot || '',
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