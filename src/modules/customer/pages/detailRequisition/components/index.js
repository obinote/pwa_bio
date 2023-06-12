/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
// import Layout from '@layout_customer';
import Typography from '@common_typography';
import useStyles from '@src_modules/customer/pages/detailRequisition/components/style';
import classNames from 'classnames';
import Button from '@common_button';
import TableListRow from '@src_modules/customer/pages/detailRequisition/components/tableList/index';
import HeaderRequistion from '@src_modules/customer/pages/detailRequisition/components/header/headerRequisition';

const RequistionDetailPage = (props) => {
    const {
        t, data, handleChecked, handleCheckedAll, handleDelete, handleDeleteRequistion,
        handleClickOpen, handleClickClose, showFieldEdit = false, handleSubmit,
        router, checkedRows, handleDeleteSelected, handleMultipleAtc = () => {},
        handleUpdateQty, dataFull, handleMoveSelected, handleCopySelected,
        showMove, showCopy, setshowMove, setshowCopy, showFieldAlert, handleClose,
        handleSubmitQty, handleAddOpen, handleAddClose, showFieldAdd, handleSubmitAdd,
        showMoveCopy, printRequsition, dataExport, loadingInsertRequisition, handleClick,
        checkedRowsAll, handleDateRemiderInputChange, handleDateReminder,
        dateRequisitionReminder, loadingReminderRequisitionDate,
    } = props;
    const styles = useStyles();

    return (
        <>
            <div className={classNames(styles.detailRequisitionWrapper, 'detail-requisition-wrapper')}>
                {data?.getRequisitionList?.data.map((dt, index) => (
                    <div className="detail-requisition">
                        <HeaderRequistion
                            t={t}
                            data={data}
                            handleClickOpen={handleClickOpen}
                            handleClickClose={handleClickClose}
                            showFieldEdit={showFieldEdit}
                            router={router}
                            handleSubmit={handleSubmit}
                        />
                        <div className="detail-requisition-content">
                            <TableListRow
                                key={`${index}-${dt.entity_id}`}
                                t={t}
                                dt={dt}
                                router={router}
                                checkedRows={checkedRows}
                                handleDeleteSelected={handleDeleteSelected}
                                handleDelete={handleDelete}
                                handleChecked={handleChecked}
                                checkedRowsAll={checkedRowsAll}
                                handleCheckedAll={handleCheckedAll}
                                handleMultipleAtc={handleMultipleAtc}
                                handleUpdateQty={handleUpdateQty}
                                dataFull={dataFull}
                                handleSubmit={handleSubmit}
                                handleMoveSelected={handleMoveSelected}
                                handleCopySelected={handleCopySelected}
                                showMove={showMove}
                                showCopy={showCopy}
                                setshowMove={setshowMove}
                                setshowCopy={setshowCopy}
                                showFieldAlert={showFieldAlert}
                                handleClose={handleClose}
                                handleSubmitQty={handleSubmitQty}
                                handleAddOpen={handleAddOpen}
                                handleAddClose={handleAddClose}
                                showFieldAdd={showFieldAdd}
                                handleSubmitAdd={handleSubmitAdd}
                                showMoveCopy={showMoveCopy}
                                handleDeleteRequistion={handleDeleteRequistion}
                                printRequsition={printRequsition}
                                dataExport={dataExport}
                                loadingInsertRequisition={loadingInsertRequisition}
                                handleClick={handleClick}
                                handleDateRemiderInputChange={handleDateRemiderInputChange}
                                handleDateReminder={handleDateReminder}
                                loadingReminderRequisitionDate={loadingReminderRequisitionDate}
                                dateRequisitionReminder={dateRequisitionReminder}
                            />
                            <div className="detail-requisition-content-footer">
                                <div className="detail-requisition-content-back">
                                    <Button
                                        variant="text"
                                        href="/customer/account/requisition"
                                        align="left"
                                    >
                                        <Typography variant="span" type="regular" letter="capitalize">
                                            {t('customer:detailRequisition:backToList')}
                                        </Typography>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default RequistionDetailPage;
