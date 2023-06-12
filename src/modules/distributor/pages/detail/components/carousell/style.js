import { makeStyles } from '@material-ui/core/styles';
import { ORANGE } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    craousellContainer: {
        overflow: 'hidden',
        borderRadius: '15px',
    },
    craousellItemContainer: {
        marginTop: '30px',
        position: 'relative',
        width: '100%',
        paddingTop: '50%',
        overflow: 'hidden',
        borderRadius: '15px',
    },
    craousellImage: {
        top: 0,
        left: 0,
        objectFit: 'cover',
        objectPosition: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    slickDotsContainer: {
        position: 'absolute',
        bottom: '20px',
        [theme.breakpoints.down('sm')]: {
            bottom: '10px',
        },
        [theme.breakpoints.down('xs')]: {
            bottom: '5px',
        },
    },
    slickDot: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: '100%',
    },
    slickActiveDotContainer: {
        borderRadius: '100%',
        backgroundColor: '#fff',
        position: 'relative',
    },
    slickActiveDot: {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '50%',
        left: '50%',
        width: '8.5px',
        height: '8.5px',
        borderRadius: '100%',
        backgroundColor: ORANGE,
    },
    slickDots: {
        '& li': {
            height: '10px',
            width: '10px',
            filter: 'drop-shadow(0px 0px 1px #888)',
            borderRadius: '100%',
        },
    },
}));

export default useStyles;
