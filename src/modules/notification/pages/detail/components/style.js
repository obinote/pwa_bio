import makeStyles from '@material-ui/core/styles/makeStyles';
import { ORANGE } from '@root/core/theme/colors';

export default makeStyles(() => ({
    wrapperNotificationDetail: {
        padding: 0,
        '& > h1': {
            margin: '0 0 36px 0',
            fontSize: 30,
        },
        '& h2': {
            margin: '5px 0 !important',
        },
        '& .time': {
            letterSpacing: '0.28',
            margin: '0 0 16px 0',
        },
        '& .content-detail': {
            fontSize: 14,
            '& .greeting, & p': {
                marginBottom: '0 !important',
            },
        },
        '& .back': {
            marginTop: 35,
            '& a': {
                color: ORANGE,
                textTransform: 'capitalize',
            },
        },
    },
}));
