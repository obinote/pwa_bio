import makeStyles from '@material-ui/core/styles/makeStyles';
import { ORANGE } from '@root/core/theme/colors';
import { TEXT_SHADE } from '@root/src/theme/colors';

export default makeStyles((theme) => ({
    wrapperPromotion: {
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        [theme.breakpoints.up('lg')]: {
            margin: 0,
        },
        '& .coupon-section': {
            '& .title': {
                marginBottom: 35,
                '& >h2': {
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontSize: 18,
                },
            },
            '& .coupon-items': {
                display: 'flex',
                flexWrap: 'wrap',
                padding: 0,
                margin: '0px -8px 32px -8px',
                [theme.breakpoints.down('sm')]: {
                    gap: 10,
                },
                '& >li': {
                    width: '33.33%',
                    padding: 12,
                    display: 'block',
                    [theme.breakpoints.down('md')]: {
                        width: '50%',
                    },
                    [theme.breakpoints.down('sm')]: {
                        width: '100%',
                    },
                    '& .inner': {
                        boxShadow: '0px 0px 6px #DBDBDB',
                        backgroundColor: '#FFFFFF',
                        borderRadius: 15,
                        height: '100%',
                        position: 'relative',
                        '& .inner-header': {
                            padding: '15px 20px',
                            backgroundImage: 'linear-gradient(to right, #F58732 , #FCB040)',
                            borderTopLeftRadius: '15px',
                            borderTopRightRadius: '15px',
                        },
                        '& .inner-header.null': {
                            backgroundImage: 'linear-gradient(to right, #06AEC9 , #0096AB)',
                        },
                        '& .inner-icon': {
                            // position: 'absolute',
                            // right: '20px',
                            // top: '15px',
                            float: 'right',
                            marginTop: '-20px',
                            '&:before': {
                                content: 'url(/assets/img/icon-voucher.svg)',
                            },
                        },
                        '& .inner-content': {
                            paddingTop: '15px',
                            borderBottomLeftRadius: '15px',
                            borderBottomRightRadius: '15px',
                        },
                        '& .item': {
                            '&.coupon-name': {
                                maxWidth: '290px',
                                '& >span': {
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    textTransform: 'capitalize',
                                    margin: 0,
                                    letterSpacing: 0,
                                    lineHeight: 'normal',
                                    color: '#FFFFFF',
                                },
                            },
                            '&.desc': {
                                marginBottom: 5,
                                padding: '0 20px',
                                '& >span': {
                                    fontSize: 13,
                                    margin: 0,
                                    letterSpacing: 0,
                                    lineHeight: 'normal',
                                    color: TEXT_SHADE,
                                    fontWeight: 400,
                                    display: 'inline-flex',
                                },
                            },
                            '&.coupon-period': {
                                marginBottom: 15,
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 20px',
                                '& .label': {
                                    color: TEXT_SHADE,
                                    fontSize: 12,
                                    fontWeight: '400',
                                    marginRight: 5,
                                    letterSpacing: 0,
                                },
                                '& >span': {
                                    fontSize: 12,
                                    margin: 0,
                                    fontWeight: '400',
                                    letterSpacing: 0,
                                    lineHeight: 'normal',
                                    color: TEXT_SHADE,
                                },
                            },
                            '&.coupon-code': {
                                borderTop: '2px dashed #00000029',
                                padding: '0 20px',
                                '& .label': {
                                    color: TEXT_SHADE,
                                    fontSize: 12,
                                    fontWeight: '700',
                                    marginBottom: 2,
                                },
                                '& .value': {
                                    display: 'inline-flex',
                                    width: '100%',
                                    height: 40,
                                    '& .box': {
                                        width: 'calc(100% - 72px)',
                                        borderWidth: '1px 0 1px 1px',
                                        borderColor: '#ffffff',
                                        borderStyle: 'solid',
                                        borderRadius: '5px 0 0 5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        '& >span': {
                                            fontSize: 14,
                                            fontWeight: '700',
                                            margin: 0,
                                            letterSpacing: 'normal',
                                            lineHeight: 'normal',
                                            color: TEXT_SHADE,
                                        },
                                    },
                                    '& .action': {
                                        width: 72,
                                        display: 'flex',
                                        alignItems: 'center',
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '17px',
                                            color: '#7B9AAF',
                                        },
                                        '& >button': {
                                            height: 40,
                                            padding: '6px 3px',
                                            width: '100%',
                                            borderRadius: '0 5px 5px 0',
                                            color: '#F58732',
                                            backgroundColor: '#FFFFFF',
                                        },
                                    },
                                },
                            },
                        },
                        '& .tnc': {
                            display: 'inline-block',
                            fontSize: 13,
                            marginTop: 13,
                            padding: 0,
                            textTransform: 'capitalize',
                            color: ORANGE,
                            borderRadius: 4,
                            fontWeight: '400',
                            '&:hover': {
                                backgroundColor: 'transparent',
                            },
                        },
                    },
                },
            },
        },
    },
    wrapperSkeleton: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 0,
        paddingRight: 0,
        [theme.breakpoints.up('lg')]: {
            margin: 0,
        },
        [theme.breakpoints.down('sm')]: {
            gap: 10,
        },
        '& > li': {
            width: '50%',
            padding: 8,
            [theme.breakpoints.down('md')]: {
                width: '50%',
            },
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
            '& .MuiSkeleton-root': {
                paddingBottom: '30%',
                width: '100%',
                borderRadius: 15,
            },
        },
    },
    displayNone: {
        display: 'none',
    },
    tabelPagination: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: 80,
        },
    },
    highlightProductArea: {
        display: 'flex',
        flexFlow: 'row wrap',
        margin: '0 -8px',
    },
    highlightProductItem: {
        width: 'calc(20% - 16px)',
        margin: 8,
        display: 'block',
        [theme.breakpoints.down('md')]: {
            width: 'calc(25% - 16px)',
        },
        [theme.breakpoints.down('sm')]: {
            width: 'calc(33.333% - 16px)',
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(50% - 16px)',
        },
    },
    voucherEmptyWrapper: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
    },
}));
