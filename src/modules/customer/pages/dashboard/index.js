import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@src_modules/customer/pages/dashboard/components';
import Core from '@src_modules/customer/pages/dashboard/core';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'point'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
