import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@core_modules/smartbidding/pages/edit/components';
import Core from '@core_modules/smartbidding/pages/edit/core';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'smartbidding'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
