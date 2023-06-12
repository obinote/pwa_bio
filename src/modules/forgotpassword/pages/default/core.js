import Layout from '@layout';
import { useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import { regexPhone, regexEmail } from '@helper_regex';
import * as Yup from 'yup';
// import Router from 'next/router';
import { requestLinkToken, otpConfig } from '@core_modules/forgotpassword/services/graphql';
import { GET_RECAPTCHA_SITE_KEY } from '@root/src/services/graphql/schema/config';
import { getAppEnv } from '@root/core/helpers/env';
import _ from 'lodash';

const ForgotPassword = (props) => {
    const {
        t, storeConfig, pageConfig, Content, query,
    } = props;
    const config = {
        title: t('forgotpassword:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('forgotpassword:title'),
        bottomNav: false,
    };
    const [toast, setToast] = React.useState({
        open: false,
        variant: 'success',
        text: '',
    });

    const isExpired = query?.is_expired;
    const forgotWithPhone = storeConfig.forgot_password_phone;
    const [useEmail, setUseEmail] = React.useState(1);
    const [useForgotWithPhone, setUseForgotWithPhone] = React.useState(forgotWithPhone);
    const { loading, data } = otpConfig();
    const [load, setLoad] = React.useState(false);
    const [disabled, setDisabled] = React.useState(true);
    const [getToken] = requestLinkToken();

    const recaptchaRef = React.useRef(null);
    const { data: recaptchaQueryData } = useQuery(GET_RECAPTCHA_SITE_KEY(getAppEnv()));
    const enableRecaptcha = storeConfig?.pwa?.recaptcha_enable;
    const siteKey = recaptchaQueryData?.storeConfig.pwa[`recaptcha_site_key_${getAppEnv()}`];

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: '',
            phoneNumber: '',
            phoneNumberEmail: '',
            ...(enableRecaptcha && { captcha: '' }),
        },
        validationSchema: Yup.object().shape({
            email: useEmail && Yup.string().required(t('validate:email:required')),
            phoneNumberEmail:
                useForgotWithPhone
                && !data.otpConfig.otp_enable[0].enable_otp_forgot_password
                && Yup.string()
                    .required(t('validate:phoneEmail:required'))
                    .test('phoneEmail', t('validate:phoneEmail:wrong'), (value) => {
                        const emailRegex = regexEmail.test(value);
                        const phoneRegex = regexPhone.test(value);
                        if (!emailRegex && !phoneRegex) {
                            return false;
                        }
                        return true;
                    }),
            phoneNumber:
                !useEmail
                && !useForgotWithPhone
                && data
                && data.otpConfig.otp_enable[0].enable_otp_forgot_password
                && Yup.string().required(t('validate:phoneNumber:required')).matches(regexPhone, t('validate:phoneNumber:wrong')),
            otp:
                !useEmail
                && !useForgotWithPhone
                && data
                && data.otpConfig.otp_enable[0].enable_otp_forgot_password
                && Yup.string().required('Otp is required'),
            ...(enableRecaptcha && { captcha: Yup.string().required(`Captcha ${t('validate:required')}`) }),
        }),
        onSubmit: async (values) => {
            setLoad(true);

            if (enableRecaptcha) {
                const recaptchaData = await fetch('/captcha-validation', {
                    method: 'post',
                    body: JSON.stringify({ response: values.captcha }),
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then((res) => res.json())
                    .then((_data) => ({
                        ..._data,
                        ...(!_data.success && { error: t('forgotpassword:failed') }),
                    }))
                    .catch(() => ({ error: t('common:error:fetchError') }));

                recaptchaRef.current.reset();

                if (recaptchaData.error) {
                    setLoad(false);
                    window.toastMessage({ open: true, variant: 'error', text: recaptchaData.error });
                    return;
                }
            }

            let email;
            let phone;

            if (useForgotWithPhone) {
                email = values.phoneNumberEmail;
                phone = values.phoneNumberEmail;
            } else {
                email = values.email;
                phone = values.phoneNumber;
            }

            const getVariables = () => {
                if (useForgotWithPhone) {
                    if (regexEmail.test(values.phoneNumberEmail) && !regexPhone.test(values.phoneNumberEmail)) {
                        return { phoneNumber: '', otp: '', email: values.phoneNumberEmail };
                    }
                    return { phoneNumber: values.phoneNumberEmail, otp: '', email: '' };
                }
                if (useEmail) {
                    // return { phoneNumber: '', otp: '', email: values.email };
                    return { email: values.email };
                }
                return { phoneNumber: values.phoneNumber, otp: values.otp, email: '' };
            };
            getToken({
                variables: getVariables(),
            })
                .then((res) => {
                    setLoad(false);
                    const resData = _.get(res, 'data.requestPasswordResetEmail');

                    if (resData) {
                        setToast({
                            open: true,
                            variant: 'success',
                            text: `${t('forgotpassword:successEmail', { email })}`,
                        });
                    } else {
                        setToast({
                            open: true,
                            variant: 'error',
                            text: `${t('forgotpassword:failedEmail', { email })}`,
                        });
                        setLoad(false);
                    }
                })
                .catch((e) => {
                    if (e.message === 'phone number is not registered.') {
                        setToast({
                            open: true,
                            variant: 'error',
                            text: t('forgotpassword:failedPhone', { phone }),
                        });
                    } else {
                        setToast({
                            open: true,
                            variant: 'error',
                            text: e.message || t('forgotpassword:failed'),
                        });
                    }
                    setLoad(false);
                });
        },
    });

    const handleSwitch = () => {
        setToast({ ...toast, open: false });
        setUseEmail(!useEmail);
        if (data && data.otpConfig.otp_enable[0].enable_otp_forgot_password) {
            setDisabled(!disabled);
        }
    };

    const handleChangeRecaptcha = (value) => formik.setFieldValue('captcha', value);

    React.useEffect(() => {
        if (data && !data.otpConfig.otp_enable[0].enable_otp_forgot_password && !useForgotWithPhone) {
            setUseEmail(true);
        } else if (data && data.otpConfig.otp_enable[0].enable_otp_forgot_password) {
            setUseForgotWithPhone(false);
        }
    }, [useEmail, useForgotWithPhone]);

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <Content
                t={t}
                loading={loading}
                data={data}
                formik={formik}
                load={load}
                useEmail={useEmail}
                handleSwitch={handleSwitch}
                toast={toast}
                setToast={setToast}
                setDisabled={setDisabled}
                disabled={disabled}
                useForgotWithPhone={useForgotWithPhone}
                isExpired={isExpired}
                enableRecaptcha={enableRecaptcha}
                siteKey={siteKey}
                recaptchaRef={recaptchaRef}
                onChangeRecaptcha={handleChangeRecaptcha}
            />
        </Layout>
    );
};

export default ForgotPassword;
