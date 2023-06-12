import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/order/pages/track/core';
import Content from '@core_modules/order/pages/track/components';
import Skeleton from '@core_modules/order/pages/track/components/skeleton';

const TrackOrder = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} />
);

TrackOrder.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order', 'customer', 'trackingorder'],
});

export default withApollo({ ssr: true })(withTranslation()(TrackOrder));
