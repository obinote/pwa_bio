/* eslint-disable space-infix-ops */
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '@core_modules/customer/plugins/ChatContent/components//Preview/style';
import { formatPrice } from '@helper_currency';
import Link from 'next/link';

const Product = ({ data }) => {
    const styles = useStyles();
    return (
        <div className={styles.previewContainer}>
            <div className="product-image">
                <img src={data.image} alt={data.title} />
            </div>
            <div className="product-info">
                <Link href={`/${data.url_key}`} className={styles.title}>{data.name}</Link>
                {data.price
                    ? <div className="price">{formatPrice(data.price, 'IDR')}</div>: null}
            </div>
        </div>
    );
};

Product.propType = {
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.object.isRequired,
};

export default Product;
