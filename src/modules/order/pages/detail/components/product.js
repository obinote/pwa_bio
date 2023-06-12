import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import React from 'react';
import Image from '@common_image';
import useStyles from '@core_modules/order/pages/detail/style';

const ItemProduct = ({
    product_name, quantity_ordered, quantity_refunded, currency, t,
    image_url, storeConfig, product_sale_price, tabName, product_sku,
}) => {
    const styles = useStyles();
    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    let qty = 0;
    if (tabName === 'refund') {
        qty = quantity_refunded;
    } else {
        qty = quantity_ordered;
    }
    return (
        <div className={styles.itemContainer}>
            <div className={styles.productImgContainer}>
                <Image
                    src={image_url}
                    className={styles.productImg}
                    alt={product_name}
                    width={defaultWidth}
                    height={defaultHeight}
                    quality={80}
                />
            </div>
            <div className={styles.detailItem}>
                <Typography variant="label" className="clear-margin-padding">{product_name || ''}</Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:title:sku')}
                    {' '}
                    :
                    {product_sku}
                </Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:title:price')}
                    {' '}
                    :
                    {formatPrice(product_sale_price.value, currency)}
                </Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:title:qty')}
                    {' '}
                    :
                    {qty}
                </Typography>
                <Typography variant="span" className={styles.textDetail}>
                    {t('common:subtotal')}
                    {' '}
                    :
                    {formatPrice(product_sale_price.value * qty, currency)}
                </Typography>
                <div className="flex-grow" />
            </div>
        </div>
    );
};

export default ItemProduct;
