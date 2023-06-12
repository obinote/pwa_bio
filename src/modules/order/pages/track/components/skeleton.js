import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from '@core_modules/order/pages/track/style';

const SkeletonLoader = () => {
    const styles = useStyles();
    return (
        <>
            <Skeleton animation="wave" variant="text" width="40%" height={50} />
            <div className={classNames(styles.block, styles.detail)} style={{ height: '50%' }}>
                <Skeleton animation="wave" variant="text" width="30%" height={50} />
                <Skeleton animation="wave" variant="text" width="30%" height={50} />
                <Skeleton animation="wave" variant="text" width="30%" height={50} />
                <Skeleton animation="wave" variant="text" width="30%" height={50} />
                <Skeleton animation="wave" variant="text" width="30%" height={50} />
            </div>
        </>
    );
};

export default SkeletonLoader;
