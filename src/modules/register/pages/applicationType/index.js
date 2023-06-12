import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/register/pages/applicationType/core';
import Content from '@core_modules/register/pages/applicationType/components';

const Page = (props) => (<Core {...props} Content={Content} />);

Page.getInitialProps = async (ctx) => ({
    namespacesRequired: ['common', 'register', 'validate'],
    query: ctx.query,
});

export default withApollo({ ssr: true })(withTranslation()(Page));
