import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/cart/pages/default/components/style';

const SkeletonCart = () => {
    const styles = useStyles();
    return (
        <ol className={styles.miniCartItemContainer}>
            <li className="item-loading">
                <Skeleton variant="rect" width="900px" height={40} />
            </li>
            <li className="item-loading">
                <Skeleton variant="rounded" width="900px" height={270} />
            </li>
        </ol>
    );
};

export default SkeletonCart;
