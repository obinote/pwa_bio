import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Alert from '@material-ui/lab/Alert';
import useStyles from '@core_modules/print/pages/shipment/components/style';
import withStyles from '@material-ui/core/styles/withStyles';
import formatDate from '@helpers/date';

const StyledTableCell = withStyles({
    root: {
        paddingTop: '1rem',
        paddingBottom: '1rem',
    },
})(TableCell);

const ShippingTable = ({ t, printData }) => {
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
                    {printData.itemSection.length > 0 ? (
                        <>
                            {printData.itemSection.map((val) => (
                                <TableRow key={val.product_sku}>
                                    <StyledTableCell>{val.productName}</StyledTableCell>
                                    <StyledTableCell>{val.productSku}</StyledTableCell>
                                    <StyledTableCell>{val.productUom}</StyledTableCell>
                                    <StyledTableCell>{val.productQty}</StyledTableCell>
                                    <StyledTableCell style={{ display: val.productBatchED.length > 0 && 'grid', gap: '1rem' }}>
                                        {val.productBatchED.map((doData) => (
                                            <div>
                                                <p>
                                                    {t('order:table:dataDo:doNumber')}
                                                    {doData.doNumber}
                                                </p>
                                                <p>
                                                    {t('order:table:dataDo:batchNumber')}
                                                    {doData.batchNumber}
                                                </p>
                                                <p>
                                                    {t('order:table:dataDo:expiredDate')}
                                                    {doData.expiredDate ? formatDate(doData.expiredDate, 'YYYY-MM-DD') : null}
                                                </p>
                                                <p>
                                                    {t('order:table:dataDo:kemasan')}
                                                    {doData.package}
                                                </p>
                                                <p>
                                                    {t('order:table:dataDo:doDate')}
                                                    {doData.doDate ? formatDate(doData.doDate, 'YYYY-MM-DD') : null}
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
