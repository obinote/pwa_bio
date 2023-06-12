import makeStyles from '@material-ui/core/styles/makeStyles';
import { WHITE, RED, ORANGE } from '@theme_color';
import {
    CenterAbsolute,
    FlexColumn,
    CreateMargin,
    CreatePadding,
} from '@theme_mixins';
import { FONT_16 } from '@theme_typography';

export default makeStyles((theme) => ({
    container: {
        ...CreatePadding(23, 23, 23, 23),
        backgroundColor: '#F2F9FF',
        borderRadius: 8,
        ...CreateMargin(14, 0, 14, 0),

    },
    mobileRemoveColor: {
        [theme.breakpoints.down('md')]: {
            backgroundColor: 'transparent',
            padding: 0,
        },
    },
    rightWrapper: {
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    qtyWrapper: {
        display: 'flex',
        padding: 0,
        height: 48,
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    btnAddToCard: {
        [theme.breakpoints.down('sm')]: {
            ...CenterAbsolute,
        },
        [theme.breakpoints.up('sm')]: {
            // width: 316,
        },
        ...CreateMargin(0, 8, 0, 0),
        width: '100%',
        height: 46,
        bottom: 0,
        left: 0,
        opacity: 'none',
        color: WHITE,
        borderRadius: 100,
        backgroundColor: ORANGE,
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: ORANGE,
            boxShadow: 'none',
        },
    },
    textBtnAddToCard: {
        ...FONT_16,
        color: `${WHITE} !important`,
        fontWeight: 400,
    },
    error: {
        color: RED,
    },
    qty: {
        [theme.breakpoints.down('sm')]: {
            ...CreateMargin(0, 15, 30, 15),
            alignItems: 'center',
        },
        ...CreateMargin(0, 15, 30, 0),
        ...FlexColumn,
    },

    actionIcon: {
        fill: ORANGE,
    },
    btnAction: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'none',
        cursor: 'pointer',
        marginLeft: 20,
        '& span': {
            display: 'none',
        },
    },
    btnActionText: {
        color: '#414048',
        marginLeft: 5,
    },
    colLoginInfo: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            justifyContent: 'start',
            alignItems: 'center',
        },
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    textLoginInfo: {
        ...FONT_16,
        fontWeight: 400,
    },
    iconMoon: {
        '&::before': {
            color: '#f58732',
            fontSize: 17,
        },
    },
    iconChat: {
        '&::before': {
            color: '#f58732',
            fontSize: 21,
        },
    },
}));
