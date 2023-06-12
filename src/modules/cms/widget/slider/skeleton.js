import Skeleton from '@common_skeleton';
import classNames from 'classnames';
import useStyles from './style';

const SkeletonGrid = () => {
    const styles = useStyles();

    return (
        <div className={classNames(styles.skeletonContainer)}>
            <Skeleton className="skeleton-item" variant="rect" width="100%" />
        </div>
    );
};

export default SkeletonGrid;
