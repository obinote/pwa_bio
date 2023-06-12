/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import Typography from '@common_typography';
import useStyles from '@src_modules/customer/pages/printRequisition/components/style';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { formatPrice } from '@helper_currency';
import Link from 'next/link';
import TextField from '@common_textfield';

const PrintDetailPage = (props) => {
    const {
        t, data, storeConfig,
    } = props;
    const styles = useStyles();

    React.useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 2000);
    }, [data]);

    return (
        <div className={classNames(styles.detailRequisitionWrapper, 'detail-requisition-wrapper')}>
            {data?.getRequisitionList?.data.map((dt) => (
                <div className="detail-requisition">
                    <div className="detail-requisition-content">
                        <div className="header-middle__left">
                            <div className="box header-middle__logo">
                                <Link href="/">
                                    <img
                                        className="header-middle__logo-link"
                                        src={`${storeConfig.secure_base_media_url}logo/${storeConfig.header_logo_src}`}
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="detail-requisition-header" style={{ display: 'block' }}>
                            <Typography variant="h1" letter="capitalize">
                                {dt.name}
                            </Typography>
                            <Typography variant="span" type="normal" size="14" letter="capitalize">
                                {dt.description}
                            </Typography>
                            <Typography variant="span" type="normal" size="14" letter="capitalize">
                                {dt.total_count}
                                {' '}
                                product
                            </Typography>
                        </div>
                        <TableContainer component={Paper} className={styles.tableContainer}>
                            <Table className={styles.table}>
                                <TableHead>
                                    <TableRow className={styles.tableRowHead}>
                                        <TableCell align="left">{t('customer:detailRequisition:tableProduct')}</TableCell>
                                        <TableCell align="left">{t('customer:detailRequisition:tablePrice')}</TableCell>
                                        <TableCell align="left">{t('customer:detailRequisition:tableQty')}</TableCell>
                                        <TableCell align="left">{t('customer:detailRequisition:tableSubtotal')}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <>
                                        {dt && dt.items.map((itemsData) => (
                                            <TableRow className={styles.tableRowResponsive}>
                                                <TableCell align="left" className={styles.tableCellResponsive}>
                                                    <div className={styles.productWrapper}>
                                                        <div className={styles.productImgContainer}>
                                                            <img
                                                                src={itemsData.image || '/assets/img/placeholder.png'}
                                                                alt={itemsData.image}
                                                                className={styles.productImg}
                                                                onError={(e) => {
                                                                    e.target.onerror = null; e.target.src = '/assets/img/placeholder.png';
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="content-name">
                                                            <Typography variant="p" type="normal" size="16">{itemsData.name}</Typography>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="left" className={styles.tableCellResponsive}>
                                                <div className={styles.displayBlock}>
                                                    <div className={styles.mobLabel}>
                                                        <div className="mobile-price content-mobile">
                                                            <Typography align="center" type="bold" letter="capitalize" size="14">
                                                                {t('customer:detailRequisition:tablePrice')}
                                                            </Typography>
                                                            <Typography className={styles.value} type="normal" size="14">
                                                                {formatPrice(itemsData.price)}
                                                            </Typography>
                                                        </div>
                                                        <div className="mobile-qty content-mobile">
                                                            <Typography align="center" type="bold" letter="capitalize" size="14">
                                                                {t('customer:detailRequisition:tableQty')}
                                                            </Typography>
                                                            <TextField
                                                                name="qty"
                                                                value={itemsData.qty}
                                                                className="item-count"
                                                            />
                                                        </div>
                                                        <div className="mobile-subtotal content-mobile">
                                                            <Typography align="center" type="bold" letter="capitalize" size="14">
                                                                {t('customer:detailRequisition:tableSubtotal')}
                                                            </Typography>
                                                            <Typography className={styles.value} type="normal" size="14">
                                                                {formatPrice(itemsData.subtotal)}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <div className="view-dekstop">
                                                        <Typography className={styles.value} type="normal" size="14">
                                                            {formatPrice(itemsData.price)}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                </TableCell>
                                                <TableCell align="left" className={classNames(styles.tableCellResponsive, 'view-dekstop')}>
                                                    <div className={styles.displayBlock}>
                                                        <div className={styles.mobLabel}>
                                                            <Typography align="center" type="bold" letter="capitalize" size="14">
                                                                {t('customer:detailRequisition:tableQty')}
                                                            </Typography>
                                                        </div>
                                                        <TextField
                                                            name="qty"
                                                            value={itemsData.qty}
                                                            className="item-count"
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell align="left" className={classNames(styles.tableCellResponsive, 'view-dekstop')}>
                                                    <div className={styles.displayBlock}>
                                                        <Typography className={styles.value} type="normal" size="14">
                                                            {formatPrice(itemsData.subtotal)}
                                                        </Typography>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PrintDetailPage;
