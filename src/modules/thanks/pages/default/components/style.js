import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, CenterAbsolute, FlexColumn, CreateMargin, Centering,
} from '@theme_mixins';
import {
    WHITE, GRAY_PRIMARY, ORANGE, TEXT_SHADE, BLACK_DARK,
} from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        ...CreatePadding(70, 70, 30, 70),
        ...FlexColumn,
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: 'url("/assets/img/thanks/background.jpg")',
        [theme.breakpoints.down('xs')]: {
            ...CreatePadding(75, 30, 30, 30),
        },
    },
    iconContainer: {
        width: '65%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        position: 'fixed',
        bottom: 120,
        left: 0,
        ...CenterAbsolute,
    },
    imgIcon: {
        width: 50,
        height: 50,
        overflow: 'hidden',
    },
    title: {
        fontSize: '50px !important',
        marginTop: '20px !important',
        marginBottom: '24px !important',
        marginLeft: '0 !important',
        color: `${TEXT_SHADE} !important`,
        letterSpacing: '0px !important',
        [theme.breakpoints.down('md')]: {
            fontSize: '30px !important',
            marginTop: '24px !important',
            marginLeft: '0px !important',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '15px !important',
            marginBottom: '82px !important',
        },
    },

    info: {
        fontSize: '16px !important',
        fontWeight: '400 !important',
        width: '100% !important',
        ...FlexColumn,
        alignItems: 'center !important',
        justifyContent: 'center !important',
        gap: 9,
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
        },
    },

    infoOrderId: {
        fontSize: '16px !important',
        fontWeight: '400 !important',
        margin: '0 !important',
        padding: '0 !important',
        color: `${TEXT_SHADE} !important`,
        letterSpacing: '0px !important',
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center !important',
        },
    },

    detailInfo: {
        color: `${BLACK_DARK} !important`,
    },

    wrapperBank: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        [theme.breakpoints.down('md')]: {
            ...FlexColumn,
            alignItems: 'center',
            '&> *': {
                textAlign: 'center !important',
            },
        },
        ...CreatePadding(10, 10, 10, 10),
    },

    wrapperRegister: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            ...FlexColumn,
            '&> *': {
                textAlign: 'center !important',
            },
        },
        ...CreatePadding(10, 10, 10, 10),
    },

    bankItem: {
        width: '16vw',
        height: '10vw',
        border: `0.5px solid ${GRAY_PRIMARY}`,
        ...FlexColumn,
        ...Centering,
        fontSize: 12,
        ...CreateMargin(0, 8, 0, 0),
        [theme.breakpoints.down('md')]: {
            ...FlexColumn,
            width: '90%',
            height: '20vw',
            ...CreateMargin(8, 0, 8, 0),
            alignItems: 'center',
            '&> *': {
                textAlign: 'center !important',
            },
        },
    },
    generalButton: {
        marginTop: '20px !important',
        display: 'inline-flex !important',
        '&, &:hover': {
            minWidth: '140px !important',
            background: `${ORANGE} !important`,
        },
        '& .button-label': {
            fontSize: '20px !important',
            fontWeight: '400 !important',
            letterSpacing: '0 !important',
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: 'auto !important',
            paddingLeft: '25px !important',
            paddingRight: '25px !important',
        },
    },
    footer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        left: 0,
        ...Centering,
        ...CreatePadding(20, 60, 30, 60),
        [theme.breakpoints.down('xs')]: {
            ...CreatePadding(20, 0, 30, 0),
        },
    },
    btnConfirm: {
        fontSize: '20px !important',
    },
    txtConfirm: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: 10,
        },
    },
    btnConfirmFirst: {
        marginBottom: '15px !important',
    },
    btnConfirmIcon: {
        fontSize: '12px !important',
        marginLeft: '-5px !important',
    },
    btnAccountIcon: {
        fontSize: '50px !important',
    },
    btnContinue: {
        ...CreateMargin(0, 8, 0, 0),
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: 316,
        },
        height: 41,
        bottom: 0,
        left: 0,
        opacity: 'none',
        ...Centering,
        color: WHITE,
        borderRadius: 100,
    },
    textBtn: {
        color: `${WHITE} !important`,
    },

    payment: {
        textTransform: 'lowercase',
    },
    dateOver: {
        marginTop: 15,
        marginLeft: '0px !important',
        textAlign: 'center',
    },

    footerDesktop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
    },

    link: {
        cursor: 'pointer',
        fontSize: 18,
    },

    baseText: {
        textAlign: 'center !important',
        fontSize: '14px !important',
        fontWeight: '400 !important',
        letterSpacing: '0px !important',
    },

    buttonOrderId: {
        background: 'none !important',
        padding: '0 !important',
        '&:hover': {
            background: 'none !important',
        },
        '& span': {
            fontWeight: 'bold !important',
            color: `${ORANGE} !important`,
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: '-6px !important',
            paddingTop: '0 !important',
        },
    },

    signContainer: {
        marginTop: 25,
        paddingTop: 30,
        paddingBottom: 20,
    },

    // media query
    '@media (max-width: 280px )': {
        container: {
            padding: '20px 20px !important',
        },
        footer: {
            padding: '20px 20px !important',
        },
    },

    '@media (max-width: 320px )': {
        container: {
            padding: '20px 50px',
        },
        footer: {
            ...CreatePadding(20, 60, 20, 60),
        },
        imgIcon: {
            height: 160,
        },
        iconContainer: {
            width: '50%',
            bottom: 100,
        },
    },
    '@media (min-width: 375px )': {
        iconContainer: {
            width: '60%',
        },
    },
    '@media (min-width: 411px )': {
        iconContainer: {
            width: '55%',
        },
    },
}));
