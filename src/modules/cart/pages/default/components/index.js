/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import Route from 'next/router';
import classNames from 'classnames';
import useStyles from '@core_modules/cart/pages/default/components/style';
import dynamic from 'next/dynamic';
import { formatPrice } from '@helper_currency';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@common_typography';
import Tooltip from '@material-ui/core/Tooltip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Modal from '@material-ui/core/Modal';
import { getCartDataLazy } from '@core_modules/cart/services/graphql';
import { setCartId } from '@helper_cartid';

// const CrossSell = dynamic(() => import('@core_modules/cart/pages/default/components/crosssell'), { ssr: false });
const GimmickBanner = dynamic(() => import('@plugin_gimmickbanner'), { ssr: false });

const Content = (props) => {
    const {
        ItemView, CrossSellView, CheckoutDrawerView, dataCart, t, handleFeed,
        toggleEditMode, editMode, deleteItem, toggleEditDrawer, crosssell, errorCart,
        EditDrawerView, editItem, openEditDrawer, updateItem, SummaryView, PromoModalItemView, handleAddPromoItemToCart,
        applyCoupon, removeCoupon, storeConfig,
        handleUpdateQtyBulk, handleUpdateQtyItem, updateItemBulk, editQtyBulk, editQtyItem,
        requisitionList,
        CartBlock,
        formikAddRequisition,
        openTooltip, setOpenTooltip,
        openModalAddItemReq, setOpenModalAddItemReq,
        handleAddItemToRequisition,
        handleAddQtyToRequisitionListItem,
        addQtyReqDesc, setAddQtyReqDesc,
        addQtyReqInput, setAddQtyReqInput,
        openModalAddQtyReq, setOpenModalAddQtyReq, isLoadingUpdate,
        ...other
    } = props;

    const styles = useStyles();

    const [getCart] = getCartDataLazy();

    const handleModalAddReqClose = () => {
        setOpenModalAddItemReq(false);
    };

    const handleModaAddReqOpen = (id) => {
        const items = dataCart?.items ?? [];
        if (id === 'all-items') {
            formikAddRequisition.setFieldValue('items', items);
        } else {
            const theItem = items.filter((item) => item.id === id);
            formikAddRequisition.setFieldValue('items', theItem);
        }

        setOpenTooltip(null);
        setOpenModalAddItemReq(true);
    };

    const handleTooltipClose = () => {
        setOpenTooltip(null);
    };

    const handleTooltipOpen = (value) => {
        setOpenTooltip(value);
    };

    const handleModalAddQtyReqClose = () => {
        setAddQtyReqDesc('');
        setAddQtyReqInput(null);
        setOpenModalAddQtyReq(false);
    };

    const handleClickAway = (id) => {
        if (id === openTooltip) {
            handleTooltipClose();
        }
    };

    const handleOnCheckoutClicked = (cartData) => {
        const minimumOrderEnabled = storeConfig.minimum_order_enable;
        const grandTotalValue = cartData.prices.grand_total.value;
        const minimumOrderAmount = storeConfig.minimum_order_amount;
        const { cart_id } = cartData;
        if (minimumOrderEnabled && grandTotalValue < minimumOrderAmount) {
            const errorMessage = {
                variant: 'error',
                text: `Unable to place order: Minimum order amount is ${formatPrice(minimumOrderAmount)}`,
                open: true,
            };
            window.toastMessage({
                ...errorMessage,
            });
        } else {
            window.backdropLoader(true);
            getCart({
                variables: {
                    cartId: cart_id,
                },
            }).then((res) => {
                window.backdropLoader(false);
                if (res.data.cart) {
                    setCartId(cart_id);

                    if (res.data.cart?.address_status?.is_address_approved === false) {
                        window.toastMessage({
                            variant: 'error',
                            text: t('cart:checkout:errorMsgAddressApproved'),
                            open: true,
                        });
                        return;
                    }

                    if (res.data.cart?.address_status?.is_address_default === false) {
                        window.toastMessage({
                            variant: 'error',
                            text: t('cart:checkout:errorMsgAddressDefault'),
                            open: true,
                        });
                        return;
                    }

                    Route.push('/checkout');
                } else {
                    window.toastMessage({
                        variant: 'error',
                        text: t('cart:checkout:errorMsgGeneral'),
                        open: true,
                    });
                }
            }).catch(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    variant: 'error',
                    text: t('cart:checkout:errorMsgGeneral'),
                    open: true,
                });
            });
        }
    };

    const CustomTooltip = ({ id, children }) => (
        <Tooltip
            classes={{ tooltip: styles.tooltip }}
            PopperProps={{
                disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={openTooltip === id}
            disableFocusListener
            disableHoverListener
            placement="bottom-start"
            title={(
                <>
                    <List component="nav" aria-label="tooltip">
                        {requisitionList.map((req) => (
                            <ListItem
                                key={req.entity_id}
                                button
                                onClick={() => handleAddItemToRequisition({
                                    id_requisition: req.entity_id,
                                    id_item: id,
                                })}
                            >
                                <ListItemText
                                    classes={{ primary: styles.listItemText }}
                                    primary={req.name}
                                />
                            </ListItem>
                        ))}
                        <ListItem
                            key="add-requistion"
                            button
                            onClick={() => handleModaAddReqOpen(id)}
                        >
                            <ListItemIcon classes={{ root: styles.listItemIcon }}>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText
                                classes={{ primary: styles.listItemText }}
                                primary={t('cart:createNewRequisitionList')}
                            />
                        </ListItem>
                    </List>
                </>
            )}
        >
            {children}
        </Tooltip>
    );

    return (
        <div className={classNames(styles.cartContainer)}>
            <Modal
                open={openModalAddItemReq}
                onClose={handleModalAddReqClose}
            >
                <div className={styles.modalContainer}>
                    <div className={styles.modalHeader}>
                        <h1 className={styles.modalH1}>
                            {t('cart:createRequisitionList')}
                        </h1>
                        <div className={styles.modalClose} onClick={() => handleModalAddReqClose()} aria-hidden="true">
                            <CloseIcon size="large" color="secondary" />
                        </div>
                    </div>
                    <form onSubmit={formikAddRequisition.handleSubmit}>
                        <div className={styles.modalContent}>
                            <div className={styles.modalInputWrapper}>
                                <label className={styles.modalInputLabel} htmlFor="name">
                                    {t('cart:requisitionListName')}
                                    <span className={styles.inputRequired}>*</span>
                                </label>
                                <input
                                    id="name"
                                    className={styles.modalInput}
                                    type="text"
                                    name="name"
                                    value={formikAddRequisition.values.name}
                                    onChange={formikAddRequisition.handleChange}
                                />
                                { formikAddRequisition.errors.name && (
                                    <Typography variant="caption" align="left" color="red">
                                        {formikAddRequisition.errors.name}
                                    </Typography>
                                ) }
                            </div>
                            <div className={styles.modalInputWrapper}>
                                <label className={styles.modalInputLabel} htmlFor="description">
                                    {t('cart:description')}
                                </label>
                                <div className="input-password-container">
                                    <textarea
                                        id="description"
                                        className={classNames(styles.modalInput, styles.modalTextArea)}
                                        name="description"
                                        value={formikAddRequisition.values.description}
                                        onChange={formikAddRequisition.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button type="submit" className={styles.modalSave}>
                                {t('cart:button:save')}
                            </button>
                            <button type="button" className={styles.modalCancel} onClick={() => handleModalAddReqClose()}>
                                {t('cart:button:cancel')}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Modal
                open={openModalAddQtyReq}
                onClose={handleModalAddQtyReqClose}
            >
                <div className={styles.modalContainer}>
                    <div className={styles.modalHeader}>
                        <h1 className={styles.modalH1}>
                            {t('cart:addItemToRequisitionList')}
                        </h1>
                        <div className={styles.modalClose} onClick={() => handleModalAddQtyReqClose()} aria-hidden="true">
                            <CloseIcon size="large" color="secondary" />
                        </div>
                    </div>
                    <div className={styles.modalContent}>
                        <div>{addQtyReqDesc}</div>
                        <br />
                        <div>{t('cart:quantitiesCombined')}</div>
                    </div>
                    <div className={styles.modalFooter}>
                        <button type="submit" className={styles.modalSave} onClick={() => handleAddQtyToRequisitionListItem()}>
                            {t('cart:button:addItem')}
                        </button>
                        <button type="button" className={styles.modalCancel} onClick={() => handleModalAddQtyReqClose()}>
                            {t('cart:button:cancel')}
                        </button>
                    </div>
                </div>
            </Modal>
            <div className={classNames(styles.pageTitleWrapper)}>
                <h1 id="h1_keranjang_belanja" className={classNames(styles.pageTitle)}>
                    {t('cart:pageTitle')}
                </h1>
            </div>
            <div className={classNames(styles.mobileBottomSpace, 'row')}>
                <div className="col-xs-12">
                    <GimmickBanner data={dataCart.promoBanner || []} t={t} {...other} />
                </div>
                <div className={styles.cartBoxContainer}>
                    <ItemView
                        data={dataCart}
                        t={t}
                        toggleEditMode={toggleEditMode}
                        editMode={editMode}
                        deleteItem={deleteItem}
                        handleFeed={handleFeed}
                        toggleEditDrawer={toggleEditDrawer}
                        storeConfig={storeConfig}
                        CustomTooltip={CustomTooltip}
                        handleTooltipOpen={handleTooltipOpen}
                        handleClickAway={handleClickAway}
                        handleUpdateQtyBulk={handleUpdateQtyBulk}
                        handleUpdateQtyItem={handleUpdateQtyItem}
                        editQtyBulk={editQtyBulk}
                        editQtyItem={editQtyItem}
                        handleOnCheckoutClicked={handleOnCheckoutClicked}
                        isLoadingUpdate={isLoadingUpdate}
                    />
                </div>
            </div>
        </div>
    );
};

export default Content;
