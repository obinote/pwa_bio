import { useEffect } from 'react';
import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
// import { setCartId } from '@helper_cartid';
import { getHost } from '@helpers/config';
import Alert from '@material-ui/lab/Alert';
import {
    getOrderDetail,
    // reOrder as mutationReorder,
    getPaymentInformation,
    getRefundForm,
    getVendorReview,
} from '@core_modules/order/services/graphql';
import gqlService from '@core_modules/checkout/services/graphql';
import { getRequisitionList, addItemToRequisitionList } from '@core_modules/product/services/graphql/';
import { encrypt } from '@helper_encryption';
import userAgent from '@helper_useragent';
import dynamic from 'next/dynamic';
import { addProductsToCartCustom } from '@core_modules/product/services/graphql';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const OrderDetail = (props) => {
    const {
        t, Content, Skeleton, ...other
    } = props;
    const [requisitionAnchor, setRequisitionAnchor] = React.useState(null);
    const [modalRequisition, setModalRequisition] = React.useState(false);
    const [modalComplete, setModalComplete] = React.useState(false);
    const [modalRating, setModalRating] = React.useState(false);
    const [isEditReview, setIsEditReview] = React.useState(false);
    const [valueRating, setValueRating] = React.useState(0);
    const { storeConfig } = other;
    const router = useRouter();
    const { id } = router.query;
    let detail = [];
    let pageConfig = {
        title: `${t('order:order')}  `,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('order:order')} #${detail.length > 0 ? detail[0].order_number : ''}`,
        bottomNav: false,
    };
    const [params] = React.useState({
        order_id: id,
    });
    const {
        loading, data, refetch: orderDetailRefetch, error,
    } = getOrderDetail(params);
    const { loading: loadingPaymentInfo, data: paymentInfo, error: errorPaymentInfo } = getPaymentInformation(params);
    // const [actionReorder] = mutationReorder();
    const [actionRefund] = getRefundForm();
    const [addToCart] = addProductsToCartCustom();

    // BRI Ceria
    const [getBriCeriaToken] = gqlService.getBriCeriaToken({ onError: () => { } });
    const handleOpenBriCeria = () => {
        window.backdropLoader(true);
        getBriCeriaToken({
            variables: { orderId: id },
        })
            .then((res) => {
                window.backdropLoader(false);
                if (res?.data?.getBriCeriaPaymentTokenByOrderId?.bri_ceria_token && res?.data?.getBriCeriaPaymentTokenByOrderId?.redirect_url) {
                    const urlRedirect = res.data.getBriCeriaPaymentTokenByOrderId.redirect_url;
                    window.location.href = urlRedirect;
                } else {
                    const msg = t('checkout:message:serverError');
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: msg,
                    });
                }
            })
            .catch((e) => {
                const msg = e.graphQLErrors.length > 0 ? e.graphQLErrors[0].message : t('checkout:message:serverError');
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: msg,
                });
            });
    };

    const loadRequisitionAction = () => {
        const { loading: requisitionListLoading, data: requisitionListData, refetch: requisitionListRefetch } = getRequisitionList();
        const [addItemRequisition] = addItemToRequisitionList();
        return {
            requisitionListLoading,
            requisitionListData,
            requisitionListRefetch,
            addItemRequisition,
        };
    };

    const [fetchVendorReview, { loading: loadingOrderRating, data: orderRating, refetch: orderRatingRefetch }] = getVendorReview();
    useEffect(() => {
        if (data) {
            fetchVendorReview({
                variables: {
                    filter: {
                        buyer_email: { eq: data.customer.email },
                        company_code: { eq: data.customer.orders.items[0].seller.seller_code },
                        channel_order_id: { eq: id },
                    },
                },
            });
        }
    }, [data]);

    const orderRatingAction = {
        loadingOrderRating,
        orderRating,
        orderRatingRefetch,
        valueRating,
        setValueRating,
    };
    const requisitionAction = loadRequisitionAction();

    if (error || errorPaymentInfo) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Alert className="m-15" severity="error">
                        {t('common:error:fetchError')}
                    </Alert>
                </CustomerLayout>
            </Layout>
        );
    }

    if (loading || !data || loadingPaymentInfo) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }

    if (!loading && data && data.customer.orders) {
        // eslint-disable-next-line prefer-destructuring
        detail = data.customer.orders.items;
    }
    const currency = detail.length > 0 ? detail[0].total.grand_total.currency : storeConfig.base_currency_code;

    pageConfig = {
        title: `${t('order:order')} # ${router.query.id}`,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: `${t('order:order')} #${detail.length > 0 ? detail[0].order_number : ''}`,
        bottomNav: false,
    };

    const handlePopoverClose = () => {
        setRequisitionAnchor(null);
    };
    const handlePopoverOpen = (event) => {
        setRequisitionAnchor(event.currentTarget);
    };

    const handleModalOpen = () => {
        setModalRequisition(true);
    };

    const handleModalClose = () => {
        setModalRating(false);
        setRequisitionAnchor(null);
        setModalRequisition(false);
    };

    const handleModalCompleteOpen = () => {
        setModalComplete(true);
    };

    const handleModalCompleteClose = () => {
        setModalComplete(false);
    };

    const handleModalRatingOpen = (rating = 0, isEdit = false) => {
        setIsEditReview(isEdit);
        setValueRating(rating);
        setModalRating(true);
    };

    const handleModalRatingClose = () => {
        setModalRating(false);
        setValueRating(0);
    };

    const handleTrackShipment = () => {
        router.push(`/sales/order/track/order_id/${id}`);
    };

    const handleOpenTicket = () => {
        router.push({
            pathname: '/customer/account/tickets/create',
            query: {
                incrementId: id,
            },
        },
        '/customer/account/tickets/create');
    };

    const onBack = () => {
        router.push('/sales/order/history');
    };

    function addToCartAll(dataItem) {
        return new Promise((resolve, reject) => {
            addToCart({
                variables: {
                    cartItems: {
                        quantity: dataItem.quantity_ordered,
                        sku: dataItem.product_sku,
                    },
                },
            }).then((res) => {
                resolve(res);
            }).catch(() => {
                reject();
            });
        });
    }

    const reOrder = async (items) => {
        if (id && id !== '') {
            window.backdropLoader(true);
            // eslint-disable-next-line no-restricted-syntax
            for (const dataItem of items) {
                try {
                    if (!dataItem.product_name.includes('FREE - ')) {
                        // eslint-disable-next-line no-await-in-loop
                        await addToCartAll(dataItem);
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            window.backdropLoader(false);
            router.push('/checkout/cart');
        }
    };

    const returnUrl = (order_number) => {
        window.backdropLoader(true);
        actionRefund({
            variables: {
                order_number,
            },
        })
            .then(async (res) => {
                if (res && res?.data?.getRefundForm?.status) {
                    const urlSearch = new URLSearchParams(res?.data?.getRefundForm?.url);
                    const encode = encodeURIComponent(`${getHost()}/sales/order/view/order_id/${order_number}`);
                    urlSearch.append('redirectto', encode);
                    const decodedParams = decodeURIComponent(urlSearch.toString());
                    setTimeout(() => {
                        if (userAgent.isMobileApps() === false) {
                            window.open(decodedParams, '_blank');
                            return;
                        }
                        window.location.replace(decodedParams);
                    }, 1000);
                }
                window.backdropLoader(false);
            })
            .catch(() => {
                window.backdropLoader(false);
            });
    };

    const printOrder = (order_number) => {
        const encryptedOrderNumber = encodeURIComponent(encrypt(order_number));
        const orderPrintUrl = userAgent.isMobileApps()
            ? `${getHost()}/print/order/${encryptedOrderNumber}`
            : `${getHost()}/sales/order/print/order_id/${order_number}`;
        window.open(orderPrintUrl);
    };

    const handlePrintInvoiceClick = (order_number) => {
        const encryptedOrderNumber = encodeURIComponent(encrypt(order_number));
        const invoicePrintUrl = userAgent.isMobileApps()
            ? `${getHost()}/print/invoice/${encryptedOrderNumber}`
            : `${getHost()}/sales/order/printInvoice/order_id/${order_number}`;
        window.open(invoicePrintUrl);
    };

    const handlePrintShipmentClick = (order_number) => {
        const encryptedOrderNumber = encodeURIComponent(encrypt(order_number));
        const shipmentPrintUrl = userAgent.isMobileApps()
            ? `${getHost()}/print/shipment/${encryptedOrderNumber}`
            : `${getHost()}/sales/order/printShipment/order_id/${order_number}`;
        window.open(shipmentPrintUrl);
    };

    const requisitionProps = {
        handlePopoverOpen,
        handlePopoverClose,
        handleModalOpen,
        handleModalClose,
        handleModalCompleteOpen,
        handleModalCompleteClose,
        handleModalRatingOpen,
        handleModalRatingClose,
        requisitionAnchor,
        modalRequisition,
        modalComplete,
        modalRating,
        requisitionAction,
        onBack,
    };

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <CustomerLayout t={t} wishlist={[]} activeMenu="/sales/order/history">
                <Content
                    {...props}
                    detail={detail}
                    orderDetailRefetch={orderDetailRefetch}
                    currency={currency}
                    returnUrl={returnUrl}
                    reOrder={reOrder}
                    printOrder={printOrder}
                    paymentInfo={paymentInfo.OrderPaymentInformation}
                    orderRatingAction={orderRatingAction}
                    handleOpenBriCeria={handleOpenBriCeria}
                    handleTrackShipment={handleTrackShipment}
                    handleOpenTicket={handleOpenTicket}
                    onPrintInvoiceClick={handlePrintInvoiceClick}
                    onPrintShipmentClick={handlePrintShipmentClick}
                    isEditReview={isEditReview}
                    {...requisitionProps}
                />
            </CustomerLayout>
        </Layout>
    );
};

OrderDetail.propTypes = {
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

OrderDetail.defaultProps = {
    Content: () => { },
    Skeleton: () => { },
};

export default OrderDetail;
