import Layout from '@layout';
import { debuging } from '@config';
// import { setCartId } from '@helper_cartid';
import PropTypes from 'prop-types';
// import CustomerLayout from '@layout_customer';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { getHost } from '@helpers/config';
import {
    getOrder,
    // reOrder as mutationReorder
} from '@core_modules/order/services/graphql';
import { addProductsToCartCustom } from '@core_modules/product/services/graphql';
import { useFormik } from 'formik';
import useMessageTranslator from '@helpers/messageTranslator';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const HistoryOrder = (props) => {
    const {
        t, Content, Skeleton, ErrorView, size,
    } = props;
    const router = useRouter();
    const pageConfig = {
        title: t('order:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('order:title'),
        bottomNav: false,
    };
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(size || 10);
    const [loadMore, setLoadMore] = React.useState(false);
    const [filter, setFilter] = React.useState({});
    const __ = useMessageTranslator();

    const [openModalFilter, setOpenModalFilter] = React.useState(false);

    // const [actionReorder] = mutationReorder();
    const [addToCart] = addProductsToCartCustom();

    const { loading, data, error } = getOrder({
        pageSize,
        currentPage: page,
        filter,
        sort: {
            date: 'DESC',
        },
    });

    const handleChangePage = (event, newPage) => {
        if (newPage > page) {
            setLoadMore(true);
        }
        setPage(newPage);
    };

    const handleChangePageSize = (event) => {
        setLoadMore(true);
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formikFilter = useFormik({
        initialValues: {
            dateFrom: '',
            dateTo: '',
            status: [],
        },
        onSubmit: (values) => {
            let filterData = {};
            if (values.dateFrom && values.dateTo) {
                filterData = {
                    ...filterData,
                    range_date: {
                        from: values.dateFrom,
                        to: values.dateTo,
                    },
                };
            }

            if (values.status.length) {
                filterData = {
                    ...filterData,
                    status: {
                        in: values.status,
                    },
                };
            }

            if (values.status.length === 0 && !values.dateFrom && !values.dateTo) {
                filterData = {};
            }

            setPage(1);
            setFilter(filterData);
            setOpenModalFilter(false);
        },
    });

    const formikSearch = useFormik({
        initialValues: {
            search: '',
        },
        onSubmit: (values) => {
            if (values.search) {
                setPage(1);
                setFilter({
                    number: {
                        eq: values.search,
                    },
                });
            } else {
                setPage(1);
                setFilter({});
            }
        },
    });

    React.useEffect(() => {
        if (!loading && data && data.customer.orders && data.customer.orders.items.length) {
            setLoadMore(false);
        }
    }, [loading, data]);

    if (loading || (!data && !loadMore)) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout pageConfig={pageConfig} {...props}>
                <CustomerLayout {...props}>
                    <ErrorView type="error" message={debuging.originalError ? error.message.split(':')[1] : t('common:error:fetchError')} />
                </CustomerLayout>
            </Layout>
        );
    }

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
            }).catch((e) => {
                reject(e);
            });
        });
    }

    const reOrder = async (items) => {
        const messageError = [];
        window.backdropLoader(true);
        // eslint-disable-next-line no-restricted-syntax
        for (const dataItem of items) {
            try {
                router.push('/checkout/cart');
                if (!dataItem.product_name.includes('FREE - ')) {
                // eslint-disable-next-line no-await-in-loop
                    const addTocartProduct = await addToCartAll(dataItem);
                    if (addTocartProduct?.errors?.length) {
                        addTocartProduct.errors.forEach((errorItem) => {
                            messageError.push(errorItem?.message ?? t('order:reorderFailed', { productName: dataItem.product_name }));
                        });
                    }
                }
            } catch (e) {
                // console.log('test2');
                console.log(e.message);
                messageError.push(t('order:reorderFailed', { productName: dataItem.product_name, errorMessage: __(e.message) }));
            }
        }

        window.backdropLoader(false);
        if (messageError) {
            messageError.forEach((msg) => {
                window.toastMessage({
                    open: true,
                    text: msg,
                    variant: 'error',
                });
            });
        }
    };

    const returnUrl = (order_number) => {
        window.location.replace(`${getHost()}/rma/customer/new/order_id/${order_number}`);
    };

    const handleOpenModalFilter = () => {
        setOpenModalFilter(true);
    };

    const handleCloseModalFilter = () => {
        setOpenModalFilter(false);
    };

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <CustomerLayout t={t} wishlist={[]}>
                <Content
                    {...props}
                    loadMore={loadMore}
                    data={data.customer.orders}
                    page={page}
                    pageSize={pageSize}
                    loading={loading}
                    handleChangePage={handleChangePage}
                    handleChangePageSize={handleChangePageSize}
                    reOrder={reOrder}
                    returnUrl={returnUrl}
                    handleOpenModalFilter={handleOpenModalFilter}
                    handleCloseModalFilter={handleCloseModalFilter}
                    openModalFilter={openModalFilter}
                    formikFilter={formikFilter}
                    formikSearch={formikSearch}
                />
            </CustomerLayout>
        </Layout>
    );
};

HistoryOrder.propTypes = {
    ErrorView: PropTypes.func,
    Content: PropTypes.func,
    Skeleton: PropTypes.func,
};

HistoryOrder.defaultProps = {
    ErrorView: () => null,
    Content: () => null,
    Skeleton: () => null,
};

export default HistoryOrder;
