import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
    detailRequisitionWrapper: {
        '& .detail-requisition': {
            '& .header-middle__left': {
                '& .header-middle__logo-link': {
                    width: '170px',
                    marginBottom: 30,
                    marginTop: 10,
                },
            },
            '& .detail-requisition-header': {
                '& h1': {
                    fontSize: 40,
                    fontWeight: 400,
                    marginBottom: 15,
                    display: 'block',
                },
                '& span': {
                    fontSize: 14,
                    fontWeight: 400,
                    marginBottom: 15,
                    display: 'block',
                },
            },
        },
    },

    tableContainer: {
        [theme.breakpoints.down('xs')]: {
            marginTop: 10,
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: 10,
        },
        boxShadow: 'none',
        width: '100%',
    },
    table: {
        width: '100%',
    },
    tableRowHead: {
        '& th': {
            padding: 10,
            borderBottom: '1px solid #d5eafb',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none !important',
        },
    },
    tableSpan: {
        fontSize: '14px',
    },
    tableRowResponsive: {
        [theme.breakpoints.down('xs')]: {
            display: 'grid !important',
            position: 'relative',
            '& .view-dekstop': {
                display: 'none',
            },
            '& .checkbox-mobile': {
                position: 'absolute',
                top: 50,
                borderBottom: 'unset !important',
                padding: 0,
            },
        },
        h3: {
            fontSize: 18,
        },
        '& .MuiTableCell-body': {
            borderBottom: '1px solid #d5eafb',
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('xs')]: {
            padding: '10px 0',
            '& .content-name': {
                marginLeft: 10,
                '& span': {
                    display: 'block',
                    marginBottom: 10,
                },
            },
            '& .item-count': {
                margin: '0 auto',
            },
        },
        [theme.breakpoints.up('sm')]: {
            padding: '10px',
            '& .content-name': {
                '& .mobile-delete': {
                    display: 'none',
                },
            },
            '& .error-text': {
                width: '60px',
            },
            '& .item-count': {
                margin: 0,
            },
        },
        '& .item-count': {
            border: '1px solid #d5eafb',
            textAlign: 'center',
            width: 54,
            height: 32,
            padding: '0 10px',
            '& label + .MuiInput-formControl': {
                marginTop: 0,
            },
            '& input': {
                fontSize: '14px',
                textAlign: 'center',
            },
        },
        '& .error-text': {
            marginTop: 10,
            fontSize: '12px',
            color: ' #d32f2f',
        },
        '& .MuiCheckbox-root': {
            color: '#D5EAFB',
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: '#F58732 !important',
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked:hover': {
            backgroundColor: 'unset',
        },
    },
    mobLabel: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
            '& span': {
                margin: 0,
            },
        },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        '& .content-mobile': {
            flex: '1',
            '& span': {
                display: 'block',
                width: 'auto',
            },
        },
        '& .mobile-qty': {
            textAlign: 'center',
        },
        '& .mobile-price': {
            '& span': {
                textAlign: 'left',
            },
        },
        '& .mobile-subtotal': {
            '& span': {
                textAlign: 'right',
            },
        },
    },
    value: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },

    productImg: {
        [theme.breakpoints.down('xs')]: {
            width: 100,
        },
        [theme.breakpoints.up('sm')]: {
            width: 57,
        },
        height: 'auto',
    },
    productWrapper: {
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center',
        },
        display: 'flex',
    },
}));
