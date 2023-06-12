/* eslint-disable no-console */
import React from 'react';
import Typography from '@common_typography';
import Breadcrumb from '@common_breadcrumb';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/searchimage/components/style';
import ErrorContent from '@plugin_productlist/components/ErrorContent';
import { searchByImage } from '@core_modules/searchimage/services/graphql';
import ProductView from '@core_modules/searchimage/components/product_view';

const Index = (props) => {
    const { t, uuid } = props;
    const styles = useStyles();
    const breadcrumbData = [
        {
            label: `${t('common:searchByImage:title')}`,
            link: '/',
            active: true,
            id: 'search-result-id',
        },
    ];
    const [imageSource, setImage] = React.useState('');
    const [items, setItems] = React.useState('');

    const { data, loading, error } = searchByImage({ uuid });

    React.useEffect(async () => {
        if (data) {
            setItems(data.products.items);

            // try to create Blob URL, instead display base64 directly
            try {
                await fetch(data.products.image_search)
                    .then((imgtoblob) => imgtoblob.blob())
                    .then((resultImage) => {
                        setImage(URL.createObjectURL(resultImage));
                    });
            } catch (e) {
                setImage(data.products.image_search);
            }
        }
    }, [data]);

    if (error) {
        window.toastMessage({
            open: true,
            text: error.message,
            variant: 'error',
        });
    }

    return (
        <div className={styles.container}>
            <div>
                <Breadcrumb data={breadcrumbData} />
                <Typography type="bold" variant="h1" className={styles.title}>
                    {t('common:searchByImage:title')}
                </Typography>
            </div>

            {(loading || items.length > 0) && (
                <div className={styles.imageWrapper}>
                    {loading && <Skeleton className={styles.imageInput} variant="rect" animation="wave" />}
                    {!loading && <div className={styles.imageInput} style={{ backgroundImage: `url("${imageSource}")` }} />}
                </div>
            )}

            {(loading || items.length > 0) && <ProductView data={items} loading={loading} />}
            {!loading && items.length === 0 && <ErrorContent {...props} />}
        </div>
    );
};

export default Index;
