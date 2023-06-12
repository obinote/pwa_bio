import Layout from '@layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { regexPhone } from '@helper_regex';
import { debuging } from '@config';
import { getAppEnv } from '@helpers/env';
import gqlService from '@core_modules/contact/services/graphql';
import { contactConfig } from '@services/graphql/repository/pwa_config';
import { useRef } from 'react';

const Contact = (props) => {
    const {
        Content, t, pageConfig, ErrorInfo, Skeleton, isCms = false, storeConfig, isLogin,
    } = props;

    const appEnv = getAppEnv();
    // enable recaptcha
    let enableRecaptcha = false;
    const Config = {
        title: t('contact:pageTitle'),
        headerTitle: t('contact:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };
    // const [message, setMessage] = React.useState({
    //     open: false,
    //     variant: 'success',
    //     text: '',
    // });
    const [load, setLoad] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState({});
    const recaptchaRef = useRef();
    const [getHelpdeskDepartmentOrder, resHelpdeskDepartmentOrder] = gqlService.getHelpdeskDepartmentOrder();
    const { data: dataAvailableDepartments } = gqlService.getAvailableDepartments({
        skip: isLogin === 0,
    });
    // query config cms contact identifier
    let cmsContactIdentifiers;
    const { loading: loadingConfig, data: dataContactConfig } = contactConfig();
    let sitekey;
    const advanceResetForm = React.useRef(false);

    if (appEnv === 'local') {
        sitekey = dataContactConfig
            && dataContactConfig.storeConfig
            && dataContactConfig.storeConfig.pwa
            && dataContactConfig.storeConfig.pwa.recaptcha_site_key_local;
    } else if (appEnv === 'dev') {
        sitekey = dataContactConfig
            && dataContactConfig.storeConfig
            && dataContactConfig.storeConfig.pwa
            && dataContactConfig.storeConfig.pwa.recaptcha_site_key_dev;
    } else if (appEnv === 'stage') {
        sitekey = dataContactConfig
            && dataContactConfig.storeConfig
            && dataContactConfig.storeConfig.pwa
            && dataContactConfig.storeConfig.pwa.recaptcha_site_key_stage;
    } else if (appEnv === 'prod') {
        sitekey = dataContactConfig
            && dataContactConfig.storeConfig
            && dataContactConfig.storeConfig.pwa
            && dataContactConfig.storeConfig.pwa.recaptcha_site_key_prod;
    }

    const [awHelpdeskCreateTicket] = gqlService.awHelpdeskCreateTicket();
    const [contactusFormSubmit] = gqlService.contactusFormSubmit();
    if (!loadingConfig && dataContactConfig && dataContactConfig.storeConfig && dataContactConfig.storeConfig.pwa) {
        if (dataContactConfig.storeConfig.pwa.cms_contact_identifiers && dataContactConfig.storeConfig.pwa.cms_contact_identifiers !== '') {
            cmsContactIdentifiers = dataContactConfig.storeConfig.pwa.cms_contact_identifiers;
        }

        if (dataContactConfig.storeConfig.pwa.recaptcha_contact_enable !== null) {
            enableRecaptcha = storeConfig
                && storeConfig.pwa.recaptcha_enable
                && dataContactConfig
                && dataContactConfig.storeConfig
                && dataContactConfig.storeConfig.pwa
                && dataContactConfig.storeConfig.pwa.recaptcha_contact_enable;
        }
    }

    const submitForm = async (values, resetForm) => {
        window.backdropLoader(true);
        if (isLogin && (values.department_id || values.order_id)) {
            await awHelpdeskCreateTicket({
                variables: {
                    customer_email: values.customer_email,
                    customer_name: values.customer_name,
                    content: values.content,
                    ccRecipients: values.ccRecipients,
                    telephone: values.telephone,
                    subject: values.subject,
                    department_id: values.department_id ? Number(values.department_id) : null,
                    order_id: values.order_id ? Number(values.order_id) : null,
                },
            })
                .then(() => {
                    contactusFormSubmit({
                        variables: {
                            email: values.customer_email,
                            fullname: values.customer_name,
                            message: values.content,
                            telephone: values.telephone,
                        },
                    })
                        .then(async () => {
                            if (typeof advanceResetForm.current === 'function') {
                                await advanceResetForm.current();
                            }
                            window.toastMessage({
                                open: true,
                                text: t('contact:successSubmit'),
                                variant: 'success',
                            });
                            await resetForm({});
                        })
                        .catch(() => {
                            window.toastMessage({
                                open: true,
                                text: t('common:error:fetchError'),
                                variant: 'error',
                            });
                        });
                })
                .catch(() => {
                    window.toastMessage({
                        open: true,
                        text: t('common:error:fetchError'),
                        variant: 'error',
                    });
                });
        } else {
            contactusFormSubmit({
                variables: {
                    email: values.customer_email,
                    fullname: values.customer_name,
                    message: values.content,
                    telephone: values.telephone,
                },
            })
                .then(async () => {
                    if (typeof advanceResetForm.current === 'function') {
                        await advanceResetForm.current();
                    }
                    window.toastMessage({
                        open: true,
                        text: t('contact:successSubmit'),
                        variant: 'success',
                    });
                    await resetForm({});
                })
                .catch(() => {
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: t('common:error:fetchError'),
                    });
                });
        }
        window.backdropLoader(false);
    };

    const initialValues = {
        customer_name: '',
        customer_email: '',
        content: '',
        ccRecipients: '',
        telephone: '',
        subject: '',
        department_id: null,
        order_id: null,
        captcha: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object().shape({
            customer_name: Yup.string().required(t('validate:name:required')),
            customer_email: Yup.string().email(t('validate:email:wrong')).required(t('validate:email:required')),
            content: Yup.string().required(t('validate:message:required')),
            subject: Yup.string().required(t('validate:subject:required')),
            telephone: Yup.string().matches(regexPhone, t('validate:phoneNumber:wrong')).required(t('validate:phoneNumber:required')),
            captcha: enableRecaptcha ? Yup.string().required(t('validate:captcha:required')) : Yup.string(),
        }),
        onSubmit: async (values, { resetForm }) => {
            window.backdropLoader(true);
            setLoad(true);
            if (enableRecaptcha) {
                await fetch('/captcha-validation', {
                    method: 'post',
                    body: JSON.stringify({
                        response: values.captcha,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                })
                    .then((data) => data.json())
                    .then((json) => {
                        if (json.success) {
                            submitForm(values, resetForm);
                        } else {
                            window.toastMessage({
                                open: true,
                                variant: 'error',
                                text: t('contact:failedSubmit'),
                            });
                        }
                        setLoad(false);
                        window.backdropLoader(false);
                    })
                    .catch(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'error',
                            text: t('common:error:fetchError'),
                        });
                        setLoad(false);
                    });
                recaptchaRef.current.reset();
            } else {
                await submitForm(values, resetForm);
                setLoad(false);
                window.backdropLoader(false);
            }
        },
    });

    const handleChangeCaptcha = (value) => {
        formik.setFieldValue('captcha', value || '');
    };

    const handleChangeOrder = (order) => {
        setSelectedOrder(order);
        if (!order) return;
        formik.setFieldValue('order_id', order.orderId);
    };

    React.useEffect(() => {
        if (!advanceResetForm.current) {
            advanceResetForm.current = async () => {
                const resetDepartment = dataAvailableDepartments?.length > 0 ? dataAvailableDepartments[0].id : '';
                formik.setFieldValue('order_id', '');
                setSelectedOrder(null);
                formik.setFieldValue('department_id', resetDepartment);
                await formik.setErrors({});
                await formik.resetForm();
            };
        }
    }, []);

    const { error, loading, data } = gqlService.getCmsBlocks({ identifiers: [cmsContactIdentifiers] }, { skip: !cmsContactIdentifiers });

    if (!cmsContactIdentifiers && isCms) {
        return (
            <Layout pageConfig={pageConfig || Config} {...props}>
                <ErrorInfo variant="error" text={t('contact:nullCmsIdentifer')} />
            </Layout>
        );
    }

    if (error && isCms) {
        return (
            <Layout pageConfig={pageConfig || Config} {...props}>
                <ErrorInfo variant="error" text={debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')} />
            </Layout>
        );
    }

    if (isCms) {
        return (
            <Content
                t={t}
                Content={Content}
                handleChangeCaptcha={handleChangeCaptcha}
                formik={formik}
                error={error}
                sitekey={sitekey}
                loading={loading}
                data={data}
                recaptchaRef={recaptchaRef}
                Skeleton={Skeleton}
                load={load}
                enableRecaptcha={enableRecaptcha}
                isLogin={isLogin}
                resHelpdeskDepartmentOrder={resHelpdeskDepartmentOrder}
                getHelpdeskDepartmentOrder={getHelpdeskDepartmentOrder}
                dataAvailableDepartments={dataAvailableDepartments}
                handleChangeOrder={handleChangeOrder}
                selectedOrder={selectedOrder}
            />
        );
    }
    return (
        <Layout withLayoutPageBottom pageConfig={pageConfig || Config} {...props}>
            <Content
                t={t}
                Content={Content}
                handleChangeCaptcha={handleChangeCaptcha}
                formik={formik}
                error={error}
                sitekey={sitekey}
                loading={loading}
                data={data}
                recaptchaRef={recaptchaRef}
                Skeleton={Skeleton}
                load={load}
                enableRecaptcha={enableRecaptcha}
                isLogin={isLogin}
                resHelpdeskDepartmentOrder={resHelpdeskDepartmentOrder}
                getHelpdeskDepartmentOrder={getHelpdeskDepartmentOrder}
                dataAvailableDepartments={dataAvailableDepartments}
                handleChangeOrder={handleChangeOrder}
                selectedOrder={selectedOrder}
            />
        </Layout>
    );
};

export default Contact;
