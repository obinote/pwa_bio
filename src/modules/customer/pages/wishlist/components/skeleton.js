import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/customer/pages/wishlist/components/style';
import Grid from '@material-ui/core/Grid';

const SkeletonLoader = () => {
    const styles = useStyles();
    const ItemSkeleton = () => (
        <div className={styles.itemContainer} style={{ padding: 10 }}>
            <Skeleton variant="rect" width="100%" height={225} />
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="100%" />
        </div>
    );
    return (
        <>
            <Grid container>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
                        <Grid key={el} item xs={6} sm={4} md={3}>
                            <ItemSkeleton />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
};

export default SkeletonLoader;
