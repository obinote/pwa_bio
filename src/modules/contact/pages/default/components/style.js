import makeStyles from '@material-ui/core/styles/makeStyles';
import { BLUE_PRIMARY } from '@theme_color';

export default makeStyles((theme) => ({
    pageTitles: {
        marginBottom: '20px',
        textTransform: 'uppercase',
    },
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '1280px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '40px',
    },
    contentWrapperContact: {
        margin: '20px 0',
        padding: '0 60px',
        display: 'flex',
        gap: '40px',
        flexDirection: 'row-reverse',
        backgroundColor: '#FFFFFF !important',
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
        '& .left-side': {
            width: '80%',
            paddingLeft: '40px',
            borderLeft: `solid ${BLUE_PRIMARY} 1px`,
            [theme.breakpoints.down('xs')]: {
                paddingLeft: '0 !important',
                borderLeft: '0 !important',
                borderTop: '1px solid #d5eafb',
                paddingTop: '30px',
                width: '100%',
            },
            '& [data-content-type="row"]': {
                [theme.breakpoints.down('sm')]: {
                    padding: '0 !important',
                },
            },
        },
        '& .right-side': {
            width: '100%',
        },
        '& .medbizcare-logo': {
            maxWidth: '300px',
            marginBottom: '10px',
        },
        '& .social-info': {
            width: '100%',
            borderCollapse: 'collapse',
            borderSpacing: 0,
            maxWidth: '100%',
        },
        '& .social-info tbody tr td:first-child span': {
            width: '20px',
            display: 'inline-block',
            textAlign: 'center',
            marginRight: 5,
            '&:before': {
                fontSize: 16,
            },
            '&.icon-youtube:before': {
                fontSize: 15,
            },
        },
        '& .social-info tbody tr td:first-child': {
            paddingLeft: 0,
            width: '120px',
            fontWeight: 700,
        },
        '& .social-info tbody tr td': {
            padding: 8,
        },
        '& .social-info tbody tr td:last-child:before': {
            display: 'inline',
            content: ':',
            marginRight: '10px',
        },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse !important',
        },
    },
    containerForm: {
        '& .input-container': {
            margin: '8px 0 20px 0',
            '& .input': {
                width: '100%',
                height: 40,
                padding: '10px',
                borderRadius: 5,
                border: `solid ${BLUE_PRIMARY} 1px`,
                outline: 'none',
            },
            '& .textarea': {
                height: 'unset',
            },
        },
        '& .label': {
            display: 'block',
            fontWeight: 'bold',
            textAlign: 'left',
            marginBottom: 7,
            '& span': {
                textAlign: 'left',
                color: 'red',
                fontSize: 12,
            },
        },
    },
    buttonSubmit: {
        padding: '8px 61px!important',
        borderRadius: '25px!important',
        border: 0,
        fontSize: '20px !important',
        fontWeight: 'normal',
        background: '#f58732!important',
        '& .MuiButton-label': {
            textTransform: 'capitalize',
        },
    },
    note: {
        marginBottom: '30px!important',
        fontSize: '18px!important',
    },
    fullName: {
        border: '1px solid #d5eafb',
        minHeight: '40px',
    },
    btnSubmit: {
        marginTop: 50,
        textAlign: 'left',
    },
    message: {
        marginBottom: 30,
    },
    skeletonForm: {
        marginBottom: 20,
    },
    success: {
        margin: '0 0 10px',
        padding: '12px 20px 12px 25px',
        display: 'block',
        fontSize: '14px',
        background: '#e5efe5',
        color: '#006400',
        paddingLeft: '45px',
        position: 'relative',
        '&:first-child:before': {
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
            fontSize: '24px',
            lineHeight: '24px',
            color: '#006400',
            content: '\\e60e',
            fontFamily: 'luma-icons',
            margin: '-12px 0 0',
            verticalAlign: 'middle',
            display: 'inline-block',
            fontWeight: 'normal',
            overflow: 'hidden',
            speak: 'none',
            left: 0,
            top: '22px',
            width: '45px',
            position: 'absolute',
            textAlign: 'center',
        },
    },
    error: {
        margin: '0 0 10px',
        padding: '12px 20px 12px 25px',
        display: 'block',
        fontSize: '14px',
        background: '#fae5e5',
        color: '#e02b27',
        paddingLeft: '45px',
        position: 'relative',
        '&:first-child:before': {
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
            fontSize: '24px',
            lineHeight: '24px',
            color: '#b30000',
            content: '\\e61f',
            fontFamily: 'luma-icons',
            margin: '-12px 0 0',
            verticalAlign: 'middle',
            display: 'inline-block',
            fontWeight: 'normal',
            overflow: 'hidden',
            speak: 'none',
            left: 0,
            top: '22px',
            width: '45px',
            position: 'absolute',
            textAlign: 'center',
        },
    },
    recaptchaWrapper: {
        marginBottom: 20,
    },
    recaptchaStyle: {
        '& .rc-anchor-light': {
            border: 'solid #D5EAFB 1px !important',
            borderRadius: 5,
            boxShadow: 'none !important',
        },
        '& > div > div': {
            // margin: 'auto',
        },
    },
    autoComplete: {
        height: 'auto !important',
        '& .MuiInputBase-root': {
            padding: 0,
            fontSize: '0.875rem',
        },
    },
}));
