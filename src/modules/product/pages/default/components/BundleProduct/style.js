import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        border: '1px solid #E7E7E7',
        borderRadius: 8,
        margin: '10px 0',
    },
    bundleWrapper: {
        [theme.breakpoints.down('xs')]: {
            padding: '10px 15px 5px 15px',
        },
        [theme.breakpoints.up('sm')]: {
            padding: '10px 18px 5px 18px',
        },
    },
    bundleTitle: {
        marginBottom: 10,
        [theme.breakpoints.down('xs')]: {
            fontSize: 14,
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: 18,
        },
    },
    promoDetail: {
        padding: '0 0 10px',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 15,
            alignItems: 'center',
        },
        [theme.breakpoints.up('sm')]: {
        },
        '& p': {
            fontSize: 12,
        },
    },
    productDetail: {
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        justifyContent: 'center',
    },
    promoDetailInfo: {
        padding: '0 0 10px',
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 15,
            display: 'flex',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
        '& p': {
            fontSize: 12,
        },
    },
    productDetailInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            padding: '0 0 0 25px',
        },
        [theme.breakpoints.up('sm')]: {
            paddingLeft: 18,
        },
    },
    productImage: {
        [theme.breakpoints.down('xs')]: {
            maxWidth: 40,
        },
        [theme.breakpoints.up('sm')]: {
            maxWidth: 85,
        },
        '& img': {
            objectFit: 'cover',
            border: '1px solid #E7E7E7',
            [theme.breakpoints.down('xs')]: {
                width: '50px',
                height: '50px',
            },
            [theme.breakpoints.up('sm')]: {
                width: '80px',
                height: '80px',
            },
        },
    },
    productName: {
        margin: '0 5px',
        fontWeight: 400,
        letterSpacing: 'unset',
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        },
    },
    priceWrapper: {
        '& span': {
            margin: '0 5px 10px',
            [theme.breakpoints.down('xs')]: {
                fontSize: 12,
            },
        },
    },
    oldPrice: {
        textDecoration: 'line-through',
        color: '#7B9AAF',
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
        },
    },
    qty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
        },
        '& .label': {
            color: '#7B9AAF',
            margin: '-5px 0 0',
        },
        '& .item-count': {
            width: 40,
            height: 30,
            textAlign: 'center',
            border: '1px solid #D5EAFB',
        },
    },
    total: {
        borderTop: '1px solid #E7E7E7',
        padding: '5px 0 10px 0',
        display: 'flex',
    },
    totalOldPrice: {
        textDecoration: 'line-through',
        color: '#7B9AAF',
    },
    labelTotal: {
        fontWeight: 400,
        [theme.breakpoints.down('xs')]: {
            width: 48,
        },
        [theme.breakpoints.up('sm')]: {
            width: 88,
        },
    },
    action: {
        padding: 0,
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
    },
    btnAddToCardContainer: {
        display: 'flex',
    },
    btnAddToCard: {
        [theme.breakpoints.down('sm')]: {
            padding: '0',
            border: 'none',
            '&:before': {
                content: 'url(/assets/img/add_to_cart-bundle.svg)',
                left: 5,
                position: 'absolute',
            },
            '& span': {
                display: 'none',
            },
        },
        [theme.breakpoints.up('sm')]: {
            // width: 316,
        },
        padding: '0 18px',
        border: '1px solid #E67E22',
        borderRadius: 22,
        backgroundColor: '#fff',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#fff',
        },
    },
    textBtnAddToCard: {
        color: '#E67E22',
        fontSize: 14,
        fontWeight: 400,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}));

export default useStyles;
