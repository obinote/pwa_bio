import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    WHITE, PRIMARY, GRAY_PRIMARY,
} from '@theme_color';
import {
    CreateMargin,
    CreatePadding,
    FlexRow,
    FlexColumn,
    showHide,
} from '@theme_mixins';
import { FONT_BIG } from '@theme_typography';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            letterSpacing: 0,
        },
    },
    heading: {
        fontSize: 14,
        color: '#414048',
        fontWeight: theme.typography.fontWeightRegular,
        margin: 0,
    },
    appBar: {
        position: 'relative',
        backgroundColor: WHITE,
        ...CreatePadding(10, 10, 10, 10),
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
        height: '51px',
        ...FlexRow,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnClose: {
        position: 'absolute',
        left: 10,
    },
    iconClose: {
        ...FONT_BIG,
        color: PRIMARY,
    },
    title: {
        justifySelf: 'center',
        ...CreateMargin(16, 0, 16, 0),
    },
    body: {
        ...FlexColumn,
        position: 'relative',
        height: '100%',
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
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
    },
    fieldContainerLast: {
        ...CreatePadding(10, 30, 10, 30),
        paddingBottom: 18,
        borderBottom: `1px solid ${GRAY_PRIMARY}`,
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
    },
    btnSave: {
        display: 'block',
        margin: 'auto',
        width: 'calc(100% - 12px)',
        height: 41,
    },
    btnSavePrice: {
        float: 'right',
    },
    listCategoryWrapper: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1fr)',
        padding: '5px 20px 12px 20px',
    },
    listCategory: {
        textAlign: 'left',
        border: 'none',
        background: 'none',
        font: 'inherit',
        outline: 'inherit',
        cursor: 'pointer',
        padding: '2px 0',
        listStyleType: 'none',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
        '&:active': {
            backgroundColor: '#dedede',
        },
        '&:focus': {
            backgroundColor: '#dedede',
        },
        '& span': {
            fontWeight: 400,
            margin: 0,
            color: '#414048',
            '& .count': {
                color: '#7B9AAF',
            },
        },
    },
    checkboxCustom: {
        display: 'block',
        paddingRight: 0,
    },
    shoppingOption: {
        marginBottom: 32,
        display: 'block',
        fontSize: 12,
    },
    filterContainer: {
        borderRadius: 8,
        boxShadow: '0px 0px 5px 0px rgb(0 0 0 / 15%)',
        padding: 0,
        '& > div:not(:last-child) > div': {
            borderBottom: '1px solid #E8EDF1',
        },
        '& > div:last-child > div:first-child': {
            border: 0,
            '&.Mui-expanded': {
                borderBottom: '1px solid #E8EDF1',
            },
        },
        '& > div:not(:first-child).Mui-expanded': {
            margin: 0,
        },
        '& .MuiButtonBase-root': {
            padding: '10px 12px',
            '& > .MuiButtonBase-root': {
                padding: '0 10px',
                '& svg': {
                    fontSize: 20,
                },
            },
        },
        '& .MuiAccordionSummary-content': {
            margin: 0,
            '& span': {
                fontSize: 14,
                fontWeight: '600',
            },
        },
        '& .Mui-expanded': {
            minHeight: '0 !important',
        },
        '& .MuiAccordion-rounded:first-child': {
            borderRadius: '8px 8px 0 0',
            marginBottom: 0,
        },
        '& .MuiAccordion-rounded:last-child': {
            borderRadius: '0 0 8px 8px',
            marginTop: 0,
        },
    },
    accordion: {
    },
}));

export default useStyles;
