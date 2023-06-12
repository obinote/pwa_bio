import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/quote/components/skeleton';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const MyQuote = (props) => {
    const {
        t, pageConfig, Content, size,
    } = props;
    const config = {
        title: t('customer:menu:myQuote'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:myQuote'),
        bottomNav: false,
    };

    // const [page, setPage] = React.useState(0);
    // const [pageSize, setPageSize] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(size || 10);

    const { loading, data } = gqlService.negotiableQuotes({
        variables: {
            page_size: pageSize,
            current_page: page,
        },
    });

    const handleChangeRowsPerPage = (value) => {
        setPageSize(value);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangePageSize = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading || !data) {
        return (
            <Layout pageConfig={pageConfig || config} {...props} t={t}>
                <CustomerLayout {...props}>
                    <Skeleton t={t} />
                </CustomerLayout>
            </Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig || config} {...props} t={t}>
            <CustomerLayout pageConfig={pageConfig || config} {...props}>
                <Content
                    t={t}
                    data={data}
                    page={page}
                    pageSize={pageSize}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleChangePage={handleChangePage}
                    handleChangePageSize={handleChangePageSize}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default MyQuote;
