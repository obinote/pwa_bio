import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { getFilesToBase64, objFiles } from '@src_modules/customer/pages/createTicket/plugins/FileUploadTicket/core';
import * as Yup from 'yup';
import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/detailTicket/components/skeleton';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const DetailTicketPage = (props) => {
    const {
        t, pageConfig, Content, storeConfig,
    } = props;
    const router = useRouter();
    const { loading, data, refetch } = gqlService.getTicketById({
        variables: {
            entity_id: Number(router.query.id),
        },
    });
    const config = {
        title: data && `[${data?.awHelpdesk2TicketById?.uid}] ${data?.awHelpdesk2TicketById?.subject}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: data && `[${data?.awHelpdesk2TicketById?.uid}] ${data?.awHelpdesk2TicketById?.subject}`,
        bottomNav: false,
    };

    const fileMaxSize = storeConfig.max_size;
    const customerRating = data?.awHelpdesk2TicketById?.customer_rating || 0;
    const canRateTicket = data?.awHelpdesk2TicketById?.can_submit_rating || false;
    const [addTicketRate] = gqlService.addTicketRate();
    const [ticketEscalate] = gqlService.ticketEscalate();
    const [ticketReply] = gqlService.ticketReply();
    const [ticketClose] = gqlService.ticketClose();
    const [ticketReOpen] = gqlService.ticketReOpen();
    const [rating, setRating] = React.useState(customerRating);
    const [openEscalate, setOpenEscalate] = React.useState(false);
    const [messageEscalate, setMessageEscalate] = React.useState('');
    const [dataFile, setDataFile] = React.useState(null);

    React.useEffect(() => {
        setRating(customerRating);
    }, [customerRating]);

    const handleRating = (value) => {
        window.backdropLoader(true);
        setRating(value);
        addTicketRate({
            variables: {
                key: data.awHelpdesk2TicketById.external_link,
                rating: value,
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'success',
                text: t('customer:tickets:successRated'),
            });
            refetch();
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('customer:tickets:errorRate'),
            });
            setRating(customerRating);
            refetch();
        });
    };

    const handleChangeMessageEscalate = (e) => {
        setMessageEscalate(e.target.value);
    };

    const handleEscalate = () => {
        if (messageEscalate.length > 0) {
            window.backdropLoader(true);
            ticketEscalate({
                variables: {
                    key: data.awHelpdesk2TicketById.external_link,
                    message: messageEscalate,
                },
            }).then((res) => {
                window.backdropLoader(false);
                if (res.data.awHelpdesk2TicketEscalate) {
                    window.toastMessage({
                        open: true,
                        variant: 'success',
                        text: t('customer:tickets:successEscalate'),
                    });
                }
                setMessageEscalate('');
                setOpenEscalate(!openEscalate);
                refetch();
            }).catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: t('customer:tickets:errorEscalate'),
                });
                setOpenEscalate(!openEscalate);
                refetch();
            });
        }
    };

    const handleTicketClose = () => {
        window.backdropLoader(true);
        ticketClose({
            variables: {
                key: data.awHelpdesk2TicketById.external_link,
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'success',
                text: t('customer:tickets:successClosed'),
            });
            refetch();
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('customer:tickets:errorClosed'),
            });
            refetch();
        });
    };

    const handleTicketReOpen = () => {
        window.backdropLoader(true);
        ticketReOpen({
            variables: {
                key: data.awHelpdesk2TicketById.external_link,
            },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'success',
                text: t('customer:tickets:successReOpen'),
            });
            refetch();
        }).catch(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('customer:tickets:errorReOpen'),
            });
            refetch();
        });
    };

    const submitForm = async (values, resetForm) => {
        const dataPostFiles = await getFilesToBase64(dataFile);
        ticketReply({
            variables: {
                key: data?.awHelpdesk2TicketById?.external_link,
                content: values.content,
                attachments: dataPostFiles,
            },
        }).then(() => {
            resetForm({});
            setDataFile(null);
            window.toastMessage({
                open: true,
                variant: 'success',
                text: t('customer:tickets:successReply'),
            });
            refetch();
        }).catch(() => {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('customer:tickets:errorReply'),
            });
            refetch();
        });
    };

    const formik = useFormik({
        initialValues: {
            key: '',
            content: '',
            attachments: null,
        },
        validationSchema: Yup.object().shape({
            content: Yup.string().required(t('validate:message:required')),
        }),
        onSubmit: async (values, { resetForm }) => {
            window.backdropLoader(true);
            await submitForm(values, resetForm);
            window.backdropLoader(false);
        },
    });

    const onChangeFileUpload = async (e) => {
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
                    text: t('common:error:quoteUploadSize', { fileMaxSize }),
                    variant: 'error',
                });
            } else {
                setDataFile(file_upload.data_file);
            }
        }
    };

    if (loading || !data) {
        return (
            <Layout pageConfig={pageConfig || config} {...props} t={t}>
                <CustomerLayout {...props} activeMenu="/customer/account/tickets">
                    <Skeleton t={t} />
                </CustomerLayout>
            </Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig || config} {...props} t={t}>
            <CustomerLayout {...props} activeMenu="/customer/account/tickets">
                <Content
                    t={t}
                    data={data}
                    router={router}
                    rating={rating}
                    handleRating={handleRating}
                    openEscalate={openEscalate}
                    setOpenEscalate={setOpenEscalate}
                    messageEscalate={messageEscalate}
                    setMessageEscalate={setMessageEscalate}
                    handleEscalate={handleEscalate}
                    handleChangeMessageEscalate={handleChangeMessageEscalate}
                    formik={formik}
                    file={null}
                    maxSize={fileMaxSize}
                    onChangeFileUpload={onChangeFileUpload}
                    handleTicketClose={handleTicketClose}
                    handleTicketReOpen={handleTicketReOpen}
                    dataFile={dataFile}
                    canRateTicket={canRateTicket}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default DetailTicketPage;
