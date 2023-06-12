import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@src_modules/customer/pages/report/components';
import Core from '@src_modules/customer/pages/report/core';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'report'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
