import { withTranslation } from '@i18n';
import { withApollo } from '@lib_apollo';
import Content from '@src_modules/customer/pages/detailRequisition/components';
import Core from '@src_modules/customer/pages/detailRequisition/core';

const Page = (props) => <Core {...props} Content={Content} />;

Page.getInitialProps = async () => ({
    namespacesRequired: ['common', 'customer', 'rewardpoint', 'productreview', 'requisition'],
});

export default withApollo({ ssr: false })(withTranslation()(Page));
