/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable radix */
import React from 'react';
import App from 'next/app';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@theme_theme';
import Cookie from 'js-cookie';
import { getAppEnv } from '@root/core/helpers/env';
import { ThemeProvider } from '@material-ui/core/styles';
import { appWithTranslation } from '@i18n';
import {
    storeConfig as ConfigSchema,
    // getVesMenu,
    getCategories,
} from '@services/graphql/schema/config';
import {
    GTM, custDataNameCookie, features, sentry, modules, datadog, pwaVersion, 
} from '@config';
import { getLoginInfo, getLastPathWithoutLogin } from '@helper_auth';
import {
    setResolver, testLocalStorage, setLocalStorage, getLocalStorage,
} from '@helper_localstorage';
import { RewriteFrames } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';
import { unregister } from 'next-offline/runtime';

import TagManager from 'react-gtm-module';
import PageProgressLoader from '@common_loaders/PageProgress';
import getConfig from 'next/config';
import routeMiddleware from '@middleware_route';
import graphRequest from '@graphql_request';
import requestInternal from '@rest_request';
import Notification from '@lib_firebase/notification';
import firebase from '@lib_firebase/index';
import { gql } from '@apollo/client';

import * as Sentry from '@sentry/node';
import ModalCookies from '@core_modules/theme/components/modalCookies';

import { datadogRum } from '@datadog/browser-rum';

export const StoreConfigContext = React.createContext({});

const { publicRuntimeConfig } = getConfig();

/*
 * ---------------------------------------------
 * SENTRY INITIALIZATION
 */
if (sentry.enabled && typeof publicRuntimeConfig !== 'undefined' && sentry.dsn[publicRuntimeConfig.appEnv]) {
    const distDir = `${publicRuntimeConfig.rootDir}/.next`;
    Sentry.init({
        enabled: process.env.NODE_ENV === sentry.enableMode,
        integrations: [
            new RewriteFrames({
                iteratee: (frame) => {
                    // eslint-disable-next-line no-param-reassign
                    frame.filename = frame.filename.replace(distDir, 'app:///_next');
                    return frame;
                },
            }),
            new Integrations.BrowserTracing(),
        ],
        environment: publicRuntimeConfig.appEnv,
        dsn: sentry.dsn[publicRuntimeConfig.appEnv],
        tracesSampleRate: 0.5,
    });
}

/**
 * --------------------------------------------
 * DATADOG INITIALIZATION
 * --------------------------------------------
 */
if (publicRuntimeConfig.appEnv === 'local' && datadog.local.enabled) {
    datadogRum.init({
        applicationId: datadog.local.applicationId,
        clientToken: datadog.local.clientToken,
        site: datadog.local.site,
        service: datadog.local.service,
        env: datadog.local.env,
        // Specify a version number to identify the deployed version of your application in Datadog
        version: pwaVersion,
        sessionSampleRate: 100,
        premiumSampleRate: 100,
        trackUserInteractions: true,
        defaultPrivacyLevel: 'mask-user-input',
    });
} else if (publicRuntimeConfig.appEnv === 'dev' && datadog.dev.enabled) {
    datadogRum.init({
        applicationId: datadog.dev.applicationId,
        clientToken: datadog.dev.clientToken,
        site: datadog.dev.site,
        service: datadog.dev.service,
        env: datadog.dev.env,
        // Specify a version number to identify the deployed version of your application in Datadog
        // version: '1.0.0',
        sessionSampleRate: 100,
        premiumSampleRate: 100,
        trackUserInteractions: true,
        defaultPrivacyLevel: 'mask-user-input',
    });
} else if (publicRuntimeConfig.appEnv === 'stage' && datadog.stage.enabled) {
    datadogRum.init({
        applicationId: datadog.stage.applicationId,
        clientToken: datadog.stage.clientToken,
        site: datadog.stage.site,
        service: datadog.stage.service,
        env: datadog.stage.env,
        // Specify a version number to identify the deployed version of your application in Datadog
        version: pwaVersion,
        sessionSampleRate: 100,
        premiumSampleRate: 100,
        trackUserInteractions: true,
        defaultPrivacyLevel: 'mask-user-input',
    });
} else if (publicRuntimeConfig.appEnv === 'prod' && datadog.prod.enabled) {
    datadogRum.init({
        applicationId: datadog.prod.applicationId,
        clientToken: datadog.prod.clientToken,
        site: datadog.prod.site,
        service: datadog.prod.service,
        env: datadog.prod.env,
        // Specify a version number to identify the deployed version of your application in Datadog
        version: pwaVersion,
        sessionSampleRate: 100,
        premiumSampleRate: 100,
        trackUserInteractions: true,
        defaultPrivacyLevel: 'mask-user-input',
    });
}

