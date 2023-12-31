/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
import React, { useState, useEffect, useRef } from 'react';
import { withTranslation } from '@i18n';
import { translation } from '@config';
import cookies from 'js-cookie';
import dayjs from 'dayjs';
import locale_id from 'dayjs/locale/id';
import locale_en from 'dayjs/locale/en';
import ViewLanguage from '@core_modules/setting/components/language/view';
import { getStoreName } from '@core_modules/setting/services/graphql';

const COOKIES_APP_LANG = 'app_lang';
const COOKIES_STORE_CODE = 'store_code_storage';

const SwitcherLanguage = (props) => {
    const { i18n, onCallbackLanguage } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const { data: remoteLang, loading: loadDataLang } = getStoreName();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const mount = useRef();
    const [lang, setLang] = useState({});

    const dataLang = [];
    /**
     * [useEffect] life cycle react
     */
    useEffect(() => {
        mount.current = true;
        if (mount.current && remoteLang !== undefined) {
            if (remoteLang && remoteLang.availableStores) {
                const getLangFromStorage = () => {
                    // prettier-ignore
                    const defaultLangFromDatabase = translation.defaultLanguage;
                    const defaultLabel = translation.languagesLabel[translation.defaultLanguage];
                    const storeCode = cookies.get(COOKIES_STORE_CODE);
                    let defaultDataLang = {};
                    let loginAsCustomer = {};
                    remoteLang.availableStores.forEach(({
                        is_default_store, locale, store_code, store_name,
                    }) => {
                        if (is_default_store) {
                            defaultDataLang = {
                                label: store_name,
                                value: locale.slice(0, 2),
                                storeCode: store_code,
                            };
                        }
                        if (storeCode !== undefined && storeCode === store_code) {
                            loginAsCustomer = {
                                label: store_name,
                                value: locale.slice(0, 2),
                                storeCode: store_code,
                            };
                        }
                        return null;
                    });
                    if ((defaultDataLang && defaultDataLang.value === 'en') || (defaultDataLang && defaultDataLang.value === 'id')) {
                        const getDataCookies = cookies.get(COOKIES_APP_LANG) !== undefined
                            ? JSON.parse(cookies.get(COOKIES_APP_LANG))
                            : {
                                label: defaultDataLang && defaultDataLang.label,
                                value: defaultDataLang && defaultDataLang.value,
                            };
                        if (getDataCookies?.value === 'id') {
                            dayjs.locale(locale_id);
                        } else {
                            dayjs.locale(locale_en);
                        }
                        i18n.changeLanguage(getDataCookies.value);
                        cookies.set(COOKIES_APP_LANG, getDataCookies);
                        setLang(getDataCookies);
                    } else {
                        const getDataCookies = cookies.get(COOKIES_APP_LANG) !== undefined && defaultDataLang !== undefined
                            ? JSON.parse(cookies.get(COOKIES_APP_LANG))
                            : {
                                label: defaultLabel,
                                value: defaultLangFromDatabase,
                            };
                        if (getDataCookies?.value === 'id') {
                            dayjs.locale(locale_id);
                        } else {
                            dayjs.locale(locale_en);
                        }
                        i18n.changeLanguage(getDataCookies.value);
                        cookies.set(COOKIES_APP_LANG, getDataCookies);
                        setLang(getDataCookies);
                    }
                    if (storeCode !== undefined && loginAsCustomer) {
                        const tempLang = (
                            loginAsCustomer.value === 'en' || loginAsCustomer.value === 'id'
                        ) ? loginAsCustomer.value : defaultLangFromDatabase;
                        const getDataCookies = {
                            label: loginAsCustomer.label,
                            value: tempLang,
                            storeCode: loginAsCustomer.storeCode,
                        };
                        if (getDataCookies?.value === 'id') {
                            dayjs.locale(locale_id);
                        } else {
                            dayjs.locale(locale_en);
                        }
                        i18n.changeLanguage(getDataCookies.value);
                        cookies.set(COOKIES_APP_LANG, getDataCookies);
                        setLang(getDataCookies);
                    }
                };
                getLangFromStorage();
            }
        }
        return () => (mount.current = false);
    }, [remoteLang]);

    /**
     * [METHOD] handle click popover
     * @param {*} event
     */
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    /**
     * [METHOD] handle close popover
     */
    const handleClose = () => setAnchorEl(null);

    /**
     * [METHOD] on click language
     */
    const onClickLanguage = ({ item }) => {
        const getDataSelect = item.value !== 'en' && item.value !== 'id' ? {
            label: item.label,
            value: translation.defaultLanguage,
            storeCode: item.storeCode,
        } : {
            label: item.label,
            value: item.value,
            storeCode: item.storeCode,
        };
        i18n.changeLanguage(getDataSelect.value);
        if (item?.value === 'id') {
            dayjs.locale(locale_id);
        } else {
            dayjs.locale(locale_en);
        }
        cookies.set(COOKIES_STORE_CODE, getDataSelect.storeCode);
        cookies.set(COOKIES_APP_LANG, getDataSelect);
        setLang(getDataSelect);
        handleClose();
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    if (remoteLang) {
        remoteLang.availableStores.map((item) => {
            dataLang.push({
                label: item.store_name,
                value: item.locale.slice(0, 2),
                storeCode: item.store_code,
                storeGroupCode: item.store_group_code,
                websiteCode: item.website_code,
            });
            return null;
        });
        const propsOther = {
            id,
            open,
            anchorEl,
            dataLang,
            loadDataLang,
            lang,
            onCallbackLanguage,
            handleClick,
            handleClose,
            onClickLanguage,
        };
        return <ViewLanguage {...props} {...propsOther} remoteLang={remoteLang} />;
    }
    return null;
};

export default withTranslation()(SwitcherLanguage);
