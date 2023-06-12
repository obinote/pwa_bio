/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */

import classNames from 'classnames';
import Typography from '@common_typography';
import Layout from '@layout_customer';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
import Alert from '@material-ui/lab/Alert';
import formatDate from '@helper_date';
import { formatPrice } from '@helper_currency';
import Link from 'next/link';
import { SkeletonContent } from '@core_modules/order/pages/history/components/skeleton';
import useStyles from '@core_modules/smartbidding/pages/details/components/style';
import checkUserAgent from '@helper_useragent';

const handleDownload = (url, name) => {
    fetch(url).then((response) => {
        response.blob().then((blob) => {
            const fileURL = window.URL.createObjectURL(blob);
            const alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = name;
            alink.click();
        });
    });
};

const postMessageDownloadAttachment = (attachment) => {
    if (window !== undefined && window.ReactNativeWebView !== undefined) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ url: attachment, type: 'DOWNLOAD_ATTACHMENT' }));
    }
};

const DownloadButton = ({ url, filename, tStyle }) => {
    if (checkUserAgent.isMobileApps()) {
        return (
            <a onClick={() => postMessageDownloadAttachment(url)} style={{ alignSelf: 'start', padding: '0' }} rel="noreferrer">
                <Typography className={tStyle} variant="subtitle2" letter="capitalize" style={{ color: '#F58732', margin: 0, marginLeft: '5px' }}>
                    {filename}
                </Typography>
            </a>
        );
    }

    return (
        <Button
            onClick={() => {
                handleDownload(url, filename);
            }}
            style={{ alignSelf: 'start', padding: '0' }}
            disableRipple
        >
            <Typography className={tStyle} variant="subtitle2" letter="capitalize" style={{ color: '#F58732', margin: 0, marginLeft: '5px' }}>
                {filename}
            </Typography>
        </Button>
    );
};

