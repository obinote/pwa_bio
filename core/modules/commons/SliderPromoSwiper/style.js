import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY, WHITE } from '@theme_color';
import { FlexColumn } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    swiperHomepage: {
        [theme.breakpoints.down('sm')]: {
            marginTop: '0 !important',
        },
    },
    containerSlider: {
        marginTop: 20,
        width: '100%',
        height: 'auto',
        ...FlexColumn,
        '& .slider-box__homepage': {
            width: '100%',
            margin: '0 auto',
            display: 'block',
            backgroundColor: PRIMARY,
            '& .swiper-container': {
                height: '100%',
                padding: '20px 0 40px 0',
            },
            '& .swiper-slide': {
                textAlign: 'center',
                fontSize: '18px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '95%',
            },
            '& .swiper-slide:nth-child(2n), .swiper-slide:nth-child(3n)': {
                width: '95%',
            },
            '& .swiper-slide img': {
                display: 'block',
                width: '99%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '10px',
            },
            '& .swiper-pagination': {
                bottom: '10px',
                '& .swiper-pagination-bullet-active': {
                    backgroundColor: WHITE,
                    opacity: '1 !important',
                    width: '30px',
                    borderRadius: '10px',
                    height: '7px',
                },
                '& .swiper-pagination-bullet': {
                    backgroundColor: WHITE,
                    opacity: '50%',
                },
            },
            '& .swiper-button-next, .swiper-button-prev': {
                backgroundColor: '#675d5d',
            },
            '& .swiper-button-next': {
                [theme.breakpoints.up(1280)]: {
                    right: '20px',
                },
            },
        },
        '& .slider-box': {
            width: '100%',
            display: 'block',
            '& .link-all-brand': {
                position: 'absolute',
                top: '28px',
                right: '0',
                color: WHITE,
                verticalAlign: 'middle',
                fontSize: '10px',
                cursor: 'pointer',
                '& svg': {
                    fontSize: '16px',
                    verticalAlign: 'middle',
                },
                '& svg:nth-last-child(1)': {
                    marginLeft: '-10px',
                },
            },
        },
        '& .brandSlide_': {
            '& .swiper-slide': {
                height: 'auto',
            },
            '& .plpBrands': {
                height: '100%',
            },
        },
        '& .slider-item': {
            width: 'unset',
            display: 'block',
        },
        '& .swiper-button-next, .swiper-button-prev': {
            width: '25px',
            height: '25px',
            backgroundColor: PRIMARY,
            borderRadius: '50%',
            zIndex: '99',
            '&:after': {
                fontSize: '12px',
                fontWeight: 'bold',
                color: WHITE,
                opacity: 1,
            },
        },
        '& .swiper-pagination': {
            bottom: '-4px',
            '& .swiper-pagination-bullet-active': {
                backgroundColor: PRIMARY,
            },
        },
        '& .swiper-slide': {
            alignSelf: 'stretch !important',
            height: 'auto !important',
            paddingBottom: '30px',
        },
    },
}));

export default useStyles;
