import { makeStyles } from '@material-ui/core/styles';
import { WHITE, PRIMARY } from '@theme_color';
import { Centering } from '@theme_mixins';

const useStyles = makeStyles(() => ({
    caraousel: {
        width: '100%',
        position: 'relative',
        height: 'auto',
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
            '& .swiper-pagination-bullet-active': {
                backgroundColor: PRIMARY,
            },
        },
    },
    caraouselHomepage: {
        width: '100%',
        position: 'relative',
        height: 'auto',
        marginBottom: '40px',
        backgroundColor: PRIMARY,
        padding: '20px 0 40px 0',
        '& .banner-homepage': {
            '& img': {
                borderRadius: '10px',
            },
        },
    },
    dots: {
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-arround',
        bottom: 33,
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    dotsItem: {
        width: 7,
        height: 7,
        borderRadius: 100,
        backgroundColor: WHITE,
        margin: 5,
        cursor: 'pointer',
    },
    dotActive: {
        backgroundColor: PRIMARY,
        width: 10,
        height: 10,
    },
    dotsHomepage: {
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-around',
        bottom: '0',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    dotsItemHomepage: {
        width: 7,
        height: 7,
        borderRadius: 100,
        backgroundColor: WHITE,
        margin: 6,
        cursor: 'pointer',
        opacity: '50%',
    },
    dotActiveHomepage: {
        backgroundColor: WHITE,
        width: 30,
        height: 5,
        opacity: '1',
    },
    hide: {
        display: 'none',
    },
    imageSlider: {
        display: 'flex',
        width: '100%',
        height: 'auto',
    },
    imageSliderAuto: {
        width: 'auto !important',
    },
    thumborContainer: {
        width: '100%',
        height: 'auto',
        position: 'relative',
        paddingTop: 0,
        display: 'flex',
        justifyContent: 'center',
    },
    thumborImage: {
        width: '100%',
        top: '0',
        left: '0',
        height: 'auto',
        position: 'unset',
    },
    arrow: {
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
        '&:hover': {
            backgroundColor: PRIMARY,
            color: WHITE,
        },
    },
    leftArrow: {
        left: 20,
    },

    rightArrow: {
        right: 20,
    },
}));

export default useStyles;
