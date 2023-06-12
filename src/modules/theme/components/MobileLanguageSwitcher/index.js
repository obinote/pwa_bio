import View from '@core_modules/theme/components/MobileLanguageSwitcher/view';
import { getStoreName } from '@core_modules/setting/services/graphql';
import { useRef, useEffect, useState } from 'react';
import { translation } from '@config';
import cookies from 'js-cookie';

const COOKIES_APP_LANG = 'app_lang';
const COOKIES_STORE_CODE = 'store_code_storage';

const MobileLangueSwitcher = (props) => {
    const { i18n } = props;
    const { data: remoteLang } = getStoreName();
    const mount = useRef();
    const [lang, setLang] = useState({});

    const dataLang = [];

    if (!i18n) {
        return null;
    }
    /**
     * [useEffect] life cycle react
     */
    useEffect(() => {
        mount.current = true;
        if (mount.current) {
            const getLangFromStorage = () => {
                // prettier-ignore
                let defaultLangFromDatabase = translation.defaultLanguage;
                let defaultLabel = translation.languagesLabel[translation.defaultLanguage];
                if (remoteLang) {
                    remoteLang.availableStores.map((item) => {
                        if (item.is_default_store) {
                            defaultLangFromDatabase = item.locale.slice(0, 2);
                            defaultLabel = item.store_name;
                        }
                        return null;
                    });
                }
                const getDataCookies = cookies.get(COOKIES_APP_LANG) !== undefined
                    ? JSON.parse(cookies.get(COOKIES_APP_LANG))
                    : {
                        label: defaultLabel,
                        value: defaultLangFromDatabase,
                    };

                i18n.changeLanguage(getDataCookies.value);
                cookies.set(COOKIES_APP_LANG, getDataCookies);
                setLang(getDataCookies);
            };
            getLangFromStorage();
        }
        return () => {
            mount.current = false;
        };
    }, []);

    /**
     * [METHOD] on click language
     */
    const onClickLanguage = (item) => {
        i18n.changeLanguage(item.value);
        cookies.set(COOKIES_STORE_CODE, item.storeCode);
        cookies.set(COOKIES_APP_LANG, item);
        setLang(item);
        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    if (remoteLang && i18n) {
        remoteLang.availableStores.map((item) => {
            dataLang.push({
                label: item.store_name,
                value: item.locale.slice(0, 2),
                storeCode: item.store_code,
            });
            return null;
        });
        const propsOther = {
            dataLang,
            lang,
            onClickLanguage,
        };
        return <View {...props} {...propsOther} remoteLang={remoteLang} i18n={i18n} />;
    }
    return null;
};

export default MobileLangueSwitcher;
