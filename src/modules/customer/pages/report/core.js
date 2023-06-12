import Layout from '@layout';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const PointPage = (props) => {
    const { t, pageConfig, Content } = props;
    const config = {
        title: t('customer:menu:report'),
        header: 'relative',
        headerTitle: t('customer:menu:report'),
        bottomNav: false,
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props} t={t}>
            <CustomerLayout {...props}>
                <Content t={t} />
            </CustomerLayout>
        </Layout>
    );
};

export default PointPage;
