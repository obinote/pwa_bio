import React from 'react';
import useStyles from '@core_modules/catalog/plugins/ProductList/components/ErrorContent/style';
import dynamic from 'next/dynamic';

const WidgetRecommendations = dynamic(() => import('@core_modules/cms/components/cms-renderer/widget-recommendations'), { ssr: false });

const ErrorContent = (props) => {
    const { storeConfig, t } = props;
    const styles = useStyles();

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.grid}>
                    <img className={styles.iconImg} src="/assets/img/icon-no-result.png" alt="" />
                    <div className={styles.info}>
                        <h2>{t('catalog:emptyProductSearchResult')}</h2>
                        <span>{t('catalog:infoResult')}</span>
                    </div>
                </div>
            </div>
            {storeConfig?.environment_id && (
                <WidgetRecommendations storeConfig={storeConfig} pageType="Category" />
            )}
        </>
    );
};

export default ErrorContent;
