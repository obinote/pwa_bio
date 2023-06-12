/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import React from 'react';
import Popover from '@material-ui/core/Popover';
import useStyles from '@plugin_optionitem/components/Requisition/style';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@common_typography';

const RequisitionPopover = (props) => {
    const {
        t, requisitionAnchor, handlePopoverClose, handleModalOpen,
        requisitionAction, items,
    } = props;
    const styles = useStyles();
    const popOverOpen = Boolean(requisitionAnchor);
    const { requisitionListData, addItemRequisition } = requisitionAction;

    // ACTION
    function addToListAll(id, dataItem) {
        return new Promise((resolve, reject) => {
            addItemRequisition({
                variables: {
                    id_requisition: id,
                    items: [
                        {
                            sku: dataItem.product_sku,
                            qty: 1,
                        },
                    ],
                },
            }).then(() => {
                resolve(true);
            }).catch(() => {
                reject();
            });
        });
    }

    const addToList = async (prop) => {
        let countSuccess = 0;
        window.backdropLoader(true);
        // eslint-disable-next-line no-restricted-syntax
        for (const dataItem of items) {
            try {
                // eslint-disable-next-line no-await-in-loop
                await addToListAll(prop, dataItem);
                countSuccess += 1;
            } catch (e) {
                console.log(e);
            }
        }

        window.backdropLoader(false);
        if (countSuccess) {
            window.toastMessage({
                open: true,
                text: t('order:addItemRequisitionSuccess'),
                variant: 'success',
            });
        } else {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('order:addItemRequisitionError'),
            });
        }
    };

    // RENDER
    const list = requisitionListData?.getRequisitionList?.data;

    const RenderList = ({ lists }) => {
        if (!lists || Object.keys(lists).length === 0) return null;
        return (
            <div className={classNames(styles.list)}>
                {lists.map((item, key) => (
                    <Typography
                        type="normal"
                        variant="p"
                        key={key}
                        letter="capitalize"
                        className={styles.listText}
                        onClick={() => {
                            addToList(item.entity_id);
                        }}
                    >
                        {item.name}
                    </Typography>
                ))}
            </div>
        );
    };

    const AddRequisition = () => (
        <div className={classNames(styles.list, styles.listAction)} onClick={handleModalOpen}>
            <AddIcon className={classNames(styles.addIcon)} />
            <Typography type="normal" variant="span" letter="capitalize" className={styles.listText}>
                {t('order:createNewRequisitionList')}
            </Typography>
        </div>
    );
    return (
        <>
            <Popover
                id="test-popover"
                open={popOverOpen}
                onClose={handlePopoverClose}
                elevation={2}
                anchorEl={requisitionAnchor}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                getContentAnchorEl={null}
                className={classNames(styles.root)}
            >
                <div className={classNames(styles.popoverContainer)}>
                    <RenderList lists={list} />
                    <AddRequisition />
                </div>
            </Popover>
        </>
    );
};

export default RequisitionPopover;
