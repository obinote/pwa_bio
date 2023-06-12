import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Router from 'next/router';
import { removeIsLoginFlagging } from '@helper_auth';
import { removeCartId } from '@helper_cartid';
import Cookies from 'js-cookie';
import { removeCookies } from '@helper_cookies';
import { useApolloClient } from '@apollo/client';
import { localTotalCart, localCompare } from '@services/graphql/schema/local';
import firebase from 'firebase/app';
import firebaseApp from '@lib_firebase/index';
import 'firebase/firestore';
import {
    custDataNameCookie,
    features,
    modules,
} from '@config';
import { setLocalStorage } from '@helper_localstorage';
import {
    getCategoryById, getCustomer, removeToken,
} from '@core_modules/theme/services/graphql';
import Content from '@core_modules/theme/components/header/desktop/components';
import { LIST_AUTO_TERMINATE_CHAT } from '@core_modules/customer/plugins/ChatContent/lib/constansta';
import ResetGuide from '@core_modules/customer/helpers/ResetGuide';

const CoreTopNavigation = (props) => {
    const {

        dataVesMenu: propsVesMenu, storeConfig, t, app_cookies, isLogin, showGlobalPromo,
        enablePopupInstallation, installMessage,
    } = props;
    let data = propsVesMenu;
    const loading = !propsVesMenu;
    const { data: dataCategory } = getCategoryById(115);
    if (dataCategory) {
        data = {
            vesMenu: {
                items: [
                    {
                        name: t('common:header:menu:home'), link: '/', include_in_menu: true, children: [],
                    },
                    { name: t('common:header:menu:categories'), include_in_menu: true, children: dataCategory?.category?.children },
                    {
                        name: t('common:header:menu:distributor'), link: '/distributor', include_in_menu: true, children: [],
                    },
                    {
                        name: t('common:header:menu:promotion'), link: '/promotion', include_in_menu: true, children: [],
                    },
                    {
                        name: t('common:header:menu:aboutus'), link: '/about-us', include_in_menu: true, children: [],
                    },
                    {
                        name: t('common:header:menu:howtoshop'), link: '/how-to-shop', include_in_menu: true, children: [],
                    },
                ],
            },
        };
    }
    const [value, setValue] = React.useState('');
    const [showAccountMenu, setShowAccountMenu] = React.useState(false);
    const [deleteTokenGql] = removeToken();
    const [categoryExpanded, setCategoryExpanded] = React.useState(false);
    let customerData = {};
    if (isLogin && typeof window !== 'undefined') {
        const customer = getCustomer();
        if (customer.data) {
            customerData = customer.data;
        }
    }
    const client = useApolloClient();

    const setOfflineStatus = async () => {
        if (customerData && customerData.customer && customerData.customer.email) {
            setLocalStorage(LIST_AUTO_TERMINATE_CHAT, {});
            const db = firebaseApp.firestore();
            // set customer as offline
            const updateStatus = async () => {
                const docReference = db.collection('status').doc(customerData.customer.email);
                await docReference.update({
                    status: '0',
                });
            };
            // eslint-disable-next-line no-console
            await updateStatus().catch((e) => console.log(e));
        }
    };

    const handleExpandCategory = () => {
        setCategoryExpanded(!categoryExpanded);
    };

    const handleLogout = async () => {
        setOfflineStatus();
        ResetGuide();
        window.backdropLoader(true);
        if (features.firebase.config.apiKey && features.firebase.config.apiKey !== '') {
            firebase.auth().signOut().then(() => {
                // Sign-out successful.
            }).catch(() => {
                // An error happened.
            });
        }
        await deleteTokenGql()
            .then(() => {
                Cookies.remove(custDataNameCookie);
                Cookies.remove('admin_id');
                removeIsLoginFlagging();
                removeCartId();
                removeCookies('uid_product_compare');
                client.writeQuery({ query: localTotalCart, data: { totalCart: 0 } });
                client.writeQuery({ query: localCompare, data: { item_count: 0 } });
                window.backdropLoader(false);
                Router.push('/customer/account/login');
            })
            .catch(() => {
                window.backdropLoader(false);
                Router.push('/customer/account/login');
            });
    };

    const handleSearch = (ev) => {
        if (ev.key === 'Enter' && ev.target.value !== '') {
            Router.push(`/catalogsearch/result?q=${value}`);
        }
    };

    const searchByClick = () => {
        if (value !== '') {
            Router.push(`/catalogsearch/result?q=${value}`);
        }
    };

    /**
     * Voice Recognition
     */
    const {
        transcript,
        listening,
    } = useSpeechRecognition();
    const [VRText, setVRText] = useState('');
    const [listen, setListen] = useState(false);
    const [searchPlaceholder, setSearchPlaceholder] = useState(t('common:search:placeholder'));
    // set listening to false after .. second(s)
    const listeningTimeout = 5000;

    const checkCompatibility = () => {
        const {
            browserSupportsSpeechRecognition,
        } = useSpeechRecognition();
        return browserSupportsSpeechRecognition;
    };

    const voiceClickHandler = async () => {
        setSearchPlaceholder(t('common:search:listening'));
        await SpeechRecognition.startListening({ language: 'id-ID', continuous: false });
        setListen(true);
        setTimeout(() => {
            if (transcript === '') {
                SpeechRecognition.stopListening();
                setSearchPlaceholder(t('common:search:placeholder'));
            }
        }, listeningTimeout);
    };

    if (listening === false && listen && VRText !== transcript) {
        if (transcript !== '') {
            setVRText(transcript);
            setSearchPlaceholder(t('common:search:placeholder'));
            Router.push(`/catalogsearch/result?q=${transcript}`);
        }
        setListen(false);
    }

    useEffect(() => {
        if (transcript !== '') {
            setSearchPlaceholder(transcript);
        }
    }, [transcript]);

    const enableVoice = checkCompatibility();

    return (
        <Content
            t={t}
            isLogin={isLogin}
            data={data}
            loading={loading}
            storeConfig={storeConfig}
            handleSearch={handleSearch}
            searchByClick={searchByClick}
            setValue={setValue}
            customer={customerData}
            handleLogout={handleLogout}
            value={value}
            app_cookies={app_cookies}
            showGlobalPromo={showGlobalPromo}
            modules={modules}
            enablePopupInstallation={enablePopupInstallation}
            installMessage={installMessage}
            showAccountMenu={showAccountMenu}
            setShowAccountMenu={setShowAccountMenu}
            enableVoice={enableVoice}
            voiceClickHandler={voiceClickHandler}
            searchPlaceholder={searchPlaceholder}
            dataCategory={dataCategory}
            categoryExpanded={categoryExpanded}
            handleExpandCategory={handleExpandCategory}
        />
    );
};

export default CoreTopNavigation;
