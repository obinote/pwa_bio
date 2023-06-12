import { makeStyles } from '@material-ui/core/styles';
import { Centering, CreateMargin, CreatePadding } from '@theme_mixins';
import {
    ORANGE, WHITE, BLUE, BLUE_GRAY,
} from '@theme_color';

const labelColor = '#414048';

const useStyles = makeStyles((theme) => ({
    containerSeller: {
        ...CreateMargin(0, 0, 15, 0),
        ...Centering,
        [theme.breakpoints.down('lg')]: {
            ...CreatePadding(0, 16, 0, 16),
        },
    },
    wrapperSeller: {
        width: '100%',
        maxWidth: 1280,
        [theme.breakpoints.down('sm')]: {
            padding: '0 15px',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '0',
        },
    },
    blockHeader: {
        width: '100%',
        maxWidth: 760,
        margin: '0 auto 40px',
        textAlign: 'center',
    },
    h2: {
        textAlign: 'center',
        fontSize: 60,
        fontWeight: 700,
        color: labelColor,
        lineHeight: 1.1,
        marginTop: 25,
        marginBottom: 20,
        [theme.breakpoints.down('xs')]: {
            fontSize: 36,
        },
    },
    p: {
        textAlign: 'center',
        color: labelColor,
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 10,
        [theme.breakpoints.down('xs')]: {
            fontSize: 16,
        },
    },
    a: {
        color: ORANGE,
    },
    sellerList: {
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        margin: 0,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: 'auto',
            margin: '0 -8px',
        },
    },
    sellerItem: {
        ...Centering,
        overflow: 'hidden',
        width: 'calc(25% - 16px)',
        boxShadow: '0px 0px 4px #00000026',
        backgroundColor: '#fff',
        margin: 8,
        borderRadius: 8,
        display: 'flex',
        minHeight: 280,
        textDecoration: 'none !important',
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100%/2 - 16px)',
            minHeight: 260,
        },
        [theme.breakpoints.down('xs')]: {
            minHeight: 0,
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            width: 'calc(100%/3 - 16px)',
        },
    },
    sellerItemPlaceholder: {
        ...Centering,
        overflow: 'hidden',
        width: 'calc(25% - 16px)',
        border: '1px solid #d5eafb',
        margin: 8,
        borderRadius: 10,
        display: 'flex',
        minHeight: 280,
        textDecoration: 'none !important',
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100%/3 - 16px)',
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 16px)',
            minHeight: 260,
        },
    },
    sellerContent: {
        padding: '30px 15px',
        height: '100%',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: '15px',
        },
    },
    sellerName: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 18,
        lineHeight: 1.3,
        marginTop: 15,
        color: labelColor,
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        },
    },
    wrapperFooter: {
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            textAlign: 'center',
        },
        alignItems: 'center',
        padding: '30px 15px',
    },
    wrapperPagination: {
        [theme.breakpoints.down('xs')]: {
            marginTop: '15px',
        },
    },
    statusRegistered: {
        textAlign: 'left',
        position: 'relative',
        justifyContent: 'space-between',
        alignItems: 'end',
        display: 'flex',
        width: '100%',
        padding: '12px 13px 12px 13px',
        backgroundColor: '#F2F9FF',
        fontSize: '12px',
        color: '#06aec9',
        [theme.breakpoints.down('xs')]: {
            fontSize: '11px',
            padding: '13px 35px 13px 8px',
            position: 'relative',
            '& > div': {
                lineHeight: 'normal',
            },
            '& .icon-container': {
                height: 25,
                width: 25,
                borderRadius: 4,
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translate(0, -50%)',
                '& img': {
                    width: 18,
                },
            },
        },
    },
    statusVerification: {
        textAlign: 'center',
        width: '100%',
        padding: '12px 13px 12px 13px',
        backgroundColor: '#F6F6F6',
        fontSize: '12px',
        color: BLUE_GRAY,
        [theme.breakpoints.down('xs')]: {
            fontSize: '11px',
            padding: '13px 8px',
            '& > div': {
                lineHeight: 'normal',
            },
        },
    },
    statusNotRegistered: {
        textAlign: 'left',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        width: '100%',
        padding: '8px 13px 8px 13px',
        backgroundColor: '#F6F6F6',
        fontSize: '12px',
        color: BLUE_GRAY,
        [theme.breakpoints.down('xs')]: {
            fontSize: '11px',
            padding: '13px 8px',
            '& > div': {
                lineHeight: 'normal',
            },
        },
    },
    buttonRegister: {
        borderRadius: '3px',
        backgroundColor: ORANGE,
        color: WHITE,
        fontSize: '12px',
        padding: '2px 12px 2px 12px',
        border: 'none',
        cursor: 'pointer',
        textTransform: 'capitalize',
        '&, &:hover': {
            background: ORANGE,
        },
    },
    iconContainer: {
        position: 'absolute',
        right: '13px',
        width: '36px',
        height: '36px',
        float: 'right',
        backgroundColor: BLUE,
        borderRadius: '8px',
        padding: '8px',
    },
}));

export default useStyles;
