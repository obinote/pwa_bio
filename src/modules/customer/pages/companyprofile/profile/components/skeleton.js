import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@core_modules/customer/pages/companyprofile/profile/components/style';

const SkeletonLoader = () => {
    const styles = useStyles();
    return (
        <>
            <div className={styles.container}>
                <div className={styles.profileHeaderContainer}>
                    <Skeleton className={styles.skeletonImg} animation="wave" variant="rect" />
                    <div className={styles.profileCompany}>
                        <Skeleton animation="wave" variant="text" width="80%" height={80} style={{ marginTop: -20 }} />
                        <Skeleton animation="wave" variant="text" width="60%" height={80} />
                    </div>
                </div>
                <div className={styles.profileInformationColumns} style={{ gap: 20 }}>
                    <Skeleton animation="wave" variant="rect" width="60%" height={249} />
                    <Skeleton animation="wave" variant="rect" width="60%" height={249} />
                    <Skeleton animation="wave" variant="rect" width="60%" height={249} />
                </div>
            </div>
            <div className={styles.titleDataPerusahaan}>
                <Skeleton animation="wave" variant="text" width="30%" height={60} />
            </div>
            <div className={styles.wrapperDetail}>
                <div className={styles.titleDetail}>
                    <Skeleton animation="wave" variant="text" width="30%" height={50} />
                </div>
                <div className={styles.wrapperContentDetail}>
                    <Skeleton animation="wave" variant="text" width="60%" height={50} />
                </div>
            </div>
            <div className={styles.wrapperDetail}>
                <div className={styles.titleDetail}>
                    <Skeleton animation="wave" variant="text" width="40%" height={50} />
                </div>
                <div className={styles.wrapperContentDetail}>
                    <Skeleton animation="wave" variant="rect" width="60%" height={300} />
                </div>
            </div>
            <div className={styles.wrapperDetail}>
                <div className={styles.titleDetail}>
                    <Skeleton animation="wave" variant="text" width="40%" height={50} />
                </div>
                <div className={styles.wrapperContentDetail}>
                    <Skeleton animation="wave" variant="rect" width="60%" height={400} />
                </div>
            </div>
            <div className={styles.wrapperDetail}>
                <div className={styles.titleDetail}>
                    <Skeleton animation="wave" variant="text" width="40%" height={50} />
                </div>
                <div className={styles.wrapperContentDetail}>
                    <Skeleton animation="wave" variant="rect" width="60%" height={200} />
                </div>
            </div>
            <div className={styles.wrapperDetail}>
                <div className={styles.titleDetail}>
                    <Skeleton animation="wave" variant="text" width="40%" height={50} />
                </div>
                <div className={styles.wrapperContentDetail}>
                    <Skeleton animation="wave" variant="rect" width="60%" height={100} />
                </div>
            </div>
        </>
    );
};

export default SkeletonLoader;