datadogRum.startSessionReplayRecording();
/**
 * --------------------------------------------
 */

class MyApp extends App {
    constructor(props) {
        super(props);
        this.isLogin = false;
    }

    static async getInitialProps(appContex) {
        const { Component, ctx } = appContex;
        let { pageProps } = await App.getInitialProps(appContex);

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        const {
            res, pathname, query, req,
        } = ctx;

        /*
         * ---------------------------------------------
         * MAINTAIN LOGIN FLAG
         * check if login from server
         */
        let isLogin = 0;
        let lastPathNoAuth = '';
        let customerData = {};
        const allcookie = req ? req.cookies : {};
        let removeDecimalConfig;
        if (typeof window !== 'undefined') {
            isLogin = getLoginInfo();
            lastPathNoAuth = getLastPathWithoutLogin();
            customerData = Cookie.getJSON(custDataNameCookie);
        } else {
            isLogin = allcookie.isLogin || 0;
            customerData = allcookie[custDataNameCookie];
            lastPathNoAuth = req.session && typeof req.session !== 'undefined'
                && req.session.lastPathNoAuth && typeof req.session.lastPathNoAuth !== 'undefined'
                ? req.session.lastPathNoAuth
                : '/customer/account/dashboard';
        }
        isLogin = parseInt(isLogin);

        /*
         * ---------------------------------------------
         * [COOKIES] OTHER
         */
        const app_cookies = { cookies_currency: req ? req.cookies.app_currency : null };

        /*
         * ---------------------------------------------
         * CALLING ROUTING MIDDLEWARE
         */
        routeMiddleware({
            res,
            req,
            query,
            pathname,
            isLogin,
            lastPathNoAuth,
        });

        /*
         * ---------------------------------------------
         * GET CONFIGURATIONS FROM COOKIES
         * TO BE PROVIDED INTO PAGE PROPS
         */
        let dataVesMenu;
        let { storeConfig } = pageProps;
        if (typeof window === 'undefined' && (!storeConfig || typeof storeConfig.secure_base_media_url === 'undefined')) {
            // storeConfig = await apolloClient.query({ query: ConfigSchema }).then(({ data }) => data.storeConfig);
            storeConfig = await requestInternal('getConfig');

            // Handle redirecting to tomaintenance page automatically when GQL is in maintenance mode.
            // We do this here since query storeConfig is the first query and be done in server side
            if (ctx && storeConfig.response && storeConfig.response.status && storeConfig.response.status > 500) {
                ctx.res.redirect('/maintenance');
            }
            storeConfig = storeConfig.storeConfig;
            if (!modules.checkout.checkoutOnly) {
                dataVesMenu = storeConfig.pwa.ves_menu_enable
                    ? []
                    : await graphRequest(getCategories, {}, {}, { method: 'GET' });
            }
            removeDecimalConfig = storeConfig?.pwa?.remove_decimal_price_enable !== null
                ? storeConfig?.pwa?.remove_decimal_price_enable
                : false;
        } else if (typeof window !== 'undefined' && !storeConfig) {
            storeConfig = getLocalStorage('pwa_config');
            if (!storeConfig || storeConfig === '' || storeConfig === {}) {
                storeConfig = await pageProps.apolloClient.query({ query: gql`${ConfigSchema}` }).then(({ data }) => data);

                // Handle redirecting to tomaintenance page automatically when GQL is in maintenance mode.
                // We do this here since query storeConfig is the first query and be done in server side
                if (ctx && storeConfig.response && storeConfig.response.status && storeConfig.response.status > 500) {
                    ctx.res.redirect('/maintenance');
                }

                storeConfig = storeConfig.storeConfig;
            }
            if (!modules.checkout.checkoutOnly) {
                dataVesMenu = getLocalStorage('pwa_vesmenu');
                if (!dataVesMenu) {
                    dataVesMenu = storeConfig.pwa.ves_menu_enable
                        ? []
                        : await pageProps.apolloClient.query({ query: gql`${getCategories}` }).then(({ data }) => data);
                }
            }
            removeDecimalConfig = storeConfig?.pwa?.remove_decimal_price_enable !== null
                ? storeConfig?.pwa?.remove_decimal_price_enable
                : false;
        }

        /*
         * ---------------------------------------------
         * RETURNS
         */
        let token;
        if (req && req.session && req.session.token) {
            token = req.session.token;
        }
        return {
            pageProps: {
                ...pageProps,
                app_cookies,
                storeConfig,
                isLogin,
                lastPathNoAuth,
                customerData,
                token,
                removeDecimalConfig,
                dataVesMenu,
            },
        };
    }

