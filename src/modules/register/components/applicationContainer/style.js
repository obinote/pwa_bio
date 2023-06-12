import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding, FlexColumn } from '@theme_mixins';

export default makeStyles((theme) => ({
    container: {
        maxWidth: 1280,
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingTop: 64,
        paddingBottom: 64,
        /**
         * for input select only => value in center
         * .MuiInputBase-root line height = 3
        */
        '& .MuiInputBase-root': {
            lineHeight: 3,
            border: '1px solid #d5eafb',
            borderRadius: 5,
        },
        '& .MuiInputBase-input': {
            // border: '1px solid #d5eafb !important',
            padding: '0 9px',
            height: 40,
            fontSize: 14,
        },
        '& .MuiInputLabel-formControl': {
            top: '0',
            left: '0',
            fontSize: '14px',
            color: '#2e2e2e',
            fontWeight: 'bold',
            position: 'relative',
            lineHeight: 1.4,
            // menghilangkan shrink
            transform: 'scale(1)',
        },
        '& .MuiInput-formControl': {
            marginTop: 10,
            // paddingRight: 20,
        },
        '& .MuiFormControl-root': {
            margin: 0,
            [theme.breakpoints.down('xs')]: {
                marginBottom: 10,
            },
        },
        '& .MuiFormHelperText-root.Mui-error': {
            marginTop: 7,
            fontSize: 12,
            fontWeight: 400,
            color: '#e02b27',
        },
        '& .MuiInputLabel-shrink': {
            // menghilangkan shrink
            transform: 'scale(1)',
        },
    },
    formContainer: {
        height: '100%',
        width: '100%',
        ...FlexColumn,
        ...CreatePadding(0, 30, 30, 30),
    },
    pageTitleWrapper: {
        textAlign: 'center',
        marginBottom: 25,
    },
    pageTitle: {
        fontSize: 30,
        color: '#414048',
        // lineHeight: 1.1,
        fontWeight: 400,
    },
    contentContainer: {
        width: '80%',
        margin: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            paddingLeft: 15,
            paddingRight: 15,
        },
    },
    progressContainer: {
        textAlign: 'center',
    },
    progressTitle: {
        fontWeight: 'bold',
        marginBottom: 6,
    },
    progressBar: {
        display: 'inline-block',
        backgroundColor: '#7B9AAF',
        width: '100%',
        position: 'relative',
        marginBottom: 36,
    },
    progressBarStep: {
        backgroundColor: '#EE781B',
        height: 5,
    },
}));
