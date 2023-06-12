import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, FlexRow } from '@theme_mixins';

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
        alignItems: 'center',
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
        [theme.breakpoints.up('sm')]: {
            marginTop: 30,
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
            borderBottom: '1px solid #E8EDF1',
            padding: '10px 10px 10px 0',
            fontWeight: 700,
        },
    },
    tableSpan: {
        fontSize: '14px',
    },
    tableRowResponsive: {
        [theme.breakpoints.down('xs')]: {
            display: 'flex !important',
            alignItems: 'flex-start',
            flexDirection: 'column',
            padding: '10px 0',
            borderBottom: '1px solid #E8EDF1',
        },
        h3: {
            fontSize: 18,
        },
        '& .MuiTableCell-root': {
            borderBottom: '1px solid #E8EDF1',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
        '&.row-pagination': {
            borderBottom: '0 transparent',
            '& td': {
                borderBottom: '0 transparent',
                '& .MuiTablePagination-toolbar': {
                    padding: 0,
                },
            },
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('xs')]: {
            border: 'none !Important',
            padding: '8px 0',
        },
        [theme.breakpoints.up('sm')]: {
            padding: '10px 10px 10px 0',
            '& div': {
                margin: '0 !important',
            },
        },
    },
    mobLabel: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
            '& span': {
                margin: 0,
            },
        },
        minWidth: '150px',
        maxWidth: '200px',
        position: 'relative',
        paddingRight: 20,
    },
    value: {
        [theme.breakpoints.down('xs')]: {
            width: '50%',
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
        '& .custom-button-modal': {
            fontSize: 14,
            color: '#000000',
            transition: 'unset',
            '&:before': {
                content: 'url(/assets/img/icon-requisition.png)',
                marginTop: 10,
            },
            '& p': {
                fontSize: 14,
                color: '#000000',
            },
            '&:hover': {
                backgroundColor: 'unset',
                boxShadow: 'unset',
            },
        },
        [theme.breakpoints.down('xs')]: {
            '& .custom-button-modal': {
                float: 'left',
            },
            borderBottom: '1px solid #d5eafb',
        },
        [theme.breakpoints.up('sm')]: {
            '& .custom-button-modal': {
                position: 'absolute',
                top: -50,
                right: 0,
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
        },
        '& .custom-form-modal': {
            margin: 0,
            '& span': {
                margin: 0,
                display: 'block',
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
                padding: ' 0 10px',
            },
            '& .button-wrapper': {
                display: 'flex',
                width: 'max-content',
                '& .btn-submit': {
                    borderRadius: '50px',
                    backgroundColor: '#f58732',
                    borderColor: '#f58732',
                    boxShadow: 'unset',
                },
                '& .btn-cancel': {
                    backgroundColor: 'unset',
                    borderColor: 'unset',
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
    tabelPagination: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 80,
        },
    },
}));
