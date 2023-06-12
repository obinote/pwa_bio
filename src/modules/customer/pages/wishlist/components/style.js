import { makeStyles } from '@material-ui/core/styles';
import {
    GRAY_PRIMARY, PRIMARY, ORANGE, BLUE_SECONDARY, BLUE_GRAY,
} from '@theme_color';
import {
    CreatePadding, FlexRow, FlexColumn,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        ...FlexColumn,
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            marginBottom: 60,
        },
    },
    content: {
        ...FlexRow,
        ...CreatePadding(0, 0, 70, 0),
        flexWrap: 'wrap',
    },
    colorPrimary: {
        color: PRIMARY,
    },
    appBar: {
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        flexGrow: 1,
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
    wishlistWrapper: {
        // paddingTop: "50px"
    },
    footer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        background: 'rgba(255,255,255,0.7)',
        borderTop: '1px solid #d5eafb',
        ...CreatePadding(20, 20, 20, 20),
        textAlign: 'center',
        [theme.breakpoints.up('sm')]: {
            position: 'unset',
            ...FlexRow,
        },
        [theme.breakpoints.down('xs')]: {
            position: 'static',
        },
    },
    wishlistItems: {
        flex: '0 0 25%',
        padding: '25px 0 5px 10px',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0,
        },
        '& .MuiTableContainer-root': {
            overflowX: 'unset !important',
        },
        '& .col-lg-4': {
            marginBottom: 20,
        },
    },
    btnWishlist: {
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            margin: '5px auto',
        },
        [theme.breakpoints.up('sm')]: {
            width: 'fit-content',
            marginLeft: 15,
        },
        '&.btn-share': {
            background: '#06aec9',
            '&:before': {
                content: '"\\e90e"',
                fontFamily: 'icomoon',
                color: '#FFFFFF',
            },
        },
        '&.btn-addtobag': {
            background: '#f58732',
        },
        '& span': {
            fontWeight: 400,
            letterSpacing: 0,
            fontSize: 14,
        },
    },
    itemContainer: {
        marginLeft: -10,
    },
    tabelPagination: {
        marginTop: 20,
        '& .MuiPagination-root': {
            display: 'flex',
            justifyContent: 'center',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'nowrap',
            },
            '& .MuiPagination-ul': {
                marginTop: 10,
                '& .MuiPaginationItem-page': {
                    color: BLUE_GRAY,
                    fontWeight: 'bold',
                    fontSize: 16,
                },
                '& .Mui-selected, .Mui-selected:hover': {
                    backgroundColor: '#E7F3FF',
                    color: `${ORANGE} !important`,
                },
                '& .MuiPaginationItem-icon': {
                    fontSize: 36,
                },
                '& .MuiPaginationItem-ellipsis': {
                    color: BLUE_GRAY,
                    fontSize: 16,
                },
                '& li:first-child, li:last-child': {
                    '& button.MuiPaginationItem-root': {
                        color: ORANGE,
                        '&.Mui-disabled': {
                            color: '#E7F3FF',
                            opacity: '1',
                        },
                    },
                },
                '& button.MuiPaginationItem-root': {
                    color: BLUE_SECONDARY,
                    '&.Mui-disabled': {
                        color: '#E7F3FF',
                    },
                },
            },
        },
    },
}));

export default useStyles;
