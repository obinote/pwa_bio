import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn } from '@theme_mixins';
import {
    TEXT_SHADE, WHITE, BLUE_GRAY, ORANGE,
} from '@theme_color';

export default makeStyles((theme) => ({
    fullContainer: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: 525,
        [theme.breakpoints.up('sm')]: {
            marginBottom: -50,
        },
    },
    container: {
        maxWidth: 1280,
        marginRight: 'auto',
        marginLeft: 'auto',
        ...FlexColumn,
        padding: '41px 15px 60px 15px',
    },
    pageTitleWrapper: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 30,
        paddingBottom: 20,
        [theme.breakpoints.down('xs')]: {
            marginTop: 20,
            marginBottom: 40,
        },
    },
    pageTitle: {
        fontSize: 50,
        color: TEXT_SHADE,
        lineHeight: 1,
        fontWeight: 600,
        [theme.breakpoints.down('xs')]: {
            fontSize: 30,
        },

    },
    pageTitleInfo: {
        marginTop: 15,
        fontSize: 18,
        color: TEXT_SHADE,
        '&.gift': {
            textTransform: 'uppercase',
        },
    },
    divImg: {
        textAlign: 'center',
    },
    iconImg: {
        cursor: 'pointer',
        '&.imgMove': {
            width: 150,
            animation: '$upDown 3s linear infinite',
        },
        '&.imgShake': {
            width: 150,
            animation: '$shake 0.8s linear infinite',
        },
    },
    '@keyframes upDown': {
        '0%, 100%': {
            transform: 'translateY(-10%)',
        },
        '50%': {
            transform: 'translateY(20px)',
        },
    },
    '@keyframes shake': {
        '0%': { transform: 'translate(2px, 1px) rotate(0deg)' },
        '10%': { transform: 'translate(-1px, -2px) rotate(-2deg)' },
        '20%': { transform: 'translate(-3px, 0px) rotate(3deg)' },
        '30%': { transform: 'translate(0px, 2px) rotate(0deg)' },
        '40%': { transform: 'translate(1px, -1px) rotate(1deg)' },
        '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
        '60%': { transform: 'translate(-3px, 1px) rotate(0deg)' },
        '70%': { transform: 'translate(2px, 1px) rotate(-2deg)' },
        '80%': { transform: 'translate(-1px, -1px) rotate(4deg)' },
        '90%': { transform: 'translate(2px, 2px) rotate(0deg)' },
        '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' },
    },
    divGift: {
        width: '100%',
        maxWidth: 392,
        minHeight: 199,
        margin: 'auto',
        borderRadius: 15,
        padding: '19px 27px',
        backgroundColor: WHITE,
        boxShadow: '0px 0px 6px #00000029',
        '& > span': {
            display: 'inline-block',
            lineHeight: '14px',
            fontSize: 13,
            marginTop: 7,
        },
        '&.gift-point': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '& > h1': {
                display: 'inline-block',
            },
        },
    },
    divPromo: {
        display: 'flex',
        height: 40,
        marginTop: 5,
    },
    box: {
        width: 'calc(100% - 100px)',
        padding: 12,
        fontWeight: 700,
        borderRadius: '5px 0 0 5px',
        border: `1px solid ${BLUE_GRAY}`,
        borderWidth: '1px 0 1px 1px',
    },
    btnOrange: {
        '&.btn-orange': {
            borderRadius: '0 5px 5px 0',
            padding: 12,
            border: `1px solid ${ORANGE}`,
            backgroundColor: ORANGE,
            color: WHITE,
        },
        '&.btn-bottom': {
            margin: 0,
            borderRadius: 25,
            padding: '12px 29px',
        },
    },
    terms: {
        marginTop: 12,
        color: ORANGE,
        fontWeight: 400,
    },
    divBottom: {
        margin: 'auto',
        marginTop: 26,
        textAlign: 'center',
    },
}));
