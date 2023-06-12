import { withApollo } from '@lib_apollo';
import { withTranslation } from '@i18n';
import Core from '@core_modules/customer/pages/companyprofile/profile/core';
import Content from '@core_modules/customer/pages/companyprofile/profile/components';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'register', 'validate'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
