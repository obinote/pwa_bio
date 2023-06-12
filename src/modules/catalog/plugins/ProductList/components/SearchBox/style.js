import { makeStyles } from '@material-ui/core/styles';
import { BLUE_GRAY } from '@theme_color';

const searchBorderColor = '#BDCDD7';

const useStyles = makeStyles((theme) => ({
    searchBox: {
        width: '100%',
        maxWidth: 428,
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100%',
        },
        '& .MuiInputAdornment-root': {
            color: BLUE_GRAY,
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 5,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: searchBorderColor,
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: searchBorderColor,
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: searchBorderColor,
        },
    },
}));

export default useStyles;
