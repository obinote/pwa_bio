/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useRouter } from 'next/router';
// import { formatPrice } from '@helper_currency';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CloseIcon from '@material-ui/icons/CloseOutlined';
import Drawer from '@material-ui/core/Drawer';
import Popover from '@material-ui/core/Popover';
import Skeleton from '@plugin_minicart/components/skeleton';
import ItemCart from '@plugin_minicart/components/product';
import useStyles from '@plugin_minicart/components/style';
// import PaypalButtonView from '@plugin_paypalbutton';
import Button from '@common_button';
import { useTranslation } from '@i18n';

function buildHeaderContent(loading, count) {
    const { t } = useTranslation(['common']);
    if (loading) return '...';
    if (count > 0) {
        return (
            <>
                <strong>{count}</strong>
                {' '}
                {t('common:cart:itemOnCart')}
            </>
        );
    }
    return t('common:cart:emptyCart');
}

const ModalMiniComponent = (props) => {
    const {
        open, setOpen, count, t, loading, data, deleteCart, updateCart, qtyUpdate, isLoadingUpdate,
    } = props;
    const router = useRouter();
    const styles = useStyles();
    const shoppingBagEl = document.getElementById('shopping-bag');

    const counts = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const item of data) {
        counts[item.vendor_code] = (counts[item.vendor_code] || 0) + 1;
    }
    const allVendor = [...new Set(data.map((item) => item.vendor_code))]
        .map((code) => {
            const item = data.find((i) => i.vendor_code === code);
            return { vendor_code: code, vendor_name: item.vendor_name, duplicate: counts[code] - 1 };
        });

    return (
        <Popover
            id="test-popover"
            className={styles.miniCartPop}
            open={open}
            onClose={setOpen}
            elevation={2}
            anchorEl={shoppingBagEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: -10,
                horizontal: 'right',
            }}
            getContentAnchorEl={null}
        >
            <div className={styles.miniCartModal}>
                <div className="mini-top">
                    <span>{buildHeaderContent(loading, count)}</span>
                    <CloseIcon className="close-btn" fontSize="small" onClick={setOpen} />
                </div>

                {loading && data.length === 0 && <Skeleton />}

                {allVendor.length > 0 && (
                    <>
                        {allVendor.map((cartVendor, indexVendor) => {
                            const vendorName = cartVendor.vendor_name;
                            const vendorData = data.filter((cartItem) => cartItem.vendor_code === cartVendor.vendor_code);
                            return (
                                <div className="item-list-container" key={indexVendor}>
                                    <div className="vendor-name">
                                        <span className="icon icon-distributor-o" />
                                        <div className="label">{vendorName}</div>
                                    </div>
                                    {vendorData.length > 0 && (
                                        <div className="wrapper-item-container">
                                            {vendorData.map((cartItem, index) => (
                                                <div
                                                    key={index}
                                                    className={cartItem.negotiable_quote_id !== null ? 'item-list-container disabled-submit-quote' : 'item-list-container'}
                                                >
                                                    <ItemCart data={cartItem.items} t={t} deleteCart={deleteCart} updateCart={updateCart} cartId={cartItem.cart_id} qtyUpdate={qtyUpdate} isLoadingUpdate={isLoadingUpdate} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                        <div className="view-edit-btn-container">
                            <Button
                                id="button_lihat_dan_edit_keranjang"
                                fullWidth
                                className="view-edit-btn"
                                onClick={() => {
                                    setOpen();
                                    router.push('/checkout/cart');
                                }}
                            >
                                {t('common:button:viewandedit')}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </Popover>
    );
};

const DrawerMiniComponent = (props) => {
    const {
        open, setOpen, count, t, loading, data, deleteCart, updateCart, qtyUpdate, isLoadingUpdate,
    } = props;
    // eslint-disable-next-line no-unused-vars
    const router = useRouter();
    const styles = useStyles();

    const counts = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const item of data) {
        counts[item.vendor_code] = (counts[item.vendor_code] || 0) + 1;
    }

    const allVendor = [...new Set(data.map((item) => item.vendor_code))]
        .map((code) => {
            const item = data.find((i) => i.vendor_code === code);
            return { vendor_code: code, vendor_name: item.vendor_name, duplicate: counts[code] - 1 };
        });

    return (
        <Drawer anchor="right" open={open} onClose={setOpen} className={styles.miniCartPop}>
            <div className={styles.miniCartDrawer}>
                <div className="mini-top">
                    <div className="mini-top-inner-container">
                        <span>
                            {count}
                            {' '}
                            {t('common:cart:item')}
                        </span>
                        <span className="cart-title">{t('common:cart:myCart')}</span>
                        <CloseIcon className="close-btn" onClick={setOpen} />
                    </div>
                </div>
                {/* {loading || !data.items ? <Skeleton /> : ( */}
                {loading && data.length === 0 && <Skeleton />}

                {allVendor.length > 0 && (
                    <>
                        {allVendor.map((cartVendor, indexVendor) => {
                            const vendorName = cartVendor.vendor_name;
                            const vendorData = data.filter((cartItem) => cartItem.vendor_code === cartVendor.vendor_code);
                            return (
                                <div className="wrapper-item-container">
                                    <div className="item-list-container" key={indexVendor}>
                                        <div className="vendor-name">
                                            <span className="icon icon-distributor-o" />
                                            <div className="label">{vendorName}</div>
                                        </div>
                                        {vendorData.length > 0 && (
                                            <>
                                                {vendorData.map((cartItem, index) => (
                                                    <div
                                                        key={index}
                                                        className={cartItem.negotiable_quote_id !== null ? 'item-list-container disabled-submit-quote' : 'item-list-container'}
                                                    >
                                                        <ItemCart data={cartItem.items} t={t} deleteCart={deleteCart} updateCart={updateCart} cartId={cartItem.cart_id} qtyUpdate={qtyUpdate} isLoadingUpdate={isLoadingUpdate} />
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
        </Drawer>
    );
};

const MiniComponent = (props) => {
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    return (
        <>
            {!isDesktop ? <DrawerMiniComponent {...props} /> : <ModalMiniComponent {...props} />}
        </>
    );
};

export default MiniComponent;
