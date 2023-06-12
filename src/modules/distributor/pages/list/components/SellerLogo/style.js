import { makeStyles } from '@material-ui/core/styles';
import { Centering } from '@theme_mixins';

const useStyles = makeStyles(() => ({
    sellerLogo: {
        ...Centering,
        display: 'flex',
        width: 150,
        height: 150,
        maxWidth: '100%',
        margin: '0 auto',
    },
    sellerLogoImg: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
}));

export default useStyles;
