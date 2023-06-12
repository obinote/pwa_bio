import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import useStyles from '@core_modules/order/pages/printInvoice/style';
import { useTranslation } from '@i18n';
import withStyles from '@material-ui/core/styles/withStyles';
import formatDate from '@helpers/date';

const StyledTableCell = withStyles({
    root: {
        paddingTop: '1rem',
        paddingBottom: '1rem',
    },
})(TableCell);

const ShippingTable = ({ details }) => {
    const { t } = useTranslation();
    const styles = useStyles();

    return (
        <TableContainer>
            <Table size="small" label="Invoice Table">
                <TableHead>
                    <TableRow className={styles.tableRowHead}>
                        <TableCell>{t('common:product:title_product')}</TableCell>
                        <TableCell>SKU</TableCell>
                        <TableCell>UOM</TableCell>
                        <TableCell>{t('common:title:qtyShipped')}</TableCell>
                        <TableCell>Info</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {details.items.length > 0 ? (
                        <>
                            {details.items.map((val) => (
                                <TableRow key={val.product_sku}>
                                    <StyledTableCell>{val.product_name}</StyledTableCell>
                                    <StyledTableCell>{val.product_sku}</StyledTableCell>
                                    <StyledTableCell>{val.sales_unit}</StyledTableCell>
                                    <StyledTableCell>{val.quantity_shipped}</StyledTableCell>
                                    <StyledTableCell style={{ display: val.do_data.length > 0 && 'grid', gap: '1rem' }}>
                                        {val.do_data.map((doData) => (
                                            <div>
                                                <p>
                                                    {t('order:table:dataDo:doNumber')}
                                                    {doData.do_number}
                                                </p>
                                                <p>
                                                    {t('order:table:dataDo:batchNumber')}
                                                    {doData.batch_numbers}
                                                </p>
                                                <p>
                                                    {t('order:table:dataDo:expiredDate')}
                                                    {doData.exp_date ? formatDate(doData.exp_date, 'YYYY-MM-DD') : null}
                                                </p>
                                                <p>
                                                    {t('order:table:dataDo:kemasan')}
                                                    {doData.kemasan}
                                                </p>
                                                <p>
                                                    {t('order:table:dataDo:doDate')}
                                                    {doData.do_date ? formatDate(doData.do_date, 'YYYY-MM-DD') : null}
                                                </p>
                                                <p>
                                                    {t('order:table:dataDo:qty')}
                                                    {doData.qty}
                                                </p>
                                            </div>
                                        ))}
                                    </StyledTableCell>
                                </TableRow>
                            ))}
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

export default ShippingTable;