const Content = (props) => {
    const {
        data, t, page, title, pageSize, handleChangePage, handleChangePageSize, loadMore, handleClose,
    } = props;
    const styles = useStyles();

    return (
        <Layout t={t}>
            <div>
                <Typography
                    variant="h1"
                    type="bold"
                    letter="capitalize"
                    className={classNames(styles.titleContent)}
                    style={{ fontSize: '30px', marginLeft: '5px', fontWeight: 'bold' }}
                >
                    {title}
                </Typography>
                <div className={styles.detailsContainer}>
                    <div className="divData">
                        <div>
                            <Typography variant="subtitle2" type="bold">
                                {t('smartbidding:details:status')}
                            </Typography>
                            <Typography variant="subtitle2" type="bold">
                                {t('smartbidding:details:create')}
                            </Typography>
                            <Typography variant="subtitle2" type="bold">
                                {t('smartbidding:details:expired')}
                            </Typography>
                        </div>
                        <div className={styles.detailValue}>
                            <Typography variant="subtitle2" letter="capitalize">
                                {data?.status === '1' ? 'Draft' : data?.status === '2' ? 'Open' : data?.status === '3' ? 'Closed' : 'Complete'}
                            </Typography>
                            <Typography variant="subtitle2" letter="capitalize">
                                {formatDate(data.created_at, 'DD-MM-YYYY')}
                                {' ('}
                                {data.company_name}
                                {') '}
                            </Typography>
                            <Typography variant="subtitle2" letter="capitalize">
                                {formatDate(data.due_date, 'DD-MM-YYYY')}
                            </Typography>
                        </div>
                    </div>
                    <div style={{ maxWidth: '470px' }} className={styles.description}>
                        <Typography variant="subtitle2" letter="capitalize">
                            {data.deskripsi}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subtitle2" type="bold">
                            {t('smartbidding:details:attach')}
                        </Typography>
                        {data.surat_lelang.length > 0 ? (
                            <>
                                {data.surat_lelang.map((index) => (
                                    <DownloadButton url={index.url} filename={index.filename} tStyle={styles.attachment} />
                                ))}
                            </>
                        ) : (
                            <Alert severity="warning">{t('smartbidding:notFound')}</Alert>
                        )}
                    </div>
                    <div>
                        <TableContainer component={Paper} className={styles.tableContainer}>
                            <Table className={styles.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow className={styles.tableRowHead}>
                                        <TableCell align="left" style={{ width: '40%' }}>
                                            <Typography variant="subtitle2" type="bold">
                                                {t('smartbidding:details:item')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Typography variant="subtitle2" type="bold">
                                                {t('smartbidding:details:qty')}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {loadMore ? (
                                        <TableRow>
                                            <TableCell colSpan={6} rowSpan={10}>
                                                <SkeletonContent />
                                            </TableCell>
                                        </TableRow>
                                    ) : data && data.items.length > 0 ? (
                                        <>
                                            {data.items.map((val, index) => (
                                                <TableRow className={styles.tableRowResponsive} key={index}>
                                                    <TableCell
                                                        className={styles.tableCellResponsive}
                                                        align="left"
                                                        data-th={(
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {`${t('smartbidding:details:item')}`}
                                                            </Typography>
                                                        )}
                                                    >
                                                        <div className={styles.displayFlexRow}>
                                                            <div className={styles.mobLabel}>
                                                                <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                    {`${t('smartbidding:details:item')}`}
                                                                    :
                                                                </Typography>
                                                            </div>
                                                            <div className={classNames(styles.value)}>
                                                                <Typography variant="overline" letter="capitalize">
                                                                    {val.product_name}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell
                                                        className={styles.tableCellResponsive}
                                                        align="left"
                                                        data-th={(
                                                            <Typography align="center" type="bold" letter="capitalize">
                                                                {t('smartbidding:details:qty')}
                                                            </Typography>
                                                        )}
                                                    >
                                                        <div className={styles.displayFlexRow}>
                                                            <div className={styles.mobLabel}>
                                                                <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                                    {t('smartbidding:details:qty')}
                                                                    :
                                                                </Typography>
                                                            </div>
                                                            <div className={styles.value}>
                                                                <Typography variant="overline" letter="capitalize">
                                                                    {val.qty}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6}>
                                                <Alert severity="warning">{t('smartbidding:notFound')}</Alert>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
                <TableContainer component={Paper} className={styles.tableContainer}>
                    <Typography variant="h2" type="bold" letter="capitalize">
                        {t('smartbidding:details:quotation')}
                    </Typography>
                    <Table className={styles.table} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow className={styles.tableRowHead}>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('smartbidding:details:quotationName')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('smartbidding:details:quotationCreated')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('smartbidding:details:quotationBy')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('smartbidding:details:quotationUpdate')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('smartbidding:details:quotationTotal')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('smartbidding:details:quotationStatus')}
                                    </Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="subtitle2" type="bold">
                                        {t('smartbidding:action')}
                                    </Typography>
                                    {' '}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loadMore ? (
                                <TableRow>
                                    <TableCell colSpan={6} rowSpan={10}>
                                        <SkeletonContent />
                                    </TableCell>
                                </TableRow>
                            ) : data && data.quotation.length > 0 ? (
                                <>
                                    {data.quotation.map((val, index) => (
                                        <TableRow className={styles.tableRowResponsive} key={index}>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {`${t('smartbidding:details:quotationName')}`}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                            {`${t('smartbidding:details:quotationName')}`}
                                                            :
                                                        </Typography>
                                                    </div>
                                                    <div className={classNames(styles.value)}>
                                                        <Typography variant="overline" letter="capitalize">
                                                            {val.quote_name}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('smartbidding:details:quotationCreated')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                            {t('smartbidding:details:quotationCreated')}
                                                            :
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>
                                                        <Typography variant="overline" letter="capitalize">
                                                            {formatDate(val.created_at, 'DD-MM-YYYY')}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                        {t('smartbidding:details:quotationBy')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                            {`${t('smartbidding:details:quotationBy')}`}
                                                            :
                                                        </Typography>
                                                    </div>
                                                    {val.created_by !== null ? (
                                                        <div className={styles.value}>
                                                            <Typography variant="overline" letter="capitalize">
                                                                {val.created_by}
                                                            </Typography>
                                                        </div>
                                                    ) : (
                                                        <div className={styles.value}>
                                                            <Typography variant="overline" letter="capitalize">
                                                                -
                                                            </Typography>
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('smartbidding:details:quotationUpdate')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                            {t('smartbidding:details:quotationUpdate')}
                                                            :
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>
                                                        <Typography variant="overline" letter="capitalize">
                                                            {formatDate(val.updated_at, 'DD-MM-YYYY')}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('smartbidding:details:quotationTotal')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                            {t('smartbidding:details:quotationTotal')}
                                                            :
                                                        </Typography>
                                                    </div>
                                                    {val.total_price !== null ? (
                                                        <div className={styles.value}>
                                                            <Typography variant="overline" letter="capitalize">
                                                                {formatPrice(val.total_price || 'IDR')}
                                                            </Typography>
                                                        </div>
                                                    ) : (
                                                        <div className={styles.value}>
                                                            <Typography variant="overline" letter="capitalize">
                                                                -
                                                            </Typography>
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('smartbidding:details:quotationStatus')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={styles.mobLabel}>
                                                        <Typography variant="overline" align="center" type="bold" letter="capitalize">
                                                            {t('smartbidding:details:quotationStatus')}
                                                            :
                                                        </Typography>
                                                    </div>
                                                    <div className={styles.value}>
                                                        <Typography variant="overline" letter="capitalize">
                                                            {val.status}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell
                                                className={styles.tableCellResponsive}
                                                align="left"
                                                data-th={(
                                                    <Typography align="center" type="bold" letter="capitalize">
                                                        {t('smartbidding:action')}
                                                    </Typography>
                                                )}
                                            >
                                                <div className={styles.displayFlexRow}>
                                                    <div className={classNames(styles.value, styles.action)}>
                                                        <Link href={`/customer/account/quote/view/${val.uid}`}>
                                                            <a>
                                                                <Typography variant="overline" type="regular" style={{ color: '#f58732' }}>
                                                                    {t('smartbidding:detail')}
                                                                </Typography>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 20, 50, { label: 'All', value: data.total_count }]}
                                            colSpan={8}
                                            count={data.total_count || 0}
                                            rowsPerPage={pageSize}
                                            page={page}
                                            labelRowsPerPage="Limit"
                                            SelectProps={{
                                                inputProps: { 'aria-label': 'rows per page' },
                                                native: true,
                                            }}
                                            onChangePage={handleChangePage}
                                            onChangeRowsPerPage={handleChangePageSize}
                                            classes={styles.pagination}
                                        />
                                    </TableRow>
                                </>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <Alert severity="warning">{t('smartbidding:details:notFound')}</Alert>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={styles.buttonFooter}>
                    <div className={styles.linkBack}>
                        <Link href="/customer/account/bidding">
                            <a>
                                <Typography variant="overline" type="regular" style={{ color: '#f58732', marginTop: '30px' }}>
                                    {t('smartbidding:details:back')}
                                </Typography>
                            </a>
                        </Link>
                    </div>
                    {data.status === '1' || data.status === '2' ? (
                        <div className={styles.button}>
                            <Button className="button" onClick={() => handleClose(data.id)}>
                                <span>{t('smartbidding:details:close')}</span>
                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </Layout>
    );
};

export default Content;
