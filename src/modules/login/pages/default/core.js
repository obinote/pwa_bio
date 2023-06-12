/* eslint-disable no-unused-expressions */
/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
import Layout from '@layout';
import { setLogin, getLastPathWithoutLogin } from '@helper_auth';
import { getCookies, setCookies } from '@helper_cookies';
import { setCartId, getCartId } from '@helper_cartid';
import { useQuery } from '@apollo/client';
import { expiredToken, custDataNameCookie } from '@config';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { regexPhone, regexEmail } from '@helper_regex';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
import * as Yup from 'yup';
import firebase from 'firebase/app';
import React, { useRef } from 'react';
import { getAppEnv } from '@helpers/env';
import get from 'lodash/get';
import {
    getToken,
    getTokenOtp,
    getTokenPhoneEmail,
    // removeToken as deleteToken,
    // otpConfig as queryOtpConfig,
    getCustomerCartId,
    mergeCart as mutationMergeCart,
    socialLogin,
    // getSigninMethodSocialLogin,
} from '@core_modules/login/services/graphql';
import { loginConfig } from '@services/graphql/repository/pwa_config';
import { getCustomer } from '@core_modules/login/services/graphql/schema';
import { localCompare } from '@services/graphql/schema/local';
import { assignCompareListToCustomer } from '@core_modules/productcompare/service/graphql';
import ResetGuide from '@core_modules/customer/helpers/ResetGuide';
import { LIST_AUTO_TERMINATE_CHAT } from '@core_modules/customer/plugins/ChatContent/lib/constansta';
import { setLocalStorage } from '@helper_localstorage';
import useMessageTranslator from '@helpers/messageTranslator';

const Message = dynamic(() => import('@common_toast'), { ssr: false });
const appEnv = getAppEnv();

