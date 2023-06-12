import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn, FlexRow } from '@theme_mixins';
import { RED } from '@root/src/theme/colors';

export default makeStyles((theme) => ({
    rowCenter: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        '& .MuiTablePagination-actions': {
            display: 'none',
        },
        '& *': {
            letterSpacing: 0,
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
            overflow: 'hidden',
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
            padding: '10px 0',
            fontWeight: '600',
        },
    },
    tableSpan: {
        fontSize: '14px',
    },
    tableRowResponsive: {
        [theme.breakpoints.down('xs')]: {
            display: 'grid !important',
            padding: '10px 0',
            borderBottom: '1px solid #E8EDF1',
        },
        h3: {
            fontSize: 18,
        },
        '& .MuiTableCell-alignLeft': {
            [theme.breakpoints.down('xs')]: {
                padding: '5px 0',
            },
            [theme.breakpoints.up('sm')]: {
                padding: '7px 0',
                borderBottom: '1px solid #E8EDF1',
            },
            '& *': {
                letterSpacing: 0,
            },

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
            padding: '10px 0',
        },
    },
    mobLabel: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
            '& span': {
                margin: 0,
            },
        },
        [theme.breakpoints.down('xs')]: {
            '& span': {
                margin: 0,
            },
        },
        width: '70%',
        minWidth: '150px',
        maxWidth: '200px',
        position: 'relative',
        paddingRight: 20,
    },
    displayFullBlock: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    displayBlock: {
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
    },
    value: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
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
    titleContent: {
        display: 'none',
    },
    customModal: {
        [theme.breakpoints.up('sm')]: {
            position: 'relative',
        },
        [theme.breakpoints.down('xs')]: {
            float: 'left',
            marginTop: 10,
        },
        '& .custom-button-modal': {
            fontSize: 14,
            color: '#000000',
            transition: 'unset',
            borderRadius: '50px',
            backgroundColor: '#f58732',
            borderColor: '#f58732',
            boxShadow: 'unset',
            padding: '5px',
            [theme.breakpoints.up('sm')]: {
                position: 'absolute',
                top: '-40px',
                right: 10,
            },
            '& p': {
                fontSize: 14,
                color: '#FFFFFF',
            },
            '&:hover': {
                backgroundColor: '#f58732',
                borderColor: '#f58732',
            },
        },
    },
    customFormsModal: {
        [theme.breakpoints.up('sm')]: {
            '& h2': {
                fontSize: '30px',
            },
        },
        [theme.breakpoints.down('xs')]: {
            '& h2': {
                fontSize: '20px',
            },
        },
        '& .MuiDialog-paperWidthSm': {
            width: '100%',
        },
        '& h2': {
            lineHeight: '39px',
            color: '#42929d',
            fontWeight: '400',
        },
        '& .custom-form-modal': {
            margin: 0,
            paddingBottom: 10,
            '& .MuiFormControl-root': {
                marginTop: 0,
                marginBottom: 15,
                flexDirection: 'row',
                flexWrap: 'wrap',
                maxHeight: 'none',
                '& > *': {
                    width: '100%',
                },
                '& + p': {
                    display: 'none',
                },
                '& .MuiInputBase-root': {
                    padding: 0,
                },
            },
            '& span': {
                margin: 0,
                display: 'block',
                '&.MuiTypography-root': {
                    '& > .required': {
                        color: RED,
                        display: 'inline',
                    },
                },
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
                marginBottom: 0,
                padding: '0 10px',
            },
            '& textarea': {
                width: '100% !important',
                marginTop: '5px',
                borderRadius: '5px',
                border: '1px solid #d5eafb',
                height: '100px',
                padding: '10px',
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
        [theme.breakpoints.down('xs')]: {
            margin: 0,
        },
    },
}));
