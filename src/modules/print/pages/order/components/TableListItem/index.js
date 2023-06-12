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
import useStyles from '@src_modules/print/pages/order/components/TableListItem/style';

const TableListProduct = (props) => {
    const { t, items, currency } = props;
    const styles = useStyles();
    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table className={styles.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow className={styles.tableRowHead}>
                        <TableCell width="25%" align="left">
                            <Typography variant="span" type="bold">
                                {t('common:product:title_product')}
                            </Typography>
                        </TableCell>
                        <TableCell width="15%" align="left">
                            <Typography variant="span" type="bold">
                                SKU
                            </Typography>
                        </TableCell>
                        <TableCell width="15%" align="left">
                            <Typography variant="span" type="bold">
                                {t('order:table:salesunit')}
                            </Typography>
                        </TableCell>
                        <TableCell width="10%" align="right">
                            <Typography variant="span" type="bold">
                                {t('common:title:price')}
                            </Typography>
                        </TableCell>
                        <TableCell width="10%" align="right">
                            <Typography variant="span" type="bold">
                                {t('order:table:discount')}
                            </Typography>
                        </TableCell>
                        <TableCell width="10%" align="right">
                            <Typography variant="span" type="bold">
                                {t('common:title:shortQty')}
                            </Typography>
                        </TableCell>
                        <TableCell width="10%" align="right">
                            <Typography variant="span" type="bold">
                                {t('common:subtotal')}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items && items.length > 0 ? (
                        <>
                            {
                                items.map((item, index) => (
                                    <TableRow className={styles.tableRowResponsive} key={index}>
                                        <TableCell
                                            align="left"
                                        >
                                            <Typography variant="span" letter="capitalize">
                                                {item.productName}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <Typography variant="span" letter="capitalize">
                                                {item.productSku}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="left"
                                        >
                                            <Typography variant="span" letter="capitalize">
                                                {item.productUom}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {formatPrice(item.productPrice, currency)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {item.percentage_discount ?? 0}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {item.productQty}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                        >
                                            <Typography variant="span" align="right" letter="capitalize">
                                                {formatPrice(item.productPrice * item.productQty, currency)}
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
