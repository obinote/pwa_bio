import classNames from 'classnames';
import TextField from '@common_textfield';
import useStyles from '@core_modules/checkout/pages/default/components/OrderComment/style';
import { useTranslation } from '@i18n';
import { GRAY_LIGHT } from '@theme_color';

const OrderCommentView = (props) => {
    const styles = useStyles();
    const { t } = useTranslation(['checkout']);
    const {
        formik,
    } = props;
    return (
        <>
            <div className={classNames(styles.block, styles.rmBorder, styles.orderCommentStyle)} id="order-comment">
                <TextField
                    name="orderComment"
                    onChange={formik.handleChange}
                    value={formik.values.orderComment}
                    placeholder={t('checkout:orderCommentPlaceholder')}
                    label={t('checkout:orderCommentLabel')}
                    multiline
                    rows="4"
                    disableUnderline
                    style={{
                        margin: '12px 0px',
                        border: `1px solid ${GRAY_LIGHT}`,
                        borderRadius: '5px',
                        height: '100px',
                        padding: '15px',
                        boxSizing: 'border-box',
                    }}
                    error={!!(formik.touched.orderComment && formik.errors.orderComment)}
                    errorMessage={(formik.touched.orderComment && formik.errors.orderComment) || null}
                />
            </div>
        </>
    );
};

export default OrderCommentView;
