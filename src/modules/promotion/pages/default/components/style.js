/* eslint-disable linebreak-style */
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ORANGE_LIGHT, TEXT_SHADE, ORANGE } from '@root/src/theme/colors';

export default makeStyles((theme) => ({
    wrapperPromotion: {
        [theme.breakpoints.down('lg')]: {
            width: '100% !important',
        },
        [theme.breakpoints.up('md')]: {
            width: '100% !important',
            margin: '0 auto !important',
        },
        [theme.breakpoints.between('sm', 'md')]: {
            width: 'fit-content !important',
            margin: '0 auto !important',
        },
        '& .container': {
            maxWidth: '1280px',
            width: '100%',
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        '& .banner-section': {
            marginBottom: 30,
            '& .title': {
                textAlign: 'center',
                marginBottom: 30,
                '& h1': {
                    fontSize: 50,
                    marginBottom: 10,
                },
                '& h3': {
                    fontSize: 18,
                },
            },
            '& .content-banner': {
                '& .banner-big': {
                    marginBottom: 20,
                    '& .pagebuilder-column': {
                        width: '100%',
                        position: 'relative',
                        padding: '9.45% 0',
                        borderRadius: 8,
                        overflow: 'hidden',
                        '& >h2, >h4, >div': {
                            position: 'relative',
                            zIndex: '3',
                            padding: '0 20px',
                            textAlign: 'center',
                        },
                        '& >h2': {
                            fontSize: 50,
                            lineHeight: 'normal',
                            color: '#FFFFFF',
                            [theme.breakpoints.down('sm')]: {
                                fontSize: 20,
                            },
                        },
                        '& >h4': {
                            color: '#FFFFFF',
                            textTransform: 'uppercase',
                            fontSize: 18,
                            margin: '5px 0 20px 0',
                            [theme.breakpoints.down('xs')]: {
                                fontSize: 14,
                            },
                        },
                        '& .pagebuilder-button-link': {
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: ORANGE,
                            height: 46,
                            borderRadius: 25,
                            padding: '0 30px',
                            '& >span': {
                                color: '#FFFFFF',
                                fontSize: 20,
                            },
                        },
                        '& > figure': {
                            '& img': {
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                zIndex: '2',
                                borderRadius: 8,
                            },
                        },
                    },
                },
                '& .banner-small': {
                    '& .pagebuilder-column-group': {
                        flexWrap: 'wrap',
                        margin: '12px -8px',
                        '& .pagebuilder-column': {
                            width: '33.333%',
                            padding: 12,
                            [theme.breakpoints.down('sm')]: {
                                width: '100%',
                            },
                            '& figure': {
                                lineHeight: 0,
                                overflow: 'hidden',
                                borderRadius: 8,
                                '& img': {
                                    width: '100%',
                                },
                            },
                        },
                    },
                },
            },
        },
        '& .coupon-section': {
            backgroundColor: ORANGE_LIGHT,
            paddingTop: 20,
            paddingBottom: 30,
            marginBottom: '-50px',
            '& .title': {
                marginBottom: 20,
                '& >h2': {
                    textAlign: 'center',
                    textTransform: 'capitalize',
                    fontSize: 50,
                    [theme.breakpoints.down('xs')]: {
                        fontSize: 24,
                    },
                },
            },
            '& .coupon-items': {
                display: 'flex',
                flexWrap: 'wrap',
                padding: 0,
                margin: '0 -8px',
                '& >li': {
                    width: '33.333%',
                    padding: 8,
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
                            padding: '15px 0 47px',
                            borderBottomLeftRadius: '15px',
                            borderBottomRightRadius: '15px',
                            '& .item': {
                                '&.coupon-code': {
                                    width: '100%',
                                    position: 'absolute',
                                    left: '0',
                                    bottom: '0',
                                },
                            },
                        },
                        '& .item': {
                            '&.coupon-name': {
                                maxWidth: '290px',
                                '& >span': {
                                    fontWeight: 700,
                                    fontSize: 18,
                                    textTransform: 'capitalize',
                                    margin: 0,
                                    letterSpacing: 'normal',
                                    lineHeight: 'normal',
                                    color: '#FFFFFF',
                                },
                            },
                            '&.desc': {
                                marginBottom: 15,
                                padding: '0 20px',
                                '& >span': {
                                    fontSize: 13,
                                    margin: 0,
                                    letterSpacing: 'normal',
                                    lineHeight: 'normal',
                                    color: TEXT_SHADE,
                                },
                            },
                            '&.coupon-period': {
                                marginBottom: 15,
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0 20px',
                                '& .label': {
                                    color: TEXT_SHADE,
                                    fontSize: 13,
                                    fontWeight: '300',
                                    marginRight: 5,
                                    lineHeight: 'normal',
                                },
                                '& >span': {
                                    fontSize: 13,
                                    margin: 0,
                                    letterSpacing: 'normal',
                                    lineHeight: 'normal',
                                    color: TEXT_SHADE,
                                },
                            },
                            '&.coupon-code': {
                                padding: '3px 20px',
                                borderTop: '0.5px dashed',
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
        '& .pagebuilder-mobile-hidden': {
            width: '100%',
            borderRadius: '8px',
        },
        '& .pagebuilder-mobile-only': {
            width: '100%',
            borderRadius: '8px',
        },
    },
    wrapperSkeletonCms: {
        maxWidth: '1280px',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        '& > li': {
            width: '33.333%',
            padding: 8,
            [theme.breakpoints.down('sm')]: {
                width: '100%',
            },
            '&:first-child': {
                width: '100%',
            },
            '& .MuiSkeleton-root': {
                width: '100%',
                borderRadius: 10,
                paddingBottom: '30%',
            },
        },
    },
    wrapperSkeleton: {
        maxWidth: '1280px',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
        '& > li': {
            width: '33.333%',
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
    modalTnc: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .inner-tnc': {
            backgroundColor: '#FFFFFF',
            borderRadius: 15,
            padding: 20,
            width: '100%',
            maxWidth: 408,
            position: 'relative',
            boxShadow: '0px 0px 6px #00000029',
            '& >h2': {
                margin: '0 0 8px',
                fontSize: 18,
                fontWeight: '700',
                textTransform: 'capitalize',
            },
            '& .close': {
                position: 'absolute',
                top: 5,
                right: 7,
                width: 35,
                height: 35,
                minWidth: 0,
                opacity: '0.7',
            },
            '& h4': {
                marginBottom: 5,
            },
            '& ul': {
                paddingLeft: 17,
                '& li': {
                    fontSize: 14,
                },
            },
        },
    },
}));
