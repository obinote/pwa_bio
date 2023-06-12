import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@src_modules/customer/pages/quote/print/components';
import Core from '@src_modules/customer/pages/quote/print/core';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
