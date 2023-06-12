import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    CreatePadding, FlexColumn, FlexRow, CreateMargin,
} from '@theme_mixins';

export default makeStyles((theme) => ({
    wrapper: {
        padding: 25,
        border: '1px solid rgba(224, 224, 224, 1)',
    },
    block: {
        // ...CreateBorder(0, 0, '1px', 0, GRAY_PRIMARY),
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
        // eslint-disable-next-line no-useless-computed-key
        ['@media (max-width:560px)']: {
            '& #status_label': {
                marginLeft: '0px !important',
            },
        },
    },
    blockContainer: {
        // ...CreateMargin(30, 30, 0, 30),
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 1200,
        // ...FlexColumn,
    },
    headerTitle: {
        fontSize: '2rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem',
        },
        display: 'flex',
        alignItems: 'center',
    },
    detail: {
        paddingTop: 0,
        alignItems: 'center',
        textAlign: 'center',
    },

    labelDetail: {
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
    logo_container: {
        ...FlexRow,
        paddingBottom: 30,
        justifyContent: 'space-between',
    },
    header_title_cont: {
        ...FlexRow,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
    },
    footer_cont: {
        ...FlexRow,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
    },
    lineSeparator: {
        borderBottom: '8px solid #F2F4F7',
        opacity: 1,
    }
    // labelSummaryDiscountDetail: {
    //     paddingLeft: 10,
    // },
}));
