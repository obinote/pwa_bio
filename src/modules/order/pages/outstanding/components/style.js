import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn, CreateBorder, FlexRow, CreateMargin,
} from '@theme_mixins';
import {
    GRAY_PRIMARY, BLUE_PRIMARY, BLUE_GRAY, ORANGE, WHITE, BLACK_DARK, ORANGE_DARK, BLUE_LIGHT, ORANGE_LIGHT,
} from '@theme_color';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        padding: '0px !important',
        ...FlexColumn,
        display: 'flex',
        '&> div:first-child': {
            ...CreateBorder(0, 0, 0, 0, GRAY_PRIMARY),
        },
    },
    containerSnapBilling: {
        width: '100%',
        padding: '0px !important',
        marginTop: '24px',
        ...FlexColumn,
        display: 'flex',
        '&> div:first-child': {
            ...CreateBorder(0, 0, 0, 0, GRAY_PRIMARY),
        },
    },
    itemContainer: {
        ...FlexRow,
        ...CreatePadding(11, 15, 9, 8),
        ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
    },

    linkDownload: {
        ...CreateMargin(0, 0, 0, 21),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },

    imageItem: {
        width: 80,
        height: 100,
    },

    contentItem: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 0, 10),
        width: '100%',
    },

    columnLabel: {
        width: '30%',
    },

    columnLabelId: {
        width: '14%',
    },

    columnLabelDate: {
        width: '12%',
    },

    columnLabelShipped: {
        width: '23%',
    },

    columnLabelTotal: {
        width: '16%',
    },

    columnLabelStatus: {
        width: '16%',
    },

    columnLabelAction: {
        width: '10%',
    },

    detailItem: {
        ...FlexRow,
        ...CreatePadding(0, 0, 0, 5),
        width: '100%',
    },

    detailContent: {
        ...FlexColumn,
        ...CreatePadding(0, 0, 0, 16),
        width: '70%',
    },

    rowCenter: {
        ...FlexColumn,
        width: '100%',
        height: '100%',
        textAlign: 'center',
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
        boxShadow: 'none',
    },
    tableContainerOutstanding: {
        boxShadow: 'none',
        marginTop: '42px',
    },
    tableContainerPendingBilling: {
        width: '100%',
        boxShadow: 'none',
        backgroundColor: BLUE_LIGHT,
        padding: '12px 24px 20px 24px',
        border: '1px solid transparent',
        overflowX: 'visible',
        borderRadius: 8,
    },
    table: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            borderTop: '0px',
        },
        '& .MuiCheckbox-root': {
            color: '#D5EAFB',
        },
        '& .MuiCheckbox-root:hover': {
            backgroundColor: 'unset',
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: '#F58732 !important',
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked:hover': {
            backgroundColor: 'unset',
        },
        '& span': {
            fontSize: 14,
            textTransform: 'capitalize',
        },
    },
    tablePending: {
        width: '100%',
        border: '1px solid transparent',
        borderCollapse: 'separate',
        borderSpacing: '0 8px',
        [theme.breakpoints.down('sm')]: {
            borderTop: '0px',
        },
    },
    tableRowHead: {
        borderBottom: '1px solid #DFDFDF',
        [theme.breakpoints.down('sm')]: {
            display: 'none !important',
        },
    },
    tableRowHeadOutstanding: {
        borderBottom: '1px solid #DFDFDF',
        opacity: '1',
        [theme.breakpoints.down('sm')]: {
            display: 'none !important',
        },
    },
    tableRowHeadPendingBilling: {
        borderBottom: '1px solid transparent',
        opacity: '1',
        [theme.breakpoints.down('sm')]: {
            display: 'none !important',
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            borderBottom: '1px solid #DFDFDF',
            padding: 10,
        },
    },
    tableRowResponsiveOutstanding: {
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            borderBottom: '1px solid #DFDFDF',
            padding: 10,
        },
    },
    tableRowResponsivePendingBilling: {
        backgroundColor: WHITE,
        [theme.breakpoints.down('sm')]: {
            display: 'grid !important',
            backgroundColor: WHITE,
            padding: 10,
        },
    },
    tableCellResponsive: {
        borderBottom: '1px solid #DFDFDF',
        padding: '8px 0',
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            padding: '8px 0',
            '&:last-child': {
                padding: '8px 0',
            },
        },
    },
    tableCellResponsiveNone: {
        display: 'none',
    },
    tableCellResponsivePendingBilling: {
        borderBottom: '1px solid transparent',
        padding: '8px 0',
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            padding: '8px 0',
            '&:last-child': {
                padding: '8px 0',
            },
        },
    },
    tableCellCheckbox: {
        borderBottom: '1px solid #DFDFDF',
        padding: '8px',
        [theme.breakpoints.down('sm')]: {
            border: 'none',
            padding: '8px 0',
            '&:last-child': {
                padding: '8px 0',
            },
        },
    },
    mobLabel: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        width: '45%',
        paddingRight: 20,
        '& span': {
            letterSpacing: 0,
            fontSize: 14,
            margin: '0px',
        },
    },
    value: {
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
        '&.highlighted': {
            '& span': {
                color: '#F58732',
            },
        },
        '& span': {
            fontWeight: 400,
            letterSpacing: 0,
            fontSize: 14,
        },
        '& .invoice-list': {
            color: '#F58732',
        },
    },
    valuePending: {
        marginLeft: '12px',
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
        '& span': {
            fontWeight: 400,
            fontSize: 14,
        },
    },
    valueButtonPending: {
        marginRight: '12px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    valuePiutang: {
        fontSize: '30px',
        fontWeight: '700',
        lineHeight: '20px',
        letterSpacing: 0,
    },
    valueDownload: {
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
    },
    action: {
        ...FlexRow,
    },
    linkView: {
        '&::after': {
            borderLeft: '1px solid #737373',
            content: "''",
            display: 'inline-block',
            height: 12,
            margin: '0 10px',
            verticalAlign: -1,
        },
    },
    divSort: {
        '& span': {
            textAlign: 'right',
            font: 'normal normal normal 12px/14px Roboto',
            letterSpacing: 0,
            color: '#414048',
            textTransform: 'uppercase',
            marginLeft: '5px',
        },
    },
    formControl: {
        marginLeft: 8,
        verticalAlign: 'middle',
        minWidth: 10,
        '& div': {
            textAlign: 'left',
            font: 'normal normal normal 12px/14px Roboto',
            letterSpacing: 0,
            color: '#414048',
        },
    },
    FormControlSnapBilling: {
        width: '100%',
        backgroundColor: BLUE_LIGHT,
        verticalAlign: 'middle',
        minWidth: 10,
        padding: '12px 24px 24px 24px',
        '& div': {
            textAlign: 'left',
            font: 'normal normal normal 12px/14px Roboto',
            letterSpacing: 0,
        },
        '& span': {
            fontSize: 14,
        },
        '& .MuiRadio-root': {
            paddingLeft: 17,
        },
    },
    boxCreateBilling: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '28px',
    },
    boxButtonPay: {
        marginTop: '24px',
    },
    boxImage: {
        width: '106px',
        height: '100%',
        marginRight: '20px',
    },
    boxContainerPiutang: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: ORANGE_LIGHT,
        marginBottom: '16px',
        marginTop: '24px',
        padding: '20px 24px 20px 24px',
        alignItems: 'center',
    },
    outstandingModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '408px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #EFEFEF',
        boxShadow: 24,
        paddingTop: '40px',
        paddingBottom: '27px',
        paddingRight: '35px',
        paddingLeft: '35px',
        borderRadius: '15px',
        textAlignLast: 'center',
    },
    buttonCreateBilling: {
        backgroundColor: BLUE_PRIMARY,
        width: 124,
        height: 41,
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            '& span': {
                textAlign: 'center',
                padding: 5,
            },
        },
        '& h6': {
            fontSize: '14px',
            color: BLUE_GRAY,
        },
        '&:hover': {
            backgroundColor: ORANGE,
            transition: '0.2s',
            '& h6': {
                color: WHITE,
            },
        },
    },
    buttonCreateBillingModal: {
        backgroundColor: ORANGE,
        padding: '12px 21px',
        '& h6': {
            fontSize: '14px',
            color: WHITE,
            fontWeight: 400,
        },
        '&:hover': {
            backgroundColor: ORANGE_DARK,
            transition: '0.2s',
            '& h6': {
                color: WHITE,
            },
        },
    },
    buttonPaymentPendingBilling: {
        backgroundColor: ORANGE,
        padding: '0 12px',
        borderRadius: '22px',
        border: '1px solid #F58732',
        cursor: 'pointer',
        '& span': {
            fontSize: '14px',
            color: '#FFFFFF !Important',
            letterSpacing: 0,
            fontWeight: 400,
        },
        '&:hover': {
            backgroundColor: ORANGE_DARK,
            transition: '0.2s',
            '& span': {
                color: '#FFFFFF !Important',
            },
        },
        [theme.breakpoints.down('sm')]: {
            borderRadius: '22px',
            border: '1px solid ORANGE',
            alignSelf: 'center',
            '& span': {
                fontSize: '14px',
                color: '#FFFFFF !Important',
            },
            '&:hover': {
                backgroundColor: ORANGE_DARK,
                transition: '0.2s',
                '& span': {
                    color: '#FFFFFF !Important',
                },
            },
        },
    },
    buttonCanceleBilling: {
        backgroundColor: WHITE,
        padding: '12px 21px',
        '& h6': {
            fontSize: '14px',
            color: ORANGE,
            fontWeight: 400,
        },
        '&:hover': {
            backgroundColor: WHITE,
            transition: '0.2s',
            '& h6': {
                color: ORANGE_DARK,
            },
        },
    },
    buttonPaymentSnapBilling: {
        backgroundColor: ORANGE,
        padding: '8px 34px',
        '& h6': {
            fontSize: '14px',
            color: WHITE,
            fontWeight: 400,
        },
        '&:hover': {
            backgroundColor: ORANGE_DARK,
            transition: '0.2s',
            '& h6': {
                color: WHITE,
            },
        },
    },
    createBillingDescription: {
        fontSize: '12px',
        color: BLACK_DARK,
        fontWeight: 400,
    },
    createBillingTableTitle: {
        width: '100%',
        fontSize: '18px',
        color: BLACK_DARK,
        borderBottom: '1px solid #d5eafb',
        paddingBottom: '12px',
    },
    createBillingDescriptionModal: {
        fontSize: '14px',
        color: BLACK_DARK,
        marginBottom: '16px',
        marginTop: '8px',
        fontWeight: 400,
        letterSpacing: 0,
    },
    typographyTableHead: {
        fontSize: '14px',
        fontWeight: '600',
        letterSpacing: '0.28px',
    },
    checkBox: {
        // width: '13px',
        // height: '13px',
        padding: '0px',
        color: '#D5EAFB',
    },
    formControlCheckBox: {
        marginBottom: '0px',
        marginLeft: -15,

    },
    snapBillingTitle: {
        fontSize: '18px',
        fontWeight: '600',
        paddingBottom: '12px',
        borderBottom: '1px solid #d5eafb',
    },
    snapBillingDescription: {
        fontSize: '14px',
        letterSpacing: '0.28px',
    },
    titlePiutang: {
        fontSize: '18px',
        fontWeight: '600',
    },
    tabelPagination: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 80,
        },
    },
    tabelPendingPagination: {
        backgroundColor: '#F2F9FF',
        '& .MuiPagination-ul': {
            marginTop: 0,
            paddingBottom: 24,
        },
    },
}));