const Login = (props) => {
    const { t, storeConfig, query, lastPathNoAuth, Content, pageConfig } = props;
    const __ = useMessageTranslator();
    const config = {
        title: t('login:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('login:pageTitle'),
        headerBackIcon: 'close',
        bottomNav: false,
    };
    const [isOtp, setIsOtp] = React.useState(false);
    const [isDidUpdate, setIsDidUpdate] = React.useState({});
    // const [isRevokeToken, setRevokeToken] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [cusIsLogin, setIsLogin] = React.useState(0);

    // Listen to the Firebase Auth state and set the local state.

    React.useEffect(() => {
        if (firebase.app()) {
            try {
                const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
                    if (firebase.auth().currentUser) {
                        const fullname = user.displayName.split(' ');
                        const firstName = fullname[0];
                        let lastName = '';
                        const { email } = user;
                        fullname.forEach((entry) => {
                            if (entry != firstName) {
                                lastName += `${entry} `;
                            }
                        });
                        firebase
                            .auth()
                            .currentUser.getIdToken(true)
                            .then((user) => {
                                setDisabled(true);
                                setLoading(true);
                                window.backdropLoader(true);
                                actSocialLogin({
                                    variables: {
                                        email,
                                        socialtoken: user,
                                        firstname: firstName,
                                        lastname: lastName,
                                    },
                                })
                                    .then(async () => {
                                        setLocalStorage(LIST_AUTO_TERMINATE_CHAT, {});
                                        setLogin(1, expired);
                                        await setIsLogin(1);
                                    })
                                    .catch((e) => {
                                        const message = e.message.split(':')[0];
                                        const translatedMessage = message ? __(message) : t('login:failed');
                                        setDisabled(false);
                                        setLoading(false);
                                        window.backdropLoader(false);
                                        window.toastMessage({
                                            open: true,
                                            variant: 'error',
                                            text: translatedMessage,
                                        });
                                    });
                            });
                    }
                });
                return () => unregisterAuthObserver();
            } catch {
                null;
            }
        }
    }, []);

    const [state, setState] = React.useState({
        toastMessage: {
            open: true,
            variant: 'error',
            text: t('validate:guest:wrong'),
        },
        backdropLoader: false,
    });

    let cartId = '';
    const handleCloseMessage = () => {
        setState({
            ...state,
            toastMessage: {
                ...state.toastMessage,
                open: false,
            },
        });
    };
    let toastMessage = '';
    if (typeof window !== 'undefined') {
        const res = window.location.href.split('&');
        if (res[1]) {
            const error = res[1].split('error=');
            if (error[1]) {
                toastMessage = (
                    <Message
                        open={state.toastMessage.open}
                        variant={state.toastMessage.variant}
                        setOpen={handleCloseMessage}
                        message={state.toastMessage.text}
                    />
                );
            }
        }
    }
    let redirectLastPath = lastPathNoAuth;
    const expired = storeConfig?.oauth_access_token_lifetime_customer
        ? new Date(Date.now() + parseInt(storeConfig?.oauth_access_token_lifetime_customer, 10) * 3600000)
        : expiredToken;

    if (typeof window !== 'undefined') {
        cartId = getCartId();
        if (lastPathNoAuth === '' || !lastPathNoAuth) {
            redirectLastPath = getLastPathWithoutLogin();
        }
    }

    const [getCustomerToken] = getToken();
    const [getCustomerTokenOtp] = getTokenOtp();
    const [getCustomerTokenPhoneEmail] = getTokenPhoneEmail();
    const cartData = getCustomerCartId({
        skip: !cusIsLogin,
    });
    const [mergeCart] = mutationMergeCart();
    const [mergeCompareProduct, { client }] = assignCompareListToCustomer();

    const [actSocialLogin] = socialLogin();

    // get login method social login
    const socialLoginMethod = {};
    const otpConfig = {};
    const custData = useQuery(getCustomer, {
        context: {
            request: 'internal',
        },
        skip: !cusIsLogin,
        fetchPolicy: 'no-cache',
    });

    // togle disabled when user just switch to otp mode
    React.useEffect(() => {
        if (isDidUpdate.isOtp && formik.dirty) {
            /* only validate form when:
                isOtp changed for not first time / initial && formik is dirty
            */
            formik.validateForm();
        } else {
            setIsDidUpdate({ isOtp: true });
        }

        // disabled when user switch to otp mode
        setDisabled(isOtp);
    }, [isOtp]);

    // enable recaptcha
    let enableRecaptcha = false;

    const { loading: loadingLoginConfig, data: dataLoginConfig } = loginConfig();

    if (
        !loadingLoginConfig &&
        get(dataLoginConfig, 'storeConfig.pwa.recaptcha_enable') &&
        get(dataLoginConfig, 'storeConfig.pwa.recaptcha_login_enable')
    ) {
        enableRecaptcha = true;
    }

    const LoginSchema = Yup.object().shape({
        username: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
        password: Yup.string().required(t('validate:password:required')),
        captcha: enableRecaptcha ? Yup.string().required(t('validate:captcha:required')) : Yup.string(),
    });

    const LoginPhoneEmailSchema = Yup.object().shape({
        username: get(otpConfig, 'data.otpConfig.otp_enable[0].enable_otp_login')
            ? Yup.string().email(t('validate:email:wrong')).required(t('validate:fieldRequired'))
            : Yup.string()
                .required(t('validate:fieldRequired'))
                .test('phoneEmail', t('validate:phoneEmail:wrong'), (value) => {
                    const emailRegex = regexEmail.test(value);
                    const phoneRegex = regexPhone.test(value);
                    if (!emailRegex && !phoneRegex) {
                        return false;
                    }
                    return true;
                }),
        password: Yup.string().required(t('validate:fieldRequired')),
        captcha: enableRecaptcha ? Yup.string().required(t('validate:captcha:required')) : Yup.string(),
    });

    const LoginOtpSchema = Yup.object().shape({
        username: Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        otp: Yup.number().required('Otp is required'),
        captcha: enableRecaptcha && Yup.string().required(t('validate:captcha:required')),
    });

    const handleSubmit = (formOtp, variables) => {
        let getTokenCustomer;
        if (formOtp == 'otp') {
            getTokenCustomer = getCustomerTokenOtp;
        } else if (formOtp == 'password') {
            getTokenCustomer = getCustomerToken;
        } else if (formOtp == 'phoneEmail') {
            getTokenCustomer = getCustomerTokenPhoneEmail;
        }
        setDisabled(true);
        setLoading(true);
        window.backdropLoader(true);
        const sendData = (data) => {
            getTokenCustomer({
                variables: {
                    email: data.username,
                    password: data.password,
                },
            })
                .then(async (res) => {
                    let token = '';
                    if (formOtp == 'otp') {
                        token = res.data.internalGenerateCustomerTokenOtp.token;
                    } else {
                        token = res.data.internalGenerateCustomerTokenCustom.token;
                    }
                    if (token) {
                        setLocalStorage(LIST_AUTO_TERMINATE_CHAT, {});
                        ResetGuide();
                        setLogin(1, expired);
                        await setIsLogin(1);
                    }
                })
                .catch((e) => {
                    const message = e.message.split(':')[0];
                    const translatedMessage = message ? __(message) : t('login:failed');
                    setDisabled(false);
                    setLoading(false);
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: translatedMessage,
                    });
                });
        };
        if (enableRecaptcha) {
            fetch('/captcha-validation', {
                method: 'post',
                body: JSON.stringify({
                    response: variables.captcha,
                }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then((data) => data.json())
                .then((json) => {
                    if (json.success) {
                        sendData(variables);
                    } else {
                        setDisabled(false);
                        setLoading(false);
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('login:failed'),
                        });
                    }
                })
                .catch(() => {
                    setDisabled(false);
                    setLoading(false);
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: t('common:error:fetchError'),
                    });
                });

            recaptchaRef.current.reset();
        } else {
            sendData(variables);
        }
    };

    const formikPhoneEmail = useFormik({
        initialValues: {
            username: '',
            password: '',
            captcha: '',
        },
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: LoginPhoneEmailSchema,
        onSubmit: (values) => {
            const variables = {
                username: values.username,
                password: values.password,
                captcha: values.captcha,
            };
            handleSubmit('phoneEmail', variables);
        },
    });

    const formikOtp = useFormik({
        initialValues: {
            username: '',
            otp: '',
            captcha: '',
        },
        validationSchema: LoginOtpSchema,
        onSubmit: (values) => {
            const variables = {
                username: values.username,
                otp: values.otp,
                captcha: values.captcha,
            };
            handleSubmit('otp', variables);
        },
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            otp: '',
            captcha: '',
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            const variables = {
                username: values.username,
                password: values.password,
                // captcha: 'test',
            };
            handleSubmit('password', variables);
        },
    });

    function getRedirectParams() {
        if (!custData.data.customer.company_sub_district) {
            return { url: '/customer/account/companyprofile/edit?mustFillSubDistrict=true', as: '/customer/account/companyprofile/edit' };
        }

        if (query?.redirect) return { url: query.redirect };

        if (redirectLastPath) return { url: redirectLastPath };

        return { url: '/customer/account/dashboard' };
    }

    function redirect() {
        const { url, as } = getRedirectParams();
        Router.push(url, as);
    }

    React.useEffect(() => {
        if (cartData.data && custData.data && cartData.data.customerCart && cartData.data.customerCart && cartData.data.customerCart.id) {
            Cookies.set(custDataNameCookie, {
                email: custData.data.customer.email,
                firstname: custData.data.customer.firstname,
                customer_group: custData.data.customer.customer_group,
                customer_group_code_hash: custData.data.customer.customer_group_code_hash,
            });
            const uid_product = getCookies('uid_product_compare');
            const custCartId = cartData.data.customerCart.id;
            if (uid_product) {
                mergeCompareProduct({
                    variables: {
                        uid: uid_product,
                    },
                })
                    .then((res) => {
                        setCookies('uid_product_compare', res.data.assignCompareListToCustomer.compare_list.uid);
                        client.writeQuery({
                            query: localCompare,
                            data: {
                                item_count: res.data.assignCompareListToCustomer.compare_list.item_count,
                                items: res.data.assignCompareListToCustomer.compare_list.items,
                            },
                        });
                    })
                    .catch(() => {
                        //
                    });
            }
            if (cartId === '' || !cartId) {
                setCartId(custCartId, expired);
                setDisabled(false);
                window.backdropLoader(false);
                // window.toastMessage({ open: true, variant: 'success', text: t('login:success') });
                setTimeout(redirect, 1500);
            } else if (cartId !== custCartId) {
                mergeCart({
                    variables: {
                        sourceCartId: cartId,
                        destionationCartId: custCartId,
                    },
                })
                    .then(async (res) => {
                        await setCartId(res.data.mergeCarts.id, expired);
                        await setDisabled(false);
                        window.backdropLoader(false);
                        // window.toastMessage({ open: true, variant: 'success', text: t('login:success') });
                        setTimeout(redirect, 1500);
                    })
                    .catch(() => { });
            } else {
                redirect();
            }
        }

        if (cartData.error || custData.error) {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('login:failed'),
            });
        }
    }, [cartData, custData]);

    let socialLoginMethodData = [];
    if (
        socialLoginMethod.data &&
        socialLoginMethod.data.getSigninMethodSocialLogin &&
        socialLoginMethod.data.getSigninMethodSocialLogin.signin_method_allowed &&
        socialLoginMethod.data.getSigninMethodSocialLogin.signin_method_allowed !== ''
    ) {
        socialLoginMethodData = socialLoginMethod.data.getSigninMethodSocialLogin.signin_method_allowed.split(',');
    }

    const handleChangeCaptcha = (value) => {
        formik.setFieldValue('captcha', value || '');
        formikOtp.setFieldValue('captcha', value || '');
        formikPhoneEmail.setFieldValue('captcha', value || '');
    };

    const recaptchaRef = useRef();
    let sitekey;

    if (appEnv === 'local') {
        sitekey = dataLoginConfig?.storeConfig.pwa.recaptcha_site_key_local;
    } else if (appEnv === 'dev') {
        sitekey = dataLoginConfig?.storeConfig.pwa.recaptcha_site_key_dev;
    } else if (appEnv === 'stage') {
        sitekey = dataLoginConfig?.storeConfig.pwa.recaptcha_site_key_stage;
    } else if (appEnv === 'prod') {
        sitekey = dataLoginConfig?.storeConfig.pwa.recaptcha_site_key_prod;
    }

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                formik={formik}
                formikPhoneEmail={formikPhoneEmail}
                otpConfig={otpConfig}
                isOtp={isOtp}
                setIsOtp={setIsOtp}
                t={t}
                setDisabled={setDisabled}
                disabled={disabled}
                loading={loading}
                formikOtp={formikOtp}
                toastMessage={toastMessage}
                socialLoginMethodLoading={socialLoginMethod.loading}
                socialLoginMethodData={socialLoginMethodData}
                enableRecaptcha={enableRecaptcha}
                sitekey={sitekey}
                handleChangeCaptcha={handleChangeCaptcha}
                recaptchaRef={recaptchaRef}
                query={query}
                phonePassword={storeConfig.login_phone_password}
            />
        </Layout>
    );
};

export default Login;
