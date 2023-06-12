import React from 'react';
import Layout from '@layout';
import { decrypt } from '@helper_encryption';
import { useRouter } from 'next/router';
import { getOrderPrintAsGuest } from '@src_modules/print/services/graphql';
import Loading from '@common_loaders/Backdrop';

const PagePrint = (props) => {
    const {
        t, Content, storeConfig,
    } = props;

    const router = useRouter();
    const { encryptedOrderNumber } = router.query;
    const orderNumber = decrypt(encryptedOrderNumber);

    const pageConfig = {
        title: `${t('order:order')} #${orderNumber}`,
        header: 'relative',
        headerTitle: `${t('order:order')} #${orderNumber}`,
        bottomNav: false,
    };

    let printData;
    const { data, loading } = getOrderPrintAsGuest({ order_number: orderNumber });
    const currency = storeConfig.base_currency_code;

    if (data && !loading) {
        printData = data?.printOrder;
    }

    React.useEffect(() => {
        let printTimeout;
        if (data?.printOrder) {
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
        orderNumber,
        currency,
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