    componentDidMount() {
        /*
         * ---------------------------------------------
         * ADDING CUSTOM SERVICE WORKER
         */
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production' && typeof document !== 'undefined') {
            if (document.readyState === 'complete') {
                this.registerServiceWorker();
            } else {
                window.addEventListener('load', () => {
                    this.registerServiceWorker();
                });
            }
        }

        /*
         * ---------------------------------------------
         * REMOVE CONSOLE
         * remove all console.log statement when APP_ENV = 'prod'
         */
        if (getAppEnv() === 'prod') {
            console.log = () => {};
        }

        /*
         * ---------------------------------------------
         * FIREBASE INITIALIZATION
         */
        if (features.firebase.config.apiKey !== '' && features.firebase.pushNotification.enabled) {
            // initial firebase messaging
            Notification.init();
            // handle if have message on focus
            try {
                const messaging = firebase.messaging();
                // Handle incoming messages. Called when:
                // - a message is received while the app has focus
                // - the user clicks on an app notification created by a service worker
                //   `messaging.setBackgroundMessageHandler` handler.
                messaging.onMessage((payload) => {
                    navigator.serviceWorker.ready.then((registration) => {
                        // This prevents to show one notification for each tab
                        setTimeout(() => {
                            console.log('[firebase-messaging-sw.js] Received foreground message ', payload);
                            const lastNotification = localStorage.getItem('lastNotification');
                            const isDifferentContent = payload.data.updated_date !== lastNotification;
                            if (isDifferentContent) {
                                localStorage.setItem('lastNotification', payload.data.updated_date + payload.data.title);
                                registration.showNotification(payload.data.title, {
                                    body: payload.data.body,
                                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                                    icon: payload.data.icons || '',
                                    image: payload.data.image || '',
                                    requireInteraction: true,
                                    data: payload.data,
                                });
                            }
                        }, Math.random() * 1000);
                    });
                });
            } catch (err) {
                console.log(err);
            }
        }

        /*
         * LAZY LOADING FONTS
         * Use this to load non critical fonts
         */
        // Fonts();

        /*
         * ---------------------------------------------
         * REMOVE THE SERVER SIDE INJECTED CSS
         * This is for speed performanc purpose
         */
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        /*
         * ---------------------------------------------
         * GTM INITIALIZATION
         */
        const tagManagerArgs = {
            gtmId:
                typeof publicRuntimeConfig !== 'undefined' && GTM.gtmId[publicRuntimeConfig.appEnv]
                    ? GTM.gtmId[publicRuntimeConfig.appEnv]
                    : GTM.gtmId.dev,
        };
        if (GTM.enable) TagManager.initialize(tagManagerArgs);

        /*
         * ---------------------------------------------
         * COOKIE CLEARANCE
         * remove config cookie if the page is reloaded
         */
        if (typeof window !== 'undefined') {
            window.onbeforeunload = function () {
                setResolver({});
            };
        }
    }

    componentWillUnmount() {
        unregister();
    }

    registerServiceWorker() {
        navigator.serviceWorker.register('/service-worker.js').then(
            (registration) => {
                console.log('Service Worker registration successful with scope: ', registration.scope);
            },
            (err) => {
                console.log('Service Worker registration failed: ', err);
            },
        );
    }

    render() {
        const { Component, pageProps } = this.props;
        pageProps.storeConfig = pageProps.storeConfig ? pageProps.storeConfig : {};
        Cookie.set('remove_decimal_config', pageProps.removeDecimalConfig, { expires: 365 });

        if (typeof window !== 'undefined' && testLocalStorage()) {
            setLocalStorage('cms_page', pageProps.storeConfig && pageProps.storeConfig.cms_page ? pageProps.storeConfig.cms_page : '');
            setLocalStorage('pwa_config', pageProps.storeConfig);
            if (!modules.checkout.checkoutOnly) {
                setLocalStorage('pwa_vesmenu', pageProps.dataVesMenu);
            }
        }

        return (
            <>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    {typeof window !== 'undefined' && !testLocalStorage() ? (
                        <ModalCookies {...pageProps} />
                    ) : (
                        <StoreConfigContext.Provider value={pageProps.storeConfig}>
                            <PageProgressLoader />
                            <Component {...pageProps} />
                        </StoreConfigContext.Provider>
                    )}
                </ThemeProvider>
            </>
        );
    }
}
export default appWithTranslation(MyApp);
