/* eslint-disable linebreak-style */
/* eslint-disable react/no-unknown-property */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-console */
import React from 'react';
import Popover from '@material-ui/core/Popover';
import useStyles from '@plugin_optionitem/components/Requisition/style';
import classNames from 'classnames';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@common_typography';

const requisitionPopover = (props) => {
    const { t, requisitionAnchor, handlePopoverClose, handleModalOpen, requisitionAction } = props;
    const styles = useStyles();
    const popOverOpen = Boolean(requisitionAnchor);
    const { requisitionListData, sku, addItemRequisition } = requisitionAction;

    // ACTION
    const addToList = (prop) => {
        addItemRequisition({
            variables: {
                id_requisition: prop,
                items: [
                    {
                        sku,
                        qty: 1,
                    },
                ],
            },
        })
            .then(async (res) => {
                window.toastMessage({
                    open: true,
                    variant: 'success',
                    text: t('product:requisition:addItemRequisitionSuccess'),
                });
            })
            .catch((e) => {
                const message = e?.message ?? '';
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: t('product:requisition:addItemRequisitionError'),
                });
                console.log('requisition error', message);
            });
    };

    // RENDER
    const list = requisitionListData?.getRequisitionList?.data;

    const RenderList = ({ lists }) => {
        if (!lists || Object.keys(lists).length === 0) return <></>;
        return (
            <div className={classNames(styles.list)}>
                {lists.map((item, key) => (
                    <Typography
                        type="normal"
                        variant="p"
                        key={key}
                        letter="capitalize"
                        className={styles.listText}
                        onClick={(ev) => {
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
                {t('product:requisition:createNewRequisitionList')}
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

export default requisitionPopover;
