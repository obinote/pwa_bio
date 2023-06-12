import useStyle from '@src_modules/print/pages/quote/components/style';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import formatDate from '@helper_date';
import Link from 'next/link';
import Typography from '@common_typography';
import classNames from 'classnames';
import {
    TabPanels, TabPanel,
} from '@src_modules/customer/pages/quote/view/components/tab/';
import Items from '@src_modules/customer/pages/quote/view/components/items';

const PrintQuotation = (props) => {
    const { t, storeConfig, printData } = props;
    const styles = useStyle();
    const { shipping_addresses } = printData;

    const issued_by = printData?.buyer?.firstname
        ? `${printData?.buyer?.firstname} ${printData?.buyer?.lastname}`
        : '-';
    const estimation_day = (printData?.negotiable_data?.estimation_day)
        ? `${printData?.negotiable_data?.estimation_day} ${t('customer:quote:estimateDay')}`
        : '-';

    return (
        <div className={styles.wrapper}>
            <div className="header-middle__left">
                <div className="box header-middle__logo">
                    <Link href="/">
                        <img
                            className="header-middle__logo-link"
                            src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                            alt="logo"
                        />
                    </Link>
                </div>
            </div>
            <div>
                <div>
                    <Typography variant="h1" className={styles.title} letter="capitalize">
                        {printData.name}
                    </Typography>
                    <span className={classNames(styles.status)}>{t(`customer:quote:status:${printData.status}`)}</span>
                </div>
                <div className={classNames(styles.container)}>
                    <TableContainer className={classNames(styles.tableDate)}>
                        <TableBody>
                            <TableRow>
                                <TableCell>{t('customer:quote:created')}</TableCell>
                                <TableCell>{formatDate(printData.created_at, 'D MMMM YYYY')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t('customer:quote:expired')}</TableCell>
                                <TableCell>
                                    {printData.expiration_date ? formatDate(printData.expiration_date, 'D MMMM YYYY') : '-'}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t('customer:quote:estimate')}</TableCell>
                                <TableCell>
                                    {estimation_day}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{t('customer:quote:issuedBy')}</TableCell>
                                <TableCell>
                                    {issued_by}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </TableContainer>
                </div>
            </div>

            <div className={classNames(styles.tabContainer)}>
                <TabPanels value={0}>
                    <TabPanel>
                        <Items active can_update={false} quote={printData} disable_update {...props} />
                    </TabPanel>
                </TabPanels>
            </div>

            <div className={classNames(styles.shippingContainer)}>
                <div className={classNames(styles.column)}>
                    <h4 className={classNames(styles.shippingTitle)}>{t('customer:quote:shipping:defaultShiping')}</h4>
                    <address className={classNames(styles.shippingAddr, styles.shippingDesc)}>
                        {shipping_addresses.length === 0 && t('customer:quote:shipping:noShippingAddress')}
                        {shipping_addresses.length > 0
                            && shipping_addresses.map((addr) => (
                                <>
                                    {`${addr.firstname} ${addr.lastname}`}
                                    <br />
                                    {addr.street.map((st, stidx) => (
                                        <span key={stidx}>
                                            {st}
                                            <br />
                                        </span>
                                    ))}
                                    {addr.city}
                                    <br />
                                    {`${addr.region.label} ${addr.postcode}`}
                                    {addr.country.label}
                                    <br />
                                    {`Telephone: ${addr.telephone}`}
                                </>
                            ))}
                    </address>
                </div>

                <div className={classNames(styles.column, styles.columnRight)}>
                    <h4 className={classNames(styles.shippingTitle)}>{t('customer:address:shippingMethod')}</h4>
                    <p className={classNames(styles.shippingDesc)}>{t('customer:quote:shipping:noShippingInfo')}</p>
                </div>
            </div>

        </div>
    );
};

export default PrintQuotation;
