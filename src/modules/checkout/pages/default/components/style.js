import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_PRIMARY, BLUE_PRIMARY, ORANGE } from '@theme_color';
import {
    CreateBorder,
    CreatePadding,
    FlexColumn,
    FlexRow,
    CreateMargin,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    root: {
        ...FlexColumn,
        height: '100vh',
        width: '100%',
    },
    container: {
        width: '100%',
        height: 'auto',
        paddingBottom: 150,
    },
    block: {
        ...CreateBorder(0, 0, '1px', 0, BLUE_PRIMARY),
        ...CreatePadding(20, 20, 20, 20),
        '& h1': {
            fontSize: '18px',
            marginBottom: '10px',
        },
    },
    blockAddress: {
        ...CreateBorder(0, 0, '1px', 0, BLUE_PRIMARY),
        ...CreatePadding(0, 0, 30, 0),
        '& h1': {
            fontSize: '18px',
            marginBottom: '0',
        },
    },
    addressContainer: {
        ...FlexRow,
        justifyContent: 'space-between',
        alignItems: 'start',
        ...CreatePadding(0, 20, 0, 20),
        gap: 20,
    },
    addressText: {
        ...FlexColumn,
        maxWidth: '60%',

        '& *': {
            fontFamily: 'Roboto',
        },
    },
    listShipping: {
        border: 0,
    },
    listShippingGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        width: '100%',
        boxSizing: 'inherit',
        padding: '8px',

        '& > div:first-child': {
            flexDirection: 'column',

            '& p': {
                margin: 0,
                fontWeight: 400,
                color: '#585858',
                fontSize: 12,
            },

            '& > div:first-child': {
                '& p': {
                    fontWeight: 600,
                    color: '#000000',
                    fontSize: 14,
                },
            },
        },
    },
    radioShiping: {
        width: '100% !important',
    },
    btnPoint: {
        padding: 0,
        border: 0,
        '& span': {
            color: '#F58732',
            margin: 0,
            letterSpacing: 0,
            fontSize: 14,
            border: 0,
        },
        '&:hover': {
            border: 0,
            background: 'none',
        },
        '&.Mui-disabled': {
            border: 0,
            '& span': {
                color: '#DDDDDD',
            },
        },
    },
    cardPoint: {
        ...CreateMargin(5, 0, 15, 0),
        ...CreatePadding(15, 15, 15, 15),
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'space-between',
        ...CreateBorder('1px', '1px', '1px', '1px', GRAY_PRIMARY),
        borderRadius: 10,
        maxWidth: '100%',
        '& span': {
            margin: 0,
            lineHeight: 'normal',
        },
        '& h2': {
            margin: 0,
            fontSize: 18,
            lineHeight: 'normal',
            [theme.breakpoints.down('xs')]: {
                fontSize: 14,
            },
        },
    },
    pointText: {
        fontSize: 20,
        ...CreateMargin(0, 0, 0, 5),
    },
    btnBalanceGift: {
        ...CreateMargin(-25, 0, 0, -5),
    },
    rmBorder: {
        border: 'none',
    },
    smallCircular: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -8,
        marginLeft: -8,
    },
    mediumCircular: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    largeCircular: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -15,
        marginLeft: -15,
    },
    customFormControl: {
        marginTop: '10px',
        marginBottom: '20px',
    },
    emailContainer: {
        margin: '5px',
    },
    giftCardContainer: {
        position: 'relative',
    },
    giftcardInfoContainer: {
        ...CreateMargin(-30, 10, 30, 5),
    },
    giftCard: {
        marginLeft: '5px',
        marginRight: '5px',
    },
    paymentExpansionContainer: {
        marginTop: '10px',
    },
    placeOrderDesktop: {
        maxWidth: '100%',
        height: 50,
        background: ORANGE,

        '&:hover': {
            background: '#dc6e1a',
        },
        '& span': {
            fontSize: '20px',
            fontWeight: '500',
        },
    },
    labelAccordion: {
        ...FlexRow,
        alignItems: 'center',
    },
    shippingGroupStyleIcon: {
        width: '45px',
        height: '45px',
        marginRight: '10px',
    },
    insuranceContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    shippingInsuranceLabel: {
        marginLeft: '0px!important',
    },
    shippingInsuranceCheckbox: {
        marginLeft: '10px',
    },
    shippingInsurancePrice: {
        marginTop: '0px',
        marginBottom: '-15px',
        marginRight: '5px',
        paddingRight: '23px',
    },
    insuranceCheckboxLabel: {
        display: 'flex',
        alignItems: 'center',
    },
    insuranceCheckboxLabelIcon: {
        margin: 'auto',
        height: '1.15rem',
    },
    labelSummary: {
        ...FlexRow,
        alignItems: 'center',
    },
    paymentGroupStyleIcon: {
        width: '45px',
        height: '45px',
        marginRight: '10px',
    },
    mobileBottomSpace: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 140,
        },
    },
    paymentHeader: {
        ...FlexRow,
        justifyContent: 'space-between',
    },
    howToPay: {
        padding: 0,
        background: 'transparent',

        '& span': {
            color: '#F58732 !important',
            textTransform: 'capitalize',
        },

        '&:hover': {
            background: 'transparent',
        },
    },
    listError: {
        ...FlexColumn,
        marginTop: 10,
    },
    colorPrimary: {
        color: '#F58732',
        margin: 0,
    },
    margin: {
        margin: 5,
    },
    title: {
        ...CreatePadding(20, 20, 0, 20),
        '& h2': {
            fontSize: 50,
            color: '#414048',
            fontWeight: '600',
            margin: 0,
        },
    },
    placeorder_btn: {
        background: '#F58732',

        '&:hover': {
            background: '#dc6e1a',
        },
    },
    addressEmailContainer: {
        ...CreatePadding(10, 20, 20, 20),
        ...CreateBorder('0', '0', '1px', '0', BLUE_PRIMARY),
        marginBottom: '20px',
    },
    creditVendor: {
        ...CreatePadding(15, 15, 15, 60),

        '& strong': {
            marginRight: '10px',
        },

        [theme.breakpoints.down('sm')]: {
            paddingLeft: '27px',
        },
    },
    typoRegular: {
        fontSize: '14px',
        fontWeight: '400',
    },
    exceedLimit: {
        color: 'red',
        marginLeft: 0,
    },
    topInfo: {
        marginLeft: 0,
        fontWeight: 'bold',
        fontSize: '12px',
        color: '#42929D',
    },
    boxWrapper: {
        ...CreateBorder('1px', '1px', '1px', '1px', '#D5EAFB'),
        borderRadius: 5,
        padding: '30px 20px',
        marginBottom: '20px',
        marginTop: '20px',

        [theme.breakpoints.down('sm')]: {
            marginBottom: 60,
        },
    },
    boxSignature: {
        borderBottom: '0 !important',
        paddingBottom: '0 !important',
    },
    contentWrapper: {
        display: 'block',
        width: '100%',
        maxWidth: 980,
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            padding: '0 15px',
        },
    },
    contentBoxWrapper: {
        display: 'flex',
        position: 'relative',
        boxSizing: 'border-box',
        gap: 30,
        [theme.breakpoints.down('xs')]: {
            flexWrap: 'wrap',
        },
    },
    contentDetail: {
        width: 'calc(100% - 350px)',
        background: '#ffffff',
        border: '1px solid #E8EDF1',
        borderRadius: 8,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            '& .referral-section': {
                '& .MuiFormLabel-root': {
                    position: 'static',
                    '&+ .MuiInput-formControl': {
                        marginTop: 5,
                    },
                },
            },
        },
    },
    contentSummary: {
        width: 320,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        '& #desktopSummary': {
            background: '#FFFFFF',
            border: '1px solid #E8EDF1',
            borderRadius: 8,
            '& span': {
                display: 'inline-block',
            },

            '& .row:first-child': {
                flexDirection: 'row !important',
            },

            '& .row.total': {
                flexDirection: 'column',

                '& > div': {
                    width: '100% !important',
                    maxWidth: '100% !important',

                    '& .MuiListItemSecondaryAction-root': {
                        right: 0,
                    },
                },
            },

            '& #listItemProductSummary': {
                '& > div': {
                    width: '50%',

                    '& span': {
                        fontSize: 12,
                    },
                },
            },
        },
    },
    stickyCheckoutHeader: {
        width: '100%',
        display: 'block',
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        background: '#FFFFFF',
        zIndex: '1',
        borderBottom: '1px solid #D5EAFB',
        marginBottom: 30,
        padding: '10px 0',
        [theme.breakpoints.down('xs')]: {
            position: 'fixed',
            left: 0,
            padding: 0,
        },

        '& #header': {
            height: 60,
            alignItems: 'center',
        },

        '& img.logo': {
            maxWidth: '180px !important',
        },
    },
    checkoutBox: {
        background: '#F3FAFF',
        [theme.breakpoints.down('sm')]: {
            margin: 0,
        },
        [theme.breakpoints.down('xs')]: {
            padding: '75px 0 200px !important',
        },
    },
    checkboxPrivacy: {
        marginLeft: '5px !important',
    },
    btnAddAddress: {
        background: 'transparent',
        float: 'left',
        padding: 0,
        marginLeft: 5,

        '& > span': {
            justifyContent: 'flex-start',
        },

        '& p': {
            fontSize: 14,
            textTransform: 'capitalize',
        },

        '&:hover': {
            background: 'transparent',
        },
    },
    pointContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
}));
