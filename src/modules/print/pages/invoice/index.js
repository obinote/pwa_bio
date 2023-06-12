import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@src_modules/print/pages/invoice/core';
import Content from '@src_modules/print/pages/invoice/components';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['order'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
