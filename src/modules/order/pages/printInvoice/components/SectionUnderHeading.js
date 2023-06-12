import { useTranslation } from '@i18n';
import useStyles from '@core_modules/order/pages/printInvoice/style';
import Box from '@material-ui/core/Box';

const SectionUnderHeading = ({ invoice }) => {
    const { t } = useTranslation();
    const styles = useStyles();

    return (
        <div className={styles.topDetails}>
            <div>
                <p>
                    <b>
                        {t('order:printedAt')}
                        :
                        {' '}
                    </b>
                    {' '}
                    {invoice.printed_at}
                </p>
                <p>
                    <b>
                        {t('order:infoDate')}
                        :
                        {' '}
                    </b>
                    {' '}
                    {invoice.invoice_date}
                </p>
                <Box component="p" mt="1rem">
                    <b>Payer</b>
                    <br />
                    {invoice.payer.customer_name}
                    <br />
                    {invoice.payer.address}
                    <br />
                    {invoice.payer.cityKecamatan}
                    <br />
                    {invoice.payer.country}
                    <br />
                    Telp:
                    {' '}
                    <a href={`tel:${invoice.payer.phone}`}>{invoice.payer.phone}</a>
                </Box>
                <Box component="p" mt="1rem">
                    <b>Sold To</b>
                    <br />
                    {invoice.sold_to.customer_name}
                    <br />
                    {invoice.sold_to.address}
                    <br />
                    {invoice.sold_to.cityKecamatan}
                    <br />
                    {invoice.sold_to.country}
                    <br />
                    Telp:
                    {' '}
                    <a href={`tel:${invoice.sold_to.phone}`}>{invoice.sold_to.phone}</a>
                </Box>
                <p>
                    <b>{t('order:segmentCustomer')}</b>
                    {' '}
                    {invoice.customer_segment}
                </p>
            </div>
            <div>
                <p>{invoice.company_name}</p>
                <p>
                    <b>NPWP: </b>
                    {invoice.npwp}
                </p>
                <p>
                    <b>License: </b>
                    {invoice.license}
                </p>
                <p>
                    <b>Branch: </b>
                    <br />
                    {invoice.branch.company_address}
                    <br />
                    {invoice.branch.company_phone}
                    <br />
                    <b>
                        Sales :
                        {invoice.sales_man}
                    </b>
                    <br />
                    <b>
                        Invoice No:
                        {invoice.invoice_no}
                    </b>
                    <br />
                </p>
            </div>
        </div>
    );
};

export default SectionUnderHeading;
