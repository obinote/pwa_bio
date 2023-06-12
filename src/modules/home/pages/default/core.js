import Layout from '@layout';
import { getHost } from '@helper_config';
import Content from '@core_modules/home/pages/default/components';
import Intro from '@core_modules/customer/plugins/Guide';

const HomeCore = (props) => {
    const {
        pageConfig, storeConfig, isLogin, ...other
    } = props;

    const schemaOrg = [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            url: `${getHost()}/`,
            logo: `${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`,
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            url: `${getHost()}/`,
            potentialAction: [
                {
                    '@type': 'SearchAction',
                    target: `${getHost()}/catalogsearch/result?q={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                },
            ],
        },
    ];

    const config = {
        title: storeConfig.default_title,
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: 'home',
        pageType: 'home',
        schemaOrg,
        ...pageConfig,
    };

    return (
        <Layout {...props} pageConfig={config}>
            {/* <Steps
                enabled={stepEnabled}
                steps={steps}
                initialStep={0}
                onExit={(e) => { console.log(e); }}
            /> */}
            <Intro page={`homepage${isLogin ? '_login' : ''}`} />
            <Content storeConfig={storeConfig} homePageConfig={{ storeConfig }} {...other} />
        </Layout>
    );
};

export default HomeCore;
