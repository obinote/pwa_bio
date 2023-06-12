/* eslint-disable no-unused-vars */
import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/quote/view/components/skeleton';
import { useRouter } from 'next/router';
import Error from 'next/error';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const MyQuote = (props) => {
    const {
        t, pageConfig, Content, isLogin, storeConfig,
    } = props;
    const router = useRouter();
    const uid = router.query?.uid ?? '';

    if (!isLogin) {
        return <Error statusCode={404} />;
    }

    const config = {
        title: t('customer:menu:myQuote'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:myQuote'),
        bottomNav: false,
        activeMenu: '/customer/account/quote',
    };

    const { loading, data, refetch } = gqlService.getSingleNegotiableQuote({
        variables: {
            uid,
        },
    });

    // not found == data?.negotiableQuotes?.total_count === 0
    if (loading || !data) {
        return (
            <Layout pageConfig={pageConfig || config} t={t} {...props}>
                <CustomerLayout {...props} t={t} activeMenu={config.activeMenu}>
                    <Skeleton t={t} />
                </CustomerLayout>
            </Layout>
        );
    }

    if (!data) {
        return <Error statusCode={404} />;
    }

    return (
        <Layout pageConfig={pageConfig || config} {...props} activeMenu={config.activeMenu} t={t}>
            <CustomerLayout {...props} activeMenu={config.activeMenu}>
                <Content t={t} uid={uid} data={data} refetch={refetch} config={config || pageConfig} storeConfig={storeConfig} />
            </CustomerLayout>
        </Layout>
    );
};

export default MyQuote;
