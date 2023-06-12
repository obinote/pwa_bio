import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from './core';

const Page = (props) => <Core {...props} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['product'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
