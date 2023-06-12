import { useTranslation } from '@i18n';
import useStyles from '@src_modules/print/pages/invoice/components/style';
import Box from '@material-ui/core/Box';

const SectionUnderHeading = ({ printData }) => {
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
                    {printData.invoiceSection.printed_at}
                </p>
                <p>
                    <b>
                        {t('order:infoDate')}
                        :
                        {' '}
                    </b>
                    {' '}
                    {printData.invoiceSection.invoice_date}
                </p>
                <Box component="p" mt="1rem">
                    <b>Payer</b>
                    <br />
                    {`${printData.invoiceSection.payer.firstname} ${printData.invoiceSection.payer.lastname}`}
                    <br />
                    {printData.invoiceSection.payer.street}
                    <br />
                    {printData.invoiceSection.payer.city}
                    {', '}
                    {printData.invoiceSection.payer.region}
                    {', '}
                    {printData.invoiceSection.payer.postcode}
                    <br />
                    {printData.invoiceSection.payer.country}
                    <br />
                    Telp:
                    {' '}
                    <a href={`tel:${printData.invoiceSection.payer.telephone}`}>{printData.invoiceSection.payer.telephone}</a>
                </Box>
                <Box component="p" mt="1rem">
                    <b>Sold To</b>
                    <br />
                    {`${printData.invoiceSection.sold_to.firstname} ${printData.invoiceSection.sold_to.lastname}`}
                    <br />
                    {printData.invoiceSection.sold_to.street}
                    <br />
                    {printData.invoiceSection.sold_to.city}
                    {', '}
                    {printData.invoiceSection.sold_to.region}
                    {', '}
                    {printData.invoiceSection.sold_to.postcode}
                    <br />
                    {printData.invoiceSection.sold_to.country}
                    <br />
                    Telp:
                    {' '}
                    <a href={`tel:${printData.invoiceSection.sold_to.telephone}`}>{printData.invoiceSection.sold_to.telephone}</a>
                </Box>
                <p>
                    <b>{t('order:segmentCustomer')}</b>
                    {' '}
                    {printData.invoiceSection.customer_segment}
                </p>
            </div>
            <div>
                <p>{printData.invoiceSection.company_name}</p>
                <p>
                    <b>NPWP: </b>
                    {printData.invoiceSection.npwp}
                </p>
                <p>
                    <b>License: </b>
                    {printData.invoiceSection.license}
                </p>
                <p>
                    <b>Branch: </b>
                    <br />
                    {printData.invoiceSection.branch.company_address}
                    <br />
                    {printData.invoiceSection.branch.company_phone}
                    <br />
                    <b>
                        Sales :
                        {printData.invoiceSection.sales_man}
                    </b>
                    <br />
                    <b>
                        Invoice No:
                        {printData.invoiceSection.invoice_no}
                    </b>
                    <br />
                </p>
            </div>
        </div>
    );
};

export default SectionUnderHeading;
