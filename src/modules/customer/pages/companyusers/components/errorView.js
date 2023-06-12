import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@common_typography';
import { ORANGE_LIGHT } from '@theme_color';

const useStyles = makeStyles(() => ({
    boxContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: ORANGE_LIGHT,
        marginBottom: '16px',
        marginTop: '24px',
        padding: '20px 24px 20px 24px',
        alignItems: 'center',
    },
    boxImage: {
        width: '106px',
        height: '100%',
        marginRight: '20px',
    },
    image: {
        width: '100%',
    },
    title: {
        fontSize: '18px',
        fontWeight: '600',
    },
}));

const ShowError = (props) => {
    const { error } = props;
    const styles = useStyles();

    return (
        <div className={styles.boxContainer}>
            <div className={styles.boxImage}>
                <img src="/assets/img/user_application_danger.svg" alt="error" className={styles.image} />
            </div>
            <div>
                <Typography variant="title2" className={styles.title}>
                    {error.message}
                </Typography>
            </div>
        </div>
    );
};

export default ShowError;
