import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@plugin_minicart/components/style';

const SkeletonCart = () => {
    const styles = useStyles();
    return (
        <ol className={styles.miniCartItemContainer}>
            <li className="item-loading">
                <Skeleton variant="rect" width="100%" height={70} />
            </li>
            <li className="item-loading">
                <Skeleton variant="rect" width="100%" height={70} />
            </li>
            <li className="item-loading">
                <Skeleton variant="rect" width="100%" height={70} />
            </li>
        </ol>
    );
};

export default SkeletonCart;
