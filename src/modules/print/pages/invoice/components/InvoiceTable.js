import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatPrice } from '@helper_currency';
import Alert from '@material-ui/lab/Alert';
import useStyles from '@src_modules/print/pages/invoice/components/style';
import { useTranslation } from '@i18n';
import withStyles from '@material-ui/core/styles/withStyles';
import formatDate from '@helpers/date';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles({
    root: {
        paddingTop: '1rem',
        paddingBottom: '1rem',
    },
})(TableCell);

const InvoiceTable = ({ printData, currency }) => {
    const { t } = useTranslation();
    const styles = useStyles();

    return (
        <TableContainer component={Paper} elevation={0}>
            <Table size="small" label="Invoice Table">
                <TableHead>
                    <TableRow className={styles.tableRowHead}>
                        <TableCell>{t('common:product:title_product')}</TableCell>
                        <TableCell>Batch ED</TableCell>
                        <TableCell>UOM</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>{t('common:title:price')}</TableCell>
                        <TableCell>{t('order:table:discount')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {printData.itemSection.length > 0 ? (
                        <>
                            {printData.itemSection.map((val) => (
                                <TableRow key={val.productSku}>
                                    <StyledTableCell>
                                        <div>{val.productSku}</div>
                                        <div>{val.productName}</div>
                                    </StyledTableCell>
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
                                                    {doData.expiredDate ? formatDate(doData.expiredDate) : null}
                                                </p>
                                                <p>
                                                    {t('order:table:dataDo:kemasan')}
                                                    {doData.package}
                                                </p>
                                                <p>
                                                    {t('order:table:dataDo:doDate')}
                                                    {doData.doDate ? formatDate(doData.doDate) : null}
                                                </p>
                                                <p>
                                                    {t('order:table:dataDo:qty')}
                                                    {doData.qty}
                                                </p>
                                            </div>
                                        ))}
                                    </StyledTableCell>
                                    <StyledTableCell>{val.productUom}</StyledTableCell>
                                    <StyledTableCell>{val.productQty}</StyledTableCell>
                                    <StyledTableCell>{formatPrice(val.productPrice, currency)}</StyledTableCell>
                                    <StyledTableCell>{val.percentage_discount ?? 0}</StyledTableCell>
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

export default InvoiceTable;
