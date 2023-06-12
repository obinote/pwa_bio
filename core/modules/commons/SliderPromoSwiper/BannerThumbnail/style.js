import { makeStyles } from '@material-ui/core/styles';
import {
    WHITE, PRIMARY,
} from '@theme_color';
import { Centering, CreatePadding } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    hide: {
        display: 'none',
    },
    productSlider: {
        // display: 'flex',
        // flexDirection: 'column',
        paddingTop: 12,
        '& .productSlider__main': {
            display: 'block',
            position: 'relative',
            margin: '0 auto',
            maxWidth: '250px',
            [theme.breakpoints.up('sm')]: {
                maxWidth: '450px',
            },

            '& .arrow': {
                fontSize: '1.5rem',
                backgroundColor: 'rgba(255,255,255,0.5)',
                position: 'absolute',
                ...Centering,
                padding: 10,
                borderRadius: 5,
                textAlign: 'center',
                paddingLeft: 10,
                top: 'calc(50% - 1rem)',
                width: 40,
                height: 40,
                cursor: 'pointer',
                [theme.breakpoints.down('sm')]: {
                    display: 'none',
                },
                '&:hover': {
                    color: WHITE,
                },
                '&__left': {
                    left: 20,
                },
                '&__right': {
                    right: 20,
                },
                '&__left--thumbnail': {},
            },

            '& .dots': {
                zIndex: 2,
                display: 'flex',
                flexDirection: 'row',
                position: 'absolute',
                justifyContent: 'space-arround',
                bottom: 0,
                left: '50%',
                transform: 'translate(-50%, -50%)',
                '& .dots__item': {
                    width: 7,
                    height: 7,
                    borderRadius: 100,
                    backgroundColor: WHITE,
                    margin: 5,
                    cursor: 'pointer',
                },

                '& .dot__item--active': {
                    backgroundColor: PRIMARY,
                    width: 10,
                    height: 10,
                },
            },
        },
        '& .productSlider__thumbnail': {
            display: 'flex',
            justifyContent: 'center',
            overflowX: 'scroll',
            backgroundColor: '#F2F9FF',
            padding: '15px 0',
            [theme.breakpoints.down('lg')]: {
                ...CreatePadding(15, 30, 0, 30),
            },
            [theme.breakpoints.up('lg')]: {
                backgroundColor: WHITE,
            },
            '& .swiper-wrapper': {
                // justifyContent: 'center',
            },
            '&::-webkit-scrollbar': {
                display: 'none',
            },

            '&--item': {
                border: '1px solid #dcdcdc',
                marginRight: '5px',
                cursor: 'pointer',
                flex: '0 0 20%',
                overflow: 'hidden',
                [theme.breakpoints.up('sm')]: {
                    flex: '0 0 15%',
                },

                '&-active': {
                    border: '1px solid #000',
                    cursor: 'default',
                },
            },
            '&--img': {
                objectFit: 'cover',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                position: 'absolute',
                height: '90%',
                width: 'auto',
                [theme.breakpoints.up('sm')]: {
                    height: '100%',
                },
            },
        },
        '& .swiper-container': {
            width: '100%',
        },
        '& .swiper-slide': {
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        },

        '& .product-swiper': {
            height: '80%',
            width: '100%',
        },

        '& .thumb-swiper': {
            height: '20%',
            boxSizing: 'border-box',
            padding: '10px 0',
        },

        '& .thumb-swiper .swiper-slide': {
            width: '25%',
            height: '100%',
            opacity: '0.4',
        },

        '& .thumb-swiper .swiper-slide-thumb-active': {
            opacity: 1,
            '& .productSlider__thumbnail--item': {
                border: '1px solid #707070',
            },
        },

        '& .swiper-slide img': {
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
        },
        '& .swiper-pagination': {
            '& .swiper-pagination-bullet-active': {
                backgroundColor: PRIMARY,
            },
        },
        '& .swiper-button-next, .swiper-button-prev': {
            // backgroundColor: 'rgba(255,255,255,0.5)',
            backgroundColor: 'none',
            zIndex: '99',
            color: '#b8b8b8',
            padding: 10,
            borderRadius: 5,
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
            '&:hover': {
                backgroundColor: 'none',
                color: '#8a8a8a',
            },
            '&:after': {
                fontSize: '20px',
                fontWeight: 'bold',
                opacity: 1,
            },
        },
    },

    thumborImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
            position: 'unset',
        },
    },

    thumborContainer: {
        width: '100%',
        height: '80px',
        position: 'relative',
        padding: '5px',
        backgroundColor: 'white',
        [theme.breakpoints.up('sm')]: {
            height: '120px',
        },
    },

    customClass: {
        width: '99%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            height: 'auto',
        },
    },

    imageContainer: {
        display: 'relative',
        '& .overlay': {
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1,
            '&:hover': {
                background: '#ffffff91',
                cursor: 'pointer',
            },
            '& .overlay__play-button': {
                background:
                    // eslint-disable-next-line max-len
                    'url(https://magento.senheng.com.my/static/version1631229262/frontend/Senheng/default/en_US/Magento_ProductVideo/img/gallery-sprite.png) bottom right',
                width: 100,
                height: 100,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1,
            },
        },
    },
}));

export default useStyles;
