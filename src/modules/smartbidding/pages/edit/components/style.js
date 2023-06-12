import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn } from '@theme_mixins';

export default makeStyles((theme) => ({
    formContainer: {
        ...FlexColumn,
        marginTop: '34px',
        width: '100%',
        '& .attachmentDiv': {
            height: '40px',
            background: '#F2F9FF 0% 0% no-repeat padding-box',
            borderRadius: '5px',
            opacity: '1',
            paddingBottom: '12px',
            paddingTop: '12px',
            paddingLeft: '14px',
            paddingRight: '14px',
            marginBottom: '8px',
            '& .dropzoneDiv': {
                display: 'inline-flex',
            },
            '& .dropzone': {
                width: '100%',
                display: 'inline-flex',
            },
            '& .icon-delete': {
                marginLeft: '10px',
            },
        },
    },
    detailsContainer: {
        ...FlexColumn,
        display: 'flex',
        marginTop: '24px',
        '& .divData': {
            display: 'flex',
            flexDirection: 'row',
        },
    },
    field: {
        marginBottom: '16px',
        '& .required': {
            color: '#E02B27',
            marginLeft: 2,
            display: 'inline-block',
        },
        '& .inputName': {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            '& input': {
                padding: '6px 5px 6px',
                height: '25px',
                border: '1px solid #7B9AAF',
                borderRadius: '5px',
                opacity: '1',
            },
        },
        '& .deskripsi': {
            '& textarea': {
                height: '162px!important',
                border: '1px solid #7B9AAF',
                borderRadius: '5px',
                opacity: '1',
                padding: '6px 5px 6px',
            },
        },
        '& .attachment': {
            color: '#F58732',
            fontWeight: '500',
        },
        '& .attachmentInfo': {
            color: '#7B9AAF',
            font: 'normal normal normal 12px/14px Roboto',
        },
        '& .dueDate': {
            background: '#FFFFFF 0% 0% no-repeat padding-box',
            marginLeft: '5px',
            '& input': {
                padding: '6px 5px 7px',
                display: 'flex',
                height: '25px',
                flexDirection: 'row-reverse',
                width: '100%',
                border: '1px solid #7B9AAF',
                borderRadius: '5px',
                opacity: '1',
            },
        },
        '& .items': {
            '& .label': {
                display: 'inline-block',
            },
            '& tr > td.rowInput:not(:last-child)': {
                marginBottom: '8px',
                verticalAlign: 'top',
            },
            '& .deleteIcon': {
                marginLeft: '14px',
                paddingTop: '14px',
            },
            '& .inputProduct': {
                display: 'block',
            },
            '& .inputProduct input': {
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                border: '1px solid #7B9AAF',
                borderRadius: '5px',
                opacity: '1',
                maxWidth: '433px',
                marginLeft: '5px',
                padding: '6px 5px 6px',
                height: '25px',
                [theme.breakpoints.up('sm')]: {
                    minWidth: '380px',
                },
            },
            '& .inputQty input': {
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                border: '1px solid #7B9AAF',
                borderRadius: '5px',
                opacity: '1',
                maxWidth: '132px',
                marginLeft: '9px',
                padding: '6px 5px 6px',
                height: '25px',
                [theme.breakpoints.up('sm')]: {
                    minWidth: '132px',
                },
            },
        },
    },
    addButton: {
        width: '135px',
        height: '22px',
        marginTop: '34.75px',
        display: 'inline-flex',
        '& span': {
            textAlign: 'left',
            font: 'normal normal normal 14px/17px Roboto',
            letterSpacing: 0,
            color: '#2E2E2E',
            alignSelf: 'center',
            display: 'flex',
        },
        '& .button': {
            textTransform: 'none',
        },
    },
    addProduct: {
        width: '135px',
        height: '22px',
        marginTop: '8px',
        display: 'inline-flex',
        '& span': {
            textAlign: 'left',
            font: 'normal normal normal 14px/17px Roboto',
            letterSpacing: 0,
            color: '#2E2E2E',
            alignSelf: 'center',
            display: 'flex',
        },
        '& .button': {
            textTransform: 'none',
            padding: 0,
        },
    },
    button: {
        height: '41px',
        marginTop: '8px',
        display: 'inline-flex',
        '& span': {
            textAlign: 'left',
            font: 'normal normal normal 14px/17px Roboto',
            letterSpacing: 0,
            color: 'white',
            alignSelf: 'center',
            display: 'flex',
        },
        '& .button': {
            textTransform: 'none',
            padding: '12px 21px',
            background: '#F58732 0% 0% no-repeat padding-box',
        },
    },
    link: {
        font: 'normal normal normal 14px/50px Roboto',
        letterSpacing: '0.28px',
        color: '#F58732',
    },
    titleContent: {
        paddingLeft: '0',
        fontSize: 30,
        fontWeight: 400,
    },
}));
