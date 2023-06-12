import { makeStyles } from '@material-ui/core/styles';
import {
    WHITE, BLACK, GREEN, GRAY_SECONDARY, BLUE_LIGHT, BLUE_SECONDARY, BLUE_PRIMARY, GRAY_THIRD, ORANGE, BLUE_DARK,
} from '@theme_color';
import { Centering } from '@theme_mixins';

const useStyles = makeStyles(() => ({
    alert: {
        margin: 5,
        fontSize: 12,
    },

    miniCartPop: {
        zIndex: '1000 !important',
        '& >.MuiPaper-root': {
            overflowY: 'hidden',
        },
    },

    miniCartDrawer: {
        width: '85vw',
        height: '100vh',
        backgroundColor: WHITE,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',

        '& .mini-top': {
            position: 'relative',
            top: 0,
            left: 0,
            height: 60,
            width: '100%',
            backgroundColor: WHITE,
            color: BLACK,
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            '& .mini-top-inner-container': {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                '& span': {
                    cursor: 'pointer',
                },
                '& .cart-title': {
                    fontWeight: 'bold',
                },
                '& .close-btn': {
                    fontSize: 22,
                    fontWeight: 'thin',
                    color: GRAY_THIRD,
                },
            },
        },
        '& .mini-bottom': {
            position: 'absolute',
            backgroundColor: BLUE_LIGHT,
            bottom: 0,
            left: 0,
            height: 200,
            width: '100%',
            fontWeight: 'bold',

            '& .sub-total': {
                color: BLUE_SECONDARY,
                height: 50,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 20px',
                borderTop: `solid ${BLUE_PRIMARY} 1px`,
                borderBottom: `solid ${BLUE_PRIMARY} 1px`,
            },
            '& .view-edit-btn-container': {
                padding: '10px 20px',
                '& .view-edit-btn': {
                    backgroundColor: ORANGE,
                    fontSize: 19,
                    textTransform: 'none',
                    fontWeight: 'normal',
                },
            },
            '& .checkout': {
                minHeight: 50,
                paddingBottom: 10,
                width: '100%',
                color: WHITE,
                cursor: 'pointer',
                textTransform: 'uppercase',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0px 20px 0px 20px',
            },
            '& .checkout-button': {
                backgroundColor: ORANGE,
                margin: '14px auto 0px auto',

                padding: 10,
                borderRadius: 60,
                cursor: 'pointer',
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 19,
                fontWeight: 'normal',
                textTransform: 'none',
            },
            '& .disabled-button': {
                backgroundColor: GRAY_SECONDARY,
            },
            '& .btn-paypal': {
                padding: '10px 5%',
            },
        },

        '& .wrapper-item-container': {
            height: 'calc(100vh - 200px)',
            overflowY: 'auto',
        },
        '& .item-list-container': {
            '& .vendor-name': {
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                borderTop: `1px solid ${BLUE_PRIMARY}`,
                '& > span': {
                    fontSize: '15px',
                },
                '& .label': {
                    paddingLeft: '7px',
                    width: 'calc(100% - 15px)',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    lineHeight: 'normal',
                },
            },
            '&.disabled-submit-quote': {
                '& input': {
                    pointerEvents: 'none',
                },
                '& .product-item-pricing': {
                    position: 'relative',
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        left: '-2px',
                        top: '-2px',
                        width: 'calc(100% + 4px)',
                        height: 'calc(100% + 4px)',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        cursor: 'not-allowed',
                    },
                },
            },
        },
        '& .view-edit-btn-container': {
            padding: '15px 16px',
            borderTop: `solid ${BLUE_PRIMARY} 1px`,
            '& .view-edit-btn': {
                paddingTop: 7,
                paddingBottom: 7,
                backgroundColor: ORANGE,
                fontSize: 16,
                textTransform: 'none',
                fontWeight: 'normal',
            },
        },
    },

    miniCartModal: {
        backgroundColor: WHITE,
        width: 427,
        '& .mini-top': {
            width: '100%',
            padding: '16px 20px 16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 13,
            color: '#7b9aaf',
            '& .close-btn': {
                cursor: 'pointer',
            },
        },
        '& .wrapper-item-container': {
            maxHeight: 350,
            overflowY: 'auto',
        },
        '& .item-list-container': {
            '& .vendor-name': {
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                borderTop: `1px solid ${BLUE_PRIMARY}`,
                '& > span': {
                    fontSize: '15px',
                },
                '& .label': {
                    paddingLeft: '7px',
                    width: 'calc(100% - 15px)',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    lineHeight: 'normal',
                },
            },
            '&.disabled-submit-quote': {
                '& input': {
                    pointerEvents: 'none',
                },
                '& .product-item-pricing': {
                    position: 'relative',
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        left: '-2px',
                        top: '-2px',
                        width: 'calc(100% + 4px)',
                        height: 'calc(100% + 4px)',
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        cursor: 'not-allowed',
                    },
                },
            },
        },
        '& .view-edit-btn-container': {
            padding: '15px 16px',
            borderTop: `solid ${BLUE_PRIMARY} 1px`,
            '& .view-edit-btn': {
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: ORANGE,
                fontSize: 19,
                textTransform: 'none',
                fontWeight: 'normal',
            },
        },
    },

    miniCartItemContainer: {
        listStyle: 'none none',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '100%',
        padding: 0,
        margin: 0,
        '& li': {
            width: '100%',
            padding: ' 16px 20px 16px 20px',
            position: 'relative',
            borderTop: `solid ${BLUE_PRIMARY} 1px`,
            '& .product': {
                minHeight: 80,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: '20px',
                '& .oos-info': {
                    paddingTop: 10,
                    marginBottom: 5,
                    '& .oos-info-content': {
                        padding: 5,
                        borderRadius: 10,
                        fontSize: 10,
                        color: 'rgb(102, 9, 27)',
                        backgroundColor: 'rgb(255, 231, 236)',
                    },
                },
            },
            '& .product-item-photo': {
                width: '75px',
                position: 'relative',
                '& span': {
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    zIndex: 1,
                    minWidth: 15,
                    minHeight: 10,
                    backgroundColor: GREEN,
                    color: WHITE,
                    fontWeight: '700',
                    fontSize: 8,
                    padding: 2,
                    borderRadius: 3,
                    ...Centering,
                    marginLeft: 'auto',
                    marginRight: 5,
                    textTransform: 'uppercase',
                },
            },
            '& .product-item-details': {
                '& .product-configurable-container': {
                    margin: '1px 0 5px 0',

                    '& .product-configurable-top': {
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                    },
                    '& .product-configurable-options': {
                        marginBottom: 15,
                    },
                },
                '& .product-item-name': {
                    fontSize: 14,
                    textTransform: 'uppercase',
                },
                '& .item-price': {
                    fontSize: 14,
                    fontWeight: 'bold',
                },
            },
            '& .product-options': {
                marginTop: 10,
                '& .option-wrapper': {
                    fontSize: 10,
                    '& .option-wrapper__item': {
                        paddingLeft: 10,
                    },
                    '& .option-item': {
                        margin: 0,
                        marginLeft: 5,
                    },
                },
            },
            '& .product-item-pricing': {
                marginTop: 5,
                fontSize: 10,
                '& .label': {
                    paddingRight: 10,
                    fontSize: 14,
                },
                '& .item-count': {
                    textAlign: 'center',
                    width: 45,
                    height: 30,
                    border: `solid ${BLUE_PRIMARY} 1px`,
                    outline: 'none',
                },
                '& .item-count:focus': {
                    boxShadow: `0 0 2px 0px ${BLUE_DARK}`,
                },
            },
            '& .delete': {
                position: 'absolute',
                bottom: 25,
                right: 16,
                fontSize: 22,
                cursor: 'pointer',
                color: GRAY_SECONDARY,
            },
        },
        '& li.item-loading': {
            border: 'none',
            paddingTop: 5,
            paddingBottom: 5,
        },
        '& li.item-loading:last-child': {
            marginBottom: 20,
        },

    },

    emptyCart: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'bold',
    },
    rootDialog: {
        zIndex: '1000 !important',
    },
    removeItemDialog: {
        width: '100%',
        padding: 24,
        top: 10,
        textAlign: 'center',
        '& .header': {
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: 20,
            '& p': {
                margin: 0,
            },
        },
        '& .icon-close': {
            display: 'none',
        },
        '& .button-container': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            '& .root-button': {
                width: 'fit-content',

                '& .button': {
                    fontSize: 14,
                    boxShadow: 'none',
                    textTransform: 'none',
                },
                '& .cancel-button': {
                    color: ORANGE,
                    backgroundColor: BLUE_PRIMARY,
                },
                '& .confirm-button': {
                    color: WHITE,
                    backgroundColor: ORANGE,
                },
            },
        },
    },
}));

export default useStyles;
