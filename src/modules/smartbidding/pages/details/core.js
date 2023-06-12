import Router, { useRouter } from 'next/router';

import Layout from '@layout';
import CustomerLayout from '@layout_customer';
import gqlService from '@core_modules/smartbidding/services/graphql';

const SmartBidding = (props) => {
    const {
        t, Content, size,
    } = props;

    const router = useRouter();

    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(size || 10);
    const [loadMore, setLoadMore] = React.useState(false);

    const { loading, data, refetch } = gqlService.getBiddingDetails({
        id: Number(router.query.id),
    });

    const { refetch: refetchList } = gqlService.getBiddingList();

    const [closeBidding] = gqlService.cancelBidding();

    const dataBidding = (data && data.getBidding) || [];

    const pageConfig = {
        title: dataBidding.name,
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: dataBidding.name,
        bottomNav: false,
    };

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

    const handleClose = (idBidding) => {
        window.backdropLoader(true);

        closeBidding({
            variables: { id: idBidding },
        }).then(() => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: t('smartbidding:details:closeMessage'),
                variant: 'success',
            });
            setTimeout(() => router.push('/customer/account/bidding'), 250);
            refetch();
            refetchList();
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    React.useEffect(() => {
        if (!loading && data && data.items && data.items.length) {
            setLoadMore(false);
        }
    }, [loading, data]);

    if (loading || !data) {
        return (
            <Layout pageConfig={pageConfig} {...props} t={t}>
                <CustomerLayout {...props} />
            </Layout>
        );
    }

    const contentProps = {
        props,
        t,
        title: pageConfig.title,
        data: dataBidding,
        loadMore,
        page,
        pageSize,
        loading,
        Router,
        handleChangePage,
        handleChangePageSize,
        handleClose,
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
