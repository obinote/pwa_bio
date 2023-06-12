/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
import Typography from '@common_typography';
import useStyles from '@src_modules/customer/pages/detailRequisition/components/style';
import classNames from 'classnames';
import Button from '@common_button';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import AddRequisition from '@src_modules/customer/pages/detailRequisition/components/tableList/addRequisition';
 
const TableListRowHeader = (props) => {
    const {
        t, dt, checkedRows, dataFull, handleMoveSelected, handleCopySelected,
        showMove = false, showCopy = false, setshowMove, setshowCopy, showFieldAlert = false, handleClose,
        handleAddOpen, handleAddClose, showFieldAdd, handleSubmitAdd, handleDeleteRequistion, printRequsition,
        dataExport, loadingInsertRequisition,
    } = props;
    const styles = useStyles();
    const ref = React.useRef();
    const reff = React.useRef();
    React.useEffect(() => {
        const clickMove = (e) => {
            if (showMove && ref.current && !ref.current.contains(e.target)) {
                setshowMove(false);
            }
        };
        document.addEventListener('mousedown', clickMove);
        return () => {
            document.removeEventListener('mousedown', clickMove);
        };
    }, [showMove]);
    React.useEffect(() => {
        const clickCopy = (e) => {
            if (showCopy && reff.current && !reff.current.contains(e.target)) {
                setshowCopy(false);
            }
        };
        document.addEventListener('mousedown', clickCopy);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', clickCopy);
        };
    }, [showCopy]);
    return (
        <div className="detail-requisition-content-header">
            {showFieldAlert && (
                <Dialog className={classNames(styles.customFormsModal, 'custom-forms-modal')} open={showFieldAlert} onClose={handleClose}>
                    <DialogTitle>{t('customer:detailRequisition:modalCheckTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {t('customer:detailRequisition:modalCheckContent')}
                        </DialogContentText>
                        <Button className={classNames(styles.generalButton, 'btn-submit')} type="submit" align="left" onClick={handleClose}>
                            <Typography variant="p" type="normal">
                                {t('customer:detailRequisition:modalCheckButton')}
                            </Typography>
                        </Button>
                    </DialogContent>
                </Dialog>
            )}
            <div className="detail-requisition-content-info">
                <Typography variant="span" type="normal" size="14" letter="capitalize">
                    {dt.total_count}
                    {' '}
                    {t('common:product:name')}
                </Typography>
            </div>
            <div className="detail-requisition-content-move" ref={ref}>
                <Typography className="content-move-label" variant="span" type="normal" onClick={() => { setshowMove((showMove) => !showMove); }}>
                    {t('customer:detailRequisition:headerMove')}
                    <KeyboardArrowDownIcon />
                </Typography>
                {showMove && (
                    <div className="content-move-value">
                        {dataFull?.getRequisitionList?.data.map((val, index) => (
                            <p
                                key={`${index}-${val.entity_id}`}
                                style={{ cursor: 'pointer' }}
                                value={val.entity_id}
                                onClick={() => { handleMoveSelected(checkedRows, val.entity_id); }}
                            >
                                {val.name}
                            </p>
                        ))}
                        <p style={{ cursor: 'pointer' }} onClick={handleAddOpen}>
                            {t('+ Tambah Daftar Permintaan')}
                        </p>
                    </div>
                )}
            </div>
            <div className="detail-requisition-content-move" ref={reff}>
                <Typography className="content-move-label" variant="span" type="normal" onClick={() => { setshowCopy((showCopy) => !showCopy); }}>
                    {t('customer:detailRequisition:headerCopy')}
                    <KeyboardArrowDownIcon />
                </Typography>
                {showCopy && (
                    <div className="content-move-value">
                        {dataFull?.getRequisitionList?.data.map((val, index) => (
                            <p
                                key={`${index}-${val.entity_id}`}
                                style={{ cursor: 'pointer' }}
                                value={val.entity_id}
                                onClick={() => { handleCopySelected(checkedRows, val.entity_id); }}
                            >
                                {val.name}
                            </p>
                        ))}
                        <p style={{ cursor: 'pointer' }} onClick={handleAddOpen}>
                            {t('+ Tambah Daftar Permintaan')}
                        </p>
                    </div>
                )}
            </div>
            <div className="detail-requisition-content-print">
                <div className="detail-requisition-content-delete">
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
                <div className="detail-requisition-export">
                    <a 
                        href={dataExport?.exportRequisitionItem} 
                        rel="noreferrer"
                        target="_blank" 
                        className={classNames(styles.generalButton, 'btn-submit')}
                    >
                        <Typography variant="span" type="normal" color="white" size="14">
                            {t('customer:detailRequisition:headerExport')}
                        </Typography>
                    </a>
                </div>
                <div className="detail-requisition-print">
                    <div className="icon-print" onClick={() => printRequsition(dt.entity_id)} style={{ cursor: 'pointer' }}>
                        <Typography align="center" type="normal" letter="capitalize" size="14">
                            {t('customer:detailRequisition:headerPrint')}
                        </Typography>
                    </div>
                </div>
            </div>
            
            <AddRequisition
                t={t}
                handleAddClose={handleAddClose}
                showFieldAdd={showFieldAdd}
                handleSubmitAdd={handleSubmitAdd}
                loadingInsertRequisition={loadingInsertRequisition}
            />

        </div>
    );
};

export default TableListRowHeader;
