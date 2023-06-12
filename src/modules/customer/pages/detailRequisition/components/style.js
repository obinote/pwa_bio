import makeStyles from '@material-ui/core/styles/makeStyles';
import { RED } from '@root/src/theme/colors';

export default makeStyles((theme) => ({
    detailRequisitionWrapper: {
        '& *': {
            letterSpacing: '0',
        },
        '& .detail-requisition': {
            '& .detail-requisition-header': {
                marginBottom: 25,
                maxWidth: '500px',
                '& .detail-requisition-header-title': {
                    '& h1': {
                        fontSize: 30,
                        fontWeight: 700,
                        margin: '0 0 15px 0',
                        display: 'inline-block',
                    },
                    '& .detail-requisition-header-button': {
                        display: 'inline-block',
                        width: 'max-content',
                        '& button': {
                            '&:before': {
                                content: 'url(/assets/img/icon-edit-requisition.png)',
                            },
                            '& p': {
                                fontSize: 0,
                            },
                            '&:hover': {
                                backgroundColor: 'unset',
                            },
                        },
                    },
                },
                '& span': {
                    fontSize: 14,
                    margin: 0,
                },
                '& .detail-requisition-content-info': {
                    '& span': {
                        fontSize: 14,
                    },
                },
            },
            '& .detail-requisition-content': {
                '& .detail-requisition-content-header': {
                    [theme.breakpoints.down('xs')]: {
                        display: 'flex',
                        justifyContent: 'center',
                        borderBottom: '1px solid #d5eafb',
                        width: '100%',
                    },
                    [theme.breakpoints.up('sm')]: {
                        display: 'flex',
                        position: 'relative',
                        alignItems: 'center',
                        maxHeight: '23px',
                    },
                    [theme.breakpoints.down('sm')]: {
                        flexWrap: 'wrap',
                        maxHeight: 'none !important',
                    },
                    '& .detail-requisition-content-info': {
                        [theme.breakpoints.down('xs')]: {
                            display: 'inline-block',
                            width: '100%',
                            marginBottom: 15,
                        },
                    },
                    '& .detail-requisition-content-remove': {
                        [theme.breakpoints.up('sm')]: {
                            marginLeft: 15,
                        },
                        [theme.breakpoints.down('xs')]: {
                            display: 'inline-block',
                            marginLeft: 5,
                            marginRight: 15,
                        },
                        '& button': {
                            padding: 0,
                            backgroundColor: 'unset',
                            boxShadow: 'unset',
                            '& span': {
                                fontSize: 14,
                                color: '#f58732',
                                margin: 0,
                            },
                        },
                    },
                    '& .detail-requisition-content-move': {
                        position: 'relative',
                        [theme.breakpoints.up('sm')]: {
                            marginLeft: 15,
                        },
                        [theme.breakpoints.down('xs')]: {
                            display: 'inline-block',
                            marginLeft: 5,
                        },
                        '& .content-move-label': {
                            fontSize: 14,
                            color: '#f58732',
                            margin: 0,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        },
                        '& .content-move-value': {
                            zIndex: '100',
                            [theme.breakpoints.down('xs')]: {
                                zIndex: '1',
                                left: '50%',
                                transform: 'translate(-50%, 0)',
                                top: '100%',
                            },
                            position: 'absolute',
                            top: 'auto',
                            background: '#ffffff',
                            border: '1px solid #bbbbbb',
                            width: 'max-content',
                            '& p': {
                                padding: '5px 10px',
                            },
                        },
                    },
                    '& .detail-requisition-content-print': {
                        [theme.breakpoints.down('sm')]: {
                            marginTop: 10,
                            display: 'flex',
                            alignItems: 'center',
                            verticalAlign: 'middle',
                            textAlign: 'right',
                            width: '100%',
                        },
                        [theme.breakpoints.down('xs')]: {
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        },
                        [theme.breakpoints.up('md')]: {
                            display: 'flex',
                            position: 'absolute',
                            right: 0,
                            alignItems: 'center',
                        },
                        '& .detail-requisition-print': {
                            [theme.breakpoints.up('sm')]: {
                                paddingLeft: 10,
                                '& .icon-print': {
                                    display: 'flex',
                                    alignItems: 'center',
                                },
                            },
                            [theme.breakpoints.down('xs')]: {
                                display: 'inline-block',
                                verticalAlign: 'middle',
                                '& .icon-print': {
                                    display: 'flex',
                                    alignItems: 'center',
                                },
                            },
                            '& span': {
                                color: '#f58732',
                            },
                        },
                        '& .detail-requisition-export': {
                            [theme.breakpoints.down('xs')]: {
                                display: 'inline-block',
                                verticalAlign: 'middle',
                            },
                            '& button': {
                                padding: 0,
                                backgroundColor: 'unset',
                                boxShadow: 'unset',
                                '& span': {
                                    fontSize: 14,
                                    color: '#f58732',
                                    margin: 0,
                                },
                            },
                            '& span': {
                                color: '#f58732',
                            },
                        },
                        '& .detail-requisition-content-delete': {
                            '& button': {
                                '& span': {
                                    fontSize: 14,
                                    color: '#f58732',
                                    margin: 0,
                                    fontWeight: '400',
                                },
                                '&:hover': {
                                    backgroundColor: 'unset',
                                },
                            },
                        },
                    },
                },
                '& .detail-requisition-content-footer': {
                    [theme.breakpoints.up('sm')]: {
                        marginTop: 25,
                        overflow: 'hidden',
                        '& .detail-requisition-content-back': {
                            float: 'left',
                        },
                        '& .detail-requisition-content-delete': {
                            float: 'right',
                        },
                    },
                    [theme.breakpoints.down('xs')]: {
                        '& .detail-requisition-content-back': {
                            '& button': {
                                width: '100%',
                            },
                        },
                        '& .detail-requisition-content-delete': {
                            marginBottom: 10,
                            '& button': {
                                width: '100%',
                            },
                        },
                    },

                    '& .detail-requisition-content-back': {
                        '& button': {
                            '& span': {
                                fontSize: 14,
                                color: '#f58732',
                                margin: 0,
                                fontWeight: '400',
                            },
                            '&:hover': {
                                backgroundColor: 'unset',
                            },
                        },
                    },
                    '& .detail-requisition-content-delete': {
                        '& button': {
                            '& span': {
                                fontSize: 14,
                                color: '#f58732',
                                margin: 0,
                                fontWeight: '400',
                            },
                            '&:hover': {
                                backgroundColor: 'unset',
                            },
                        },
                    },
                },
            },
            '& .detail-requisition-content-table-header': {
                marginBottom: 20,
                '& .detail-requisition-date': {
                    '& .requisition-date-input-frame': {
                        display: 'flex',
                        border: '1px solid #42929d',
                        borderRadius: 5,
                        marginTop: 5,
                        padding: '0px 15px 0px 5px',
                        width: '30%',
                        [theme.breakpoints.down('sm')]: {
                            width: '100%',
                        },
                        '& .requisition-date-button': {
                            width: '30%',
                        },
                        '& .requisition-date-input': {
                            border: '0px',
                            width: '100%',
                            padding: '10px 5px',
                            '&:focus': {
                                outline: 'none',
                            },
                        },
                        '& .requisition-date-input-loading': {
                            width: '70%',
                            [theme.breakpoints.down('sm')]: {
                                width: '100%',
                            },
                        },
                    },
                    '& button': {
                        cursor: 'pointer',
                        border: '0px',
                        boxShadow: 'unset',
                        backgroundColor: '#FFFFFF',
                        width: '25%',
                        '& span': {
                            fontSize: 14,
                            margin: 0,
                            fontWeight: '400',
                            color: '#F58732',
                        },
                        '&:hover': {
                            boxShadow: 'unset',
                            backgroundColor: '#FFFFFF',
                        },
                    },
                },
                '& .detail-requisition-date-mobile': {
                    display: 'none',
                    '& button': {
                        boxShadow: 'unset',
                        border: '1px solid #F58732',
                        backgroundColor: '#FFFFFF',
                        '& span': {
                            fontSize: 14,
                            margin: 0,
                            fontWeight: '400',
                            color: '#F58732',
                        },
                        '&:hover': {
                            boxShadow: 'unset',
                            backgroundColor: '#FFFFFF',
                        },
                    },
                    [theme.breakpoints.down('sm')]: {
                        display: 'flex',
                        '& .requisition-date-input': {
                            width: '85%',
                        },
                    },
                },
            },
            '& .detail-requisition-content-table-footer': {
                marginTop: 20,
                overflow: 'hidden',
                [theme.breakpoints.down('xs')]: {
                    display: 'block',
                    '& .detail-requisition-update': {
                        marginBottom: 10,
                        '& button': {
                            width: '100%',
                        },
                    },
                    '& .detail-requisition-atc': {
                        marginBottom: 10,
                        '& button': {
                            width: '100%',
                        },
                    },
                },
                [theme.breakpoints.up('sm')]: {
                    '& .detail-requisition-update': {
                        float: 'right',
                        '& button': {
                            padding: '9px 25px',
                        },
                    },
                    '& .detail-requisition-atc': {
                        float: 'left',
                        '& button': {
                            padding: '10px 25px',
                        },
                    },
                },
                '& .detail-requisition-update': {
                    '& button': {
                        boxShadow: 'unset',
                        border: '1px solid #F58732',
                        backgroundColor: '#FFFFFF',
                        '& span': {
                            fontSize: 14,
                            margin: 0,
                            fontWeight: '400',
                            color: '#F58732',
                        },
                        '&:hover': {
                            boxShadow: 'unset',
                            backgroundColor: '#FFFFFF',
                        },
                    },
                },
                '& .detail-requisition-atc': {
                    display: 'flex',
                    '& button': {
                        backgroundColor: '#F58732',
                        boxShadow: 'unset',
                        '& span': {
                            fontSize: 14,
                            color: '#FFFFFF',
                            margin: 0,
                            fontWeight: '400',
                        },
                        '&:hover': {
                            backgroundColor: '#F58732',
                        },
                    },
                },
            },
        },
        '& .detail-requisition-content-delete.nodata': {
            '& button': {
                float: 'left',
                marginBottom: '25px',
                '& span': {
                    fontSize: 14,
                    color: '#f58732',
                    margin: 0,
                    fontWeight: '400',
                },
                '&:hover': {
                    backgroundColor: 'unset',
                },
            },
        },
    },
    customFormsModal: {
        '& .MuiDialog-paperWidthSm': {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            '& h2': {
                fontSize: '30px',
            },
        },
        [theme.breakpoints.down('xs')]: {
            '& h2': {
                fontSize: '25px',
            },
        },
        '& h2': {
            lineHeight: '39px',
            color: '#42929d',
            fontWeight: '400',
        },
        '& .custom-form-modal': {
            margin: 0,
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
                padding: ' 0 10px',
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
                alignItems: 'center',
                marginBottom: 16,
                '& .btn-submit': {
                    borderRadius: '50px',
                    backgroundColor: '#f58732',
                    borderColor: '#f58732',
                    boxShadow: 'unset',
                    marginBottom: 0,
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
        '& .btn-submit-disabled': {
            backgroundColor: '#ffb175 !important',
        },
        '& .btn-submit': {
            borderRadius: '50px',
            backgroundColor: '#f58732',
            borderColor: '#f58732',
            boxShadow: 'unset',
            marginBottom: 16,
            '&:hover': {
                backgroundColor: '#f58732',
                borderColor: '#f58732',
                boxShadow: 'unset',
                '& p': {
                    fontSize: 14,
                    color: '#ffffff',
                },
            },
            '& p': {
                fontSize: 14,
                color: '#ffffff',
            },
        },
        '& .frame-mandatory': {
            display: 'flex !important',
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
        '& .mobile-tier-discount': {
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
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 40,
        },
        [theme.breakpoints.up('sm')]: {
            alignItems: 'center',
        },
        display: 'flex',
    },
    textField: {
        display: 'flex',
    },
    mandatory: {
        color: 'red',
    },
}));
