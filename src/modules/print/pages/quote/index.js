import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@src_modules/print/pages/quote/core';
import Content from '@src_modules/print/pages/quote/components';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['customer'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
