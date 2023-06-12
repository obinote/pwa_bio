import useStyle from '@src_modules/customer/pages/quote/print/components/skeleton_style';
import classNames from 'classnames';
import Skeleton from '@common_skeleton';

const Loader = () => {
    const styles = useStyle();

    return (
        <div className={styles.wrapper}>
            <div>
                <div>
                    {/* <Skeleton variant="rect" width={280} height={80} /> */}
                    <Skeleton variant="text" width={200} height={20} />
                    <Skeleton variant="text" width={280} height={20} />
                    <Skeleton variant="text" width={280} height={20} />
                    <Skeleton variant="text" width={280} height={20} />
                </div>
            </div>

            <div className={classNames(styles.tabContainer)}>
                <Skeleton variant="rect" height={400} animation="wave" />
            </div>

            <div className={classNames(styles.shippingContainer)}>
                <div className={classNames(styles.column)}>
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="rect" width="80%" height={120} animation="wave" />
                </div>

                <div className={classNames(styles.column, styles.columnRight)}>
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="rect" width="80%" height={120} animation="wave" />
                </div>
            </div>
        </div>
    );
};

export default Loader;
