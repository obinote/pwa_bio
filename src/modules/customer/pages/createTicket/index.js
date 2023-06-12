import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@src_modules/customer/pages/createTicket/components';
import Core from '@src_modules/customer/pages/createTicket/core';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async (ctx) => ({
    namespacesRequired: ['common', 'customer', 'contact', 'validate'],
    query: ctx.query,
});

export default withApollo({ ssr: false })(withTranslation()(Page));
