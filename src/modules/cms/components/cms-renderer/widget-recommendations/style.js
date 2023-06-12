import makeStyles from '@material-ui/core/styles/makeStyles';

import {
    WHITE, BLUE_SECONDARY,
} from '@theme_color';

const ICON_ARROW = '"\\e967"';

export default makeStyles((theme) => ({
    wrapperRec: {
        width: '100%',
        margin: '0 auto',
        padding: 20,
        position: 'relative',
        maxWidth: 1280,
        [theme.breakpoints.down('xs')]: {
            '& h2': {
                fontSize: 18,
                textTransform: 'capitalize',
            },
        },
        [theme.breakpoints.up('sm')]: {
            '& h2': {
                fontSize: 25,
                textTransform: 'capitalize',
            },
        },
        '& .carousel .slick-track': {
            display: 'flex',
        },
        '& .slick-initialized .slick-slide': {
            display: 'flex',
            height: 'auto',
        },
        '& .slick-initialized .slick-slide > div': {
            width: '100%',
        },
        '& .slick-slider .slick-list .item-product': {
            padding: '4px 8px',
        },
        '& .slick-slider .slick-list .item-product .product-name': {
            height: 32,
            lineHeight: '16px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            '-webkit-line-clamp': '2',
            '-webkit-box-orient': 'vertical',
        },
        '& .widget-product-list .carousel .slick-arrow': {
            width: 30,
            height: 30,
            background: WHITE,
            borderRadius: 100,
            color: BLUE_SECONDARY,
            boxShadow: '0 4px 14px -5px rgb(0 0 0 / 50%)',
            fontSize: 0,
            zIndex: 1,
            '&:before': {
                content: ICON_ARROW,
                fontFamily: 'icomoon',
                color: BLUE_SECONDARY,
                display: 'block',
                fontSize: 8,
                fontWeight: 800,
            },
            '&.slick-disabled': {
                display: 'none !important',
            },
            '&.slick-prev': {
                transform: 'rotate(90deg)',
                left: -8,
            },
            '&.slick-next': {
                transform: 'rotate(-90deg)',
                right: -8,
            },
        },
    },
    title: {
        textAlign: 'center',
        marginTop: 40,
        marginBottom: 30,
        fontSize: 25,
    },
}));
