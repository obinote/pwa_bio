import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreateMargin, CreatePadding } from '@theme_mixins';
import { PRIMARY, BLUE_LIGHT, } from '@theme_color';

export const useStyles = makeStyles(() => ({
    container: {
        ...CreateMargin(15, 0, 30, 0),
    },
    icon: {
        fontSize: 16,
        color: PRIMARY,
    },
    imgList: {
        maxWidth: 50,
        maxHeight: 25,
        right: 0,
    },
}));

export const ExpanPanelStyle = {
    root: {
        border: '0',
        background: BLUE_LIGHT,
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
            marginBottom: '10px',
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
            marginBottom: '10px',
        },
    },
    expanded: {},
};

export const ExpanSummaryStyle = {
    root: {
        borderBottom: '0',
        height: 40,
        paddingTop: '10px',
        paddingBottom: '10px',
        '&$expanded': {
            height: 40,
            minHeight: 40,
            paddingTop: '10px',
            paddingBottom: '10px',
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
};

export const ExpanDetailStyle = {
    root: {
        ...CreatePadding(15, 15, 15, 15),
        background: BLUE_LIGHT,
    },
};
