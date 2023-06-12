import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import useStyles from '@src_modules/customer/pages/voucher/components/style';
import classNames from 'classnames';

const SkeletonPromotion = () => {
    const SkeletonRect = () => (
        <Skeleton
            variant="rect"
            animation="wave"
        />
    );
    const SkeletonItem = () => (
        <Grid container>
            <SkeletonRect />
        </Grid>
    );

    const styles = useStyles();
    return (
        <div className={classNames(styles.wrapperSkeleton, 'container')}>
            {[0, 1, 2, 3].map((i) => (
                <ListItem key={i}>
                    <SkeletonItem />
                </ListItem>
            ))}
        </div>
    );
};

export default SkeletonPromotion;
