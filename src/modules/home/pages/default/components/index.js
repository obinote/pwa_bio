/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */

import dynamic from 'next/dynamic';
import useStyles from '@core_modules/home/pages/default/components/style';
import CmsPage from '@core_modules/cms/pages/default';

const BannerSlider = dynamic(() => import('@core_modules/home/pages/default/components/Banner'));
const FeaturedProducts = dynamic(() => import('@core_modules/home/pages/default/components/FeaturedProducts'));
const CategoryList = dynamic(() => import('@core_modules/home/pages/default/components/CategoryList'));

const Content = (props) => {
    const styles = useStyles();
    let useCmsPage = {};

    const {
        homePageConfig, storeConfig: config, ...other
    } = props;

    let storeConfig = config;

    if (homePageConfig && homePageConfig.storeConfig && homePageConfig.storeConfig.pwa) {
        storeConfig = {
            ...config,
            pwa: {
                ...config.pwa,
                ...homePageConfig.storeConfig.pwa,
            },
        };
        useCmsPage = {
            enable: storeConfig.pwa.use_cms_page_enable,
            identifier: storeConfig.pwa.use_cms_page_identifier,
        };
    }

    const showCmsPage = homePageConfig && useCmsPage && useCmsPage.enable;

    return (
        <div className={styles.container}>
            {showCmsPage ? (
                <CmsPage
                    onlyCms
                    slug={[useCmsPage.identifier]}
                    withLayoutHeader={false}
                    withLayoutFooter={false}
                    withCmsTitle={false}
                    {...other}
                    storeConfig={storeConfig}
                />
            ) : (
                <>
                    <BannerSlider {...other} storeConfig={storeConfig} />
                    <FeaturedProducts {...other} storeConfig={storeConfig} />
                    <CategoryList {...other} storeConfig={storeConfig} />
                </>
            )}
        </div>
    );
};

export default Content;
