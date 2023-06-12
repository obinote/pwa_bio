import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/distributor/pages/list/core';
import Content from '@core_modules/distributor/pages/list/components';

const Default = (props) => (
    <Core {...props} Content={Content} />
);

Default.getInitialProps = async () => ({
    namespacesRequired: ['distributor'],
});

export default withApollo({ ssr: true })(withTranslation()(Default));
