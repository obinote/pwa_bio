import { makeStyles } from '@material-ui/core/styles';
import { WHITE } from '@theme_color';
import { FlexColumn, Centering } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        boxShadow: 'none',
        overflowX: 'unset',
    },
    card: {
        width: '100%',
        ...FlexColumn,
        padding: 0,
        borderRadius: 15,
        border: 'unset',
        // boxShadow: '0px 0px 4px 0px rgb(0 0 0 / 15%)',
        // webkitBoxShadow: '0px 0px 4px 0px rgb(0 0 0 / 15%)',
        // mozBoxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.15)',
        [theme.breakpoints.up('md')]: {
            marginBottom: '15px',
        },
    },
    imgItem: {
        width: '80%',
        ...Centering,
        height: 'auto',
        backgroundColor: WHITE,
        margin: '0 auto',
    },
    imgProduct: {
        width: 'auto',
        height: '100%',
    },
    content: {
        display: 'block',
        alignItems: 'start',
        textAlign: 'left',
        width: '100%',
        height: 80,
        '& .product-name': {
            fontSize: 14,
            margin: '15px 0 3px 0',
            letterSpacing: 0,
            fontWeight: 400,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
        },
        '& .price_text': {
            fontSize: 14,
            fontWeight: 400,
        },
        '& span': {
            fontSize: 14,
            letterSpacing: 0,
        },
    },
    action: {
        margin: '10px 0 0 0',
    },
    btnAdd: {
        margin: '0 8px 0 0',
        padding: 0,
        width: '100%',
        borderRadius: 0,
        '&:before': {
            content: "'\\E907'",
            fontFamily: 'icomoon',
            color: '#7b9aaf',
            fontSize: 14,
            lineHeight: '28px',
        },
        '&:hover': {
            backgroundColor: 'unset',
        },
        '& .MuiIconButton-label': {
            justifyContent: 'flex-start',
        },
        '& p': {
            color: '#f58732',
            fontSize: 11,
            [theme.breakpoints.up('sm')]: {
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: 0,
            },
        },
    },
    btnDelete: {
        margin: 0,
        padding: 0,
        width: '100%',
        borderRadius: 0,
        '&:before': {
            content: "'\\e908'",
            fontFamily: 'icomoon',
            color: '#7b9aaf',
            fontSize: 14,
            lineHeight: '28px',
        },
        '&:hover': {
            backgroundColor: 'unset',
        },
        '& .MuiIconButton-label': {
            justifyContent: 'flex-start',
        },
        '& p': {
            color: '#f58732',
            fontSize: 11,
            [theme.breakpoints.up('sm')]: {
                fontSize: 14,
                fontWeight: 400,
                letterSpacing: 0,
            },
        },
    },
}));

export default useStyles;
