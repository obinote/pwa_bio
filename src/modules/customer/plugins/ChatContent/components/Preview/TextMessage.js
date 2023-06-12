/* eslint-disable space-infix-ops */
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '@core_modules/customer/plugins/ChatContent/components//Preview/style';
import { formatPrice } from '@helper_currency';

const TextMessage = ({ data, textOrder }) => {
    const styles = useStyles();
    return (
        <div className={styles.previewOrderContainer}>
            <p>{`Pesanan # ${data.order_number}`}</p>
            {data.total
                ? (
                    <div className="total-order">
                        Total Pesanan:
                        {' '}
                        {formatPrice(data.total, data.currency)}
                    </div>
                ): null}
            <p>{textOrder}</p>
        </div>
    );
};

TextMessage.propType = {
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.object.isRequired,
};

export default TextMessage;
