import Layout from '@layout';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { getShipmentForPrint } from '@core_modules/order/services/graphql/index';
import { useEffect } from 'react';

const ShipmentPrint = (props) => {
    const { t, Content, storeConfig } = props;
    const router = useRouter();
    const { orderId } = router.query;
    const { loading, data } = getShipmentForPrint(orderId);

    if (loading) return null;

    const details = data?.customer.orders.items[0];

    useEffect(() => {
        if (details) setTimeout(window.print, 5000);
    }, [details]);

    const pageConfig = {
        title: `${t('order:order')} # ${orderId}`,
        header: 'relative',
        headerTitle: `${t('order:order')} #${orderId}`,
        bottomNav: false,
    };

    return (
        <>
            <Layout pageConfig={pageConfig} withLayoutHeader={false} withLayoutFooter={false} showRecentlyBar={false} isShowChat={false}>
                <Content storeConfig={storeConfig} details={details} />
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

ShipmentPrint.propTypes = {
    Content: PropTypes.func,
};

ShipmentPrint.defaultProps = {
    Content: () => {},
};

export default ShipmentPrint;
