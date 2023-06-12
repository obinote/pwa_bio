import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@src_modules/customer/pages/detailTicket/components';
import Core from '@src_modules/customer/pages/detailTicket/core';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'contact', 'validate'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
