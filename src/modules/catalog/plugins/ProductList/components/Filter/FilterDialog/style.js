import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    WHITE, PRIMARY, GRAY_PRIMARY, BORDER_LIGHT, BORDER_GREY,
} from '@theme_color';
import {
    CreateMargin,
    CreatePadding,
    FlexRow,
    FlexColumn,
    showHide,
} from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: '100%',
        backgroundColor: WHITE,
        [theme.breakpoints.down('sm')]: {
            height: '100%',
        },
    },
    appBar: {
        position: 'relative',
        backgroundColor: WHITE,
        ...CreatePadding(10, 16, 10, 16),
        boxShadow: 'none',
        borderBottom: `1px solid ${BORDER_LIGHT}`,
        height: '61px',
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnClose: {
        padding: 0,
        opacity: 0.5,
    },
    iconClose: {
        color: PRIMARY,
        '& .MuiSvgIcon-root': {
            width: 30,
            height: 30,
        },
    },
    title: {
        fontSize: 16,
        width: '100%',
    },
    body: {
        ...FlexColumn,
        position: 'relative',
        width: '100%',
        '& .MuiAccordion-root:before': {
            display: 'none',
        },
        '& .MuiAccordionSummary-expandIcon': {
            marginRight: '-5px',
            '& .MuiSvgIcon-root': {
                width: 20,
                height: 20,
            },
        },
        '& .MuiAccordion-root, .MuiAccordion-root.Mui-expanded': {
            margin: 0,
        },
        '& .MuiAccordionSummary-root, .MuiAccordionSummary-root.Mui-expanded': {
            minHeight: 0,
            padding: '8px 11px',
            borderBottom: `solid 1px ${BORDER_GREY}`,
            '& .heading': {
                fontSize: 16,
                fontWeight: '700',
            },
            '& .MuiAccordionSummary-content': {
                margin: 0,
            },
            '& .MuiIconButton-root': {
                padding: '0 10px',
            },
        },
    },
    listCategoryWrapper: {
        paddingTop: 0,
        '& .MuiAccordionDetails-root': {
            paddingBottom: 8,
        },
    },
    listCategory: {
        cursor: 'pointer',
        listStyleType: 'none',
        display: 'block',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
        '&:active': {
            backgroundColor: '#dedede',
        },
        '&:focus': {
            backgroundColor: '#dedede',
        },
        '& p': {
            fontWeight: 400,
            color: '#414048',
            fontSize: 16,
            '& .count': {
                color: '#7B9AAF',
            },
        },
    },
    textSearch: {
        ...FlexRow,
        justifyContent: 'space-between',
        ...CreatePadding(0, '15%', 0, 0),
    },
    rmMargin: {
        ...CreateMargin(0, 0, 0, 0),
    },
    result: {
        ...FlexColumn,
        ...CreateMargin(16, 0, 30, 0),
    },
    textValue: {
        ...FlexColumn,
        ...CreateMargin(10, 0, 10, 0),
    },
    ...showHide,
    fieldContainer: {
        ...CreatePadding(10, 30, 10, 30),
        paddingBottom: 18,
        borderBottom: `1px solid ${BORDER_GREY}`,
    },
    fieldContainerLast: {
        ...CreatePadding(10, 30, 10, 30),
        paddingBottom: 18,
        borderBottom: `1px solid ${BORDER_GREY}`,
        marginBottom: 80,
    },
    last: {
        marginBottom: 70,
    },
    footer: {
        ...FlexRow,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-arround',
        position: 'fixed',
        bottom: 0,
        backgroundColor: WHITE,
        borderTop: `1px solid ${GRAY_PRIMARY}`,
        ...CreatePadding(20, 20, 20, 20),
        [theme.breakpoints.up('md')]: {
            width: '20%',
        },
    },
    btnSave: {
        display: 'block',
        margin: 'auto',
        width: 'calc(100% - 12px)',
        height: 41,
    },
}));

export default useStyles;
