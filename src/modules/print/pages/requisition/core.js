import Layout from '@layout';
import { decrypt } from '@helper_encryption';
import { useRouter } from 'next/router';
import { getRequisitionPrintAsGuest } from '@src_modules/print/services/graphql';
import Loading from '@common_loaders/Backdrop';

const PagePrint = (props) => {
    const {
        t, Content, storeConfig,
    } = props;
    const router = useRouter();
    const { encryptedId } = router.query;
    const entityId = decrypt(encryptedId);
    const pageConfig = {
        title: t('customer:menu:myRequisition'),
        header: false,
        headerTitle: t('customer:menu:myRequisition'),
        bottomNav: false,
    };

    let printData;
    // eslint-disable-next-line radix
    const { data, loading } = getRequisitionPrintAsGuest({ entity_id: parseInt(entityId) });

    if (data && !loading) {
        printData = data?.printRequisitionList;
    }

    React.useEffect(() => {
        let printTimeout;
        if (data?.printRequisitionList) {
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
