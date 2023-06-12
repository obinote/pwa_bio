import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/distributor/pages/detail/core';
import Content from '@core_modules/distributor/pages/detail/components';

const Default = (props) => (
    <Core {...props} Content={Content} />
);

Default.getInitialProps = async () => ({
    namespacesRequired: ['distributor', 'catalog', 'common', 'order'],
});

export default withApollo({ ssr: true })(withTranslation()(Default));
