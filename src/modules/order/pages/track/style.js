import makeStyles from '@material-ui/core/styles/makeStyles';
import { FlexColumn } from '@theme_mixins';
import {
    BLUE_LIGHT, BLUE_SECONDARY, ORANGE, BLACK,
} from '@theme_color';

export default makeStyles((theme) => ({
    trackOrderWrapper: {
        marginBottom: 50,
    },
    trackOrderView: {
        display: 'grid',
        gridTemplateColumns: '40% 60%',
        border: `3px solid ${BLUE_SECONDARY}`,
        borderRadius: 8,
        minHeight: 750,
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    leftTrackView: {
        padding: 20,
        [theme.breakpoints.down('sm')]: {
            padding: '20px 0px',
        },
    },
    img: {
        margin: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 700,
        marginBottom: 15,
        [theme.breakpoints.down('sm')]: {
            fontSize: 19,
        },
    },
    orderInformation: {
        borderTop: `2px solid ${BLUE_LIGHT}`,
        padding: '15px 0px',
        margin: '0px 20px',
        display: 'flex',
        flexDirection: 'column',
        '& span': {
            margin: 0,
        },
    },
    subInformation: {
        fontSize: 16,
    },
    titleInformation: {
        fontSize: 14,
        fontWeight: 500,
        color: '#7B9AAF',
    },
    trackOrderStatusContainer: {
        backgroundColor: BLUE_LIGHT,
        height: '100%',
        padding: 30,
        '& .MuiPaper-root': {
            backgroundColor: 'transparent',
        },
        '& .MuiTimelineContent-root': {
            padding: '0px 16px',
            '& span': {
                margin: '0px 5px',
            },
        },
        '& .MuiTimelineItem-root': {
            minHeight: 100,
            '& .MuiTimelineConnector-root': {
                border: '1px dashed #bdbdbd',
                backgroundColor: 'unset',
            },
        },
        '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
        },
    },
    leftTrackDetail: {
        display: 'flex',
        flexDirection: 'column',
        gap: 30,
    },
    senderAndRecipient: {
        padding: 20,
        backgroundColor: BLUE_LIGHT,
        borderRadius: 12,
        '& span': {
            fontSize: 14,
            display: 'flex',
        },
    },
    trackOrderExpress: {
        display: 'grid',
        gridTemplateColumns: '35% auto',
        minHeight: 500,
        gap: 20,
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    rightTrackDetail: {
        [theme.breakpoints.up('sm')]: {
            border: `2px solid ${BLUE_SECONDARY}`,
            borderRadius: 8,
            padding: 30,
        },
        '& .track-detail-title': {
            display: 'flex',
            alignItems: 'center',
        },
    },
    trackDetailInformation: {
        [theme.breakpoints.up('sm')]: {
            borderTop: `1px solid ${BLUE_SECONDARY}`,
            borderBottom: `1px solid ${BLUE_SECONDARY}`,
            margin: '20px 0px',
            display: 'grid',
            gridTemplateColumns: '50% 50%',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    titleTrack: {
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        color: BLUE_SECONDARY,
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleSender: {
        color: BLUE_SECONDARY,
        borderBottom: `1px solid ${BLUE_SECONDARY}`,
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 15,
        paddingBottom: 15,
    },
    trackInformation: {
        padding: '15px 0px',
        margin: '0px 20px',
        display: 'flex',
        flexDirection: 'column',
        '& span': {
            margin: 0,
        },
        [theme.breakpoints.down('sm')]: {
            margin: 0,
        },
    },
    btnTrack: {
        backgroundColor: ORANGE,
        '&:hover': {
            backgroundColor: ORANGE,
            opacity: '0.8',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    linkBack: {
        color: ORANGE,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 50,
        },
        '& :hover': {
            textDecoration: 'underline',
        },
    },
    contentTimeline: {
        ...FlexColumn,
        padding: '0 10px',
    },
    activeDot: {
        backgroundColor: `${ORANGE} !important`,
        boxShadow: `0 0px 15px ${ORANGE} !important`,
        width: 20,
        height: 20,
    },
    notActiveDot: {
        backgroundColor: '#C1DFF3 !important',
        width: 20,
        height: 20,
        boxShadow: 'none',
    },
    dateTrackOrder: {
        color: '#7B9AAF',
        fontSize: 14,
    },
    statusTrackOrderActive: {
        fontSize: 16,
        color: BLUE_SECONDARY,
    },
    statusTrackOrder: {
        fontSize: 16,
        color: '#7B9AAF',
    },
    descTrackOrderLatest: {
        fontSize: 14,
        color: BLACK,
        fontWeight: 'bold',
    },
    descTrackOrder: {
        fontSize: 14,
        color: '#7B9AAF',
    },
    // timelineOrder: {
    //     padding: '0 10px',
    //     '& .MuiTimelineItem-missingOppositeContent:before': {
    //         flex: 0,
    //         padding: 0,
    //     },
    //     '& span': {
    //         margin: 0,
    //     },
    //     '& .MuiTimelineConnector-root': {
    //         borderLeft: '2px dotted #7B9AAF',
    //         background: 'transparent',
    //     },
    // },
}));
