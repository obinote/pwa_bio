import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@src_modules/customer/pages/point/components';
import Core from '@src_modules/customer/pages/point/core';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'point'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
