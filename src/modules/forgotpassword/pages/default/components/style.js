import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, CreateMargin } from '@theme_mixins';

export default makeStyles((theme) => ({
    container: {
        maxWidth: 1280,
        marginRight: 'auto',
        marginLeft: 'auto',
        ...FlexColumn,
        paddingLeft: 15,
        paddingRight: 15,
        '& .MuiInputBase-input': {
            padding: '0 9px !important',
            height: '40px !important',
            fontSize: '14px !important',
        },
        '& .MuiInputLabel-formControl': {
            top: '0 !important',
            left: '0 !important',
            fontSize: '18px !important',
            color: '#2e2e2e !important',
            fontWeight: 'bold !important',
            position: 'relative',
            textAlign: 'left',
        },
        '& .MuiInput-formControl': {
            marginTop: 10,
            border: '1px solid #d5eafb !important',
            borderRadius: '5px !important',
        },
        '& .MuiSvgIcon-root': {
            fill: '#7B9AAF',
        },
        '& .MuiFormControl-root': {
            marginTop: 0,
        },
    },
    pageTitleWrapper: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 30,
        paddingBottom: 20,
        [theme.breakpoints.down('xs')]: {
            marginTop: 25,
            marginBottom: 40,
        },
    },
    pageTitle: {
        fontSize: 60,
        color: '#414048',
        lineHeight: '24px',
        fontWeight: 600,
        [theme.breakpoints.down('xs')]: {
            fontSize: 30,
        },

    },
    pageMessageWrapper: {
        display: 'flex',
        margin: '0 0 10px',
        padding: '12px 20px 12px 10px',
        background: '#fae5e5',
        color: '#e02b27',
        position: 'relative',
    },
    pageMessage: {
        fontSize: 13,
        color: '#414048',
        lineHeight: 2,
        marginLeft: 7,
    },
    formContainer: {
        ...FlexColumn,
    },
    fieldset: {
        marginBottom: 40,
    },
    fieldNote: {
        fontSize: 14,
        color: '#414048',
        fontWeight: 400,
        margin: '0 0 20px',
    },
    btn: {
        background: '#f58732',
        border: '#f58732',
        borderRadius: 25,
        padding: '11px 26px',
        cursor: 'pointer',
    },
    btnLabel: {
        fontSize: 20,
        fontWeight: 400,
        color: '#FFFFFF',
        lineHeight: '16px',
        [theme.breakpoints.down('xs')]: {
            fontSize: 14,
        },
    },
    errorHelperText: {
        color: '#e02b27',
        fontSize: 12,
        fontWeight: 400,
    },
    email: {
        ...CreateMargin(15, 5, 15, 5),
    },
    switch: {
        ...CreateMargin(0, 0, 30, -10),
    },
}));
