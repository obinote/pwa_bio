import noReload from '@helper_noreload';
import { useRouter } from 'next/router';
import { setResolver, getResolver } from '@helper_localstorage';
import { getCmsBlocks } from '@core_modules/theme/services/graphql';

const Footer = (props) => {
    const { Content, t, storeConfig } = props;
    const { data, loading, error } = getCmsBlocks({ identifiers: [storeConfig?.pwa?.footer_desktop] }, { skip: !storeConfig });
    const router = useRouter();
    const footerRef = React.useRef();
    const Config = {
        title: data && data.cmsBlocks ? data.cmsBlocks.title : '',
        headerTitle: data && data.cmsBlocks ? data.cmsBlocks.title : '',
        bottomNav: false,
        header: 'relative', // available values: "absolute", "relative", false (default)
    };

    const linkAction = async (type, link) => {
        if (type === 'cms') {
            const urlResolver = getResolver();
            urlResolver[link] = {
                type: 'CMS_PAGE',
            };
            await setResolver(urlResolver);
            router.push(link, link);
        } else {
            router.push(link, link);
        }
    };

    React.useEffect(() => {
        noReload({
            action: linkAction,
        });
    }, [router.asPath]);

    // embed router to CMS blocks
    if (footerRef.current) {
        const findLink = footerRef.current.getElementsByTagName('a');
        Array.from(findLink).forEach((link) => {
            const href = link.getAttribute('href');
            const otherWebsite = href.search('http') === 0;

            // prevent multiple listener
            if (!link.hasAttribute('inject-router')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (!otherWebsite) {
                        linkAction('cms', href);
                        return '';
                    }
                    window.open(href, '_blank');
                    return '';
                });
                link.setAttribute('inject-router', true);
            }
        });
    }

    return <Content data={data} {...Config} t={t} loading={loading} error={error} storeConfig={storeConfig} footerRef={footerRef} />;
};

export default Footer;
