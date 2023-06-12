import Pagination from '@material-ui/lab/Pagination';
import useStyles from '@core_modules/distributor/pages/list/components/Pagination/style';

const PaginationCustom = ({ numberOfPages = 1, page = 1, onChange }) => {
    const styles = useStyles();
    return <Pagination className={styles.root} color="fff" count={numberOfPages} page={page} onChange={onChange} />;
};

export default PaginationCustom;
