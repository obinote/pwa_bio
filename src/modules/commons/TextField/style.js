import { makeStyles } from '@material-ui/core/styles';
import { CreateMargin } from '@theme_mixins';
import { RED } from '@theme_color';

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        height: '100%',
        maxHeight: 100,
        ...CreateMargin(10, 0, 20, 0),
    },
    label: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
        marginBottom: 0,
        display: 'inline-block',
        fontSize: 14,
    },
    required: {
        color: RED,
    },
    errorInfo: {
        color: '#e02b27',
        fontSize: 12,
        fontWeight: 400,
    },
}));

export default useStyles;
