/* eslint-disable linebreak-style */
import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/point/components/skeleton';
import { getCmsBlocks } from '@core_modules/cms/services/graphql';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const PointPage = (props) => {
    const { t, pageConfig, Content } = props;
    const config = {
        title: t('customer:menu:point'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:point'),
        bottomNav: false,
    };

    const { data: dataCmsBlock, loading: loadingCmsBlock } = getCmsBlocks({ identifiers: ['medbiz-point'] });

    const [page, setPage] = React.useState(1);
    const pageSize = 10;

    const { loading, data } = gqlService.getCustomRewardPointsTransaction({
        variables: {
            page_size: pageSize,
            current_page: page,
        },
    });

    const handleChangePage = (event, value) => {
        setPage(value);
    };

    if (loading || !data || loadingCmsBlock) {
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
                    handleChangePage={handleChangePage}
                    page={page}
                    pageSize={pageSize}
                    dataCmsBlock={dataCmsBlock?.cmsBlocks.items[0].content}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default PointPage;
