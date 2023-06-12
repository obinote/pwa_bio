/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable react/no-unknown-property */
import Layout from '@layout';
import { useRouter } from 'next/router';
import gqlService from '@src_modules/customer/services/graphql';
import Skeleton from '@src_modules/customer/pages/quote/print/components/skeleton';

const PrintQuote = (props) => {
    const {
        t, pageConfig, Content, ...other
    } = props;
    const router = useRouter();
    const uid = router.query?.uid ?? '';

    const { loading, data } = gqlService.getSingleNegotiableQuote({
        variables: {
            uid,
            skipShipping: false,
        },
    });

    const config = {
        title: t('customer:menu:myQuote'),
        header: false, // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:menu:myQuote'),
        bottomNav: false,
    };

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
                        #mm {
                            display: none;
                        }
                    `}
                </style>
            </>
        );
    }

    return (
        <>
            <Layout pageConfig={pageConfig || config} {...props} t={t} withLayoutHeader={false} withLayoutFooter={false} showRecentlyBar={false}>
                <Content {...props} t={t} data={data} />
            </Layout>
            <style global jsx>
                {`
                    .main-app {
                        margin-top: 0;
                        max-width: 1280px;
                        padding: 0 20px;
                    }
                    #mm {
                        display: none;
                    }
                `}
            </style>
        </>
    );
};

export default PrintQuote;
