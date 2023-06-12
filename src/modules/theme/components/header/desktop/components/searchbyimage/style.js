import { makeStyles } from '@material-ui/core/styles';
import { ORANGE, GRAY_PRIMARY } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        width: 500,
        maxWidth: '60vw',
        border: '2px dashed #d5eafb',
        padding: '50px 36px',
        margin: 21,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '&.drag': {
            border: `2px dashed ${ORANGE}`,
        },
        [theme.breakpoints.down('xs')]: {
            padding: '20px 18px',
        },
    },
    title: {
        fontSize: 25,
        color: '#404148',
        [theme.breakpoints.down('xs')]: {
            fontSize: 18,
        },
    },
    labelFile: {
        display: 'flex',
    },
    inputFile: {
        display: 'none',
    },
    inputContainer: {
        backgroundColor: '#F2F9FF',
        padding: 8,
        marginTop: 12,
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            marginTop: 10,
        },
    },
    clipIcon: {
        width: 28,
        height: 28,
        marginRight: 4,
    },
    btnFile: {
        color: '#F58732',
        fontSize: 14,
        textTransform: 'none',
        padding: 0,
        marginLeft: 4,
        '&:hover': {
            backgroundColor: 'transparent',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 14,
        },
    },
    btnContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 36,
        '& > button:disabled, & > button[disabled]': {
            backgroundColor: GRAY_PRIMARY,
        },
    },
    btn: {
        textTransform: 'capitalize',
        backgroundColor: '#F58732',
        padding: '6px 30px',
        fontWeight: 400,
        fontSize: 20,
        color: '#fff',
        '&:hover': {
            backgroundColor: '#F58732',
            color: '#fff',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 14,
        },
    },
}));

export default useStyles;
