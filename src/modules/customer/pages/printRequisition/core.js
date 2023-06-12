/* eslint-disable linebreak-style */
/* eslint-disable react/no-unknown-property */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/printRequisition/components/skeleton';

const PrintRequisition = (props) => {
    const { t, pageConfig, Content, ...other } = props;
    const { storeConfig } = other;
    const config = {
        title: t('customer:menu:myRequisition'),
        header: false, // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:myRequisition'),
        bottomNav: false,
    };
    const router = useRouter();
    const { data, loading } = gqlService.getRequisitionList({
        variables: {
            entity_id: Number(router.query.slug),
        },
    });

    if (loading || !data) {
        return (
            <>
                <Layout pageConfig={pageConfig || config} {...props} t={t} withLayoutHeader={false} withLayoutFooter={false} showRecentlyBar={false}>
                    <Skeleton t={t} />
                </Layout>
                <style global jsx>
                    {`
                        .main-app {
                            margin-top: 0;
                            max-width: 1280px;
                            padding: 0 20px;
                        }
                    `}
                </style>
            </>
        );
    }

    return (
        <>
            <Layout pageConfig={pageConfig || config} {...props} t={t} withLayoutHeader={false} withLayoutFooter={false} showRecentlyBar={false}>
                <Content
                    {...props}
                    t={t}
                    data={data}
                />
            </Layout>
            <style global jsx>
                {`
                    .main-app {
                        margin-top: 0;
                        max-width: 1280px;
                        padding: 0 20px;
                    }
                `}
            </style>
        </>
    );
};

export default PrintRequisition;
