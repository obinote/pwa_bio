import { makeStyles } from '@material-ui/core/styles';
import { BLACK } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    completeApplication: {
        marginBottom: '25px',
        padding: '25px 30px',
        borderRadius: '8px',
        border: '1px solid #e8edf1',
        display: 'flex',
        '& > div:last-child': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            '& p, h2': {
                textAlign: 'center !important',
                lineHeight: 'normal',
            },
            '& > div:last-child': {
                alignItems: 'center',
            },
        },
    },
    docIcon: {
        marginTop: 10,
        marginRight: 40,
        width: 140,
        height: 140,
        backgroundImage: 'url(/assets/img/user_application_danger.svg)',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
            marginRight: 0,
            marginBottom: 10,
            width: 118,
            height: 118,
        },
        '&.review': {
            backgroundImage: 'url(/assets/img/user_application_review.svg)',
        },
    },
    titleWrapper: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    titleApplication: {
        fontSize: 30,
        marginTop: 0,
        marginBottom: 15,
        color: BLACK,
        fontWeight: 'bold',
        display: 'inline-block',
    },
    warningIcon: {
        fontSize: 37,
        color: '#FFD501',
        marginRight: 15,
        '@media (max-width: 767px)': {
            marginRight: 0,
            marginBottom: 10,
        },
    },
    descApplication: {
        maxWidth: '550px',
    },
    actionButton: {
        marginTop: 20,
    },
    buttonApplication: {
        fontSize: '20px',
        fontWeight: '400',
        textDecoration: 'none',
        color: '#fff',
        backgroundColor: '#f58732',
        borderColor: '#f58732',
        height: '50px',
        borderRadius: '25px',
        padding: '0 25px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    commentWrapper: {
        marginTop: 20,
    },
    commentInfo: {
        fontWeight: 'bold',
    },
}));

export default useStyles;
