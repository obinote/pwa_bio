/* eslint-disable space-infix-ops */
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '@core_modules/customer/plugins/ChatContent/components//Preview/style';
import Link from 'next/link';
import { formatPrice } from '@helper_currency';

const Order = ({ data, textOrder }) => {
    const styles = useStyles();
    return (
        <div className={styles.previewOrderContainer}>
            <div className={styles.order}>
                <Link href={`/sales/order/view/order_id/${data.order_number}`}>
                    {`Pesanan # ${data.order_number}`}
                </Link>
                {data.total
                    ? (
                        <div className="total-order">
                            Total Pesanan:
                            {' '}
                            {formatPrice(data.total, data.currency)}
                        </div>
                    ): null}
            </div>
            <div className={styles.textOrder}>{textOrder}</div>
        </div>
        
    );
};

Order.propType = {
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.object.isRequired,
};

export default Order;
