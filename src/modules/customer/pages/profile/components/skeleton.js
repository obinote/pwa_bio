import Skeleton from '@material-ui/lab/Skeleton';
import classNames from 'classnames';
import useStyles from '@core_modules/customer/pages/profile/components/style';

const ProfilePageSkeleton = () => {
    const styles = useStyles();
    const TextFieldSkeleton = () => (
        <>
            <Skeleton className={classNames(styles.skeleton)} variant="text" width="15%" height={18} animation="wave" />
            <Skeleton className={classNames(styles.skeletonField)} variant="rect" width="50%" height={35} animation="wave" />
        </>
    );
    const CheckboxSkeleton = () => (
        <>
            <Skeleton className={styles.skeletonCheckBox} variant="rect" width="15%" height={18} animation="wave" />
            <Skeleton className={styles.skeletonCheckBox} variant="rect" width="20%" height={18} animation="wave" />
        </>
    );
    return (
        <div className={classNames(styles.skeletonContainer)}>
            <Skeleton className={styles.skeletonField} variant="text" width="20%" height={18} animation="wave" />
            <TextFieldSkeleton />
            <TextFieldSkeleton />
            <TextFieldSkeleton />
            <CheckboxSkeleton />
        </div>
    );
};

export default ProfilePageSkeleton;
