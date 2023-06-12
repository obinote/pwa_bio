import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import Alert from '@material-ui/lab/Alert';
import useStyles from '@core_modules/order/pages/print/components/TableListItem/style';

const TableListProduct = ({
    data, t, currency,
}) => {
    const styles = useStyles();
    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table className={styles.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow className={styles.tableRowHead}>
                        <TableCell width="25%" align="left" className={styles.tableRowHead}>
                            <Typography variant="span" type="bold">
                                {t('common:product:title_product')}
                            </Typography>
                        </TableCell>
                        <TableCell width="15%" align="left" className={styles.tableRowHead}>
                            <Typography variant="span" type="bold">
                                SKU
                            </Typography>
                        </TableCell>
                        <TableCell width="15%" align="left" className={styles.tableRowHead}>
                            <Typography variant="span" type="bold">
                                {t('order:table:salesunit')}
                            </Typography>
                        </TableCell>
                        <TableCell width="10%" align="right" className={styles.tableRowHead}>
                            <Typography variant="span" type="bold">
                                {t('common:title:price')}
                            </Typography>
                        </TableCell>
                        <TableCell width="10%" align="right" className={styles.tableRowHead}>
                            <Typography variant="span" type="bold">
                                {t('order:table:discount')}
                            </Typography>
                        </TableCell>
                        <TableCell width="10%" align="right" className={styles.tableRowHead}>
                            <Typography variant="span" type="bold">
                                {t('common:title:shortQty')}
                            </Typography>
                        </TableCell>
                        <TableCell width="10%" align="right" className={styles.tableRowHead}>
                            <Typography variant="span" type="bold">
                                {t('common:subtotal')}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.length > 0 ? (
                        <>
                            {
                                data.map((val, index) => (
                                    <TableRow className={styles.tableRowResponsive} key={index}>
                                        <TableCell
                                            align="left"
                                        >
                                            <Typography variant="span" letter="capitalize">
                                                {val.product_name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <Typography variant="span" letter="capitalize">
                                                {val.product_sku}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <Typography variant="span" letter="capitalize">
                                                {val.sales_unit}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {formatPrice(val.product_sale_price.value, currency)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {val.percentage_discount}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {val.quantity_ordered}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {formatPrice(val.product_sale_price.value * val.quantity_ordered, currency)}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </>
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6}>
                                <Alert severity="warning">{t('order:notFound')}</Alert>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableListProduct;
