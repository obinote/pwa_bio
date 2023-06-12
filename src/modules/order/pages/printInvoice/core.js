import Layout from '@layout';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { getInvoiceForPrint } from '@core_modules/order/services/graphql/index';
import { useEffect, useMemo } from 'react';

const InvoicePrint = (props) => {
    const { t, Content, storeConfig } = props;
    const router = useRouter();
    const { orderId } = router.query;
    const { loading, data } = getInvoiceForPrint(orderId);

    if (loading) return null;

    const details = data?.customer.orders.items[0];

    const invoice = useMemo(
        () => details.print_invoice ?? {
            printed_at: '-',
            invoice_date: '-',
            payer: {
                address: '-',
                cityKecamatan: '-',
                country: '-',
                customer_name: '-',
                phone: '-',
            },
            sold_to: {
                address: '-',
                cityKecamatan: '-',
                country: '-',
                customer_name: '-',
                phone: '-',
            },
            customer_segment: '-',
            company_name: '-',
            npwp: '-',
            license: '-',
            branch: {
                company_address: '-',
                company_phone: '-',
            },
            salesman: '-',
            invoice_no: '-',
        },
        [details.print_invoice],
    );

    useEffect(() => {
        if (details) setTimeout(window.print, 5000);
    }, [details]);

    const isCredit = details.payment_methods.filter((item) => item.type === 'checkmo' || item.type === 'snapbilling').length > 0;
    // fine_management_status uses string instead of integer
    // eslint-disable-next-line eqeqeq
    const showFine = storeConfig.fine_management_status != 0 && isCredit;

    const pageConfig = {
        title: `${t('order:invoice')} # ${orderId}`,
        header: 'relative',
        headerTitle: `${t('order:order')} #${orderId}`,
        bottomNav: false,
    };

    return (
        <>
            <Layout pageConfig={pageConfig} withLayoutHeader={false} withLayoutFooter={false} showRecentlyBar={false} isShowChat={false}>
                <Content storeConfig={storeConfig} details={details} invoice={invoice} showFine={showFine} />
            </Layout>

            {/* eslint-disable-next-line react/no-unknown-property */}
            <style jsx global>
                {`
                    main.main-app {
                        max-width: 1280px;
                        margin-top: 0;
                        padding: 12px 20px 12px;
                    }
                `}
            </style>
        </>
    );
};

InvoicePrint.propTypes = {
    Content: PropTypes.func,
};

InvoicePrint.defaultProps = {
    Content: () => {},
};

export default InvoicePrint;
