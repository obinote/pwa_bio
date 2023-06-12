import { makeStyles } from '@material-ui/core/styles';
import { BLUE, BLUE_GRAY, BLUE_PRIMARY } from '@theme_color';

const tabletsUp = '@media (min-width: 768px)';

const useStyles = makeStyles((theme) => ({
    containerSellerDetail: {
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    sellerBanner: {
        width: '100%',
    },
    sellerBannerImg: {
        width: '100%',
        display: 'block',
        height: 320,
        objectFit: 'cover',
        border: 0,
        objectPosition: 'center',
        [theme.breakpoints.down('xs')]: {
            height: 150,
        },
    },
    sellerInfo: {
        width: '100%',
        backgroundColor: '#f2f9ff',
    },
    sellerInfoContainer: {
        display: 'flex',
        gap: '13px',
        paddingTop: 15,
        paddingBottom: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        maxWidth: 1280,
        paddingLeft: 20,
        paddingRight: 20,
        color: '#414048',
        [tabletsUp]: { gap: '50px' },
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            marginBottom: '20px',
        },
        '& .MuiSkeleton-root': {
            margin: 'auto',
            [tabletsUp]: { margin: 'initial', marginRight: '1rem' },
        },
    },
    sellerLogo: {
        width: 250,
        height: 250,
        background: '#ffffff',
        padding: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -70,
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 0 4px #dddddd',
        [theme.breakpoints.down('xs')]: {
            width: '155px !important',
            height: '155px !important',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        [theme.breakpoints.between('sm', 'sm')]: {
            width: 220,
            height: 220,
            marginTop: -140,
        },
    },
    sellerLogoImg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        '&.placeholder': {
            border: '5px solid #fff',
            backgroundColor: '#d5eafb',
        },
    },
    sellerInfoDesc: {
        width: 'calc(100% - 300px)',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    h2: {
        fontSize: 30,
        margin: '0 0 5px',
        [theme.breakpoints.down('xs')]: {
            fontSize: '18px !important',
            textAlign: 'center',
        },
    },
    inlineContainerCenter: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [tabletsUp]: {
            maxWidth: 500,
            justifyContent: 'space-between',
            flexDirection: 'row',
        },
    },
    ratingBox: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        alignItems: 'center',
        '& .star': {
            gridColumn: 1,
            display: 'inline-flex',
            paddingBottom: '0.1rem',
            [tabletsUp]: { paddingBottom: 0 },
            '& svg': {
                fontSize: 24,
            },
        },
        '& > *:last-child': {
            color: '#2E2E2E',
            textAlign: 'center',
            gridColumn: '1 / -1',
            [tabletsUp]: { textAlign: 'left' },
        },
        '@media (min-width: 840px)': {
            display: 'flex',
            alignItems: 'center',
        },
    },
    inlineContainer: {
        display: 'grid',
        gap: '15px',
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'auto auto auto',
            gridTemplateRows: 'calc(1rem + 13px) auto',
            justifyContent: 'space-between',
            gap: 0,
            columnGap: '4rem',
            maxWidth: 860,
            '& > *:first-child': { gridRow: 'span 2' },
        },
    },
    sellerRatings: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    scoreLabel: {
        fontSize: 18,
        marginRight: 5,
        marginLeft: 5,
    },
    sellerSocialMedia: {
        padding: 0,
        margin: 0,
        display: 'flex',
        gap: '8px',
        [theme.breakpoints.down('xs')]: {
            marginTop: 10,
        },
    },
    socialMediaWrapper: {
        height: 32,
        width: 32,
        borderRadius: '100%',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none',
        transition: 'all 0.05s ease-in-out',
        '&:hover': {
            color: '#006bb4',
            boxShadow: '0 0 2px #006bb4',
        },
    },
    socialMediaIcon: {
        height: 14,
        width: 14,
    },
    dividerAbsolute: {
        margin: '15px 0 20px',
        content: '',
        background: '#d5eafb',
        height: 1,
        position: 'absolute',
        right: 0,
        left: 0,
        width: '100%',
    },
    divider: {
        margin: '15px 0 20px',
        content: '',
        background: '#d5eafb',
        height: 1,
    },
    columnDetail: {
        width: '30%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    infoItemContainer: {
        display: 'block',
        marginBottom: 5,
    },
    infoItem: {
        display: 'flex',
        gap: '10px',
        position: 'relative',
        flexDirection: 'row',
    },
    infoValue: {
        width: '100%',
    },
    infoIconCenter: {
        verticalAlign: 'middle',
        display: 'inline-flex',
    },
    infoItemLink: {
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    infoItemTooltip: {
        cursor: 'pointer',
    },
    tooltipContainer: {
        backgroundColor: '#fff !important',
        padding: '15px 20px !important',
        borderRadius: '8px !important',
        boxShadow: '0 0 4px #ddd !important',
    },
    tooltipList: {
        display: 'flex',
        marginBottom: 12,
    },
    tooltipItem: {
        minWidth: 80,
        display: 'inline-block',
        color: '#414048',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 400,
    },
    tooltipItemHour: {
        display: 'inline-block',
        color: '#414048',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 400,
    },
    sellerContentSection: {},
    tabsWrapper: {
        borderBottom: `0.5px solid ${BLUE_PRIMARY}`,
    },
    tabsContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'auto',
        maxWidth: 1280,
        paddingLeft: 20,
        paddingRight: 20,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            padding: 0,
        },
        '& button': {
            fontSize: 18,
            fontWeight: '600',
            color: '#414048',
            textTransform: 'capitalize',
            letterSpacing: 0,
            padding: '1px 35px',
            minWidth: 0,
            '& .MuiTab-wrapper': {
                [theme.breakpoints.down('xs')]: {
                    lineHeight: '1.3',
                },
            },
            [theme.breakpoints.down('xs')]: {
                padding: '1px 10px',
                fontSize: 14,
                color: BLUE_GRAY,
                '&.Mui-selected': {
                    color: BLUE,
                },
            },
        },
    },
    tabIndicator: {
        backgroundColor: '#06aec9 !important',
        height: '4px !important',
    },
    tabContentContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 'auto',
        maxWidth: 1280,
        minHeight: 50,
        paddingLeft: 20,
        paddingRight: 20,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            paddingLeft: 16,
            paddingRight: 16,
            marginBottom: 50,
        },
    },
    highlightLabel: {
        marginTop: 30,
        marginBottom: 15,
    },
    highlightH3: {
        fontWeight: 600,
        lineHeight: 1.1,
        fontSize: 18,
        marginTop: 20,
        marginBottom: 10,
    },
    aboutDistributor: {
        paddingTop: 20,
        color: '#414048',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: 400,
    },
    highlightProductArea: {
        display: 'flex',
        flexFlow: 'row wrap',
        margin: '0 -8px',
    },
    highlightProductItem: {
        width: 'calc(20% - 16px)',
        margin: 8,
        display: 'block',
        [theme.breakpoints.down('md')]: {
            width: 'calc(25% - 16px)',
        },
        [theme.breakpoints.down('sm')]: {
            width: 'calc(33.333% - 16px)',
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(50% - 16px)',
        },
    },
    productList: {
        '& .price_text': {
            fontSize: 14,
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
        },
    },
}));

export default useStyles;
