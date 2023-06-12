/* eslint-disable linebreak-style */
import makeStyles from '@material-ui/core/styles/makeStyles';

export default makeStyles((theme) => ({
    wrapperDashboard: {
        padding: 0,
        '& *': {
            letterSpacing: 0,
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: 4,
        },
        '& .wrapper-header-dashboard': {
            '& .header-dashboard-title': {
                marginBottom: 12,
                '& .dashboard-title': {
                    fontSize: '30px',
                    color: '#414048',
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 26,
                    },
                },
            },
            '& .header-dashboard-subtitle': {
                marginBottom: 30,
                flexWrap: 'wrap',
                rowGap: '1rem',
                [theme.breakpoints.down('xs')]: {
                    marginBottom: 15,
                    '& .header-dashboard-email': {
                        marginBottom: 20,
                    },
                },
                [theme.breakpoints.up('sm')]: {
                    display: 'flex',
                    justifyContent: 'space-between',
                },
                '& .header-dashboard-email': {
                    marginRight: '3rem',
                    '& .vendor-title': {
                        fontWeight: '600',
                    },
                    '& h4': {
                        fontSize: '14px',
                        color: '#414048',
                        fontWeight: '400',
                        marginBottom: 5,
                        marginTop: 0,
                    },
                    '& .header-dashboard-email-content': {
                        marginTop: 0,
                        display: 'flex',
                        alignItems: 'end',
                        '& .header-edit': {
                            position: 'relative',
                            top: '-7px',
                            marginLeft: '10px',
                            '& .icon-header-edit': {
                                '&:before': {
                                    content: 'url(/assets/img/icon-edit-requisition.png)',
                                },
                            },
                        },
                    },
                },
                '& .header-dashboard-point-voucher': {
                    display: 'flex',
                    alignItems: 'center',
                    maxWidth: 318,
                    flexGrow: 1,
                    justifyContent: 'space-between',
                    [theme.breakpoints.up('sm')]: {
                        paddingRight: 20,
                    },
                    '& .header-dashboard-point': {
                        display: 'flex',
                        alignItems: 'center',
                        '& .dashboard-point': {
                            '&:before': {
                                content: 'url(/assets/img/icon-dashboard-point.svg)',
                            },
                        },
                        '& .dashboard-point-content': {
                            marginLeft: '15px',
                            '& span': {
                                display: 'block',
                                margin: 0,
                                fontSize: '12px',
                                lineHeight: '1.3',
                                color: '#414048 !important',
                            },
                            '& .span-point': {
                                fontSize: '14px',
                            },
                        },
                    },
                    '& .header-dashboard-voucher': {
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '30px',
                        '& .dashboard-voucher': {
                            '&:before': {
                                content: 'url(/assets/img/icon-dashboard-voucher.svg)',
                            },
                        },
                        '& .dashboard-voucher-content': {
                            marginLeft: '15px',
                            '& span': {
                                display: 'block',
                                margin: 0,
                                fontSize: '12px',
                                lineHeight: '1.3',
                                color: '#414048 !important',
                            },
                            '& .span-point': {
                                fontSize: '14px',
                            },
                        },
                    },
                },
            },
        },
        '& .wrapper-level': {
            borderRadius: 8,
            padding: '20px 30px',
            marginTop: '20px',
            [theme.breakpoints.down('sm')]: {
                marginTop: 15,
                padding: '20px 13px',
            },
            '& .level-content': {
                display: 'flex',
                flexWrap: 'wrap',
                [theme.breakpoints.down('sm')]: {
                    '& .level-content-left': {
                        width: '100%',
                        paddingLeft: 7,
                    },
                    '& .level-content-right': {
                        width: '100%',
                        marginTop: '10px',
                    },
                },
                [theme.breakpoints.up('sm')]: {
                    '& .level-content-left': {
                        width: '30%',
                    },
                    '& .level-content-right': {
                        width: '70%',
                    },
                },
                '& .level-content-left': {
                    display: 'flex',
                    alignItems: 'center',
                    '& .level-name': {
                        marginLeft: 20,
                        [theme.breakpoints.down('sm')]: {
                            marginLeft: 10,
                        },
                        '& span': {
                            margin: 0,
                            lineHeight: 'normal',
                        },
                        '& .inner-normal': {
                            color: '#414048',
                            display: 'block',
                        },
                        '& .inner-bold': {
                            fontSize: '18px',
                            color: '#414048',
                            fontWeight: 'bold',
                        },
                    },
                },
                '& .level-content-right': {
                    '& .level-name': {
                        [theme.breakpoints.down(400)]: {
                            '& span': {
                                fontSize: 11,
                            },
                        },
                        '& .inner-normal': {
                            [theme.breakpoints.down('sm')]: {
                                width: '75%',
                            },
                            color: '#414048',
                            display: 'block',
                            margin: '0',
                        },
                        '& .level-progress': {
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            [theme.breakpoints.up('sm')]: {
                                height: 'auto',
                            },
                            '& .MuiLinearProgress-colorPrimary': {
                                height: 6,
                                borderRadius: '3px',
                                backgroundColor: '#FFFFFF',
                                margin: '10px 0',
                                width: '95%',
                                float: 'left',
                                [theme.breakpoints.up(400)]: {
                                    width: '96%',
                                },
                                [theme.breakpoints.up(600)]: {
                                    width: 'calc(100% - 30px)',
                                },
                                '& .MuiLinearProgress-barColorPrimary': {
                                    backgroundColor: '#06AEC9',
                                    borderRadius: '3px',
                                },
                            },
                            '& .level-icon-small': {
                                [theme.breakpoints.down('xs')]: {
                                    alignItems: 'end !important',
                                },
                                [theme.breakpoints.down('sm')]: {
                                    right: 0,
                                    top: '-25px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                },
                                [theme.breakpoints.up('sm')]: {
                                    right: '0',
                                    top: '-26px',
                                },
                                textAlign: 'center',
                                position: 'absolute',
                                '& .progress-name': {
                                    fontSize: '12px',
                                    color: '#414048',
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase',
                                    display: 'block',
                                    [theme.breakpoints.down('sm')]: {
                                        margin: '5px 0px',
                                    },
                                },
                            },
                        },
                        '& .membership-program': {
                            '& span': {
                                color: '#414048',
                                margin: '0',
                                textDecoration: 'underline',
                            },
                        },
                    },
                },
            },
        },
        '& .wrapper-level.null': {
            backgroundColor: '#FFF2E9',
            border: '1px solid #FFF2E9',
            '& .level-content': {
                '& .level-content-left': {
                    '& .level-icon-big': {
                        '&:before': {
                            content: 'url(/assets/img/icon-level-bronze-big.svg)',
                        },
                    },
                },
                '& .level-content-right': {
                    '& .level-name': {
                        '& .level-progress': {
                            '& .level-icon-small': {
                                '&:after': {
                                    content: 'url(/assets/img/icon-level-silver-small.svg)',
                                },
                            },
                        },
                    },
                },
            },
        },
        '& .wrapper-level.undefined': {
            backgroundColor: '#FFF2E9',
            border: '1px solid #FFF2E9',
            '& .level-content': {
                '& .level-content-left': {
                    '& .level-icon-big': {
                        '&:before': {
                            content: 'url(/assets/img/icon-level-bronze-big.svg)',
                        },
                    },
                },
            },
        },
        '& .wrapper-level.Bronze': {
            backgroundColor: '#FFF2E9',
            border: '1px solid #FFF2E9',
            '& .level-content': {
                '& .level-content-left': {
                    '& .level-icon-big': {
                        '&:before': {
                            content: 'url(/assets/img/icon-level-bronze-big.svg)',
                        },
                    },
                },
                '& .level-content-right': {
                    '& .level-name': {
                        '& .level-progress': {
                            '& .level-icon-small': {
                                '&:after': {
                                    content: 'url(/assets/img/icon-level-silver-small.svg)',
                                },
                            },
                        },
                    },
                },
            },
        },
        '& .wrapper-level.Silver': {
            backgroundColor: '#F2F9FF',
            border: '1px solid #F2F9FF',
            '& .level-content': {
                '& .level-content-left': {
                    '& .level-icon-big': {
                        '&:before': {
                            content: 'url(/assets/img/icon-level-silver-big.svg)',
                        },
                    },
                },
                '& .level-content-right': {
                    '& .level-name': {
                        '& .level-progress': {
                            '& .level-icon-small': {
                                '&:after': {
                                    content: 'url(/assets/img/icon-level-gold-small.svg)',
                                },
                            },
                        },
                    },
                },
            },
        },
        '& .wrapper-level.Gold': {
            backgroundColor: '#FFF9E1',
            border: '1px solid #FFF9E1',
            '& .level-content': {
                '& .level-content-left': {
                    '& .level-icon-big': {
                        '&:before': {
                            content: 'url(/assets/img/icon-level-gold-big.svg)',
                        },
                    },
                },
                '& .level-content-right': {
                    '& .level-name': {
                        '& .level-progress': {
                            '& .level-icon-small': {
                                '&:after': {
                                    content: 'url(/assets/img/icon-level-platinum-small.svg)',
                                },
                            },
                        },
                    },
                },
            },
        },
        '& .wrapper-level.Platinum': {
            backgroundColor: '#414048',
            border: '1px solid #414048',
            '& .level-content': {
                '& .level-content-left': {
                    '& .level-icon-big': {
                        '&:before': {
                            content: 'url(/assets/img/icon-level-platinum-big.svg)',
                        },
                    },
                    '& .level-name .inner-normal, & .level-name .inner-bold': {
                        color: '#fff',
                    },
                },
                '& .level-content-right': {
                    '& .level-name': {
                        '& .level-progress': {
                            '& .level-icon-small': {
                                '&:after': {
                                    content: 'url(/assets/img/icon-level-platinum-small.svg)',
                                },
                                '& .progress-name': {
                                    color: '#fff',
                                },
                            },
                        },
                        '& .inner-normal': {
                            color: '#fff',
                        },
                        '& .membership-program span': {
                            color: '#fff',
                        },
                    },
                },
            },
        },
        '& .wrapper-report-dashboard': {
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            border: '1px solid #E8EDF1',
            padding: 20,
            marginTop: '20px',
            [theme.breakpoints.down('sm')]: {
                padding: '20px 15px',
                marginTop: 10,
            },
            '& .report-dashboard-header': {
                padding: '0 4px',
                display: 'flex',
                alignItems: 'center',
                marginBottom: 15,
                [theme.breakpoints.down('sm')]: {
                    padding: 0,
                },
                [theme.breakpoints.up('sm')]: {
                    '& .report-title': {
                        width: '50%',
                    },
                    '& .report-seeall-report': {
                        width: '50%',
                    },
                },
                '& .report-title': {
                    margin: 0,
                    fontSize: '18px',
                    color: '#414048',
                    letterSpacing: 0,
                },
                '& .report-seeall-report': {
                    '& span': {
                        textAlign: 'right',
                        margin: 0,
                        color: '#F58732',
                        display: 'block',
                        letterSpacing: 0,
                    },
                },
            },
            '& .report-dashboard-content': {
                '& .dashboard-content': {
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: 0,
                    margin: '0 -8px',
                    [theme.breakpoints.down('sm')]: {
                        margin: 0,
                    },
                    [theme.breakpoints.between('sm', 'sm')]: {
                        margin: '0 -5px',
                    },
                    '& >li': {
                        padding: 8,
                        display: 'block',
                        [theme.breakpoints.down('sm')]: {
                            width: '100%',
                            padding: 0,
                        },
                        [theme.breakpoints.up('sm')]: {
                            width: '50%',
                        },
                        [theme.breakpoints.up('md')]: {
                            width: '33.33%',
                        },
                        [theme.breakpoints.up('lg')]: {
                            width: '25%',
                        },
                        [theme.breakpoints.between('sm', 'sm')]: {
                            width: 'calc(50% - 10px)',
                            margin: 5,
                        },
                        '& .inner': {
                            backgroundColor: '#F2F9FF',
                            borderRadius: 8,
                            padding: '10px',
                            [theme.breakpoints.down('sm')]: {
                                padding: 16,
                            },
                            '& .inner-bold': {
                                fontSize: '18px',
                                fontWeight: 'bold',
                                letterSpacing: 0,
                                color: '#414048',
                            },
                        },
                    },
                },
            },
        },
        '& .wrapper-notification-dashboard': {
            backgroundColor: '#FFFFFF',
            borderRadius: 8,
            border: '1px solid #E8EDF1',
            paddingTop: 20,
            marginTop: '20px',
            [theme.breakpoints.down('sm')]: {
                marginTop: 10,
            },
            '& .notification-dashboard-header': {
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                [theme.breakpoints.down('sm')]: {
                    '& .notification-title': {
                        width: '35%',
                    },
                    '& .seeall-notification': {
                        width: '65%',
                    },
                },
                [theme.breakpoints.up('sm')]: {
                    '& .notification-title': {
                        width: '50%',
                    },
                    '& .seeall-notification': {
                        width: '50%',
                    },
                },
                '& .notification-title': {
                    margin: 0,
                    fontSize: '18px',
                    color: '#414048',
                    letterSpacing: 0,
                },
                '& .seeall-notification': {
                    '& span': {
                        textAlign: 'right',
                        margin: 0,
                        letterSpacing: 0,
                    },
                },
            },
            '& .notification-dashboard-content': {
                marginTop: '15px',
                '& .dashboard-content': {
                    padding: 0,
                    '& >li': {
                        display: 'block',
                        padding: 0,
                        '& .inner': {
                            '& .inner-header': {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '15px 20px',
                                borderTop: '0.5px solid #E8EDF1',
                                [theme.breakpoints.down('sm')]: {
                                    padding: '10px 15px',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                },
                                '& span': {
                                    width: '50%',
                                    margin: 0,
                                    [theme.breakpoints.down('sm')]: {
                                        width: 'auto',
                                    },
                                },
                                '& .inner-normal': {
                                    fontSize: '14px',
                                    color: '#414048',
                                    display: 'block',
                                    fontWeight: '400',
                                },
                                '& .inner-head': {
                                    color: '#7B9AAF',
                                    display: 'block',
                                },
                                '& .inner-bold': {
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    textAlign: 'right',
                                },
                            },
                        },
                    },
                },
            },
        },
        '& .wrapper-header-dashboard.skeleton': {
            '& .header-dashboard-title': {
                marginBottom: 12,
                '& .dashboard-title': {
                    fontSize: '30px',
                    fontColor: '#414048',
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 26,
                    },
                },
            },
            '& .header-dashboard-subtitle': {
                '& .header-dashboard-email': {
                    [theme.breakpoints.up('sm')]: {
                        width: '50%',
                    },
                    '& .header-dashboard-email-content': {
                        display: 'block',
                    },
                },
                '& .header-dashboard-point-voucher': {
                    '& .header-dashboard-point': {
                        display: 'inline-block',
                    },
                    '& .header-dashboard-voucher': {
                        display: 'inline-block',
                        marginLeft: '30px',
                    },
                },
            },
        },
        '& .wrapper-notification-dashboard.skeleton': {
            padding: '20px !important',
        },
    },
}));
