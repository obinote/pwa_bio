import { makeStyles } from '@material-ui/core/styles';
import {
    GRAY_PRIMARY, GREEN, PRIMARY, TEXT_SHADE, BLUE_LIGHT, BLUE_SECONDARY, ORANGE,
} from '@theme_color';
import {
    CreateMargin, FlexColumn, FlexRow,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    displayFlexRow: {
        ...FlexRow,
    },
    container: {
        // [theme.breakpoints.up('sm')]: {
        //     maxWidht: 900,
        // },
        ...FlexColumn,
        width: '100%',
        height: '100%',
        fontSize: '12px',
        padding: '0px 5px 40px 5px',
    },
    tableOuterContainer: {
        paddingTop: 10,
        '& h2': {
            color: '#414048',
            letterSpacing: 0,
            fontSize: 18,
            marginBottom: 32,
        },
    },
    tableContainer: {
        boxShadow: 'none',
    },
    table: {
        width: '100%',
    },
    tableRowHead: {
        [theme.breakpoints.down('xs')]: {
            display: 'none !important',
        },
        '& .MuiTableCell-head': {
            whiteSpace: 'nowrap',
            color: TEXT_SHADE,
            fontWeight: 'bold',
            letterSpacing: 0.28,
        },
    },
    tableRowResponsive: {
        [theme.breakpoints.down('xs')]: {
            display: 'grid !important',
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            padding: 10,
        },
    },
    tableCellResponsive: {
        [theme.breakpoints.down('xs')]: {
            border: 'none',
            padding: '8px 0',
        },
    },
    mobLabel: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        width: '40%',
        minWidth: '130px',
        maxWidth: '200px',
        position: 'relative',
        paddingRight: 20,
        '&::after': {
            content: "':'",
            display: 'block',
            position: 'absolute',
            right: '8px',
            top: 0,
        },
    },
    value: {
        color: TEXT_SHADE,
        letterSpacing: 0,
        fontSize: 14,
        [theme.breakpoints.down('sm')]: {
            width: '60%',
        },
    },
    colorPrimary: {
        color: PRIMARY,
    },
    wrapper_address: {
        margin: '40px 0',
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        flexGrow: 1,
    },
    appBarBottom: {
        bottom: 0,
        top: 'auto',
        backgroundColor: 'white',
    },
    pageTitle: {
        fontWeight: 700,
        textAlign: 'center',
        color: PRIMARY,
        textTransform: 'uppercase',
        position: 'absolute',
        left: '50px',
        right: '50px',
    },
    address_shipping: {
        // ...CreatePadding(15, 15, 15, 15),
        width: '100%',
        margin: 0,
    },
    address_billing: {
        padding: '20px 15px',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
    },
    address_title: {
        color: PRIMARY,
        fontSize: '12px',
        fontWeight: '700',
        marginBottom: '5px',
    },
    addressColumn: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    address_content: {
        fontSize: '12px',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        padding: '10px',
    },
    address_text: {
        fontSize: '14px',
        fontWeight: 400,
        letterSpacing: 0,
        color: TEXT_SHADE,
    },
    address_edit: {
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '12px',
        margin: '0',
    },
    address_remove: {
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '12px',
        margin: '0',
    },
    address_action: {
        marginTop: '30px',
        textAlign: 'left',
        '& > div': {
            textAlign: 'left',
        },
        '& button': {
            background: '#F58732',
            border: '1px solid #F58732',
            color: '#FFF',
            height: 40,
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px 0 15px',
            borderRadius: 40,

            '& > .MuiButton-label': {
                flexDirection: 'row-reverse',
                textTransform: 'capitalize',
                fontWeight: 400,
                '& p': {
                    fontSize: 14,
                },
                '& svg': {
                    fontSize: 18,
                },
            },
            '&:hover': {
                background: '#F58732',
                color: '#FFFFFF',
            },
        },
    },
    btn_action: {
        borderRadius: '0',
        padding: '10px',
    },
    address_add: {
        backgroundColor: 'white',
        boxShadow: 'none',
        border: '1px solid black',
        fontSize: '12px',
    },
    address_save: {
        width: '100%',
        backgroundColor: PRIMARY,
        color: 'white',
        textTransform: 'uppercase',
    },
    address_drawer: {
        backgroundColor: 'white',
        left: 0,
        width: '100%',
    },
    address_form: {
        padding: 15,
        color: TEXT_SHADE,
        letterSpacing: 0,
    },
    form_input: {
        marginBottom: '25px',
    },
    addBtn: {
        ...CreateMargin(30, 0, 30, 0),
    },
    boxMap: {
        ...CreateMargin(30, 0, 60, 0),
        height: 'auto',
    },
    fontWhite: {
        color: 'white',
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: PRIMARY,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    addBtnSuccess: {
        backgroundColor: GREEN,
        '&:hover': {
            backgroundColor: GREEN,
        },
        ...CreateMargin(30, 0, 30, 0),
    },
    ok: {
        marginTop: '10px',
    },
    defaultAddress: {
        display: 'flex',
        margin: '27px 0 22px',
        color: TEXT_SHADE,
        letterSpacing: 0,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: 32,
        },
        '& > div': {
            width: '50%',
            paddingRight: 20,
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                padding: 0,
            },
        },
        '& h2': {
            fontSize: 18,
            marginBottom: 24,
        },
        '& p': {
            fontSize: 14,
        },
        '& a': {
            color: '#F58732',
        },
        '& strong': {
            display: 'block',
        },
    },
    btnActionAddress: {
        // background: '#e7f3ff',
        // border: '1px solid #e7f3ff',
        color: '#F58732',
        padding: '4px 8px',
        fontSize: 14,
        fontWeight: 400,
        textTransform: 'capitalize',
        '&:hover': {
            background: '#FFFFFF',
            // border: '1px solid #F58732'
        },
    },
    popupBoxAction: {
        '& > .MuiMenu-paper': {
            boxShadow: '0px 0px 4px #00000026',
            color: TEXT_SHADE,
        },
        '& li': {
            fontSize: 12,
        },
        '& .MuiListItem-button:hover': {
            background: BLUE_LIGHT,
        },
    },
    dialogStatus: {
        letterSpacing: 0,
        '& h1': {
            color: BLUE_SECONDARY,
            fontWeight: 'bold',
            fontSize: 18,
        },
        '& .MuiDialogContent-dividers': {
            padding: '0px 21px',
        },
        '& .MuiTableCell-head': {
            color: TEXT_SHADE,
            fontWeight: 'bold',
            letterSpacing: 0.28,
        },
        '& .MuiTableCell-body': {
            color: TEXT_SHADE,
            fontWeight: 400,
            letterSpacing: 0.28,
        },
    },
    btnActionMobile: {
        paddingLeft: 30,
    },
    generalButton: {
        [theme.breakpoints.down('sm')]: {
            padding: '3px 8px',
        },
        '& p': {
            color: ORANGE,
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: 0,
        },
        '& .MuiButton-label': {
            justifyContent: 'flex-start',
        },
    },
    popupStatus: {
        '& .MuiBackdrop-root': {
            background: 'rgba(0, 0, 0, 0.15)',
        },
        '& .MuiDialog-paperFullWidth': {
            boxShadow: '0px 0px 30px 5px rgba(0,0,0,0.05)',
        },
    },
    popupStatusTitle: {
        padding: '20px 24px 0',
        '& h1': {
            margin: 0,
            fontSize: '30px',
            color: '#42929d',
            fontWeight: '400',
            letterSpacing: 0,
        },
    },
    popupStatusContent: {
        padding: '16px 25px !Important',
    },
}));

export default useStyles;
