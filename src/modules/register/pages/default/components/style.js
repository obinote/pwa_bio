import makeStyles from '@material-ui/core/styles/makeStyles';

import {
    FlexColumn, CreateMargin, CenterAbsolute, FlexRow,
} from '@theme_mixins';
import {
    GRAY_PRIMARY, RED, GREEN, ORANGE,
} from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        maxWidth: 680,
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: '0 10px',
        /**
         * for input select only => value in center
         * .MuiInputBase-root line height = 3
         */
        '& .MuiInputBase-root': {
            border: '1px solid #7B9AAF !important',
            borderRadius: '5px !important',
            lineHeight: '3 !important',
        },
        '& .MuiInputBase-input': {
            borderRadius: '5px !important',
            padding: '0 9px !important',
            height: '40px !important',
            fontSize: '14px !important',
        },
        '& .MuiInputLabel-formControl': {
            top: '0 !important',
            left: '0 !important',
            fontSize: '14px !important',
            color: '#2e2e2e !important',
            fontWeight: 'bold !important',
            position: 'relative',
            lineHeight: 1.4,
            // menghilangkan shrink
            transform: 'scale(1)',
        },
        '& .MuiInput-formControl': {
            marginTop: 5,
            // paddingRight: 20,
        },
        // autocomplete
        '& .MuiAutocomplete-inputRoot': {
            padding: 0,
        },
        // for x icon on autocomplete
        '& .MuiAutocomplete-endAdornment': {
            top: 'auto',
        },
        // autocomplete required
        '& .MuiInputLabel-asterisk': {
            color: RED,
        },
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            marginBottom: 80,
        },
    },
    formContainer: {
        height: '100%',
        width: '100%',
        ...FlexColumn,
    },
    pageTitleWrapper: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 30,
        padding: '40px 0 20px',
        borderBottom: '1px solid #ededed',
        [theme.breakpoints.down('xs')]: {
            marginTop: 15,
            marginBottom: 10,
            padding: '10px 0 10px',
        },
    },
    headerSpan: {
        margin: '15px 0',
        '& span': {
            fontSize: 18,
            fontWeight: '600',
            margin: 0,
            letterSpacing: 0,
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
        [theme.breakpoints.down('xs')]: {
            margin: '5px 0 10px',
        },
    },
    pageTitle: {
        fontSize: 50,
        color: '#414048',
        lineHeight: 1.1,
        fontWeight: '600',
        [theme.breakpoints.down('xs')]: {
            fontSize: 30,
        },
    },
    fieldset: {
        border: 0,
        margin: '0 0 40px',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            padding: '0 15px',
            margin: '10px 0 40px',
        },
    },
    companyInfo: {
        borderBottom: '1px solid #ededed',
        marginBottom: 20,
        paddingBottom: 20,
    },
    companyAddress: {
        borderBottom: '1px solid #ededed',
        marginBottom: 20,
        paddingBottom: 20,
    },
    companyAdmin: {
        borderBottom: '1px solid #ededed',
        marginBottom: 20,
        paddingBottom: 20,
    },
    companyTitle: {
        width: '100%',
        display: 'inline-block',
        verticalAlign: 'top',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            display: 'block',
        },
    },
    companyLabelWrapper: {
        paddingBottom: 15,
    },
    companyTitleLabel: {
        fontSize: 18,
        color: '#2e2e2e',
        fontWeight: 600,
    },
    companyContent: {
        width: '100%',
        display: 'inline-block',
        '& .MuiFormControl-root': {
            margin: 0,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            display: 'block',
        },
    },
    fullContent: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            display: 'block',
            paddingRight: 0,
        },
    },
    halfContent: {
        width: '50%',
        display: 'inline-block',
        paddingRight: 10,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            display: 'block',
            paddingRight: 0,
        },
        [theme.breakpoints.up('sm')]: {
            '&:nth-child(-2n+6):nth-child(n+2)': {
                paddingLeft: 10,
                paddingRight: 0,
            },
        },
    },
    otpSent: {
        fontSize: 14,
        fontWeight: 400,
        color: 'rgb(170, 170, 170)',
        padding: 5,
    },
    otpInfo: {
        fontSize: 14,
        fontWeight: 400,
        color: '#7b9aaf',
    },
    btnOtpWrapper: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        marginBottom: 20,
    },
    requiredField: {
        fontSize: 12,
        color: RED,
        fontWeight: 400,
        marginTop: 20,
        marginBottom: 30,
    },
    btn: {
        padding: '0 20px',
        backgroundColor: '#f58732',
        borderRadius: 10,
        display: 'block',
        width: '100%',
        height: 46,
        '&:hover': {
            backgroundColor: '#f58732 !important',
            '& span span': {
                color: '#FFFFFF !important',
            },
        },
        '& span span': {
            letterSpacing: 0,
            fontSize: 20,
            fontWeight: '400',
            color: '#FFFFFF',
        },
    },
    btnOtp: {
        textTransform: 'uppercase',
    },
    btnSigninWrapper: {
        ...CreateMargin(0, 0, 0, 0),
        [theme.breakpoints.down('xs')]: {
            padding: '20px 0',
        },
    },

    footer: {
        ...CreateMargin(0, 0, 0, 0),
        ...FlexColumn,
        width: '100%',
        height: 'auto',
        [theme.breakpoints.down('xs')]: {
            padding: '0 15px',
        },
    },

    passwordStrength: {
        background: GRAY_PRIMARY,
        width: '100%',
        height: 30,
        ...FlexRow,
    },
    passwdStrPrgsCtr: {
        background: 'transparent',
        height: 30,
    },
    zero: {
        width: 0,
    },
    per3: {
        width: '30%',
    },
    half: {
        width: '50%',
    },
    per7: {
        width: '75%',
    },
    full: {
        width: '100%',
    },
    passwdStrPrgsBar: {
        height: 30,
        background: GREEN,
        opacity: 0.4,
    },
    per3Bar: {
        width: '30%',
        background: RED,
        opacity: 0.3,
    },
    halfBar: {
        background: ORANGE,
        width: '50%',
        opacity: 0.5,
    },
    txtPasswdStr: {
        position: 'absolute',
        width: '100%',
        ...CenterAbsolute,
    },
    checkWa: {
        ...CreateMargin(0, 0, -10, -10),
    },
    checkTos: {
        ...CreateMargin(0, 0, 0, -10),
    },
    tos: {
        ...FlexRow,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        '& p': {
            width: 80,
        },
    },
    subscribe: {
        marginBottom: 25,
    },
    referralInfo: {
        '& > div': {
            background: '#E7F3FF',
            border: '1px solid #D5EAFB',
            borderRadius: 8,
            padding: '15px 20px 20px',
        },
        '& *': {
            margin: 0,
        },
        '& input': {
            background: '#ffffff',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0 15px',
            marginBottom: 10,
        },
    },
    selectField: {
        marginBottom: 10,
    },
    linkStyle: {
        color: '#F58732',
        cursor: 'pointer',
    },
    labelStyle: {
        color: '#F58732',
    },
    otpStyle: {
        '& span': {
            color: '#414048',
            fontSize: 14,
            letterSpacing: 0,
            fontWeight: '400',
            margin: 0,
        },
        '& button': {
            display: 'inline-block',
            width: 'auto',
            padding: '0px 5px',
            height: 'auto',
            background: 'transparent !important',
            '& span': {
                lineHeight: 'normal',
                fontSize: 14,
                color: '#F58732',
                fontWeight: '600',
                minWidth: 0,
                minHeight: 0,
            },
            '&.Mui-disabled': {
                '& span': {
                    color: '#7B9AAF',
                    opacity: '0.8',
                },
            },
        },
        '&.showButton': {
            paddingTop: 10,
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
    errorCaptcha: {
        color: '#e02b27',
        fontSize: 12,
        fontWeight: 400,
    },
}));
