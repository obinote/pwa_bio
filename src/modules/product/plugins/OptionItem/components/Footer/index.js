/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import Typography from '@common_typography';
import useStyles from '@plugin_optionitem/components/Footer/style';
import ButtonQty from '@common_buttonqty';

const Button = dynamic(() => import('@common_button'), { ssr: true });
const RequisitionPopover = dynamic(() => import('@plugin_optionitem/components/Requisition'), { ssr: false });
const ModalCreate = dynamic(() => import('@plugin_optionitem/components/Requisition/ModalCreate'), { ssr: false });

const ConfigurableView = (props) => {
    const {
        loading,
        disabled,
        handleAddToCart,
        t,
        showAddToCart = true,
        customStyleBtnAddToCard = '',
        labelAddToCart = '',
        customButton,
        wishlist,
        handleWishlist,
        handleChatDistributor,
        isLogin,
        handleLogin,
        handleRegisterDistributor,
        requisitionAction,
        is_valid,
        showQty = true,
        qty,
        setQty,
        maxQty,
        customQty = false,
        freeItemsData,
    } = props;
    const styles = useStyles();
    const {
        requisitionAnchor, setRequisitionAnchor, modalRequisition, setModalRequisition,
    } = requisitionAction;

    const handlePopoverClose = () => {
        setRequisitionAnchor(null);
    };
    const handlePopoverOpen = (event) => {
        setRequisitionAnchor(event.currentTarget);
    };

    const handleModalOpen = () => {
        setModalRequisition(true);
    };

    const handleModalClose = () => {
        setRequisitionAnchor(null);
        setModalRequisition(false);
    };

    if (customButton) {
        return customButton;
    }

    if (!isLogin) {
        return (
            <div className={classNames(styles.container)}>
                <div className={classNames('row')}>
                    <div className={classNames('col-lg-8 col-xs-8', styles.colLoginInfo)}>
                        <Typography variant="span" className={classNames(styles.textLoginInfo)}>
                            {t('catalog:loginToShopping')}
                        </Typography>
                    </div>
                    <div className={classNames('col-lg-4 col-xs-4')}>
                        <Button className={classNames(styles.btnAddToCard, customStyleBtnAddToCard)} onClick={handleLogin}>
                            <Typography align="center" variant="inherit" className={styles.textBtnAddToCard}>
                                {t('catalog:login')}
                            </Typography>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // if (!is_valid) {
    //     return (
    //         <div className={classNames(styles.container)}>
    //             <div className={classNames('row')}>
    //                 <div className={classNames('col-lg-8 col-xs-8', styles.colLoginInfo)}>
    //                     <Typography variant="span" className={classNames(styles.textLoginInfo)}>
    //                         {t('catalog:registerToShopping')}
    //                     </Typography>
    //                 </div>
    //                 <div className={classNames('col-lg-4 col-xs-4')}>
    //                     <Button className={classNames(styles.btnAddToCard, customStyleBtnAddToCard)} onClick={handleRegisterDistributor}>
    //                         <Typography align="center" variant="inherit" className={styles.textBtnAddToCard}>
    //                             {t('catalog:registerNow')}
    //                         </Typography>
    //                     </Button>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    if (!is_valid) {
        return <></>;
    }
    return (
        <div className={classNames(styles.container, styles.mobileRemoveColor)}>
            <div className={classNames('row')}>
                <div className={classNames(styles.qtyWrapper, 'col-lg-2 col-xs-12')}>
                    {showQty && (
                        <div className={classNames(styles.qty, 'product-OptionItem-qty')}>
                            <ButtonQty value={qty} onChange={setQty} max={customQty ? freeItemsData.quantity : maxQty} />
                        </div>
                    )}
                </div>

                {showAddToCart && (
                    <div
                        className={classNames(styles.btnAddToCardContainer, 'col-lg-4 col-xs-12')}
                        id={`add-to-cart${typeof window !== 'undefined' && window.innerWidth <= 768 ? '-mobile' : ''}`}
                    >
                        <Button
                            id="button_addToCart"
                            className={classNames(styles.btnAddToCard, customStyleBtnAddToCard)}
                            onClick={handleAddToCart}
                            loading={loading}
                            disabled={disabled}
                        >
                            <Typography align="center" color="white" variant="inherit" className={styles.textBtnAddToCard}>
                                {labelAddToCart || t('product:addToCart')}
                            </Typography>
                        </Button>
                    </div>
                )}

                <div className={classNames(styles.rightWrapper, 'col-lg-6 col-xs-12')}>
                    <span className={styles.btnAction} onClick={handleChatDistributor} id="chat-pdp">
                        <i className={classNames('icon-chat', styles.iconChat)} />
                        <span className={styles.btnActionText}>{t('product:chatDistributor')}</span>
                    </span>

                    <span className={styles.btnAction} onClick={handleWishlist} id="wishlist">
                        {wishlist ? (
                            <i className={classNames('icon-wishlisted', styles.iconMoon)} />
                        ) : (
                            <i className={classNames('icon-wishlist', styles.iconMoon)} />
                        )}
                        <span className={styles.btnActionText}>{t('product:wishlist')}</span>
                    </span>

                    <span className={styles.btnAction} onClick={handlePopoverOpen} id="request">
                        <i className={classNames('icon-requisition', styles.iconMoon)} />
                        <span className={styles.btnActionText}>{t('product:requisitionList')}</span>
                    </span>
                </div>
            </div>
            <RequisitionPopover
                requisitionAction={requisitionAction}
                requisitionAnchor={requisitionAnchor}
                handlePopoverClose={handlePopoverClose}
                setRequisitionAnchor={setRequisitionAnchor}
                handleModalOpen={handleModalOpen}
                {...props}
            />
            <ModalCreate {...props} modalRequisition={modalRequisition} handleModalClose={handleModalClose} />
        </div>
    );
};

export default ConfigurableView;
