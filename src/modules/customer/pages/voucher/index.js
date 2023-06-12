import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@src_modules/customer/pages/voucher/components';
import Core from '@src_modules/customer/pages/voucher/core';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'voucher'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
