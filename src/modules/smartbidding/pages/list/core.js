import Layout from '@layout';
import CustomerLayout from '@layout_customer';
import gqlService from '@core_modules/smartbidding/services/graphql';
import Skeleton from '@core_modules/order/pages/history/components/skeleton';

import Router from 'next/router';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';

const SmartBidding = (props) => {
    const {
        t, Content, size,
    } = props;
    const pageConfig = {
        title: t('customer:menu:smartBidding'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:smartBidding'),
        bottomNav: false,
    };

    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(size || 10);
    const [loadMore, setLoadMore] = React.useState(false);

    const { loading, data } = gqlService.getBiddingList({
        pageSize,
        currentPage: page,
        sort: {
            created_at: 'DESC',
        },
    });

    const dataBidding = (data && data.getBiddingList) || [];

    React.useEffect(() => {
        if (!loading && data && data.getBiddingList && data.getBiddingList.length) {
            setLoadMore(false);
        }
    }, [loading, data]);

    const handleChangePage = (event, newPage) => {
        if (newPage > page) {
            setLoadMore(true);
        }
        setPage(newPage);
        setLoadMore(false);
    };

    const handleChangePageSize = (event) => {
        setLoadMore(true);
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading || !data) {
        return (
            <Layout pageConfig={pageConfig} {...props} t={t}>
                <CustomerLayout {...props}>
                    <Skeleton t={t} />
                </CustomerLayout>
            </Layout>
        );
    }

    const contentProps = {
        props,
        t,
        data: dataBidding,
        loadMore,
        page,
        pageSize,
        loading,
        Router,
        handleChangePage,
        handleChangePageSize,
    };

    return (
        <Layout pageConfig={pageConfig} {...props} t={t}>
            <Content
                {...contentProps}
            />
        </Layout>
    );
};

export default SmartBidding;
