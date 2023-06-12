import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@src_modules/customer/pages/tickets/components';
import Core from '@src_modules/customer/pages/tickets/core';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
