import Layout from '@layout';
import { decrypt } from '@helper_encryption';
import { useRouter } from 'next/router';
import { getQuotationPrintAsGuest } from '@src_modules/print/services/graphql';
import Loading from '@common_loaders/Backdrop';

const PagePrint = (props) => {
    const {
        t, Content, storeConfig,
    } = props;
    const router = useRouter();
    const { encryptedUid } = router.query;
    const uid = decrypt(encryptedUid);
    const pageConfig = {
        title: t('customer:menu:myQuote'),
        header: false,
        headerTitle: t('customer:menu:myQuote'),
        bottomNav: false,
    };

    let printData;
    const { data, loading } = getQuotationPrintAsGuest({ uid });

    if (data && !loading) {
        printData = data?.omsNegotiableQuote;
    }

    React.useEffect(() => {
        let printTimeout;
        if (data?.omsNegotiableQuote) {
            printTimeout = setTimeout(() => {
                window.print();
            }, 3000);
        }
        return () => {
            clearTimeout(printTimeout);
        };
    }, [data]);

    const contentProps = {
        t,
        storeConfig,
        printData,
    };

    if (loading || !data) return <Loading open />;

    return (
        <>
            <Layout
                pageConfig={pageConfig}
                withLayoutHeader={false}
                withLayoutFooter={false}
                showRecentlyBar={false}
            >
                <Content {...contentProps} />
            </Layout>

            {/* eslint-disable-next-line react/no-unknown-property */}
            <style jsx global>
                {`
                    main.main-app {
                        margin-top: 0;
                        max-width: 1280px;
                        padding: 0 20px;
                    }
                    .chat-plugin {
                        display: none;
                    }
                `}
            </style>
        </>
    );
};

export default PagePrint;
