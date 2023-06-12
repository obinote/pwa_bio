/* eslint-disable linebreak-style */
import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@core_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/dashboard/components/skeleton';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const DashboardPage = (props) => {
    const {
        t, pageConfig, Content,
    } = props;
    const config = {
        title: t('customer:menu:dashboard'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:dashboard'),
        bottomNav: 'account',
    };

    const { data: dataVoucher, loading: loadingVoucher } = gqlService.getCustomerVoucher();
    const { data: dataPoint, loading: loadingPoint } = gqlService.getCustomRewardPointsTransaction();
    const { data: dataNotif, loading: loadingNotif } = gqlService.getInboxNotificationList();
    const { data: dataMember, loading: loadingMember } = gqlService.getCustomerMembership();
    const { data: dataOrderSummary, loading: loadingOrderSummary } = gqlService.getCustomerOrderSummary();
    const { data: dataCustomer, loading: loadingCustomer } = gqlService.getDataCustomer();

    if (loadingMember || loadingVoucher || loadingPoint || loadingNotif || loadingOrderSummary) {
        return (
            <Layout pageConfig={pageConfig || config} {...props} t={t}>
                <CustomerLayout {...props} hideTitle>
                    <Skeleton t={t} />
                </CustomerLayout>
            </Layout>
        );
    }

    return (
        <Layout pageConfig={pageConfig || config} {...props} t={t}>
            <CustomerLayout {...props} hideTitle>
                <Content
                    t={t}
                    loadingCustomer={loadingCustomer}
                    dataVoucher={dataVoucher}
                    dataNotif={dataNotif}
                    dataPoint={dataPoint}
                    dataMember={dataMember}
                    dataOrderSummary={dataOrderSummary}
                    dataCustomer={dataCustomer}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default DashboardPage;
