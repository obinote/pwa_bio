import Skeleton from '@common_skeleton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import classNames from 'classnames';

// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
    loader: {
        margin: '8px 0px',
    },
}));

const Loader = () => {
    const styles = useStyles();

    return <Skeleton height={97} className={classNames(styles.loader)} />;
};

export default Loader;
