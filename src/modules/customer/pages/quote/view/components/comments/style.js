import makeStyles from '@material-ui/core/styles/makeStyles';
import { ORANGE, WHITE } from '@theme_color';

export default makeStyles(() => ({
    commentContainer: {
        padding: 24,
        borderBottom: '1px solid #d5eafb',
        '&:last-child': {
            borderBottom: 'none',
        },
        '& span:nth-child(1)': {
            width: 200,
        },
        '& span:nth-child(2)': {
            marginTop: 12,
            height: 28,
        },
        '& span:nth-child(3)': {
            marginTop: 12,
            height: 14,
        },
    },
    loaderContainer: {
        height: 25,
        display: 'flex',
        alignItems: 'center',
    },
    loadPrevious: {
        textDecoration: 'underline',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        whiteSpace: 'normal',
    },
    text: {
        marginTop: 12,
        fontSize: 14,
        whiteSpace: 'normal',
    },
    attachment: {
        marginTop: 12,
        fontSize: 14,
        color: ORANGE,
        background: WHITE,
        padding: 0,
        margin: 0,
        textAlign: 'left',
        textTransform: 'none',
        fontWeight: 400,
        '&:hover': {
            background: WHITE,
        },
        '& span': {
            width: 'auto !important',
        },
    },
}));
