import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/voucher/components/skeleton';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const VoucherPage = (props) => {
    const { t, pageConfig, Content } = props;
    const config = {
        title: t('customer:menu:voucher'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:voucher'),
        bottomNav: false,
    };
    const [page, setPage] = React.useState(1);
    const pageSize = 10;
    const { loading, data } = gqlService.getCustomerVoucher({
        variables: {
            page_size: pageSize,
            current_page: page,
        },
    });
    const localDateString = (stringTime) => new Date(stringTime).toLocaleDateString(
        {},
        {
            year: 'numeric', month: 'long', day: 'numeric',
        },
    );

    const handleChangePage = (event, value) => {
        setPage(value);
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
            <CustomerLayout {...props}>
                <Content
                    t={t}
                    data={data}
                    localDateString={localDateString}
                    handleChangePage={handleChangePage}
                    page={page}
                    pageSize={pageSize}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default VoucherPage;
