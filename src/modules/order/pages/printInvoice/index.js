import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/order/pages/printInvoice/core';
import Content from '@core_modules/order/pages/printInvoice/components';
import Skeleton from '@core_modules/order/pages/detail/components/skeleton';

const InvoicePrintPage = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} />
);

InvoicePrintPage.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order', 'customer', 'trackingorder'],
});

export default withApollo({ ssr: true })(withTranslation()(InvoicePrintPage));
