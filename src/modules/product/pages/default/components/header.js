import Header from '@common_headermobile';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    container: {
        zIndex: 6,
    },
});

const CustomHeader = (props) => {
    const styles = useStyles();
    return (
        <Header
            showTopMenu={false}
            isPdp
            className={styles.container}
            {...props}
        />
    );
};

export default CustomHeader;
