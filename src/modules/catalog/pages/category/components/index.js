/* eslint-disable react/no-danger */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import classNames from 'classnames';
import Typography from '@common_typography';
import Product from '@plugin_productlist';
import { getStoreHost } from '@helpers/config';
import { getAppEnv } from '@root/core/helpers/env';
import useStyles from '@core_modules/catalog/pages/category/components/style';
import dynamic from 'next/dynamic';
import BreadcrumbView from '@common_breadcrumb';
import Countdown from '@core_modules/catalog/pages/category/components/Countdown/Countdown';
import Upcoming from '@core_modules/catalog/pages/category/components/Countdown/Upcoming';

const BannerView = dynamic(() => import('@common_image/LazyImage'), { ssr: false });

// sementara di comment dlu, untuk custom filter memakai aggregations product
// import { getFilter } from '../../../services/graphql';

const categoryTabs = (category) => {
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < category.length; index++) {
        data.push(category[index].name);
    }
    return data;
};

const CategoryPage = ({
    data, storeConfig, t, dataPrivateEvent, ...other
}) => {
    const styles = useStyles();
    // const [value] = React.useState(0);
    const categoryList = data.categoryList[0];
    let dataBanner = [];
    const handleChange = (event, newValue) => {
        Router.push('/[...slug]', `/${categoryList.children[newValue - 1].url_path}`);
    };
    if (categoryList.image_path) {
        dataBanner = [
            {
                imageUrl: categoryList.image_path,
                link: categoryList.url_path,
                description: categoryList.description,
            },
        ];
    }
    // console.log(dataBanner);
    const urlDest = new URL(getStoreHost(getAppEnv()));
    let UrlString = '';
    if (dataBanner.length > 0) {
        if (dataBanner[0].imageUrl.toLowerCase().indexOf(urlDest.hostname) === -1) {
            UrlString = `${urlDest.protocol}//${urlDest.hostname}${dataBanner[0].imageUrl}`;
        } else {
            UrlString = dataBanner[0].imageUrl;
        }
    } else {
        UrlString = '';
    }
    // sementara di comment dlu, untuk custom filter memakai aggregations product
    // const customFilter = getFilter(categoryList.id);
    let breadcrumbsData = [];
    if (categoryList.breadcrumbs && categoryList.breadcrumbs.length > 0) {
        breadcrumbsData = categoryList.breadcrumbs.map((bc) => ({
            label: bc.category_name,
            link: `/${bc.category_url_path}`,
            active: false,
            id: bc.category_id,
        }));
    }
    breadcrumbsData.push({
        label: categoryList.name,
        link: '#',
        active: true,
    });

    const image_product_height = storeConfig?.pwa?.image_product_height;
    const image_product_width = storeConfig?.pwa?.image_product_width;

    // contdown
    const [timerDays, setTimerDays] = useState();
    const [timerHours, setTimerHours] = useState();
    const [timerMinutes, setTimerMinutes] = useState();
    const [timerSeconds, setTimerSeconds] = useState();

    let interval;

    const startTimer = () => {
        if (dataPrivateEvent?.getCategoryPrivateEvent.status === 'open') {
            const endDate = new Date(`${dataPrivateEvent?.getCategoryPrivateEvent?.end_date}+07:00`);
            const endDateUTCTime = new Date(endDate.toUTCString()).getTime();

            interval = setInterval(() => {
                const currentDate = new Date();
                const currentDateUTCTime = new Date(currentDate.toUTCString()).getTime();

                const actualInterval = endDateUTCTime - currentDateUTCTime;
                const days = Math.floor(actualInterval / (24 * 60 * 60 * 1000));
                const hours = Math.floor((actualInterval % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60));
                const minutes = Math.floor((actualInterval % (60 * 60 * 1000)) / (1000 * 60));
                const seconds = Math.floor((actualInterval % (60 * 1000)) / 1000);

                if (actualInterval <= 0) {
                    // Stop Timer
                    clearInterval(interval.current);
                } else {
                    // Update Timer
                    setTimerDays(days);
                    setTimerHours(hours);
                    setTimerMinutes(minutes);
                    setTimerSeconds(seconds);
                }
            });
        }
    };

    useEffect(() => {
        startTimer();
    });
    // ========

    return (
        <>
            <style jsx>
                {`
                    .cms-block-category :global(img) {
                        width: 100%;
                        max-width: 100%;
                    }
                `}
            </style>
            <div className={styles.container}>
                <div className={classNames(styles.breadcrumbs, 'hidden-mobile')}>
                    <BreadcrumbView data={breadcrumbsData} />
                </div>
                <div className={styles.headContainer} style={{ width: '100%', height: 'auto' }}>
                    {dataBanner.length > 0 ? (
                        <BannerView
                            src={UrlString}
                            width={typeof image_product_width === 'string' ? parseInt(image_product_width, 0) : image_product_width}
                            height={typeof image_product_height === 'string' ? parseInt(image_product_height, 0) : image_product_height}
                            showArrow={dataBanner.length > 1}
                            style={{ width: '100%', height: 'auto' }}
                        />
                    ) : null}
                </div>
                <div className={classNames(styles.breadcrumbs, 'hidden-desktop')}>
                    <BreadcrumbView data={breadcrumbsData} />
                </div>
                {dataPrivateEvent?.getCategoryPrivateEvent
                    && (dataPrivateEvent?.getCategoryPrivateEvent.status === 'open'
                        || dataPrivateEvent?.getCategoryPrivateEvent.status === 'upcoming') && (
                        <div className={styles.privateEvent}>
                            {dataPrivateEvent?.getCategoryPrivateEvent?.image_url && dataPrivateEvent?.getCategoryPrivateEvent?.image_url !== '' && (
                                <div className="banner-event">
                                    <img src={dataPrivateEvent?.getCategoryPrivateEvent.image_url} alt="Flash Sale Banner" />
                                </div>
                            )}
                            <div className="wrapper-info">
                                <div className="label">
                                    <div className="icon">
                                        <img src="/assets/img/icon-flashsale.svg" alt="Flash Sale Icon" />
                                    </div>
                                    <div className="caption">{t('catalog:flashSale:caption')}</div>
                                </div>
                                {dataPrivateEvent?.getCategoryPrivateEvent && dataPrivateEvent?.getCategoryPrivateEvent.status === 'open' && (
                                    <Countdown
                                        t={t}
                                        timerDays={timerDays}
                                        timerHours={timerHours}
                                        timerMinutes={timerMinutes}
                                        timerSeconds={timerSeconds}
                                    />
                                )}
                                {dataPrivateEvent?.getCategoryPrivateEvent && dataPrivateEvent?.getCategoryPrivateEvent.status === 'upcoming' && (
                                    <Upcoming t={t} dataPrivateEvent={dataPrivateEvent} />
                                )}
                            </div>
                        </div>
                    )}
                <Typography variant="h1" className={styles.categoryName}>
                    {categoryList.name}
                </Typography>
                {dataBanner[0] && dataBanner[0].description && (
                    /* eslint-disable-next-line react/no-danger */
                    <div className="cms-container" dangerouslySetInnerHTML={{ __html: dataBanner[0].description }} />
                )}
                {categoryList
                    && (categoryList.display_mode === 'PRODUCTS_AND_PAGE' || categoryList.display_mode === 'PAGE')
                    && categoryList.cms_block && (
                        <div className="cms-block-category" dangerouslySetInnerHTML={{ __html: categoryList.cms_block.content }} />
                    )}
                {categoryList
                    && (!categoryList.display_mode || categoryList.display_mode === 'PRODUCTS_AND_PAGE' || categoryList.display_mode === 'PRODUCTS') && (
                        <Product
                            // sementara di comment dlu, untuk custom filter memakai aggregations product
                            // customFilter={customFilter.loading ? [] : customFilter.data.getFilterAttributeOptions.data}
                            catId={categoryList.id}
                            categoryPath={categoryList.url_path}
                            catalog_search_engine={storeConfig.catalog_search_engine}
                            t={t}
                            category={categoryTabs(categoryList.children)}
                            dataTabs={categoryTabs(categoryList.children)}
                            onChangeTabs={handleChange}
                            storeConfig={storeConfig}
                            defaultSort={{ key: 'position', value: 'ASC' }}
                            {...other}
                        />
                    )}
            </div>
        </>
    );
};

export default CategoryPage;
