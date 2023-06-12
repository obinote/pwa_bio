import 'dayjs/locale/id';
import useStyles from '@src_modules/print/pages/invoice/components/style';
import Summary from '@src_modules/print/pages/invoice/components/Summary';
import Heading from '@src_modules/print/pages/invoice/components/Heading';
import InvoiceTable from '@src_modules/print/pages/invoice/components/InvoiceTable';
import SectionUnderHeading from '@src_modules/print/pages/invoice/components/SectionUnderHeading';

const PrintInvoice = (props) => {
    const {
        storeConfig, printData, currency, showFine,
    } = props;
    const styles = useStyles();

    return (
        <div style={{ color: '#414048', paddingBottom: '2rem' }}>
            <Heading printData={printData} storeConfig={storeConfig} />

            <h2 className={styles.secondTitle}>Invoice</h2>

            <SectionUnderHeading printData={printData} currency={currency} />
            <InvoiceTable printData={printData} currency={currency} />
            <Summary printData={printData} currency={currency} showFine={showFine} />
        </div>
    );
};

export default PrintInvoice;
