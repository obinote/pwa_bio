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
import Alert from '@material-ui/lab/Alert';
import Button from '@common_button';
import TableListRowHeader from '@src_modules/customer/pages/detailRequisition/components/tableList/header';
import TableList from '@src_modules/customer/pages/detailRequisition/components/tableList/table';
import _ from 'lodash';
import { useFormik } from 'formik';

const AddRequisitionReminderInput = ({
    t,
    identifier,
    loading,
    onClick,
    onChange,
    stylesButton,
    dateRequisitionReminder,
}) => (
    <div className={identifier}>
        <span><strong>{t('customer:detailRequisition:remindMeEveryDate')}</strong></span>
        <div className="requisition-date-input-frame">
            <input
                disabled={loading}
                onChange={onChange}
                value={dateRequisitionReminder}
                className={classNames({
                        'requisition-date-input': true,
                        'requisition-date-input-loading': loading,
                    })}
            />
            <button
                type="button"
                className={stylesButton}
                onClick={onClick}
            >
                <Typography variant="span" type="normal" color="white" size="14">
                    <strong>{ loading ? _.upperCase(t('common:menu:loading')) : _.upperCase(t('common:button:save'))}</strong>
                </Typography>
            </button>
        </div>
    </div>
    );

const TableListRow = (props) => {
    const {
        t, handleChecked, handleCheckedAll, handleDelete, dt, checkedRows, handleDeleteSelected,
        dataFull, handleMoveSelected, handleCopySelected,
        showMove, showCopy, setshowMove, setshowCopy, showFieldAlert, handleClose,
        handleClick, router, handleSubmitQty, handleAddOpen, handleAddClose, showFieldAdd,
        handleSubmitAdd, handleMultipleAtc, showMoveCopy, handleDeleteRequistion,
        printRequsition, dataExport, loadingInsertRequisition, checkedRowsAll, handleDateReminder,
        handleDateRemiderInputChange, loadingReminderRequisitionDate, dateRequisitionReminder,
    } = props;
    const styles = useStyles();
    const listId = Number(router.query.slug);

    const initialValues = dt?.items.map((item) => ({
        item_id: item.item_id,
        qty: item.qty,
    }));

    const formikEditQty = useFormik({
        initialValues: {
            list_id: listId,
            quoteItems: initialValues,
        },
        onSubmit: (values) => {
            const variables = {
                list_id: listId,
                qty_item: values.quoteItems.map((item) => ({
                    item_id: Number(item.item_id),
                    qty: Number(item.qty),
                })),
            };
            handleSubmitQty(variables);
        },
    });

    return (
        <div className="detail-requisition-contents-wrapper">
            {dt?.items?.length > 0 ? (
                <div className="detail-requisition-content-wrapper">
                    <div className="detail-requisition-content-table-header">
                        {/* --- FOR DESKTOP --- */}
                        <AddRequisitionReminderInput
                            t={t}
                            identifier="detail-requisition-date"
                            stylesButton={classNames(styles.generalButton, 'btn-submit')}
                            loading={loadingReminderRequisitionDate}
                            onChange={handleDateRemiderInputChange}
                            onClick={() => handleDateReminder(dt)}
                            dateRequisitionReminder={dateRequisitionReminder}
                        />
                        {/* --- END FOR DESKTOP --- */}
                    </div>
                    <TableListRowHeader
                        t={t}
                        dt={dt}
                        checkedRows={checkedRows}
                        handleDeleteSelected={handleDeleteSelected}
                        dataFull={dataFull}
                        handleMoveSelected={handleMoveSelected}
                        handleCopySelected={handleCopySelected}
                        showMove={showMove}
                        showCopy={showCopy}
                        setshowMove={setshowMove}
                        setshowCopy={setshowCopy}
                        showFieldAlert={showFieldAlert}
                        handleClose={handleClose}
                        handleAddOpen={handleAddOpen}
                        handleAddClose={handleAddClose}
                        showFieldAdd={showFieldAdd}
                        handleSubmitAdd={handleSubmitAdd}
                        showMoveCopy={showMoveCopy}
                        handleDeleteRequistion={handleDeleteRequistion}
                        printRequsition={printRequsition}
                        dataExport={dataExport}
                        loadingInsertRequisition={loadingInsertRequisition}
                    />
                    <form onSubmit={formikEditQty.handleSubmit}>
                        <div className="detail-requisition-content-table">
                            <div className="detail-requisition-content-table">
                                <TableList
                                    t={t}
                                    dt={dt}
                                    checkedRows={checkedRows}
                                    handleChecked={handleChecked}
                                    handleCheckedAll={handleCheckedAll}
                                    checkedRowsAll={checkedRowsAll}
                                    handleDelete={handleDelete}
                                    handleClick={handleClick}
                                    formikEditQty={formikEditQty}
                                />
                            </div>
                            <div className="detail-requisition-content-table-footer">
                                <div className="detail-requisition-atc">
                                    <Button
                                        id="requestList_addToCart_button"
                                        className={classNames(styles.generalButton, 'btn-submit')}
                                        variant="text"
                                        align="left"
                                        onClick={() => { handleMultipleAtc(checkedRows); }}
                                    >
                                        <Typography variant="span" type="normal" color="white" size="14">
                                            {t('customer:detailRequisition:addToCart')}
                                        </Typography>
                                    </Button>
                                </div>
                                <div className="detail-requisition-update">
                                    <Button
                                        className={classNames(styles.generalButton, 'btn-submit')}
                                        type="submit"
                                        align="left"
                                    >
                                        <Typography variant="span" type="normal" color="white" size="14">
                                            {t('customer:detailRequisition:updateList')}
                                        </Typography>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <div>
                    <div className="detail-requisition-content-delete nodata">
                        <Button
                            variant="text"
                            onClick={handleDeleteRequistion}
                            align="right"
                        >
                            <Typography variant="span" type="regular" letter="capitalize">
                                {t('customer:detailRequisition:deleteRequisition')}
                            </Typography>
                        </Button>
                    </div>
                    <Alert severity="warning">{t('customer:detailRequisition:tableNotFound')}</Alert>
                </div>
            )}
        </div>
    );
};

export default TableListRow;
