import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    GRAY_PRIMARY, WHITE, ORANGE, BLUE,
} from '@theme_color';
import { FlexColumn } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        height: '100%',
        maxWidth: 1280,
        margin: 'auto',
        padding: '0 20px',
        ...FlexColumn,
        [theme.breakpoints.down('sm')]: {
            padding: '0 16px',
            overflowY: 'hidden',
        },
    },
    headContainer: {
        position: 'relative',
        backgroundColor: GRAY_PRIMARY,
        width: '100%',
        height: 'auto',
    },
    headContainerNoBanner: {
        backgroundColor: WHITE,
        height: '40vh',
    },
    header: {
        left: '50%',
        right: '50%',
        top: '11px',
        position: 'absolute',
        borderBottom: 'none',
        fontWeight: 'bold',
    },
    categoryName: {
        margin: 0,
        color: '#414048',
        fontSize: 40,
        fontWeight: 'bold',
    },
    privateEvent: {
        marginBottom: 20,
        '& .banner-event': {
            position: 'relative',
            lineHeight: '0',
            borderRadius: 12,
            overflow: 'hidden',
            '& img': {
                width: '100%',
            },
            '& .caption': {
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                fontWeight: '700',
                color: '#FFFFFF',
                lineHeight: 'normal',
                fontSize: 50,
                padding: 15,
                [theme.breakpoints.down('xs')]: {
                    fontSize: 20,
                },
            },
        },
        '& .wrapper-info': {
            marginTop: 25,
            display: 'flex',
            justifyContent: 'center',
            [theme.breakpoints.down('xs')]: {
                flexWrap: 'wrap',
            },

            '& .label': {
                borderRadius: '8px 0 0 8px',
                backgroundColor: BLUE,
                display: 'flex',
                alignItems: 'center',
                padding: '5px 15px',
                [theme.breakpoints.down('xs')]: {
                    width: '100%',
                    borderRadius: '8px 8px 0 0',
                    padding: '10px 15px',
                    justifyContent: 'center',
                },
                '& .icon': {
                    lineHeight: '0',
                    width: 30,
                    marginRight: 6,
                    '& img': {
                        width: '100%',
                    },
                },
                '& .caption': {
                    color: '#FFFFFF',
                    fontSize: 30,
                    fontWeight: 700,
                    lineHeight: 'normal',
                    [theme.breakpoints.down('xs')]: {
                        fontSize: 20,
                    },
                },
            },
            '& .wrapper-timer': {
                padding: '10px 5px',
                borderRadius: '0 8px 8px 0',
                backgroundColor: ORANGE,
                minWidth: 150,
                [theme.breakpoints.down('xs')]: {
                    width: '100%',
                    borderRadius: '0 0 8px 8px',
                },
                '& .end-in': {
                    fontWeight: 'normal',
                    fontSize: 10,
                    textAlign: 'center',
                    color: '#FFFFFF',
                    marginBottom: 0,
                    textTransform: 'capitalize',
                },
                '& .timer': {
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                    '& .clock': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        '& > .dots': {
                            display: 'inline-block',
                            fontWeight: '700',
                            fontSize: 18,
                        },
                        '& > section': {
                            textAlign: 'center',
                            padding: '0 3px',
                            '& p': {
                                fontSize: 18,
                                fontWeight: 'bold',
                            },
                            '& small': {
                                display: 'none',
                            },
                        },
                    },
                    '& .expired + .clock': {
                        display: 'none',
                    },
                    '& .expired': {
                        fontSize: 18,
                        fontWeight: '700',
                    },
                },
            },
            '& .wrapper-upcoming': {
                padding: '10px 5px',
                borderRadius: '0 8px 8px 0',
                backgroundColor: ORANGE,
                minWidth: 150,
                [theme.breakpoints.down('xs')]: {
                    width: '100%',
                    borderRadius: '0 0 8px 8px',
                },
                '& .coming-soon': {
                    fontWeight: 'normal',
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#FFFFFF',
                    marginBottom: 0,
                    textTransform: 'capitalize',
                },
                '& .items-date': {
                    width: '100%',
                    maxWidth: '480px',
                    margin: '0 auto',
                    display: 'flex',
                    textAlign: 'center',
                    color: '#FFFFFF',
                    '& .item-date': {
                        width: 'calc(50% - 10px)',
                        '& .date': {
                            fontSize: 16,
                            fontWeight: '700',
                            [theme.breakpoints.down('xs')]: {
                                fontSize: 14,
                            },
                        },
                        '& .time': {
                            fontSize: 12,
                            fontWeight: '600',
                        },
                    },
                    '& .until': {
                        fontSize: 16,
                        width: 20,
                        textAlign: 'center',
                        [theme.breakpoints.down('xs')]: {
                            fontSize: 14,
                        },
                    },
                },
            },
        },
    },
}));

export default useStyles;
