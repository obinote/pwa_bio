import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, FlexRow, CreatePadding } from '@theme_mixins';
import { TEXT_SHADE } from '@root/src/theme/colors';

export default makeStyles((theme) => ({
    rowCenter: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        '& .MuiTablePagination-actions': {
            display: 'none',
        },
    },
    displayFlexRow: {
        ...FlexRow,
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'space-between',
        },
    },
    tableOuterContainer: {
        paddingTop: 10,
    },
    tableContainer: {
        [theme.breakpoints.down('xs')]: {
            marginTop: 10,
        },
        boxShadow: 'none',
        width: '100%',
    },
    table: {
        width: '100%',
    },
    tableRowHead: {
        [theme.breakpoints.down('xs')]: {
            display: 'none !important',
        },
        '& .MuiTableCell-head': {
            borderBottom: '1px solid #d5eafb',
            padding: 10,
            color: TEXT_SHADE,
            letterSpacing: 0.28,
            fontWeight: 'bold',
        },
    },
    tableSpan: {
        fontSize: '14px',
    },
    tableRowResponsive: {
        [theme.breakpoints.down('xs')]: {
            display: 'grid !important',
            padding: 10,
            borderBottom: '1px solid #d5eafb',
        },
        h3: {
            fontSize: 18,
        },
    },
    tabelPagination: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 80,
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('xs')]: {
            border: 'none',
            padding: '8px 0',
        },
        [theme.breakpoints.up('sm')]: {
            padding: 10,
        },
    },
    mobLabel: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        '& span': {
            margin: 0,
            color: TEXT_SHADE,
            letterSpacing: 0.28,
        },
        width: '40%',
        position: 'relative',
        paddingRight: 20,
    },
    value: {
        margin: 0,
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: 0.28,
        color: TEXT_SHADE,
        [theme.breakpoints.down('xs')]: {
            width: '55%',
        },
    },
    productImgContainer: {
        width: 105,
        height: 130,
    },

    productImg: {
        width: 105,
        height: 'auto',
    },
    right: {
        textAlign: 'right',
    },
    summary: {
        paddingTop: 30,
    },
    noBorder: {
        borderBottom: 'none',
    },
    tableMobile: {
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            borderBottom: 'unset',
        },
    },
    tableTitleMobile: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    titleMobile: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        [theme.breakpoints.down('xs')]: {
            '& h4': {
                fontSize: 30,
            },
        },
    },
    customModal: {
        margin: '10px 0',
        '& .custom-button-modal': {
            fontSize: 14,
            color: '#fff',
            transition: 'unset',
            background: '#f58732',
            borderRadius: 22,
            padding: '12px',
            width: 211,
            height: 41,
            [theme.breakpoints.up('sm')]: {
                position: 'absolute',
                right: 0,
                top: -48,
            },
            '& p': {
                fontSize: 14,
                color: '#fff',
                letterSpacing: 0,
                fontWeight: 400,
            },
            '&:hover': {
                backgroundColor: '#f58732',
                boxShadow: 'unset',
            },
        },
    },
    customFormsModal: {
        '& .MuiDialog-paperWidthSm': {
            width: '100%',
        },
        '& h2': {
            fontSize: '30px',
            lineHeight: '39px',
            color: '#42929d',
            fontWeight: '400',
            letterSpacing: 0,
        },
        '& .MuiDialogContent-root': {
            ...CreatePadding(8, 24, 24, 24),
        },
        '& .custom-form-modal': {
            margin: 0,
            '& .MuiFormControl-root': {
                marginBottom: 0,
            },
            '& .required-field': {
                color: TEXT_SHADE,
                '&:after': {
                    content: "' *'",
                    color: 'red',
                },
            },
            '& span': {
                margin: 0,
                display: 'block',
                letterSpacing: 0,
            },
            '& label + .MuiInput-formControl': {
                marginTop: 0,
            },
            '& input': {
                width: '100%',
                borderRadius: '5px',
                height: '40px',
                border: '1px solid #d5eafb',
                marginTop: '5px',
                marginBottom: '10px',
                padding: ' 0 10px',
            },
            '& textarea': {
                width: '100% !important',
                marginTop: '5px',
                borderRadius: '5px',
                border: '1px solid #d5eafb',
                height: '100px',
                padding: '10px',
                fontSize: '14px',
            },
            '& .button-wrapper': {
                display: 'flex',
                width: 'max-content',
                gap: 20,
                [theme.breakpoints.down('sm')]: {
                    width: '100%',
                    alignItems: 'center',
                },
                '& .btn-submit': {
                    borderRadius: '22px',
                    backgroundColor: '#f58732',
                    borderColor: '#f58732',
                    boxShadow: 'unset',
                    padding: '12px 30px',
                    height: 41,
                },
                '& .btn-cancel': {
                    backgroundColor: 'unset',
                    borderColor: 'unset',
                    padding: '12px 30px',
                    height: 41,
                    '& p': {
                        fontSize: 14,
                        color: '#f58732',
                    },
                },
            },
        },
    },
    linkRequistion: {
        color: '#f58732',
    },
    linkEdit: {
        fontSize: 14,
        margin: 0,
        fontWeight: 400,
        color: '#f58732',
        cursor: 'pointer',
    },
    actionBtn: {
        [theme.breakpoints.down('xs')]: {
            textAlign: 'left',
        },
    },
}));
