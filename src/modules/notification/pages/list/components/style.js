import makeStyles from '@material-ui/core/styles/makeStyles';
import { ORANGE } from '@root/src/theme/colors';

export default makeStyles((theme) => ({
    wrapperNotificationList: {
        paddingLeft: 0,
        paddingRight: 0,
        '& .title-column': {
            display: 'flex',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            padding: '10px 0',
            '& .col': {
                fontSize: 14,
                fontWeight: 'bold',
                '&.col-time': {
                    width: '25%',
                },
                '&.col-subject': {
                    width: '75%',
                    paddingLeft: 10,
                },
            },
        },
        '& .MuiList-root': {
            padding: '0',
            '& .MuiListItem-root': {
                padding: '10px 0',
            },
        },
        '& .item-text-notif': {
            display: 'flex',
            flexWrap: 'wrap',
            margin: 0,
            '& > span': {
                width: '25%',
                '& > span': {
                    fontWeight: 400,
                },
            },
            '& > p': {
                width: '75%',
                paddingLeft: 10,
                fontWeight: 400,
                '& > span': {
                    fontWeight: 400,
                },
            },
            [theme.breakpoints.down('xs')]: {
                '& > span': {
                    width: '100%',
                },
                '& > p': {
                    width: '100%',
                    paddingLeft: 0,
                },
            },
            '& .unread': {
                color: ORANGE,
            },
        },
    },
    tabelPagination: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 80,
        },
    },
}));
