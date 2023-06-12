import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/creditlimit/components/skeleton';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const CreditReguler = (props) => {
    const { t, pageConfig, Content } = props;
    const config = {
        title: t('customer:creditReguler:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:creditReguler:title'),
        bottomNav: false,
    };

    const { loading: loadingLimit, data: dataLimit } = gqlService.getRegularCredit();
    const { data: dataHistory } = gqlService.getCustomerRegularCreditHistory();

    if (loadingLimit || !dataLimit) {
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
                    dataLimit={dataLimit}
                    dataHistory={dataHistory}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default CreditReguler;
