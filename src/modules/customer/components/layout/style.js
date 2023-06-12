import { makeStyles } from '@material-ui/core/styles';
import { CreateMargin, CreatePadding } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    listMenuContainer: {
        backgroundColor: '#FFFFFF',
        padding: '15px 0px',
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.15)',
        borderRadius: '8px',
    },
    listMenu: {
        padding: 0,
        listStyle: 'none',
    },
    listMenuMobileContainer: {
        backgroundColor: '#f2f9ff',
        '& .MuiAccordionDetails-root': {
            ...CreatePadding(0, 5, 0, 0),
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.3)',
        },
        '& .MuiIconButton-edgeEnd': {
            color: '#fff',
        },
    },
    listMenuMobile: {
        padding: 0,
        listStyle: 'none',
        width: '100%',
        ...CreateMargin(20, 0, 20, 0),
    },
    listMenuItem: {
        padding: '4px 20px 4px 20px',
        fontSize: 16,
        fontWeight: 400,
        color: '#414048',
        marginBottom: 0,
        letterSpacing: 0,
        position: 'relative',
        '@media (max-width: 767px)': {
            fontSize: 14,
            padding: '4px 15px',
        },
        '&:hover': {
            color: '#42929d',
        },
        '& > button': {
            border: 'none',
            backgroundColor: 'inherit',
            fontSize: 'inherit',
            color: 'inherit',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
            '&::before': {
                content: '""',
                marginLeft: 30,
            },
        },
        '& a': {
            display: 'block',
            textTransform: 'capitalize',
            marginLeft: 30,
        },
        '& .divider': {
            position: 'relative',
            boxSizing: 'border-box',
            pointerEvents: 'none',
            margin: '5px 0 10px',
        },
        '& .divider::after': {
            content: '""',
            backgroundColor: '#E8EDF1',
            display: 'block',
            height: 1,
            margin: '0 -20px',
        },
        '& .label-menu': {
            color: '#7B9AAF',
            pointerEvents: 'none',
            fontWeight: 600,
        },
    },
    listMenuItemActive: {
        fontWeight: 600,
        color: '#42929d',
        '@media (max-width: 767px)': {
            fontSize: 14,
            padding: '5px 15px',
            fontWeight: 600,
        },
    },
    titleContent: {
        paddingLeft: '0',
        fontSize: 30,
        fontWeight: 400,
    },
    titleCompany: {
        fontSize: '30px',
        flexBasis: '50%',
        maxWidth: '100%',
        marginLeft: '0',
        fontWeight: 'bold',
        color: '#414048',
    },
    navMobileContainer: {
        display: 'block',
        position: 'absolute',
        width: '100%',
    },
    listMenuDesktop: {
        maxWidth: '1280px',
        width: '100%',
        padding: '40px 10px',
        '@media (max-width: 767px)': {
            marginTop: 20,
            paddingBottom: 0,
        },
    },
    titleNavMobile: {
        fontWeight: 700,
        lineHeight: 1.1,
        fontSize: 14,
        color: '#fff',
    },
    sideBar: {
        paddingRight: 40,
        [theme.breakpoints.between('sm', 'sm')]: {
            minWidth: 280,
            paddingRight: 20,
            maxWidth: '100%',
            flexBasis: 'auto',
        },
    },
    mainContent: {
        [theme.breakpoints.between('sm', 'sm')]: {
            maxWidth: '100%',
            flexBasis: 'auto',
            width: 'calc(100% - 280px)',
        },
    },
    button: {
        float: 'right',
        marginLeft: 'auto',
        fontSize: 14,
        fontWeight: 400,
        width: 'auto',
        height: 41,
        background: '#F58732 0% 0% no-repeat padding-box',
        color: 'white',
        textTransform: 'none',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
        '&:hover': {
            background: '#F58732 0% 0% no-repeat padding-box',
        },
        '&.edit-profile': {
            background: '#F58732 !important',
            color: '#FFF',
            textTransform: 'capitalize',
            fontWeight: 400,
        },
    },
    companyTitle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 20,
        },
    },
}));

export default useStyles;
