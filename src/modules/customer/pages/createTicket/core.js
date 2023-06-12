import Layout from '@layout';
import gqlService from '@core_modules/contact/services/graphql';
import { getFilesToBase64, objFiles } from '@src_modules/customer/pages/createTicket/plugins/FileUploadTicket/core';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { getCustomer } from '@core_modules/theme/services/graphql';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const CreateTicket = (props) => {
    const {
        Content,
        t,
        pageConfig,
        Skeleton,
        storeConfig,
    } = props;

    const incrementId = props?.query?.incrementId ?? null;

    const router = useRouter();
    // enable recaptcha
    const enableRecaptcha = false;
    const Config = {
        title: t('customer:menu:myTickets'),
        headerTitle: t('customer:menu:myTickets'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        bottomNav: false,
    };
    const [message, setMessage] = React.useState({
        open: false,
        variant: 'success',
        text: '',
    });
    const [load, setLoad] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState({});
    const [dataFile, setDataFile] = React.useState(null);
    const recaptchaRef = useRef();
    const [getHelpdeskDepartmentOrder, resHelpdeskDepartmentOrder] = gqlService.getHelpdeskDepartmentOrder();
    const { data: dataAvailableDepartments } = gqlService.getAvailableDepartments();
    const [awHelpdeskCreateTicket] = gqlService.awHelpdeskCreateTicket();
    let customerData = {};
    if (typeof window !== 'undefined') {
        const customer = getCustomer();
        if (customer.data) {
            customerData = customer.data;
        }
    }

    const fileMaxSize = storeConfig.max_size;
    const submitForm = async (values, resetForm) => {
        const dataPostFiles = await getFilesToBase64(dataFile);

        awHelpdeskCreateTicket({
            variables: {
                customer_email: customerData.customer.email,
                customer_name: `${customerData?.customer?.firstname ?? ''} ${customerData?.customer?.lastame ?? ''}`,
                content: values.content,
                ccRecipients: values.ccRecipients,
                subject: values.subject,
                department_id: values.department_id ? Number(values.department_id) : null,
                order_id: values.order_id ? Number(values.order_id) : null,
                attachments: dataPostFiles,
            },
        })

            .then(() => {
                resetForm({});
                setLoad(false);
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'success',
                    text: t('contact:successSubmit'),
                });
                setTimeout(() => router.push('/customer/account/tickets'), 250);
            })
            .catch((err) => {
                setLoad(false);
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: err?.message || t('common:error:fetchError'),
                });
            });
    };

    const formik = useFormik({
        initialValues: {
            customer_name: '',
            customer_email: '',
            content: '',
            ccRecipients: '',
            subject: '',
            department_id: null,
            order_id: null,
            attachments: null,
        },
        validationSchema: Yup.object().shape({
            content: Yup.string().required(t('validate:message:required')),
            subject: Yup.string().required(t('validate:subject:required')),
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
                            setLoad(false);
                            window.backdropLoader(false);
                            setMessage({
                                open: true,
                                variant: 'error',
                                text: t('contact:failedSubmit'),
                            });
                        }
                    })
                    .catch(() => {
                        setLoad(false);
                        window.backdropLoader(false);
                        setMessage({
                            open: true,
                            variant: 'error',
                            text: t('common:error:fetchError'),
                        });
                    });

                recaptchaRef.current.reset();
            } else {
                await submitForm(values, resetForm);
            }
        },
    });

    const handleChangeCaptcha = (value) => {
        formik.setFieldValue('captcha', value || '');
    };

    const handleChangeOrder = (order) => {
        setSelectedOrder(order);
        formik.setFieldValue('order_id', order?.orderId ?? '');
    };
    const onChangeFileUpload = (e) => {
        const file_upload = objFiles({ e, fileMaxSize });
        if (file_upload.data_file_length > 0) {
            if (!file_upload.is_allow_extension) {
                e.target.value = null;
                window.toastMessage({
                    open: true,
                    text: t('common:error:quoteUpload'),
                    variant: 'error',
                });
            } else if (!file_upload.is_allow_size) {
                e.target.value = null;
                window.toastMessage({
                    open: true,
                    text: `${t('common:error:quoteUploadSize')} ${fileMaxSize}Kb`,
                    variant: 'error',
                });
            } else {
                setDataFile(file_upload.data_file);
            }
        }
    };

    /**
     * get orders when has incrementId from router query
     */
    useEffect(async () => {
        if (incrementId) {
            window.backdropLoader(true);
            await getHelpdeskDepartmentOrder();
            window.backdropLoader(false);
        }
    }, [incrementId]);

    /**
     * set selected order when has
     * incrementId from router query
     * & orders from response
     */
    useEffect(() => {
        const orders = resHelpdeskDepartmentOrder?.data?.getHelpdeskDepartmentOrder?.orders;
        if (incrementId && orders) {
            const findOrder = orders.find((itm) => itm.incrementId === incrementId);
            if (findOrder) {
                setSelectedOrder(findOrder);
                formik.setFieldValue('order_id', findOrder?.orderId ?? '');
            }
        }
    }, [incrementId, resHelpdeskDepartmentOrder]);

    return (
        <Layout withLayoutPageBottom pageConfig={pageConfig || Config} {...props}>
            <CustomerLayout {...props} activeMenu="/customer/account/tickets">
                <Content
                    t={t}
                    incrementId={incrementId}
                    handleChangeCaptcha={handleChangeCaptcha}
                    formik={formik}
                    message={message}
                    setMessage={setMessage}
                    recaptchaRef={recaptchaRef}
                    Skeleton={Skeleton}
                    load={load}
                    enableRecaptcha={enableRecaptcha}
                    resHelpdeskDepartmentOrder={resHelpdeskDepartmentOrder}
                    getHelpdeskDepartmentOrder={getHelpdeskDepartmentOrder}
                    dataAvailableDepartments={dataAvailableDepartments}
                    handleChangeOrder={handleChangeOrder}
                    selectedOrder={selectedOrder}
                    onChangeFileUpload={onChangeFileUpload}
                    dataFile={dataFile}
                    fileMaxSize={fileMaxSize}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default CreateTicket;
