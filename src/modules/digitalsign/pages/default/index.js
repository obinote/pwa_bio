import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Core from '@core_modules/digitalsign/pages/default/core';
import Content from '@core_modules/digitalsign/pages/default/components';

const Page = (props) => (<Core {...props} Content={Content} />);

Page.getInitialProps = async () => ({
    namespacesRequired: ['digitalsign'],
});

export default withApollo({ ssr: true })(withTranslation()(Page));
