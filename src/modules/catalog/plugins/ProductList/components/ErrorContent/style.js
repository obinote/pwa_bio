import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    BLUE_LIGHT,
} from '@theme_color';

export default makeStyles((theme) => ({
    wrapper: {
        backgroundColor: BLUE_LIGHT,
        margin: '25px 0',
    },
    grid: {
        padding: '35px 50px',
        display: 'grid',
        gridTemplateColumns: '200px auto',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            textAlign: 'center',
        },
    },
    iconImg: {
        width: 163,
        height: 163,
    },
    info: {
        alignSelf: 'center',
        '& h2': {
            marginBottom: 5,
        },
    },
}));
