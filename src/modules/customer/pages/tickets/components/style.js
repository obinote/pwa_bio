import makeStyles from '@material-ui/core/styles/makeStyles';
import { ORANGE, TEXT_SHADE, BORDER_GREY } from '@theme_color';
import { CreateMargin, FlexRow, CreatePadding } from '@theme_mixins';

export default makeStyles((theme) => ({

    displayFlexRow: {
        ...FlexRow,
        [theme.breakpoints.down('sm')]: {
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    },
    tableOuterContainer: {
        paddingTop: 10,
    },
    tableContainer: {
        boxShadow: 'none',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            marginTop: 10,
            '& table tbody tr:first-child': {
                borderTop: '1px solid #d5eafb',
            },
            '& table tbody tr': {
                paddingTop: '10px',
                borderBottom: '1px solid #d5eafb',
            },
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: 30,
        },
        '& .MuiTableCell-root': {
            borderBottom: `1px solid ${BORDER_GREY}`,
            [theme.breakpoints.down('xs')]: {
                borderBottom: 'none',
                '&:last-child': {
                    borderBottom: '0 transparent',
                },
            },
        },
    },
    table: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            borderTop: '0px',
            '& .MuiTableCell-body': {
                paddingLeft: '0px !important',
            },
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '40px',
        },
    },
    tableRowHead: {
        [theme.breakpoints.down('sm')]: {
            display: 'none !important',
        },
    },
    tableHeadTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: TEXT_SHADE,
    },
    tableRowResponsive: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            padding: 10,
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
        },
    },
    tabelPagination: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 80,
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            padding: 0,
            '&:last-child': {
                padding: '0',
            },
        },
        [theme.breakpoints.up('sm')]: {
            ...CreatePadding(10, 10, 10, 16),
        },
    },
    mobLabel: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
            '& span': {
                margin: 0,
            },
        },
        '& span': {
            fontSize: 14,
            margin: 0,
            letterSpacing: 0,
        },
        width: '70%',
        minWidth: '150px',
        maxWidth: '200px',
        position: 'relative',
        paddingRight: 20,
    },
    value: {
        ...CreateMargin(5, 5, 5, 0),
        color: TEXT_SHADE,
        letterSpacing: 0.28,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    valueAnchor: {
        color: ORANGE,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    createTicket: {
        '& .custom-button': {
            fontSize: 14,
            color: '#000000',
            transition: 'unset',
            borderRadius: '50px',
            backgroundColor: '#f58732',
            borderColor: '#f58732',
            boxShadow: 'unset',
            padding: '7px 16px',
            '& p': {
                fontSize: 14,
                color: '#FFFFFF',
            },
            '&:hover': {
                backgroundColor: '#f58732',
                borderColor: '#f58732',
            },
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: 10,
            '& .custom-button': {
                float: 'left',
            },
        },
        [theme.breakpoints.up('sm')]: {
            '& .custom-button': {
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
}));
