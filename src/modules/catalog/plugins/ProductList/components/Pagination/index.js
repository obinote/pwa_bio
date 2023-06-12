import Pagination from '@material-ui/lab/Pagination';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ORANGE, BLUE_GRAY } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiPagination-ul': {
            justifyContent: 'center',
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'nowrap',
            },
        },
        '& .MuiPaginationItem-page': {
            color: BLUE_GRAY,
            fontWeight: '500',
            fontSize: 17,
        },
        '& .Mui-selected, .Mui-selected:hover': {
            backgroundColor: '#e7f3ff',
            color: ORANGE,
        },
        '& .MuiPaginationItem-icon': {
            fontSize: 36,
            color: ORANGE,
        },
        '& .Mui-disabled > .MuiPaginationItem-icon ': {
            color: BLUE_GRAY,
        },
    },
}));

const PaginationCustom = ({
    numberOfPages = 1,
    page = 1,
    onChange,
}) => {
    const styles = useStyles();
    return (
        <Pagination className={styles.root} count={numberOfPages} page={page} onChange={onChange} />
    );
};

export default PaginationCustom;
