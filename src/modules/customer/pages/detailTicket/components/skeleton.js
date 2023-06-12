import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@src_modules/customer/pages/detailTicket/components/style';
import classNames from 'classnames';

const SkeletonPromotion = () => {
    const styles = useStyles();
    return (
        <div className={classNames(styles.wrapperSkeleton, 'container')}>
            <Skeleton style={{ marginBottom: 10 }} variant="rect" width="80%" height={35} animation="wave" />
            <Skeleton style={{ marginBottom: 20 }} variant="text" width="60%" height={20} animation="wave" />
            <Skeleton style={{ marginBottom: 8 }} variant="rect" width="100%" height={100} animation="wave" />
            <Skeleton style={{ marginBottom: 20 }} variant="rect" width="100%" height={300} animation="wave" />
            <Skeleton variant="rect" width="100%" height={150} animation="wave" />

        </div>
    );
};

export default SkeletonPromotion;
