import useStyles from '@core_modules/order/pages/printInvoice/style';
import InvoiceTable from './InvoiceTable';
import 'dayjs/locale/id';
import Summary from './Summary';
import SectionUnderHeading from './SectionUnderHeading';
import Heading from './Heading';

const PrintOrder = ({
    storeConfig, details, invoice, showFine,
}) => {
    const styles = useStyles();

    return (
        <div style={{ color: '#414048', paddingBottom: '2rem' }}>
            <Heading details={details} storeConfig={storeConfig} />

            <h2 className={styles.secondTitle}>Invoice</h2>

            <SectionUnderHeading invoice={invoice} />
            <InvoiceTable details={details} />
            <Summary details={details} showFine={showFine} />
        </div>
    );
};

export default PrintOrder;
