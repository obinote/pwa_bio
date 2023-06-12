import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/order/pages/printShipment/core';
import Content from '@core_modules/order/pages/printShipment/components';
import Skeleton from '@core_modules/order/pages/detail/components/skeleton';

const ShipmentPrintPage = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} />
);

ShipmentPrintPage.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order', 'customer', 'trackingorder'],
});

export default withApollo({ ssr: true })(withTranslation()(ShipmentPrintPage));
