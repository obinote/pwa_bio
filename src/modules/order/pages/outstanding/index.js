import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@core_modules/order/pages/outstanding/components';
import Core from '@core_modules/order/pages/outstanding/core';
import Skeleton from '@core_modules/order/pages/history/components/skeleton';

const Page = (props) => (
    <Core {...props} Content={Content} Skeleton={Skeleton} />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'order', 'customer'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
