/* eslint-disable linebreak-style */
/* eslint-disable max-len */

import React from 'react';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@common_typography';
import { formatPrice } from '@helper_currency';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderOutlined from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Link from 'next/link';
import Image from '@common_image';
import useStyles from '@core_modules/cart/pages/default/components/item/TableListItem/style';
import ConfirmationDelete from '@core_modules/cart/pages/default/components/confirmDelete';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Summary from '@plugin_summary';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { CartPageContext } from '../../../core';

const regexNumber = /^\d+$/;

const TableListProduct = ({
    data,
    t,
    deleteItem,
    handleFeed,
    storeConfig = {},
    CustomTooltip,
    handleTooltipOpen,
    handleClickAway,
    editQtyItem,
    handleUpdateQtyItem,
    handleOnCheckoutClicked,
    isLoadingUpdate,
}) => {
    const styles = useStyles();
    const context = React.useContext(CartPageContext);
    const [confirmDel, setConfirmDel] = React.useState(false);
    const [selectDelete, setSelectDelete] = React.useState(null);
    const isDesktops = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const [cartIdDel, setCartIdDel] = React.useState(null);
    const [openItems, setOpenItems] = React.useState(new Array(data.length).fill(true));

    const confirmDelete = (cartId, item) => {
        setConfirmDel(true);
        setSelectDelete(item);
        setCartIdDel(cartId);
    };

    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem(cartIdDel, {
            id: selectDelete.id,
            product: selectDelete.product,
            quantity: selectDelete.quantity,
            prices: selectDelete.prices,
        });
    };

    const cancelDelete = () => {
        setConfirmDel(false);
        setSelectDelete(null);
    };

    const handleAddWishlist = (item) => {
        handleFeed(item);
    };

    const handleOpenItem = (index) => {
        const newOpenItems = [...openItems];
        newOpenItems[index] = !newOpenItems[index];
        setOpenItems(newOpenItems);
    };

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    const typographyProps = {
        variant: 'span',
        letter: 'uppercase',
    };

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
        <>
            <ConfirmationDelete t={t} open={confirmDel} handleDelete={handleDelete} handleCancel={cancelDelete} />
            <TableContainer component={Paper} className={styles.tableContainer}>
                {allVendor && allVendor.length > 0 && (
                    <>
                        {allVendor.map((cartVendor, indexVendor) => {
                            const vendorName = cartVendor.vendor_name;
                            let indexNumber = 0;
                            return (
                                <div className={styles.cartvendor} key={indexVendor}>
                                    <Typography {...typographyProps} className={styles.titleDistributor}>
                                        <span className="icon icon-distributor-o" />
                                        {vendorName}
                                    </Typography>
                                    {data && data.length > 0
                                        ? data.map((cartItem, index) => {
                                            const cartId = cartItem.cart_id;
                                            if (cartItem.items.length === 0) {
                                                return null;
                                            }
                                            if (cartItem.vendor_code !== cartVendor.vendor_code) {
                                                return null;
                                            }
                                            indexNumber += 1;
                                            const disableSubmitQuote = cartItem.negotiable_quote_id !== null;
                                            return (
                                                <div
                                                    key={index}
                                                    className={disableSubmitQuote ? classNames(styles.itemWrapper, 'disabled-submit-quote')
                                                        : styles.itemWrapper}
                                                >
                                                    <Table className={styles.table} size="small" aria-label="a dense table">
                                                        {cartVendor.duplicate > 0 && (
                                                            <TableHead>
                                                                <TableRow className={styles.tableRowHead}>
                                                                    <TableCell align="left" colSpan={6} className={styles.tableRowDistributor}>
                                                                        <div className="outer-distributor-category" role="presentation" onClick={() => handleOpenItem(index)}>
                                                                            <Typography {...typographyProps} className="distributor">
                                                                                {t('cart:name', { counter: indexNumber })}
                                                                            </Typography>
                                                                            {openItems[index] ? <ExpandLess /> : <ExpandMore />}
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                        )}
                                                        {openItems[index] && (
                                                            <TableBody>
                                                                {cartItem.items.length > 0 ? (
                                                                    <>
                                                                        {isDesktops
                                                                            ? cartItem.items.map((val, indexItem) => {
                                                                                if (!val) {
                                                                                    return null;
                                                                                }
                                                                                const {
                                                                                    customizable_options,
                                                                                    SimpleMiniCustomizable,
                                                                                    ConfigurableMiniCustomizable,
                                                                                } = val;
                                                                                const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;
                                                                                const qtyEditFind = editQtyItem?.find((item) => item.cart_item_id === val.id);
                                                                                const productStock = val.product.qty_stock;
                                                                                const currentQty = val.quantity;
                                                                                return (
                                                                                    <React.Fragment key={indexItem}>
                                                                                        <TableRow className={[styles.tableRowResponsive, styles.itemRow]} key={indexItem}>
                                                                                            <TableCell
                                                                                                align="center"
                                                                                                className={classNames(styles.imgCell, styles.noBorder)}
                                                                                            >
                                                                                                <div className={styles.productImgContainer}>
                                                                                                    <Link href="/[...slug]" as={`/${val.product.url_key}`}>
                                                                                                        <a>
                                                                                                            <Image
                                                                                                                src={val.product.small_image.url}
                                                                                                                classContainer={styles.productImg}
                                                                                                                className={styles.productImg}
                                                                                                                alt={val.product.name}
                                                                                                                width={58}
                                                                                                                height={58}
                                                                                                                quality={80}
                                                                                                            />
                                                                                                        </a>
                                                                                                    </Link>
                                                                                                    {val?.prices?.price.value === 0 ? <span>Free</span> : null}
                                                                                                </div>
                                                                                            </TableCell>

                                                                                            <TableCell align="left" className={classNames(styles.noBorder)}>
                                                                                                <div className="row">
                                                                                                    <div className="col-xs-12">
                                                                                                        <Link href="/[...slug]" as={`/${val.product.url_key}`}>
                                                                                                            <a>
                                                                                                                <Typography variant="span" letter="capitalize">
                                                                                                                    {val.product.name}
                                                                                                                </Typography>
                                                                                                            </a>
                                                                                                        </Link>
                                                                                                    </div>
                                                                                                    <div className="col-xs-12 column">
                                                                                                        {val.configurable_options
                                                                                                            ? val.configurable_options.map((item, idx) => (
                                                                                                                <Typography
                                                                                                                    variant="span"
                                                                                                                    letter="capitalize"
                                                                                                                    key={idx}
                                                                                                                >
                                                                                                                    <strong>{item.option_label}</strong>
                                                                                                                    {' '}
                                                                                                                    :
                                                                                                                    {' '}
                                                                                                                    {item.value_label}
                                                                                                                </Typography>
                                                                                                            ))
                                                                                                            : null}
                                                                                                    </div>
                                                                                                    {val.links && val.links.length > 0 && (
                                                                                                        <div className="col-xs-12 row option-link">
                                                                                                            <Typography variant="span" letter="capitalize" type="bold">
                                                                                                                Downloads :
                                                                                                                {' '}
                                                                                                            </Typography>
                                                                                                            <div className="column">
                                                                                                                {val.links.map((item, idx) => (
                                                                                                                    <Typography
                                                                                                                        variant="span"
                                                                                                                        letter="capitalize"
                                                                                                                        key={idx}
                                                                                                                    >
                                                                                                                        {item.title}
                                                                                                                    </Typography>
                                                                                                                ))}
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )}
                                                                                                </div>
                                                                                                {val.bundle_options && val.bundle_options.length ? (
                                                                                                    <div className="product-options">
                                                                                                        {val.bundle_options.map((value, idx) => (
                                                                                                            <div className="option-wrapper" key={idx}>
                                                                                                                <strong>{value.label}</strong>
                                                                                                                {' '}
                                                                                                                :
                                                                                                                <div className="option-wrapper__item">
                                                                                                                    {value.values.map((item, idt) => (
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
                                                                                                {val.bundle_options && val.bundle_options.length ? (
                                                                                                    <div className="product-options">
                                                                                                        {val.bundle_options.map((bundle, idb) => (
                                                                                                            <div className="option-wrapper" key={idb}>
                                                                                                                <strong>{bundle.label}</strong>
                                                                                                                {' '}
                                                                                                                :
                                                                                                                <div className="option-wrapper__item">
                                                                                                                    {bundle.values.map((item, idt) => (
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
                                                                                                        {cartCustomOptions.map((op, idx) => (
                                                                                                            <div className="option-wrapper" key={idx}>
                                                                                                                <div className="row option-wrapper__item">
                                                                                                                    <strong>
                                                                                                                        {op.label}
                                                                                                                        {' '}
                                                                                                                        :
                                                                                                                    </strong>
                                                                                                                    {op.values.map((item, idt) => (
                                                                                                                        <p key={idt} className="option-item">
                                                                                                                            {item.label && item.label !== ''
                                                                                                                                ? item.label
                                                                                                                                : item.value}
                                                                                                                        </p>
                                                                                                                    ))}
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        ))}
                                                                                                    </div>
                                                                                                ) : null}

                                                                                                <div>
                                                                                                    <IconButton
                                                                                                        className={styles.iconBtn}
                                                                                                        onClick={() => handleAddWishlist(val)}
                                                                                                    >
                                                                                                        <FavoriteBorderOutlined
                                                                                                            fontSize="small"
                                                                                                            className={styles.icon}
                                                                                                        />
                                                                                                    </IconButton>
                                                                                                    <ClickAwayListener onClickAway={() => handleClickAway(val.id)}>
                                                                                                        <div style={{ display: 'inline-block' }}>
                                                                                                            <CustomTooltip id={val.id}>
                                                                                                                <IconButton
                                                                                                                    className={styles.iconBtn}
                                                                                                                    onClick={() => handleTooltipOpen(val.id)}
                                                                                                                >
                                                                                                                    <PlaylistAdd
                                                                                                                        fontSize="small"
                                                                                                                        className={styles.icon}
                                                                                                                    />
                                                                                                                </IconButton>
                                                                                                            </CustomTooltip>
                                                                                                        </div>
                                                                                                    </ClickAwayListener>
                                                                                                    <IconButton
                                                                                                        className={styles.iconBtn}
                                                                                                        onClick={() => confirmDelete(cartId, val)}
                                                                                                    >
                                                                                                        <DeleteOutlineOutlined fontSize="small" className={styles.icon} />
                                                                                                    </IconButton>
                                                                                                </div>
                                                                                            </TableCell>

                                                                                            <TableCell align="right" className={classNames(styles.noBorder)}>
                                                                                                <Typography {...typographyProps} className={styles.labelItem}>
                                                                                                    {t('common:title:price')}
                                                                                                </Typography>
                                                                                                <Typography
                                                                                                    variant="span"
                                                                                                    align="right"
                                                                                                    letter="capitalize"
                                                                                                    className={styles.middleValue}
                                                                                                >
                                                                                                    {formatPrice(
                                                                                                        Math.round(val?.prices?.price.value),
                                                                                                        val?.prices?.price.currency || 'IDR',
                                                                                                    )}
                                                                                                </Typography>
                                                                                            </TableCell>

                                                                                            <TableCell
                                                                                                align="center"
                                                                                                className={classNames(styles.qtyTable, styles.noBorder)}
                                                                                            >
                                                                                                <Typography {...typographyProps} className={styles.labelItem}>
                                                                                                    {t('common:title:qty')}
                                                                                                </Typography>
                                                                                                {val?.prices?.price.value !== 0 ? (
                                                                                                    <TextField
                                                                                                        id="input_qty"
                                                                                                        variant="outlined"
                                                                                                        inputProps={{
                                                                                                            className: styles.textField,
                                                                                                        }}
                                                                                                        value={qtyEditFind?.quantity}
                                                                                                        disabled={isLoadingUpdate}
                                                                                                        onChange={(e) => {
                                                                                                            const qtyValue = e.target.value;
                                                                                                            if (qtyValue.match(regexNumber) && qtyValue > 0) {
                                                                                                                handleUpdateQtyItem(cartId, val.id, e.target.value);
                                                                                                            } else if (qtyValue === '') {
                                                                                                                handleUpdateQtyItem(cartId, val.id, '');
                                                                                                            }
                                                                                                        }}
                                                                                                        onBlur={() => {
                                                                                                            if (qtyEditFind?.quantity === '') {
                                                                                                                context.resetItemQty(cartId, val.id);
                                                                                                            }
                                                                                                        }}
                                                                                                    />
                                                                                                ) : (
                                                                                                    <TextField
                                                                                                        variant="outlined"
                                                                                                        inputProps={{
                                                                                                            className: styles.textField,
                                                                                                        }}
                                                                                                        value={qtyEditFind?.quantity}
                                                                                                        disabled
                                                                                                    />
                                                                                                )}

                                                                                                {currentQty > productStock ? (
                                                                                                    <Typography {...typographyProps} className={styles.labelStock}>
                                                                                                        {t('common:cart:outOfStock')}
                                                                                                    </Typography>
                                                                                                ) : null}
                                                                                            </TableCell>

                                                                                            <TableCell align="right" className={classNames(styles.noBorder)}>
                                                                                                <Typography {...typographyProps} className={styles.labelItem}>
                                                                                                    {t('common:tierDiscount')}
                                                                                                </Typography>
                                                                                                <Typography
                                                                                                    variant="span"
                                                                                                    align="right"
                                                                                                    letter="capitalize"
                                                                                                    className={styles.middleValue}
                                                                                                >
                                                                                                    {val?.prices?.tier_price?.value
                                                                                                        ? formatPrice(
                                                                                                            Math.round(val?.prices?.tier_price.value),
                                                                                                            val?.prices?.tier_price.currency,
                                                                                                        )
                                                                                                        : '-'}
                                                                                                </Typography>
                                                                                            </TableCell>

                                                                                            <TableCell align="right" className={classNames(styles.noBorder)}>
                                                                                                <Typography {...typographyProps} className={styles.labelItem}>
                                                                                                    {t('common:subtotal')}
                                                                                                </Typography>
                                                                                                <Typography
                                                                                                    variant="span"
                                                                                                    align="right"
                                                                                                    letter="capitalize"
                                                                                                    className={styles.middleValue}
                                                                                                >
                                                                                                    {formatPrice(
                                                                                                        Math.round(val?.prices?.row_total.value),
                                                                                                        val?.prices?.row_total.currency || 'IDR',
                                                                                                    )}
                                                                                                </Typography>
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    </React.Fragment>
                                                                                );
                                                                            })
                                                                            : cartItem.items.map((val, indexItem) => {
                                                                                if (!val) {
                                                                                    return null;
                                                                                }
                                                                                const {
                                                                                    customizable_options,
                                                                                    SimpleMiniCustomizable,
                                                                                    ConfigurableMiniCustomizable,
                                                                                } = val;
                                                                                const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;
                                                                                const qtyEditFind = editQtyItem?.find((item) => item.cart_item_id === val.id);
                                                                                const productStock = val.product.qty_stock;
                                                                                const currentQty = val.quantity;

                                                                                return (
                                                                                    <React.Fragment key={indexItem}>
                                                                                        <TableRow key={indexItem}>
                                                                                            <TableCell className={classNames(styles.noBorder)} colSpan={2}>
                                                                                                <div className={classNames('row', styles.rowMobile)}>
                                                                                                    <div className={styles.productImgContainer}>
                                                                                                        <Link href="/[...slug]" as={`/${val.product.url_key}`}>
                                                                                                            <a>
                                                                                                                <Image
                                                                                                                    src={val.product.small_image.url}
                                                                                                                    classContainer={styles.productImg}
                                                                                                                    className={styles.productImg}
                                                                                                                    alt={val.product.name}
                                                                                                                    width={58}
                                                                                                                    height={58}
                                                                                                                    quality={80}
                                                                                                                />
                                                                                                            </a>
                                                                                                        </Link>
                                                                                                        {val?.prices?.price.value === 0 ? <span>Free</span> : null}
                                                                                                    </div>

                                                                                                    <div className={classNames(styles.nameProduct)}>
                                                                                                        <div className="row">
                                                                                                            <div className="col-xs-12">
                                                                                                                <Link href="/[...slug]" as={`/${val.product.url_key}`}>
                                                                                                                    <a>
                                                                                                                        <Typography variant="span" letter="capitalize">
                                                                                                                            {val.product.name}
                                                                                                                        </Typography>
                                                                                                                    </a>
                                                                                                                </Link>
                                                                                                            </div>
                                                                                                            <div className="col-xs-12 column">
                                                                                                                {val.configurable_options
                                                                                                                    ? val.configurable_options.map((item, idx) => (
                                                                                                                        <Typography
                                                                                                                            variant="span"
                                                                                                                            letter="capitalize"
                                                                                                                            key={idx}
                                                                                                                        >
                                                                                                                            <strong>{item.option_label}</strong>
                                                                                                                            {' '}
                                                                                                                            :
                                                                                                                            {' '}
                                                                                                                            {item.value_label}
                                                                                                                        </Typography>
                                                                                                                    ))
                                                                                                                    : null}
                                                                                                            </div>
                                                                                                            {val.links && val.links.length > 0 && (
                                                                                                                <div className="col-xs-12 row option-link">
                                                                                                                    <Typography
                                                                                                                        variant="span"
                                                                                                                        letter="capitalize"
                                                                                                                        type="bold"
                                                                                                                    >
                                                                                                                        Downloads :
                                                                                                                        {' '}
                                                                                                                    </Typography>
                                                                                                                    <div className="column">
                                                                                                                        {val.links.map((item, idx) => (
                                                                                                                            <Typography
                                                                                                                                variant="span"
                                                                                                                                letter="capitalize"
                                                                                                                                key={idx}
                                                                                                                            >
                                                                                                                                {item.title}
                                                                                                                            </Typography>
                                                                                                                        ))}
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            )}
                                                                                                        </div>
                                                                                                        {val.bundle_options && val.bundle_options.length ? (
                                                                                                            <div className="product-options">
                                                                                                                {val.bundle_options.map((value, idx) => (
                                                                                                                    <div className="option-wrapper" key={idx}>
                                                                                                                        <strong>{value.label}</strong>
                                                                                                                        {' '}
                                                                                                                        :
                                                                                                                        <div className="option-wrapper__item">
                                                                                                                            {value.values.map((item, idt) => (
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
                                                                                                        {val.bundle_options && val.bundle_options.length ? (
                                                                                                            <div className="product-options">
                                                                                                                {val.bundle_options.map((bundle, idb) => (
                                                                                                                    <div className="option-wrapper" key={idb}>
                                                                                                                        <strong>{bundle.label}</strong>
                                                                                                                        {' '}
                                                                                                                        :
                                                                                                                        <div className="option-wrapper__item">
                                                                                                                            {bundle.values.map((item, idt) => (
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
                                                                                                                {cartCustomOptions.map((op, idx) => (
                                                                                                                    <div className="option-wrapper" key={idx}>
                                                                                                                        <div className="row option-wrapper__item">
                                                                                                                            <strong>
                                                                                                                                {op.label}
                                                                                                                                {' '}
                                                                                                                                :
                                                                                                                            </strong>
                                                                                                                            {op.values.map((item, idt) => (
                                                                                                                                <p key={idt} className="option-item">
                                                                                                                                    {item.label && item.label !== ''
                                                                                                                                        ? item.label
                                                                                                                                        : item.value}
                                                                                                                                </p>
                                                                                                                            ))}
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                ))}
                                                                                                            </div>
                                                                                                        ) : null}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </TableCell>
                                                                                        </TableRow>

                                                                                        <TableRow>
                                                                                            <TableCell align="right" className={classNames(styles.noBorder)}>
                                                                                                <div className={classNames('row product-info', styles.rowMobile)}>
                                                                                                    <div
                                                                                                        className={classNames(styles.itemSplit, 'item-split item-price')}
                                                                                                    >
                                                                                                        <Typography {...typographyProps} align="left">
                                                                                                            {t('common:title:price')}
                                                                                                        </Typography>
                                                                                                        <Typography variant="span" align="left" letter="capitalize">
                                                                                                            {formatPrice(
                                                                                                                val?.prices?.price.value,
                                                                                                                val?.prices?.price.currency || 'IDR',
                                                                                                            )}
                                                                                                        </Typography>
                                                                                                    </div>

                                                                                                    <div className={classNames(styles.itemSplit, 'item-split item-qty')}>
                                                                                                        <Typography {...typographyProps} align="center">
                                                                                                            {t('common:title:qty')}
                                                                                                        </Typography>
                                                                                                        <div className={classNames(styles.textfieldMobileWrapper)}>
                                                                                                            {val?.prices?.price.value !== 0 ? (
                                                                                                                <TextField
                                                                                                                    id="input_qty"
                                                                                                                    variant="outlined"
                                                                                                                    inputProps={{
                                                                                                                        className: styles.textField,
                                                                                                                    }}
                                                                                                                    value={qtyEditFind?.quantity}
                                                                                                                    disabled={isLoadingUpdate}
                                                                                                                    onChange={(e) => {
                                                                                                                        const qtyValue = e.target.value;
                                                                                                                        if (qtyValue.match(regexNumber) && qtyValue > 0) {
                                                                                                                            handleUpdateQtyItem(
                                                                                                                                cartId,
                                                                                                                                val.id,
                                                                                                                                e.target.value,
                                                                                                                            );
                                                                                                                        } else if (qtyValue === '') {
                                                                                                                            handleUpdateQtyItem(cartId, val.id, '');
                                                                                                                        }
                                                                                                                    }}
                                                                                                                    onBlur={() => {
                                                                                                                        if (qtyEditFind?.quantity === '') {
                                                                                                                            context.resetItemQty(cartId, val.id);
                                                                                                                        }
                                                                                                                    }}
                                                                                                                />
                                                                                                            )
                                                                                                                : (
                                                                                                                    <TextField
                                                                                                                        variant="outlined"
                                                                                                                        inputProps={{
                                                                                                                            className: styles.textField,
                                                                                                                        }}
                                                                                                                        value={qtyEditFind?.quantity}
                                                                                                                        disabled
                                                                                                                    />
                                                                                                                )}

                                                                                                            {currentQty > productStock ? (
                                                                                                                <Typography {...typographyProps} className={styles.labelStock}>
                                                                                                                    {t('common:cart:outOfStock')}
                                                                                                                </Typography>
                                                                                                            ) : null}
                                                                                                        </div>
                                                                                                    </div>

                                                                                                    <div
                                                                                                        className={classNames(
                                                                                                            styles.itemSplit,
                                                                                                            'item-split item-subtotal',
                                                                                                        )}
                                                                                                    >
                                                                                                        <Typography {...typographyProps} align="right">
                                                                                                            {t('common:subtotal')}
                                                                                                        </Typography>
                                                                                                        <Typography variant="span" align="right" letter="capitalize">
                                                                                                            {formatPrice(
                                                                                                                val?.prices?.row_total.value,
                                                                                                                val?.prices?.row_total.currency,
                                                                                                            )}
                                                                                                        </Typography>
                                                                                                    </div>

                                                                                                    <div className="item-split item-actions">
                                                                                                        <IconButton
                                                                                                            className={styles.iconBtn}
                                                                                                            onClick={() => handleAddWishlist(val)}
                                                                                                        >
                                                                                                            <FavoriteBorderOutlined
                                                                                                                fontSize="small"
                                                                                                                className={styles.icon}
                                                                                                            />
                                                                                                        </IconButton>
                                                                                                        <ClickAwayListener onClickAway={() => handleClickAway(val.id)}>
                                                                                                            <div style={{ display: 'inline-block' }}>
                                                                                                                <CustomTooltip id={val.id}>
                                                                                                                    <IconButton
                                                                                                                        className={styles.iconBtn}
                                                                                                                        onClick={() => handleTooltipOpen(val.id)}
                                                                                                                    >
                                                                                                                        <PlaylistAdd
                                                                                                                            fontSize="small"
                                                                                                                            className={styles.icon}
                                                                                                                        />
                                                                                                                    </IconButton>
                                                                                                                </CustomTooltip>
                                                                                                            </div>
                                                                                                        </ClickAwayListener>
                                                                                                        {val?.prices?.price?.value !== 0 ? (
                                                                                                            <IconButton
                                                                                                                className={styles.iconBtn}
                                                                                                                onClick={() => confirmDelete(cartId, val)}
                                                                                                            >
                                                                                                                <DeleteOutlineOutlined
                                                                                                                    fontSize="small"
                                                                                                                    className={styles.icon}
                                                                                                                />
                                                                                                            </IconButton>
                                                                                                        ) : (
                                                                                                            <></>
                                                                                                        )}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </TableCell>
                                                                                        </TableRow>

                                                                                        <TableRow>
                                                                                            <TableCell align="right" className={classNames(styles.noBorder)}>
                                                                                                <div className={classNames(styles.itemFull)}>
                                                                                                    <Typography {...typographyProps} align="right">
                                                                                                        {t('common:tierDiscount')}
                                                                                                    </Typography>
                                                                                                    <Typography variant="span" align="right" letter="capitalize">
                                                                                                        {val?.prices?.tier_price?.value
                                                                                                            ? formatPrice(
                                                                                                                val?.prices?.tier_price.value,
                                                                                                                val?.prices?.tier_price.currency,
                                                                                                            )
                                                                                                            : '-'}
                                                                                                    </Typography>
                                                                                                </div>
                                                                                            </TableCell>
                                                                                        </TableRow>

                                                                                        <TableRow>
                                                                                            {val && val.product.stock_status === 'OUT_OF_STOCK' ? (
                                                                                                <TableCell colSpan={6}>
                                                                                                    <Alert severity="error">{t('cart:oos')}</Alert>
                                                                                                </TableCell>
                                                                                            ) : (
                                                                                                <TableCell colSpan={6} />
                                                                                            )}
                                                                                        </TableRow>
                                                                                    </React.Fragment>
                                                                                );
                                                                            })}
                                                                    </>
                                                                ) : null}
                                                            </TableBody>
                                                        )}
                                                    </Table>
                                                    {openItems[index] && (
                                                        <Summary
                                                            dataCart={cartItem}
                                                            t={t}
                                                            isDesktop
                                                            isOnTop
                                                            handleActionSummary={handleOnCheckoutClicked}
                                                            storeConfig={storeConfig}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })
                                        : null}
                                </div>
                            );
                        })}
                    </>
                )}
            </TableContainer>
        </>
    );
};

export default TableListProduct;
