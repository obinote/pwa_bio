import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@core_modules/order/services/graphql';
import React from 'react';
import router from '@root/node_modules/next/router';
import useMessageTranslator from '@helpers/messageTranslator';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const OrderOutstanding = (props) => {
    const {
        t, Content, size, Skeleton, storeConfig,
    } = props;
    const __ = useMessageTranslator();
    const pageConfig = {
        title: t('customer:menu:myOutstanding'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:myOutstanding'),
        bottomNav: false,
    };

    const [page, setPage] = React.useState(1);
    const [sort, setSort] = React.useState('ASC');
    const [pageSize, setPageSize] = React.useState(size || 10);
    const [loadMore, setLoadMore] = React.useState(false);
    const [checked, setChecked] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [valueSnapBilling, setValueSnapBilling] = React.useState('');
    const [pageOrder, setPageOrder] = React.useState(1);
    const [valuePendingBilling, setValuePendingBilling] = React.useState({
        billingNUmber: '',
        billingTotal: '',
    });

    // initial query
    const [fetchUrlMidtrans, {
        loading: loadingUrlMidtrans,
        data: dataUrlMidtrans,
        error: errorUrlMidtrans,
    }] = gqlService.dataSnapBillingPaymentUrl();

    const handleSort = (event) => {
        if (event.target.value !== 'Terlama') {
            setSort('ASC');
        } else if (event.target.value !== 'Terbaru') {
            setSort('DESC');
        } else {
            setSort('ASC');
        }
    };

    const { loading: loadingOrderOutstanding, data: dataOrderOutstanding, refetch: refetchOutstanding } = gqlService.getCustomerOrderOutstanding({
        pageSize,
        currentPage: page,
        sort: {
            due_date: sort,
        },
    });

    const { loading: loadingOrderOutstandingPiutang, data: dataOrderOutstandingPiutang } = gqlService.getCustomerOrderOutstanding({
        pageSize,
        currentPage: page,
        sort: {
            due_date: sort,
        },
    });

    const { loading: loadingPending, data: dataPending, refetch: refetchAvailableBilling } = gqlService.getAvailableBillOrderInvoice({
        pageSize,
        currentPage: page,
        sort: {
            due_date: sort,
        },
    });

    const { loading: loadingSnap, data: dataSnap } = gqlService.getBillingPayment({
        pageSize,
        currentPage: page,
        sort: {
            due_date: sort,
        },
    });

    const [createBilling, { loading: loadingCreateBilling }] = gqlService.mutationCreateBilling();

    const dataOutstanding = (dataOrderOutstanding && dataOrderOutstanding.getCustomerOrderOutstanding) || [];

    const dataOutstandingPiutang = (dataOrderOutstandingPiutang && dataOrderOutstandingPiutang.getCustomerOrderOutstanding) || [];

    const dataPendingBilling = (dataPending && dataPending.getAvailableBillOrderInvoice) || [];

    const dataBillingPayment = (dataSnap && dataSnap.getBillingPayment) || [];

    React.useEffect(() => {
        if (!loadingOrderOutstanding && dataOrderOutstanding && dataOrderOutstanding.items && dataOrderOutstanding.items.length) {
            setLoadMore(false);
        }
    }, [loadingOrderOutstanding, dataOrderOutstanding]);

    React.useEffect(() => {
        if (!loadingOrderOutstandingPiutang && dataOrderOutstandingPiutang
            && dataOrderOutstandingPiutang.total_amount) {
            setLoadMore(false);
        }
    }, [loadingOrderOutstandingPiutang, dataOrderOutstandingPiutang]);

    React.useEffect(() => {
        if (!loadingPending && dataPending && dataPending.billing_detail && dataPending.billing_detail.length) {
            setLoadMore(false);
        }
    }, [loadingPending, dataPending]);

    React.useEffect(() => {
        if (!loadingSnap && dataSnap && dataSnap.payment && dataSnap.payment.length) {
            setLoadMore(false);
        }
    }, [loadingSnap, dataSnap]);

    React.useEffect(() => {
        if (dataUrlMidtrans) {
            if (dataUrlMidtrans?.getSnapBillingPaymentUrl?.url_payment) {
                router.push(dataUrlMidtrans.getSnapBillingPaymentUrl.url_payment);
            } else {
                window.toastMessage({
                    open: true,
                    text: __(dataUrlMidtrans?.getSnapBillingPaymentUrl?.message) || t('common:error:fetchError'),
                    variant: 'error',
                });
            }
        }
    }, [dataUrlMidtrans]);

    const handleCreateBilling = async () => {
        setOpen(false);
        const idBilling = checked.map((check) => ({ id: check }));
        createBilling({
            variables: {
                invoiceNumber: idBilling,
            },
        })
            .then((res) => {
                window.toastMessage({
                    open: true,
                    text: res.data.createBilling.message,
                    variant: res.data.createBilling.status ? 'success' : 'error',
                });
                refetchOutstanding();
                refetchAvailableBilling();
                setLoadMore(false);
            })
            .catch(() => {
                setLoadMore(false);
            });
    };

    const handlePendingBilling = (val) => {
        setValuePendingBilling({
            billingNUmber: val.billing_number,
            billingTotal: val.grand_total,
        });
        setPageOrder(2);
    };

    const getUrlBilling = () => {
        if (valuePendingBilling && valueSnapBilling && !dataUrlMidtrans) {
            fetchUrlMidtrans({
                variables: {
                    billingNumber: valuePendingBilling.billingNUmber,
                    billingTotal: valuePendingBilling.billingTotal,
                    paymentCode: valueSnapBilling,
                },
            });
        } else {
            window.toastMessage({
                open: true,
                text: __(dataUrlMidtrans?.getSnapBillingPaymentUrl?.message) || t('common:error:fetchError'),
                variant: 'error',
            });
        }
    };

    const handleChangePage = (event, newPage) => {
        if (newPage > page) {
            setLoadMore(false);
            refetchOutstanding({
                pageSize: parseInt(event.target.value, 10),
                currentPage: page + 1,
            });
        }
        setPage(newPage);
    };

    const handleChangePageSize = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePageAvailableBilling = (event, newPage) => {
        if (newPage > page) {
            setLoadMore(false);
            refetchAvailableBilling({
                pageSize: parseInt(event.target.value, 10),
                currentPage: page + 1,
            });
        }
        setPage(newPage);
    };

    const handleChangePageSizeAvailableBilling = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const contentProps = {
        props,
        t,
        dataOrderOutstanding: dataOutstanding,
        dataOrderOutstandingPiutang: dataOutstandingPiutang,
        dataPending: dataPendingBilling,
        dataSnap: dataBillingPayment,
        sort,
        loadMore,
        page,
        pageSize,
        loadingOrderOutstanding,
        loadingOrderOutstandingPiutang,
        loadingPending,
        loadingSnap,
        checked,
        open,
        valueSnapBilling,
        pageOrder,
        storeConfig,
        setOpen,
        handleChangePage,
        handleChangePageAvailableBilling,
        handleChangePageSize,
        handleChangePageSizeAvailableBilling,
        handleSort,
        setChecked,
        handleCreateBilling,
        handlePendingBilling,
        getUrlBilling,
        setValueSnapBilling,
        setPageOrder,
    };

    const showLoading = loadingOrderOutstanding
        || !dataOrderOutstanding
        || loadingOrderOutstandingPiutang
        || !dataOrderOutstandingPiutang
        || loadingPending
        || !dataPending
        || loadingSnap
        || !dataSnap
        || loadingUrlMidtrans
        || errorUrlMidtrans
        || loadingCreateBilling;

    return (
        <Layout pageConfig={pageConfig} {...props} t={t}>
            <CustomerLayout {...props}>{showLoading ? <Skeleton t={t} /> : <Content {...contentProps} />}</CustomerLayout>
        </Layout>
    );
};

export default OrderOutstanding;
