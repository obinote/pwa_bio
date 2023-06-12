import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreateMargin, CreatePadding } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    carouselContainer: {
        ...CreateMargin(40, 0, 20, 0),
        [theme.breakpoints.down('sm')]: {
            paddingBottom: 20,
            paddingLeft: 0,
            paddingRight: 0,
        },
        '& .carousel .item-product ': {
            ...CreatePadding(4, 8, 4, 8),
        },
        '& .carousel .item-product > div': {
            borderRadius: 8,
            boxShadow: '0px 0px 4px #00000026',
            ...CreatePadding(14, 10, 14, 10),
            // ...CreateMargin(0, 20, 0, 20),
        },
    },
    carouselTitle: {
        marginBottom: '20px',
        color: '#414048',
        fontWeight: 'bold',
        fontSize: 24,
        [theme.breakpoints.up('sm')]: {
            marginBottom: '24px',
        },
    },
}));

export default useStyles;
