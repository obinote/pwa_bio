import Pagination from '@material-ui/lab/Pagination';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { ORANGE, BLUE_GRAY, BORDER_LIGHT } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiPagination-ul': {
            justifyContent: 'center',
            marginTop: 20,
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'nowrap',
            },
        },
        '& .MuiPaginationItem-page': {
            color: BLUE_GRAY,
            fontWeight: 'bold',
            fontSize: 16,
        },
        '& .Mui-selected, .Mui-selected:hover': {
            backgroundColor: BORDER_LIGHT,
            color: ORANGE,
        },
        '& .MuiPaginationItem-icon': {
            fontSize: 36,
            color: ORANGE,
        },
        '& .Mui-disabled > .MuiPaginationItem-icon ': {
            color: BLUE_GRAY,
        },
        '& .MuiPaginationItem-ellipsis': {
            color: BLUE_GRAY,
            fontSize: 16,
        },
    },
}));

const PaginationCustom = ({
    count = 1,
    page = 1,
    onChange,
}) => {
    const styles = useStyles();
    return (
        <Pagination className={styles.root} count={count} page={page} onChange={onChange} />
    );
};

export default PaginationCustom;
