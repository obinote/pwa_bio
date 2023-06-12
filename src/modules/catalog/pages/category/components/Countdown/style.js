import makeStyles from '@material-ui/core/styles/makeStyles';
import { BLUE_LIGHT } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    wrapperTimer: {
        backgroundColor: BLUE_LIGHT,
        padding: 20,
        borderRadius: '0 0 8px 8px',
        '& .end-in': {
            marginBottom: 8,
            fontWeight: '700',
            textTransform: 'uppercase',
            textAlign: 'center',
        },
        '& .timer': {
            display: 'flex',
            justifyContent: 'center',
            '& .clock': {
                display: 'flex',
                justifyContent: 'center',
                '& > .dots': {
                    display: 'none',
                },
                '& > section': {
                    textAlign: 'center',
                    padding: '0 10px',
                    '& p': {
                        fontSize: 40,
                        fontWeight: 'bold',
                    },
                    '& small': {
                        fontSize: 12,
                    },
                },
            },
            '& .expired + .clock': {
                display: 'none',
            },
            '& .expired': {
                fontSize: 40,
                fontWeight: '700',
            },
        },
    },
    wrapperUpcoming: {
        backgroundColor: BLUE_LIGHT,
        padding: 20,
        borderRadius: '0 0 8px 8px',
        '& .coming-soon': {
            textAlign: 'center',
            marginBottom: 8,
            fontWeight: '700',
            textTransform: 'uppercase',
        },
        '& .items-date': {
            width: '100%',
            maxWidth: '480px',
            margin: '0 auto',
            display: 'flex',
            textAlign: 'center',
            '& .item-date': {
                width: 'calc(50% - 15px)',
                '& .date': {
                    fontSize: 34,
                    fontWeight: '700',
                    [theme.breakpoints.down('xs')]: {
                        fontSize: 18,
                    },
                },
                '& .time': {
                    fontSize: 18,
                    [theme.breakpoints.down('xs')]: {
                        fontSize: 14,
                    },
                },
            },
            '& .until': {
                fontSize: 34,
                width: 30,
                textAlign: 'center',
                [theme.breakpoints.down('xs')]: {
                    fontSize: 18,
                },
            },
        },
    },
}));

export default useStyles;
