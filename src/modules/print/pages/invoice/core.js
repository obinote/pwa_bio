import Layout from '@layout';
import { decrypt } from '@helper_encryption';
import { useRouter } from 'next/router';
import { getInvoicePrintAsGuest } from '@src_modules/print/services/graphql';
import Loading from '@common_loaders/Backdrop';

const PagePrint = (props) => {
    const {
        t, Content, storeConfig,
    } = props;

    const router = useRouter();
    const { encryptedOrderNumber } = router.query;
    const orderNumber = decrypt(encryptedOrderNumber);

    const pageConfig = {
        title: `${t('order:invoice')} #${orderNumber}`,
        header: 'relative',
        headerTitle: `${t('order:order')} #${orderNumber}`,
        bottomNav: false,
    };

    let printData;
    let showFine = false;
    const { data, loading } = getInvoicePrintAsGuest({ order_number: orderNumber });
    const currency = storeConfig.base_currency_code;

    if (data && !loading) {
        printData = data?.printOrder;
        const isCredit = printData.orderSection.payment_methods.type === 'checkmo'
            && printData.orderSection.payment_methods.type === 'snapbilling';
        showFine = storeConfig.fine_management_status !== 0 && isCredit;
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
        showFine,
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
                        max-width: 1280px;
                        margin-top: 0;
                        padding: 12px 20px 12px;
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
