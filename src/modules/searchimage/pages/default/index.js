import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/searchimage/pages/default/core';
import Content from '@core_modules/searchimage/components';

const Page = (props) => (
    <Core
        {...props}
        Content={Content}
    />
);

Page.getInitialProps = async ({ req }) => ({
    namespacesRequired: ['common', 'catalog', 'product'],
    token: req && req.session ? req.session.token : '',
});

export default withApollo({ ssr: true })(withTranslation()(Page));
