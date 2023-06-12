import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding } from '@theme_mixins';
import { GRAY_PRIMARY } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    cookieRestriction: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#ffee9c',
        zIndex: 1500,
        ...CreatePadding(5, 15, 8, 18),
        color: '#303030',
    },
    recentView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        position: 'fixed',
        left: 20,
        bottom: 0,
        zIndex: 1400,
        backgroundColor: 'white',
        width: '15vw',
        height: '5vh',
        boxShadow: 'none',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            bottom: '0vh',
            width: '25vw',
            [theme.breakpoints.down('xs')]: {
                transform: 'rotate(90deg)',
                left: '-19vw',
                bottom: '30vh',
                width: '45vw',
            },
        },
        '&:hover': {
            backgroundColor: GRAY_PRIMARY,
        },
    },
    recentlyBtnContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        position: 'fixed',
        width: '15vw',
        height: '5vh',
        bottom: '345px',
        backgroundColor: 'white',
        left: 20,
        boxShadow: 'none',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        [theme.breakpoints.down('md')]: {
            width: '25vw',
            left: 40,
            [theme.breakpoints.down('sm')]: {
                width: '45vw',
                left: 20,
                bottom: '338px',
            },
        },
        '&:hover': {
            backgroundColor: GRAY_PRIMARY,
        },
    },
    recentlyWrapperContent: {
        position: 'relative',
        height: '350px',
        paddingTop: '5px',
        paddingBottom: '5px',
        overflowY: 'hidden',
        '& .button-title': {
            fontSize: 12,
            color: 'black',
            textTransform: 'uppercase',
        },
    },
    contentFeatured: {
        display: 'flex',
        transition: '0.3s',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            padding: 8,
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    itemProduct: {
        width: '180px',
        [theme.breakpoints.down('sm')]: {
            width: '200px',
        },
    },
    navOpen: {
        [theme.breakpoints.down('xs')]: {
            left: 'calc(100% - 54px)',
            transition: 'left .3s',
            position: 'relative',
            '-webkit-transition': 'left .3s',
            '-moz-transition': 'left .3s',
            '-ms-transition': 'left .3s',
            '& .nav-section': {
                '-webkit-box-shadow': '0 0 5px 0 rgb(50 50 50 / 75%)',
                '-moz-box-shadow': '0 0 5px 0 rgba(50,50,50,.75)',
                '-ms-box-shadow': '0 0 5px 0 rgba(50,50,50,.75)',
                boxShadow: '0 0 5px 0 rgb(50 50 50 / 75%)',
                left: 0,
                zIndex: 99,
            },
        },
    },
    navSection: {
        '-webkit-overflow-scrolling': 'touch',
        '-webkit-transition': 'left .3s',
        '-moz-transition': 'left .3s',
        '-ms-transition': 'left .3s',
        transition: 'left .3s',
        height: '100%',
        left: 'calc(-1*(100% - 54px))',
        overflow: 'auto',
        position: 'fixed',
        top: 0,
        width: 'calc(100% - 54px)',
    },
    homePage: {
        '& #html-body > div': {
            margin: 'auto',
            maxWidth: '1280px',
        },
        '& #html-body > .section-shop-by': {
            maxWidth: 'none',
            [theme.breakpoints.down('xs')]: {
                padding: '20px !important',
            },
        },
        [theme.breakpoints.down('md')]: {
            '& #html-body > div': {
                padding: '0 20px 20px',
            },
        },
        [theme.breakpoints.up('sm')]: {
            paddingBottom: 50,
        },
        [theme.breakpoints.down('sm')]: {
            '& #popup-mobile__install': {
                display: 'none',
            },
            '& main': {
                paddingTop: 0,
            },
        },
        '& .chat-plugin': {
            display: 'none',
        },
    },
    scrollToTop: {
        display: 'none',
    },
    chatPlugin: {
        position: 'fixed',
        right: 80,
        bottom: 14,
        zIndex: theme.zIndex.drawer + 3,
        [theme.breakpoints.down('md')]: {
            right: 16,
            bottom: 110,
        },
    },
    buttonChat: {
        background: '#06AEC9',
        color: 'white',
        width: 'auto',
        border: 'none',
        padding: '0 20px',
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        height: 45,
        boxShadow: '0 3px 6px rgb(0,0,0,0.2)',
        cursor: 'pointer',
        '&:hover': {
            background: '#06AEC9',
        },
        '& p': {
            marginLeft: 5,
            fontSize: 16,
        },
        '&:before': {
            content: '""',
            display: 'inline',
            width: 22,
            height: 22,
            backgroundImage: 'url(/assets/img/customer-service.svg)',
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            marginRight: 3,
            [theme.breakpoints.down('xs')]: {
                marginRight: 0,
            },
        },
        [theme.breakpoints.down('xs')]: {
            height: 48,
            width: 48,
            display: 'flex',
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    chatIcon: {
        fontSize: '20px',
    },
    mainContainer: {
        '@media (max-width: 767px)': {
            paddingTop: 60,
        },
    },
    popUpSpace: {
        [theme.breakpoints.down('sm')]: {
            paddingTop: 130,
        },
    },
    headerMobile: {
        [theme.breakpoints.down('sm')]: {
            position: 'sticky',
            top: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            zIndex: 82,
        },
    },
}));
export default useStyles;
