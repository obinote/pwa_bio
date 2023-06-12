import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn, FlexRow, CreateMargin,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    wrapper: {
        padding: 25,
        border: '1px solid rgba(224, 224, 224, 1)',
        '& .MuiTable-root .MuiTableCell-root': {
            [theme.breakpoints.down('md')]: {
                padding: 8,
            },
        },
    },
    block: {
        ...CreatePadding(30, 30, 0, 30),
        ...FlexColumn,
    },
    blockHeader: {
        ...CreatePadding(30, 30, 0, 30),
        ...FlexColumn,
        '& #status_label': {
            border: '2px solid #cccccc',
            padding: '3px',
            marginLeft: '10px !important',
        },
    },
    blockContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 1200,
    },
    headerTitle: {
        fontSize: '2rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem',
        },
        display: 'flex',
        alignItems: 'center',
        marginLeft: '0.5rem !important',
    },
    detail: {
        paddingTop: 0,
        alignItems: 'center',
        textAlign: 'center',
    },

    labelDetail: {
        ...CreateMargin(30, 0, 0, 0),
        [theme.breakpoints.down('xs')]: {
            textAlign: 'left',
        },
    },
    labelDetailSm: {
        ...CreateMargin(10, 0, 0, 0),
        [theme.breakpoints.down('xs')]: {
            textAlign: 'left',
        },
    },

    listSummary: {
        ...FlexRow,
        justifyContent: 'space-between',
        paddingRight: 10,
    },
    blockLabel: {
        fontSize: 25,
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
        },
    },
    wrapperSummaryDiscountDetail: {
        textAlign: 'left',
        paddingLeft: 10,
    },
}));
