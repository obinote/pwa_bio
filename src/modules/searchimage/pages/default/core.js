import Layout from '@layout';
import { getHost } from '@helper_config';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import getQueryFromPath from '@helper_generatequery';
import Error from '@core_modules/error/pages/default';

const SearchResult = (props) => {
    const router = useRouter();
    const { storeConfig, Content } = props;
    const { query } = getQueryFromPath(router);
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

    const pageConfig = {
        title: 'Search by Image Result',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: 'Search by Image Result',
        bottomNav: 'browse',
        schemaOrg,
    };

    const uuid = query?.uuid ?? null;
    const contentProps = { storeConfig };

    if (!uuid) {
        return <Error statusCode={404} {...contentProps} />;
    }

    return (
        <Layout pageConfig={pageConfig} {...props}>
            <Content {...props} uuid={uuid} />
        </Layout>
    );
};

SearchResult.propTypes = {
    Content: PropTypes.func.isRequired,
};

export default SearchResult;
