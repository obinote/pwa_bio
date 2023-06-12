/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import Typography from '@common_typography';
import useStyles from '@src_modules/customer/pages/detailRequisition/components/style';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { formatPrice } from '@helper_currency';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Link from 'next/link';
import _ from 'lodash';

const TableList = (props) => {
    const {
        t, handleChecked, handleCheckedAll, handleDelete,
        dt, handleClick, formikEditQty, checkedRows, checkedRowsAll,
    } = props;
    const styles = useStyles();
    const dtId = _.get(dt, 'entity_id');
    return (
        <TableContainer component={Paper} className={styles.tableContainer}>
            <Table className={styles.table}>
                <TableHead>
                    <TableRow className={styles.tableRowHead}>
                        <TableCell align="left" className={classNames(styles.tableCellResponsive, 'checkbox-mobile')}>
                            <div className={styles.displayBlock}>
                                <Checkbox
                                    onChange={(e) => handleCheckedAll(e.target.checked, dt?.items)}
                                    size="small"
                                    checked={checkedRowsAll}
                                />
                            </div>
                        </TableCell>
                        <TableCell align="left">{t('customer:detailRequisition:tableProduct')}</TableCell>
                        <TableCell align="left">{t('customer:detailRequisition:tablePrice')}</TableCell>
                        <TableCell align="left">{t('customer:detailRequisition:tableQty')}</TableCell>
                        <TableCell align="left">{t('customer:detailRequisition:tableSubtotal')}</TableCell>
                        <TableCell align="left">{t('customer:detailRequisition:tableDiscountTier')}</TableCell>
                        <TableCell align="left" style={{ fontSize: '0' }}>{t('customer:detailRequisition:tableAction')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <>
                        {dt?.items?.map((itemsData, idx) => {
                            const isCheckedFilter = _.find(checkedRows, { item_id: _.get(itemsData, 'item_id') });
                            const isChecked = !_.isEmpty(isCheckedFilter);
                            return (
                                (
                                    <TableRow className={styles.tableRowResponsive}>
                                        <TableCell align="left" className={classNames(styles.tableCellResponsive, 'checkbox-mobile')}>
                                            <div className={styles.displayBlock}>
                                                <Checkbox
                                                    id="requestList_viceeGrape_checkbox"
                                                    onChange={(e) => handleChecked(e.target.checked, dtId, itemsData)}
                                                    size="small"
                                                    checked={isChecked}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={styles.tableCellResponsive}>
                                            <div className={styles.productWrapper}>
                                                <div className={styles.productImgContainer}>
                                                    <img
                                                        src={itemsData.image.url || '/assets/img/placeholder.png'}
                                                        alt={itemsData.image.label}
                                                        className={styles.productImg}
                                                        onError={(e) => {
                                                            e.target.onerror = null; e.target.src = '/assets/img/placeholder.png';
                                                        }}
                                                    />
                                                </div>
                                                <div className="content-name">
                                                    <Link href="/[...slug]" as={`/${itemsData.url_key}`}>
                                                        <a onClick={() => handleClick(`/${itemsData.url_key}`)}>
                                                            <Typography variant="p" type="normal" size="16">{itemsData.name}</Typography>
                                                        </a>
                                                    </Link>
                                                    <DeleteOutlineIcon
                                                        onClick={() => { handleDelete(itemsData.item_id); }}
                                                        style={{ cursor: 'pointer', color: '#7B9AAF' }}
                                                        className="mobile-delete"
                                                    />
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
                                                        <input
                                                            name={`quoteItems[${idx}].qty`}
                                                            value={formikEditQty.values.quoteItems[idx].qty}
                                                            onChange={formikEditQty.handleChange}
                                                            className="item-count"
                                                            type="number"
                                                            min="1"
                                                            required
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
                                                    <div className="mobile-tier-discount content-mobile">
                                                        <Typography align="center" type="bold" letter="capitalize" size="14">
                                                            {t('customer:detailRequisition:tableDiscountTier')}
                                                        </Typography>
                                                        <Typography className={styles.value} type="normal" size="14">
                                                            {formatPrice(itemsData.tier_price)}
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
                                                <input
                                                    name={`quoteItems[${idx}].qty`}
                                                    value={formikEditQty.values.quoteItems[idx].qty}
                                                    onChange={formikEditQty.handleChange}
                                                    className="item-count"
                                                    type="number"
                                                    min="1"
                                                    required
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={classNames(styles.tableCellResponsive, 'view-dekstop')}>
                                            <div className={styles.displayBlock}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:detailRequisition:tableSubtotal')}
                                                    </Typography>
                                                </div>
                                                <Typography className={styles.value} type="normal" size="14">
                                                    {formatPrice(itemsData.subtotal)}
                                                </Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={classNames(styles.tableCellResponsive, 'view-dekstop')}>
                                            <div className={styles.displayBlock}>
                                                <div className={styles.mobLabel}>
                                                    <Typography align="center" type="bold" letter="capitalize" size="14">
                                                        {t('customer:detailRequisition:tableSubtotal')}
                                                    </Typography>
                                                </div>
                                                <Typography className={styles.value} type="normal" size="14">
                                                    {formatPrice(itemsData.tier_price)}
                                                </Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className={classNames(styles.tableCellResponsive, 'view-dekstop')}>
                                            <div className={styles.displayBlock}>
                                                <DeleteOutlineIcon
                                                    onClick={() => { handleDelete(itemsData.item_id); }}
                                                    style={{ cursor: 'pointer', color: '#7B9AAF' }}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            );
                        })}
                    </>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableList;
