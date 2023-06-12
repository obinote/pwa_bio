import makeStyles from '@material-ui/core/styles/makeStyles';
import { CreatePadding } from '@theme_mixins';

const useStyles = makeStyles(() => ({
    productContainer: {
        overflow: 'hidden',
        marginTop: 40,
        ...CreatePadding(0, 0, 30, 0),
        '& .grid': {
            '& .grid-item': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 4,
            },
        },
    },
}));

export default useStyles;
