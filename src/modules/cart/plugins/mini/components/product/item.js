/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
/* eslint-disable radix */
import { useState } from 'react';
import Link from 'next/link';
import Thumbor from '@common_image';
import { formatPrice } from '@helper_currency';
import { useTranslation } from '@i18n';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CloseIcon from '@material-ui/icons/Close';
import ConfigurableOptions from '@core_modules/cart/plugins/mini/components/product/configurableOptions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@common_button';
import useStyles from '@plugin_minicart/components/style';
import cartEventBus, { DELETE_CART_ITEM } from '@core_modules/cart/helpers/cartEventBus';
import { DELETE_FROM_CART, EventBus } from '@root/src/helpers/EventBus';

const Item = (props) => {
    const {
        quantity, prices, product, deleteCart, updateCart, id, configurable_options, bundle_options, customizable_options,
        SimpleMiniCustomizable, ConfigurableMiniCustomizable,
        aw_giftcard_option, cartId, qtyUpdate, isLoadingUpdate,
    } = props;
    const styles = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const { t } = useTranslation(['common']);
    const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;
    const qtyItem = qtyUpdate && qtyUpdate?.id === id ? qtyUpdate.qty : null;

    const handleDeleteItem = async () => {
        await deleteCart(cartId, id);
        setDialogOpen(false);
        // FIXME obsolete cartEventBust, just use EventBus instead
        cartEventBus.emit(DELETE_CART_ITEM, { cartId, itemId: id });
        EventBus.emit(DELETE_FROM_CART, { cartId, itemId: id });
    };

    if (!product) {
        return <></>;
    }

    return (
        <>
            <li>
                <div className="product">
                    <a className="product-item-photo">
                        <Thumbor className="product-image-photo" src={product.small_image.url} alt={product.small_image.label} width={75} height={92} />
                        {prices?.price?.value === 0 ? <span>{t('common:title:free')}</span> : null}
                    </a>
                    <div className="product-item-desc">
                        <div className="product-item-details">
                            <span className="product-item-name">
                                <Link href="/[...slug]" as={`/${product.url_key}`}>
                                    <a>{product.name}</a>
                                </Link>
                            </span>
                            {configurable_options && configurable_options.length ? (
                                <ConfigurableOptions items={configurable_options} />
                            ) : null}
                            <div className="item-price">
                                {formatPrice(Math.round(prices?.price?.value || 0), prices?.price?.currency || 'IDR')}
                            </div>
                            {bundle_options && bundle_options.length ? (
                                <div className="product-options">
                                    {bundle_options.map((val, idx) => (
                                        <div className="option-wrapper" key={idx}>
                                            <strong>{val.label}</strong>
                                            {' '}
                                            :
                                            <div className="option-wrapper__item">
                                                {val.values.map((item, idt) => (
                                                    <div key={idt}>
                                                        {item.quantity}
                                                        {' '}
                                                        x
                                                        {item.label}
                                                        {' '}
                                                        <strong>
                                                            + $
                                                            {item.price}
                                                        </strong>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            {cartCustomOptions && cartCustomOptions.length ? (
                                <div className="product-options">
                                    {cartCustomOptions.map((val, idx) => (
                                        <div className="option-wrapper" key={idx}>
                                            <div className="row option-wrapper__item">
                                                <strong>
                                                    {val.label}
                                                    {' '}
                                                    :
                                                </strong>
                                                {val.values.map((item, idt) => (
                                                    <p key={idt} className="option-item">
                                                        {item.label && item.label !== '' ? item.label : item.value}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            {aw_giftcard_option && aw_giftcard_option.length ? (
                                <div className="product-options">
                                    {aw_giftcard_option.map((val, idx) => (
                                        <div className="option-wrapper" key={idx}>
                                            <div className="row option-wrapper__item">
                                                <strong>
                                                    {val.label}
                                                    {' '}
                                                    :
                                                </strong>
                                                {val.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                        <div className="product-item-pricing">
                            <label className="label" htmlFor={`cart-item-${id}`}>
                                Jumlah :
                            </label>
                            {prices.price.value !== 0 ? (
                                <input
                                    id={`cart-item-${id}`}
                                    className="item-count"
                                    type="number"
                                    value={qtyItem ?? quantity}
                                    min={1}
                                    disabled={isLoadingUpdate}
                                    onChange={({ target }) => updateCart(cartId, id, parseInt(target.value))}
                                />
                            ) : (
                                <input id={`cart-item-${id}`} className="item-count" type="number" value={qtyItem ?? quantity} min={1} disabled />
                            )}

                        </div>

                        {product.stock_status === 'OUT_OF_STOCK' && (
                            <div className="oos-info">
                                <span className="oos-info-content">{t('common:cart:oos')}</span>
                            </div>
                        )}
                    </div>
                    {prices.price.value !== 0 && (
                        <DeleteOutlinedIcon
                            className="delete"
                            onClick={() => {
                                setDialogOpen(true);
                            }}
                        />
                    )}
                </div>
            </li>
            <Dialog
                open={dialogOpen}
                onClose={() => { setDialogOpen(false); }}
                className={styles.rootDialog}
            >
                <div className={styles.removeItemDialog}>
                    <div className="header">
                        <p>{t('common:cart:validation')}</p>
                        <CloseIcon className="icon-close" onClick={() => { setDialogOpen(false); }} style={{ cursor: 'pointer' }} />
                    </div>
                    <div className="button-container">
                        <Button
                            rootClassName="root-button"
                            className="button cancel-button"
                            onClick={() => { setDialogOpen(false); }}
                        >
                            {t('common:cart:cancel')}
                        </Button>
                        <Button
                            rootClassName="root-button"
                            className="button confirm-button"
                            onClick={handleDeleteItem}
                        >
                            {t('common:cart:oke')}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default Item;
