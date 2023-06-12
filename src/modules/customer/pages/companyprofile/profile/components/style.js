import { makeStyles } from '@material-ui/core/styles';
import {
    GRAY_PRIMARY, GREEN, PRIMARY, TEXT_SHADE, ORANGE,
} from '@theme_color';
import {
    CreateMargin, CreatePadding, FlexColumn, FlexRow,
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
        height: 'auto',
        margin: '27px 5px 60px 0px',
        border: '1px solid #E8EDF1',
        borderRadius: '8px',
    },
    profileHeaderContainer: {
        padding: '26px',
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            padding: 0,
        },
    },
    profileImg: {
        border: '1px solid #E8EDF1',
        width: '249px',
        height: '249px',
        [theme.breakpoints.down('sm')]: {
            alignSelf: 'center',
            margin: '20px 0',
        },
    },
    profileCompany: {
        marginLeft: '21px',
        padding: '0px 0px 10px 0px',
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '60%',
        '& h1': {
            fontSize: 30,
            fontWeight: 'bold',
            letterSpacing: 0,
            color: TEXT_SHADE,
            marginTop: 0,
            [theme.breakpoints.down('sm')]: {
                fontSize: 25,
            },
        },
        '& span': {
            letterSpacing: 0.28,
            fontWeight: 400,
            color: TEXT_SHADE,
            display: 'block',
            lineHeight: '1.3',
        },
        [theme.breakpoints.down('sm')]: {
            marginRight: 21,
            '& .MuiSkeleton-root': {
                width: '100% !important',
            },
        },
    },
    title: {
        letterSpacing: 0,
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_SHADE,
    },
    headerTitle: {
        color: TEXT_SHADE,
        fontSize: 30,
        letterSpacing: 0,
    },
    headerInformation: {
        letterSpacing: 0.28,
        fontSize: 14,
        fontWeight: 'bold',
        color: TEXT_SHADE,
    },
    information: {
        letterSpacing: 0.28,
        fontSize: 14,
        fontWeight: 400,
        color: TEXT_SHADE,
    },
    profileInformationColumns: {
        borderTop: '1px solid #E8EDF1',
        display: 'flex',
        flexDirection: 'row',
        padding: 26,
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: 32,
            '& .MuiSkeleton-root': {
                width: '100% !important',
            },
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start',
        },
        '& > div': {
            [theme.breakpoints.up('md')]: {
                minWidth: '247px',
                padding: '0 21px',
                '&:first-child': {
                    paddingLeft: 0,
                },
            },
            '& .sales-representative': {
                display: 'none',
            },
        },
    },
    tableOuterContainer: {
        paddingTop: 10,
    },
    tableContainer: {
        boxShadow: 'none',
    },
    table: {
        borderTop: '1px solid rgba(224, 224, 224, 1)',
        width: '100%',
    },
    tableRowHead: {
        [theme.breakpoints.down('xs')]: {
            display: 'none !important',
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
        ...CreatePadding(15, 15, 15, 15),
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
        paddingBottom: '15px',
    },
    address_text: {
        fontSize: '12px',
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
    address_edit_mobile: {
        marginLeft: 57,
    },
    address_action: {
        marginTop: '20px',
        textAlign: 'left',
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
        padding: '15px',
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
    titleDataPerusahaan: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: TEXT_SHADE,
        marginBottom: 30,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 20,
            '& .MuiSkeleton-root': {
                width: '50% !important',
            },
        },
        '& h3': {
            color: '#fff',
            height: '41px',
            display: 'inline-flex',
            fontSize: '14px',
            alignItems: 'center',
            fontWeight: 400,
            borderColor: '#f58732',
            borderRadius: '22px',
            justifyContent: 'center',
            textDecoration: 'none',
            backgroundColor: '#f58732',
            letterSpacing: 0,
            width: 176,
            marginLeft: 5,
        },
        '& .btn-edit-company': {
            color: '#fff',
            height: '41px',
            display: 'inline-flex',
            fontSize: '14px',
            alignItems: 'center',
            fontWeight: 400,
            borderColor: '#f58732',
            borderRadius: '22px',
            justifyContent: 'center',
            textDecoration: 'none',
            backgroundColor: '#f58732',
            letterSpacing: 0,
            marginLeft: 5,
        },
    },
    detailPerusahaan: {
        backgroundColor: 'unset',
    },
    wrapperContentDetail: {
        margin: '19px',
        [theme.breakpoints.down('sm')]: {
            '& .MuiSkeleton-root': {
                width: '100% !important',
            },
        },
    },
    wrapperDetail: {
        border: '1px solid #E8EDF1',
        ...CreateMargin(0, 0, 16, 0),
        borderRadius: '8px',
        color: TEXT_SHADE,
        letterSpacing: 0,
        fontWeight: 400,
    },
    titleDetail: {
        padding: '19px',
        borderBottom: '#f2f9ff',
        background: '#f2f9ff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& h2': {
            color: TEXT_SHADE,
            fontSize: 18,
            letterSpacing: 0,
        },
        '& .btn-tool': {
            color: '#fff',
            height: '41px',
            display: 'inline-flex',
            fontSize: '14px',
            alignItems: 'center',
            fontWeight: 400,
            borderColor: '#f58732',
            borderRadius: '22px',
            justifyContent: 'center',
            textDecoration: 'none',
            backgroundColor: '#f58732',
            letterSpacing: 0,
            marginLeft: 5,
        },
    },
    subTitle: {
        fontSize: 14,
        letterSpacing: 0,
        color: '#7B9AAF',
        marginBottom: 10,
    },
    breakDownDetail: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        '& h3': {
            width: '350px',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
    },
    wrapperMultiContent: {
        width: 'calc(100% - 350px)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flexWrap: 'wrap',
        fontWeight: 400,
        fontSize: 14,
        letterSpacing: 0,
        color: TEXT_SHADE,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            '& span': {
                display: 'block',
            },
        },
    },
    skeletonImg: {
        width: '249px',
        height: '249px',
        [theme.breakpoints.down('sm')]: {
            alignSelf: 'center',
        },
    },
    documentsDetail: {
        ...CreateMargin(5, 5, 5, -10),
        [theme.breakpoints.down('sm')]: {
            ...CreateMargin(5, 5, 5, 0),
        },
    },
    linkDownload: {
        color: ORANGE,
        cursor: 'pointer',
        fontWeight: 400,
        fontSize: 14,
        letterSpacing: 0,
    },
    showMore: {
        cursor: 'pointer',
    },
}));

export default useStyles;
