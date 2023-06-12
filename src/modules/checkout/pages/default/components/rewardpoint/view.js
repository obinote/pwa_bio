import Button from '@common_button';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from '@core_modules/checkout/pages/default/components/style';

const RewardPointView = (props) => {
    const styles = useStyles();
    const {
        checkout, t, handleUsePoint, loading, reward_point, total,
    } = props;
    return (
        <div className={styles.cardPoint} id="checkoutRewardPoint">
            <div className={styles.pointContent}>
                <img
                    src="/assets/img/point.svg"
                    alt="icon"
                />
                <div>
                    <Typography variant="span" letter="capitalize">
                        {checkout.data.cart.applied_reward_points.is_use_reward_points
                            ? `${t('checkout:myPoint:used')} ${t('checkout:myPoint:rewardPoints')}`
                            : t('checkout:myPoint:pointRemaining') }
                    </Typography>
                    <Typography variant="h2" type="bold" className={styles.pointText}>
                        {checkout.data.cart.applied_reward_points.is_use_reward_points
                            ? formatPrice(checkout.data.cart.applied_reward_points.reward_points_amount,
                                checkout.data.cart.prices.grand_total.currency)
                            : `${checkout.data.rewardPoints.balance
                                ? checkout.data.rewardPoints.balance.toLocaleString(undefined, { minimumFractionDigits: 0 }) : 0}
                                ${t('checkout:myPoint:points')}`}
                    </Typography>
                </div>
            </div>
            <div>
                <Button
                    variant="outlined"
                    className={styles.btnPoint}
                    onClick={handleUsePoint}
                    disabled={loading || (!reward_point.is_use_reward_points && total === 0)}
                >
                    <Typography
                        variant="span"
                        type="bold"
                        letter="uppercase"
                        color={loading || (!reward_point.is_use_reward_points && total === 0) ? 'gray' : 'default'}
                    >
                        {reward_point.is_use_reward_points ? t('checkout:myPoint:removeButton') : t('checkout:myPoint:button') }
                    </Typography>
                    {loading && <CircularProgress className={styles.smallCircular} size={16} />}
                </Button>
            </div>
        </div>
    );
};

export default RewardPointView;
