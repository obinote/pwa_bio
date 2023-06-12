import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/promotion/pages/default/core';
import Content from '@core_modules/promotion/pages/default/components';

const Page = (props) => (
    <Core
        {...props}
        Content={Content}
    />
);

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'promotion', 'customer'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
