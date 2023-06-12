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
import useStyles from '@core_modules/order/pages/detail/components/TableListItem/style';
import dayjs from 'dayjs';

const formatDate = (date = new Date(), format = 'D/M/YYYY') => dayjs(date).format(format);

const TableListProduct = ({
    data, t, currency, tabName,
}) => {
    const styles = useStyles();
    let qtyLabel;
    if (tabName === 'invoice') {
        qtyLabel = t('common:title:qtyInvoice');
    } else if (tabName === 'shipment') {
        qtyLabel = t('common:title:qtyShipped');
    } else if (tabName === 'refund') {
        qtyLabel = t('common:title:qtyRefunded');
    } else {
        qtyLabel = t('common:title:qtyOrdered');
    }
    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table className={styles.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow className={styles.tableRowHead}>
                        <TableCell align="left">
                            <Typography variant="span" type="bold">
                                {t('common:product:title_product')}
                            </Typography>
                        </TableCell>
                        <TableCell align="left">
                            <Typography variant="span" type="bold">
                                SKU
                            </Typography>
                        </TableCell>
                        { tabName !== 'ordered' && tabName !== 'refund' ? (
                            <TableCell align="left">
                                <Typography variant="span" type="bold">
                                    {t('order:table:salesunit')}
                                </Typography>
                            </TableCell>
                        ) : null}
                        { tabName !== 'invoice' && tabName !== 'shipment' ? (
                            <TableCell align="right">
                                <Typography variant="span" type="bold">
                                    {t('common:title:price')}
                                </Typography>
                            </TableCell>
                        ) : null}
                        { tabName !== 'shipment' ? (
                            <TableCell align="right">
                                <Typography variant="span" type="bold">
                                    {t('order:table:discount')}
                                </Typography>
                            </TableCell>
                        ) : null}
                        <TableCell align="right">
                            <Typography variant="span" type="bold">
                                {qtyLabel}
                            </Typography>
                        </TableCell>
                        { tabName !== 'invoice' && tabName !== 'shipment' ? (
                            <TableCell align="right">
                                <Typography variant="span" type="bold">
                                    {t('common:subtotal')}
                                </Typography>
                            </TableCell>
                        ) : null}
                        { tabName !== 'ordered' && tabName !== 'refund' ? (
                            <TableCell align="left" className={styles.columnInfo}>
                                <Typography variant="span" type="bold">
                                    {t('order:table:info')}
                                </Typography>
                            </TableCell>
                        ) : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.length > 0 ? (
                        <>
                            {
                                data.map((val, index) => {
                                    let qty;
                                    if (tabName === 'invoice') {
                                        qty = val.quantity_invoiced;
                                    } else if (tabName === 'shipment') {
                                        qty = val.quantity_shipped;
                                    } else if (tabName === 'refund') {
                                        qty = val.quantity_refunded;
                                    } else {
                                        qty = val.quantity_ordered;
                                    }
                                    return (
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
                                            {tabName !== 'ordered' && tabName !== 'refund' ? (
                                                <TableCell
                                                    align="left"
                                                >
                                                    <Typography variant="span" letter="capitalize">
                                                        {val.sales_unit}
                                                    </Typography>
                                                </TableCell>
                                            ) : null}
                                            { tabName !== 'invoice' && tabName !== 'shipment' ? (
                                                <TableCell
                                                    align="right"
                                                >
                                                    <Typography variant="span" align="right" letter="capitalize">
                                                        {formatPrice(val.product_sale_price.value, currency)}
                                                    </Typography>
                                                </TableCell>
                                            ) : null }
                                            { tabName !== 'shipment' ? (
                                                <TableCell
                                                    align="right"
                                                >
                                                    <Typography variant="span" align="right" letter="capitalize">
                                                        {val.percentage_discount}
                                                    </Typography>
                                                </TableCell>
                                            ) : null }
                                            <TableCell
                                                align="right"
                                            >
                                                <Typography variant="span" align="right" letter="capitalize">
                                                    {qty}
                                                </Typography>
                                            </TableCell>
                                            { tabName !== 'invoice' && tabName !== 'shipment' ? (
                                                <TableCell
                                                    align="right"
                                                >
                                                    <Typography variant="span" align="right" letter="capitalize">
                                                        {formatPrice(val.product_sale_price.value * qty, currency)}
                                                    </Typography>
                                                </TableCell>
                                            ) : null }
                                            { tabName !== 'ordered' && tabName !== 'refund' ? (
                                                <TableCell
                                                    align="left"
                                                >
                                                    <Typography variant="span" letter="capitalize">
                                                        {val?.do_data && val.do_data.map((dataDo, idx) => (
                                                            <div className="do-wrapper" key={idx}>
                                                                <div className="do-items">
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {t('order:table:dataDo:doNumber')}
                                                                    </Typography>
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {dataDo.do_number}
                                                                    </Typography>
                                                                </div>
                                                                <div className="do-items">
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {t('order:table:dataDo:batchNumber')}
                                                                    </Typography>
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {dataDo.batch_numbers}
                                                                    </Typography>
                                                                </div>
                                                                <div className="do-items">
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {t('order:table:dataDo:expiredDate')}
                                                                    </Typography>
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {dataDo.exp_date ? formatDate(dataDo.exp_date) : null}
                                                                    </Typography>
                                                                </div>
                                                                <div className="do-items">
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {t('order:table:dataDo:kemasan')}
                                                                    </Typography>
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {dataDo.kemasan}
                                                                    </Typography>
                                                                </div>
                                                                <div className="do-items">
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {t('order:table:dataDo:doDate')}
                                                                    </Typography>
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {dataDo.do_date ? formatDate(dataDo.do_date) : null}
                                                                    </Typography>
                                                                </div>
                                                                <div className="do-items">
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {t('order:table:dataDo:qty')}
                                                                    </Typography>
                                                                    <Typography variant="span" letter="capitalize">
                                                                        {dataDo.qty}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Typography>
                                                </TableCell>
                                            ) : null }
                                        </TableRow>
                                    );
                                })
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
