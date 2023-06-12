/* eslint-disable  no-use-before-define */
import Layout from '@layout';
import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Router from 'next/router';
import { regexPhone } from '@helper_regex';
import {
    register, getRegion, getCity, getOTP, validateOTP,
} from '@core_modules/register/services/graphql';
import ResetGuide from '@core_modules/customer/helpers/ResetGuide';
import { registerConfig } from '@services/graphql/repository/pwa_config';
import { getAppEnv } from '@helpers/env';
import get from 'lodash/get';
import split from 'lodash/split';
import uniqBy from 'lodash/uniqBy';
import includes from 'lodash/includes';
import filter from 'lodash/filter';
import useMessageTranslator from '@helpers/messageTranslator';

const Register = (props) => {
    const { t, pageConfig, Content } = props;
    const appEnv = getAppEnv();
    const __ = useMessageTranslator();

    const config = {
        title: t('register:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('register:title'),
        bottomNav: false,
    };
    const countries = [{ label: 'Indonesia', value: 'ID' }];
    const [provinces, setProvinces] = React.useState([]);
    // cityRaw is from BE Response
    const [cityRaw, setCityRaw] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [district, setDistrict] = React.useState([]);
    const [subdistrict, setSubdistrict] = React.useState([]);

    const [showOTPButton, setShowOTPButton] = React.useState(true);
    const [otpEmail, setOtpEmail] = React.useState(null);
    const [otpVerified, setOtpVerified] = React.useState(false);
    const [otpLocked, setOtpLocked] = React.useState(false);

    const { data: dataRegion } = getRegion({ variables: { country_id: 'ID' } });
    const [getCities, dataCities] = getCity();

    const [sendRegister] = register();
    const [getOTPEmail] = getOTP();
    const [validateOTPEmail] = validateOTP();

    // enable recaptcha
    let enableRecaptcha = false;
    const recaptchaRef = useRef();
    const { loading: loadingRegisterConfig, data: dataRegisterConfig } = registerConfig();
    if (
        !loadingRegisterConfig
        && get(dataRegisterConfig, 'storeConfig.pwa.recaptcha_enable')
        && get(dataRegisterConfig, 'storeConfig.pwa.recaptcha_register_enable')
    ) {
        enableRecaptcha = true;
    }

    let sitekey;
    if (appEnv === 'local') {
        sitekey = get(dataRegisterConfig, 'storeConfig.pwa.recaptcha_site_key_local');
    } else if (appEnv === 'dev') {
        sitekey = get(dataRegisterConfig, 'storeConfig.pwa.recaptcha_site_key_dev');
    } else if (appEnv === 'stage') {
        sitekey = get(dataRegisterConfig, 'storeConfig.pwa.recaptcha_site_key_stage');
    } else if (appEnv === 'prod') {
        sitekey = get(dataRegisterConfig, 'storeConfig.pwa.recaptcha_site_key_prod');
    }

    const configValidation = {
        companyName: Yup.string().required(t('register:required')),
        companyEmail: Yup.string().email(t('validate:email:wrong')).required(t('register:required')),
        address: Yup.string().required(t('register:required')),
        country: Yup.string().required(t('register:required')),
        province: Yup.string().required(t('register:required')),
        city: Yup.string().required(t('register:required')),
        district: Yup.string().required(t('register:required')),
        subdistrict: Yup.string().required(t('register:required')),
        postalCode: Yup.string().required(t('register:required')),
        companyPhoneNumber: Yup.string().required(t('register:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        adminName: Yup.string().required(t('register:required')),
        position: Yup.string().required(t('register:required')),
        gender: Yup.string().required(t('register:required')),
        adminPhoneNumber: Yup.string().required(t('register:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
        adminEmail: Yup.string().email(t('validate:email:wrong')).required(t('register:required')),
        otp: Yup.string().required(t('register:required')),
        captcha: enableRecaptcha ? Yup.string().required(t('validate:captcha:required')) : Yup.string(),
    };

    const RegisterSchema = Yup.object().shape(configValidation);

    const formik = useFormik({
        initialValues: {
            companyName: '',
            companyEmail: '',
            address: '',
            country: 'ID',
            province: '',
            city: '',
            district: '',
            subdistrict: '',
            postalCode: '',
            companyPhoneNumber: '',
            adminName: '',
            position: '',
            gender: '',
            adminPhoneNumber: '',
            adminEmail: '',
            otp: '',
            salesman_id: '',
            captcha: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: (values, { resetForm }) => {
            handleSendRegister(values, resetForm);
        },
    });

    const handleSendRegister = async (values, resetForm) => {
        if (otpVerified) {
            const items = get(dataRegion, 'getRegions.item');
            const findRegion = items.find((item) => item.region_id === values.province);

            const inputRegister = {
                company_name: values.companyName,
                company_email: values.companyEmail,
                legal_address: {
                    street: [values.address],
                    country_id: values.country,
                    city: values.city,
                    district: values.district,
                    sub_district: values.subdistrict,
                    postcode: values.postalCode,
                    region: {
                        region_code: findRegion?.code,
                        region: findRegion?.name,
                        region_id: findRegion?.region_id,
                    },
                    telephone: values.companyPhoneNumber,
                },
                company_admin: {
                    otp: values.otp,
                    name: values.adminName,
                    position: values.position,
                    gender: values.gender,
                    phone: values.adminPhoneNumber,
                    email: values.adminEmail,
                    salesman_id: values.salesman_id,
                },
            };

            window.backdropLoader(true);

            const sendData = () => {
                sendRegister({
                    variables: {
                        input: inputRegister,
                    },
                })
                    .then(() => {
                        resetForm();
                        ResetGuide();
                        const queryPage = {
                            company_name: values.companyName,
                            company_email: values.companyEmail,
                            street: values.address,
                            city: values.city,
                            country: 'Indonesia',
                            district: values.subdistrict,
                            postcode: values.postalCode,
                            region: findRegion?.name,
                            telephone: values.companyPhoneNumber,
                            name: values.adminName,
                            position: values.position,
                            gender: values.gender,
                            phone: values.adminPhoneNumber,
                            email: values.adminEmail,
                        };

                        Router.push(
                            {
                                pathname: '/company/account/createsuccess',
                                query: queryPage,
                            },
                            '/company/account/createsuccess',
                        );

                        window.backdropLoader(false);
                    })
                    .catch((e) => {
                        const message = e.message.split(':')[0];
                        const translatedMessage = message ? __(message) : t('register:failed');
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            text: translatedMessage,
                            variant: 'error',
                        });
                    });
            };

            if (enableRecaptcha) {
                fetch('/captcha-validation', {
                    method: 'post',
                    body: JSON.stringify({
                        response: values.captcha,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then((data) => data.json())
                    .then((json) => {
                        if (json.success) {
                            sendData();
                        } else {
                            window.backdropLoader(false);
                            window.toastMessage({
                                open: true,
                                variant: 'error',
                                text: t('register:failed'),
                            });
                        }
                    })
                    .catch(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('common:error:fetchError'),
                        });
                    });

                recaptchaRef.current.reset();
            } else {
                sendData();
            }
        } else {
            // has OTP Error
            formik.setFieldError('otp', otpLocked ? t('register:lockedOTP') : t('register:incorrectOTP'));
        }
    };

    useEffect(() => {
        const items = get(dataRegion, 'getRegions.item');
        if (items) {
            const tempRegion = [];
            items.map((item) => tempRegion.push({ value: item.region_id, label: item.name }));
            setProvinces(tempRegion);
        }
    }, [dataRegion]);

    useEffect(() => {
        const items = get(dataCities, 'data.getCityByRegionId.item');
        if (items) {
            setCityRaw(items);
            const tempCities = items.map((item) => {
                const name = split(item.city, ', ');
                return {
                    value: name[0],
                    label: name[0],
                };
            });
            const uniqCities = uniqBy(tempCities, 'value');
            setCities(uniqCities);
        }
    }, [dataCities]);

    useEffect(() => {
        const selectedCity = formik.values.city;
        if (selectedCity) {
            const tempDistrict = filter(cityRaw, (item) => includes(item.city, `${selectedCity}, `)).map((item) => {
                const name = split(item.city, ', ');
                return {
                    value: name[1],
                    label: name[1],
                };
            });

            const uniqDistrict = uniqBy(tempDistrict, 'value');

            setDistrict(uniqDistrict);
        }
    }, [formik.values.city]);

    useEffect(() => {
        const selectedCity = formik.values.city;
        const selectedDistrict = formik.values.district;
        if (selectedDistrict) {
            const tempSubDistrict = filter(cityRaw, (item) => includes(item.city, `${selectedCity}, ${selectedDistrict}, `)).map((item) => {
                const name = split(item.city, ', ');
                return {
                    value: name[2],
                    label: name[2],
                };
            });

            const uniqSubDistrict = uniqBy(tempSubDistrict, 'value');
            setSubdistrict(uniqSubDistrict);
        }
    }, [formik.values.district]);

    const timeLimit = 60 * 1000; // 60 second
    useEffect(() => {
        if (!showOTPButton) {
            const timeoutOTP = setTimeout(() => {
                setShowOTPButton(true);
            }, timeLimit);

            return () => clearTimeout(timeoutOTP);
        }
        return () => false;
    }, [showOTPButton]);

    /**
     * useEffect when change adminEmail
     */
    useEffect(() => {
        if (otpEmail && formik.values.adminEmail) {
            if (otpEmail !== formik.values.adminEmail) {
                setOtpEmail(null);
                setShowOTPButton(true);
                setOtpVerified(false);
            }
        }

        if (formik.values.otp !== '') {
            formik.setFieldValue('otp', '');
        }
    }, [formik.values.adminEmail]);

    const handleChangeCountry = (value) => {
        formik.setFieldValue('country', value);
        formik.setFieldValue('province', '');
        formik.setFieldValue('city', '');
        formik.setFieldValue('district', '');
        formik.setFieldValue('subdistrict', '');
    };

    const handleChangeProvince = async (value) => {
        formik.setFieldValue('province', value);
        formik.setFieldValue('city', '');
        formik.setFieldValue('district', '');
        formik.setFieldValue('subdistrict', '');

        setDistrict([]);
        setSubdistrict([]);

        window.backdropLoader(true);
        await getCities({
            variables: {
                region_id: value,
            },
        });
        window.backdropLoader(false);
    };

    const handleChangeCity = (value) => {
        formik.setFieldValue('city', value);
        formik.setFieldValue('district', '');
        formik.setFieldValue('subdistrict', '');
        setSubdistrict([]);
    };

    const handleChangeDistrict = (value) => {
        formik.setFieldValue('district', value);
        formik.setFieldValue('subdistrict');
    };

    const handleChangeSubdistrict = (value) => {
        formik.setFieldValue('subdistrict', value);
    };

    const handleGetOTP = async () => {
        if (formik.values.adminEmail) {
            window.backdropLoader(true);
            try {
                const email = formik.values.adminEmail;
                const res = await getOTPEmail({
                    variables: {
                        email,
                    },
                });
                window.backdropLoader(false);
                if (res?.data?.registerCompanyOTP?.status) {
                    setOtpEmail(email);
                    setShowOTPButton(false);
                } else {
                    window.toastMessage({
                        open: true,
                        text: 'Error',
                        variant: 'error',
                    });
                }
            } catch (e) {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            }
        }
    };

    const handleValidateOTP = async () => {
        const email = formik.values.adminEmail;
        const { otp } = formik.values;
        if (email && otp) {
            try {
                window.backdropLoader(true);
                const res = await validateOTPEmail({
                    variables: {
                        email,
                        otp,
                    },
                });
                window.backdropLoader(false);
                if (res?.data?.validateCompanyOTP?.status) {
                    setOtpVerified(true);
                    setOtpLocked(false);
                    formik.setFieldError('otp', undefined);
                } else if (res?.data?.validateCompanyOTP?.locked) {
                    setOtpLocked(true);
                    setOtpVerified(false);
                    formik.setFieldError('otp', t('register:lockedOTP'));
                } else {
                    setOtpLocked(false);
                    setOtpVerified(false);
                    formik.setFieldError('otp', t('register:incorrectOTP'));
                }
            } catch (e) {
                window.backdropLoader(false);
                setOtpLocked(false);
                setOtpVerified(false);
                formik.setFieldError('otp', t('register:incorrectOTP'));
            }
        }
    };

    /**
     *
     * @param {handle Captcha} value
     */
    const handleChangeCaptcha = (value) => {
        formik.setFieldValue('captcha', value ?? '');
    };

    /**
     * call validate OTP every 2 second after on key up
     */

    useEffect(() => {
        if (formik.values.otp && formik.values.otp !== '') {
            const otpTimeLimit = 2 * 1000; // 2 second
            const delayDebounceFn = setTimeout(() => {
                handleValidateOTP();
            }, otpTimeLimit);

            return () => clearTimeout(delayDebounceFn);
        }
        return () => false;
    }, [formik.values.otp]);

    const coreProps = {
        countries,
        provinces,
        cities,
        district,
        subdistrict,
        handleChangeCountry,
        handleChangeProvince,
        handleChangeCity,
        handleChangeDistrict,
        handleChangeSubdistrict,
        showOTPButton,
        handleGetOTP,
        handleValidateOTP,
        otpEmail,
        otpVerified,
        enableRecaptcha,
        sitekey,
        handleChangeCaptcha,
        recaptchaRef,
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content {...props} t={t} formik={formik} {...coreProps} />
        </Layout>
    );
};

export default Register;
