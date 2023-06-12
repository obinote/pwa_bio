import makeStyles from '@material-ui/core/styles/makeStyles';

import {
    CreatePadding, FlexColumn, CreateMargin, Centering,
} from '@theme_mixins';
import {
    GRAY_SECONDARY, ORANGE, WHITE, TEXT_SHADE,
} from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        height: '100%',
        width: '100%',
        maxWidth: 1280,
        margin: 'auto',
        ...FlexColumn,
        alignItems: 'center',
        ...CreatePadding(20, 30, 0, 30),
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            minHeight: 'calc(100vh - 70px)',
            ...CreatePadding(0, 30, 0, 30),
        },
        '& .login-container': {
            borderRadius: 25,
            '& .login-title': {
                fontSize: 19,
                color: '#414048',
            },
            '& .login-information': {
                fontSize: 14,
            },
            '& .button-container': {
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0px 10px',
                '& .forgot-password': {
                    color: ORANGE,
                    padding: '10px 0px',
                },
            },
            '& .label': {
                display: 'block',
                fontWeight: 'bold',
                textAlign: 'left',
                marginBottom: 5,
                color: TEXT_SHADE,
                '& span': {
                    textAlign: 'left',
                    color: 'red',
                    fontSize: 12,
                },
            },
            '& .input-container': {
                margin: '8px 0 20px 0',
                '& .input, .input-captcha': {
                    width: '100%',
                    height: 40,
                    padding: '0 10px',
                    borderRadius: 5,
                    border: 'solid #7B9AAF 1px',
                    outline: 'none',
                    background: '#ffffff',
                },
                '& .input-captcha': {
                    margin: '8px 0 10px 0',
                },
                '& .input-password-container': {
                    position: 'relative',
                    '& .password-icon': {
                        position: 'absolute',
                        right: 15,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: GRAY_SECONDARY,
                        cursor: 'pointer',
                    },
                    '& .input-password': {
                        paddingRight: 50,
                    },
                },
                [theme.breakpoints.down('xs')]: {
                    textAlign: 'left',
                },
            },
            '& .captcha-container': {
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                gap: '10px',
                marginBottom: 20,
                width: 'fit-content',
                '& div': {
                    width: 'fit-content',
                },
                '& .captcha': {
                    width: 200,
                    height: 50,
                    background: WHITE,
                },
            },
        },
        '& .register-container': {
            padding: '30px 0px',
            [theme.breakpoints.down('xs')]: {
                padding: '0px',
                marginTop: 20,
                '& *': {
                    textAlign: 'center',
                    justifyContent: 'center',
                },
            },
            '& .register-title': {
                fontSize: 18,
                color: '#414048',
                display: 'inline-block',
                textTransform: 'unset',
                [theme.breakpoints.down('xs')]: {
                    fontSize: 14,
                },
            },
            '& .register-information': {
                padding: 0,
                margin: '0px 0px 25px 0px',
                fontSize: 14,
                fontWeight: 400,
            },
            '& span': {
                fontSize: 18,
                fontWeight: '600',
                [theme.breakpoints.down('xs')]: {
                    fontSize: 14,
                },
            },
        },
    },
    formOtp: {
        [theme.breakpoints.down('xs')]: {
            width: '100vw',
            ...CreatePadding(0, 30, 30, 30),
        },
    },
    desktopContainer: {
        margin: '0 auto 40px',
        maxWidth: 460,
        padding: '0 20px',
        [theme.breakpoints.down('xs')]: {
            ...CreatePadding(15, 0, 0, 0),
        },
    },
    btnLogin: {
        ...CreateMargin(16, 0, 10, 0),
    },
    footer: {
        zIndex: 0,
        width: '100%',
        ...CreatePadding(30, 30, 30, 30),
        ...Centering,
        position: 'absolute',
        bottom: 0,
        textAlign: 'center',
    },
    selectLogin: {
        width: '100%',
        ...CreateMargin(0, 0, 15, -15),
    },
    rowCenter: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
    headerSpan: {
        marginBottom: 20,
        textAlign: 'center',
    },
    spanDivider: {
        height: 120,
    },
    spanLabel: {
        marginBottom: 20,
    },
    generalButton: {
        width: '100%',
        height: 46,
        '&, &:hover': {
            minWidth: 140,
            background: ORANGE,
        },
        '& .button-label': {
            fontSize: 19,
            fontWeight: 400,
            letterSpacing: 0,
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: 'auto',
            paddingLeft: 25,
            paddingRight: 25,
        },
        '& button': {
            fontSize: '20px !important',
            '& span': {
                letterSpacing: '0 !important',
            },
        },
    },
    captchaButton: {
        '&, &:hover': {
            padding: 0,
            minWidth: 140,
            width: 'fit-content',
            background: ORANGE,
        },
        '& .button-label': {
            fontSize: 14,
            fontWeight: 400,
        },
    },
    title: {
        margin: '30px 0 20px',
        fontSize: 50,
        textAlign: 'center',
        textTransform: 'capitalize',
        color: '#414048',
        [theme.breakpoints.down('xs')]: {
            fontSize: 30,
            margin: '10px 0 20px',
        },
    },
    titleInformation: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        margin: '0 0 30px',
        color: TEXT_SHADE,
        [theme.breakpoints.down('xs')]: {
            fontSize: 14,
        },
    },
    recaptchaWrapper: {
        marginBottom: 30,
    },
    recaptchaStyle: {
        '& .rc-anchor-light': {
            border: 'solid #D5EAFB 1px !important',
            borderRadius: 5,
            boxShadow: 'none !important',
        },
        '& > div > div': {
            margin: 'auto',
        },
    },
    linkStyle: {
        color: '#F58732',
        fontSize: 12,
        letterSpacing: 0,
        fontWeight: '400',
        margin: '5px 0 0',
        display: 'inline-block',
        cursor: 'pointer',
    },
    errorLabel: {
        color: '#e02b27',
        fontSize: 12,
        fontWeight: 400,
    },
}));
