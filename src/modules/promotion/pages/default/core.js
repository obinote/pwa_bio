import Layout from '@layout';
import { getCustomerPromotionList } from '@core_modules/promotion/services/graphql';
import { useEffect } from 'react';
import { getLoginInfo } from '@helper_auth';

const PromotionList = (props) => {
    const {
        t, Content, pageConfig,
    } = props;
    const config = {
        title: t('promotion:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('promotion:pageTitle'),
        bottomNav: false,
    };
    // const { loading, data, error } = getCustomerPromotionList();
    const isLogin = getLoginInfo();
    const [getPromotion, { data, loading }] = getCustomerPromotionList();
    useEffect(() => {
        if (isLogin) {
            getPromotion();
        }
    }, []);

    const localDateString = (stringTime) => new Date(stringTime).toLocaleDateString(
        {},
        {
            year: 'numeric', month: 'long', day: 'numeric',
        },
    );

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content
                t={t}
                data={data}
                localDateString={localDateString}
                // handleItemClick={handleItemClick}
                loading={loading}
            />
        </Layout>
    );
};

export default PromotionList;
