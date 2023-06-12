import Layout from '@layout';
import gqlService from '@core_modules/order/services/graphql';
// import Skeleton from '@src_modules/customer/pages/requisition/components/skeleton';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const OrderOverdue = (props) => {
    const {
        t, Content, size, Skeleton, storeConfig,
    } = props;
    const pageConfig = {
        title: t('customer:menu:myOverdue'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:myOverdue'),
        bottomNav: false,
    };

    const [page, setPage] = React.useState(1);
    const [sort, setSort] = React.useState('ASC');
    const [pageSize, setPageSize] = React.useState(size || 10);
    const [loadMore, setLoadMore] = React.useState(false);
    const [filter, setFilter] = React.useState({});
    const [openModalFilter, setOpenModalFilter] = React.useState(false);
    const currentDate = new Date().toJSON().slice(0, 10);

    const handleSort = (event) => {
        if (event.target.value !== 'Terlama') {
            setSort('ASC');
        } else if (event.target.value !== 'Terbaru') {
            setSort('DESC');
        } else {
            setSort('ASC');
        }
    };
    const validationSchema = Yup.object().shape({
        dateFrom: Yup.date().required(t('validate:fieldRequired')),
        dateTo: Yup.date().required(t('validate:fieldRequired')),
    });

    const formikFilter = useFormik({
        initialValues: {
            dateFrom: '',
            dateTo: '',
        },
        validationSchema,
        onSubmit: (values) => {
            let filterData = {};
            if (values.dateFrom && values.dateTo) {
                filterData = {
                    ...filterData,
                    from_date: {
                        eq: `${values.dateFrom} 00:00:00`,
                    },
                    to_date: {
                        eq: `${values.dateTo} 23:59:59`,
                    },
                };
            }
            if (!values.dateFrom && !values.dateTo) {
                filterData = {};
            }
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
                setFilter({
                    order_increment_id: {
                        like: values.search,
                    },
                });
            } else {
                setFilter({});
            }
        },
    });

    const { loading, data, refetch: refetchOverdue } = gqlService.getCustomerOrderOverdue({
        pageSize,
        currentPage: page,
        filter,
        sort: {
            due_date: sort,
        },
    });

    const dataOverdue = (data && data.getCustomerOrderOverdue) || [];

    const handleChangeFilter = async ({ target }) => {
        await formikFilter.setFieldValue(target.name, target.value);
        await formikFilter.validateForm();
    };

    const handleSubmitFilter = () => {
        if (Object.keys(formikFilter.errors).length === 0) {
            if (Date.parse(formikFilter.values.dateFrom) > Date.parse(currentDate)) {
                window.toastMessage({
                    open: true,
                    text: t('validate:date:invalidDateFrom'),
                    variant: 'error',
                });
            } else if (Date.parse(formikFilter.values.dateTo) < Date.parse(formikFilter.values.dateFrom)) {
                window.toastMessage({
                    open: true,
                    text: t('validate:date:invalidDateTo'),
                    variant: 'error',
                });
            } else {
                formikFilter.handleSubmit();
            }
        }
    };

    React.useEffect(() => {
        if (formikFilter && formikFilter.values.dateFrom !== ''
            && formikFilter.values.dateTo !== ''
            && Object.keys(formikFilter.errors).length === 0) {
            if (Date.parse(formikFilter.values.dateFrom) > Date.parse(currentDate)) {
                window.toastMessage({
                    open: true,
                    text: t('validate:date:invalidDateFrom'),
                    variant: 'error',
                });
                formikFilter.setFieldValue('dateFrom', '');
            } else if (Date.parse(formikFilter.values.dateTo) < Date.parse(formikFilter.values.dateFrom)) {
                window.toastMessage({
                    open: true,
                    text: t('validate:date:invalidDateTo'),
                    variant: 'error',
                });
            }
        }
    }, [formikFilter]);

    React.useEffect(() => {
        if (!loading && data && data.items && data.items.length) {
            setLoadMore(false);
        }
    }, [loading, data]);

    const handleOpenModalFilter = () => {
        setOpenModalFilter(true);
    };

    const handleCloseModalFilter = () => {
        formikFilter.resetForm();
        setOpenModalFilter(false);
    };

    const handleChangePage = (event, newPage) => {
        if (newPage > page) {
            setLoadMore(false);
            refetchOverdue({
                pageSize: event.target.value,
                currentPage: page + 1,
            });
        }
        setPage(newPage);
    };

    const handleChangePageSize = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const contentProps = {
        props,
        t,
        data: dataOverdue,
        sort,
        loadMore,
        page,
        pageSize,
        loading,
        openModalFilter,
        formikFilter,
        formikSearch,
        storeConfig,
        handleChangePage,
        handleChangePageSize,
        handleSort,
        handleOpenModalFilter,
        handleCloseModalFilter,
        handleChangeFilter,
        handleSubmitFilter,
    };

    return (
        <Layout pageConfig={pageConfig} {...props} t={t}>
            <CustomerLayout t={t}>
                <Content
                    {...contentProps}
                    Skeleton={Skeleton}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default OrderOverdue;
