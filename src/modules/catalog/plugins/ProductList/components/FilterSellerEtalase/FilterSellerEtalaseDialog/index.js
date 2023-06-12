import { useState } from 'react';
import useStyles from '@plugin_productlist/components/FilterSellerEtalase/FilterSellerEtalaseDialog/style';
import Dialog from '@material-ui/core/Dialog';
import classNames from 'classnames';

const FilterSellerEtalaseDialog = (props) => {
    const {
        t, sellerEtalase, selectedSellerEtalase, setSelectedSellerEtalase,
    } = props;
    const styles = useStyles();
    const [open, setOpen] = useState(false);

    const itemSelected = sellerEtalase.find((itm) => itm.value === selectedSellerEtalase) ?? { label: t('catalog:allProduct'), value: 'all' };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onHandleClickEtalase = (value) => {
        setSelectedSellerEtalase(value);
        handleClose();
    };

    const EtalaseItem = ({ label, value }) => {
        const selected = value === selectedSellerEtalase || (selectedSellerEtalase !== 'all' && selectedSellerEtalase === label);

        return (
            <div
                className={classNames(styles.etalaseItem, selected ? styles.etalaseItemSelected : '')}
                onClick={() => onHandleClickEtalase(value === 'all' ? value : label)}
                aria-hidden="true"
            >
                <span className={classNames(styles.etalaseLabel, selected ? styles.etalaseLabelSelected : '')}>{label}</span>
            </div>
        );
    };

    return (
        <>
            <div className={classNames(styles.etalaseContainer, 'hidden-desktop')}>
                <div className={classNames(styles.sellerEtalase)} onClick={handleOpen} aria-hidden="true">
                    <div className={classNames(styles.etalaseList)}>
                        <EtalaseItem {...itemSelected} />
                    </div>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <div className={classNames(styles.dialogContainer)}>
                    <div className={classNames(styles.dialogList)}>
                        <EtalaseItem label={t('catalog:allProduct')} value="all" />
                        {sellerEtalase?.map((item) => (
                            <EtalaseItem {...item} />
                        ))}
                    </div>
                    <div className={classNames(styles.dialogBack)} onClick={handleClose} aria-hidden="true">
                        <span className={classNames(styles.dialogBackLabel)}>{t('catalog:backButton')}</span>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default FilterSellerEtalaseDialog;
