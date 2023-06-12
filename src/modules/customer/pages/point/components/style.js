import makeStyles from '@material-ui/core/styles/makeStyles';
import { BLACK } from '@root/src/theme/colors';

export default makeStyles((theme) => ({
    wrapperPoint: {
        marginTop: '30px',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            marginBottom: 30,
        },
        '& .wrapper-header-point': {
            '& .header-point': {
                backgroundColor: '#F2F9FF',
                padding: '18px 20px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                '& .header-token': {
                    lineHeight: 0,
                    '&:before': {
                        content: 'url(/assets/img/icon-token-big.svg)',
                    },
                },
                '& .header-content': {
                    marginLeft: '18px',
                    '& > span': {
                        display: 'block',
                        margin: 0,
                        letterSpacing: 0,
                        lineHeight: 'normal',
                        '&:first-child': {
                            marginBottom: 2,
                        },
                        '& button': {
                            padding: 5,
                            marginLeft: 5,
                            marginTop: '-4px',
                        },
                    },
                    '& .span-point': {
                        fontSize: '18px',
                    },
                },
            },
        },
        '& .wrapper-content': {
            marginTop: '32px',
            '& .content-point': {
                '& .span-point-title': {
                    fontSize: '18px',
                    marginBottom: '20px',
                    letterSpacing: 0,
                    marginLeft: 0,
                },
                '& .history-point': {
                    padding: '10px 0',
                    borderTop: '0.5px solid #E8EDF1',
                    overflow: 'hidden',
                    [theme.breakpoints.up('sm')]: {
                        '& .history': {
                            float: 'left',
                            width: '70%',
                        },
                        '& .point': {
                            float: 'right',
                            '& .history-value': {
                                marginTop: '5px',
                            },
                        },
                    },
                    '& .history': {
                        '& .span-history': {
                            fontSize: '14px',
                            color: '#414048',
                            fontWeight: 400,
                            letterSpacing: 0,
                            margin: 0,
                        },
                        '& .history-status': {
                            display: 'flex',
                            alignItems: 'center',
                            '& .amount-red': {
                                '& .span-status': {
                                    fontSize: '12px',
                                    color: '#FA2E2C',
                                    marginLeft: 0,
                                },
                            },
                            '& .amount-green': {
                                '& .span-status': {
                                    fontSize: '12px',
                                    color: '#0D9816',
                                    marginLeft: 0,
                                },
                            },
                            '& .span-date': {
                                fontSize: '12px',
                                color: '#7B9AAF',
                                fontWeight: 400,
                                letterSpacing: 0,
                                margin: '5px 0px',
                            },
                        },
                    },
                    '& .point': {
                        '& .amount-green': {
                            display: 'flex',
                            alignItems: 'center',
                            '& .span-value': {
                                fontSize: '18px',
                                color: '#414048',
                                marginLeft: 0,
                            },
                            '& .history-token': {
                                '&:before': {
                                    content: 'url(/assets/img/icon-token-small.svg)',
                                },
                            },
                        },
                        '& .amount-red': {
                            display: 'flex',
                            alignItems: 'center',
                            '& .span-value': {
                                fontSize: '18px',
                                color: '#414048',
                            },
                            '& .history-token': {
                                '&:before': {
                                    content: 'url(/assets/img/icon-token-small.svg)',
                                },
                            },
                        },
                    },
                },
                '& .history-point:last-child': {
                    borderBottom: '0.5px solid #E8EDF1',
                },
            },
        },
    },

    pointPagination: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 80,
        },
    },
    skeleton: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapperDialog: {
        '& .MuiDialog-paperWidthSm': {
            borderRadius: 15,
            maxWidth: 408,
            [theme.breakpoints.down('xs')]: {
                minWidth: 300,
            },
        },
        '& .MuiDialogTitle-root': {
            color: BLACK,
            padding: '16px 20px 5px',
            '& .close-button': {
                position: 'absolute',
                padding: '16px 20px',
                top: 0,
                right: 0,
                color: BLACK,
                '&:hover': {
                    backgroundColor: 'unset',
                },
            },
        },
        '& .MuiDialogContent-root': {
            padding: '8px 20px 20px',
        },
        '& .medbiz-point ol': {
            padding: '0 0 0 16px',
            '& li': {
                fontSize: 14,
                lineHeight: '1.2',
                marginBottom: 3,
                paddingLeft: 10,
            },
        },
        '& .medbiz-point ul': {
            padding: '0 18px',
        },
    },
}));
