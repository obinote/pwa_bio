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

const TableListProduct = ({
    data, t, deleteItem, handleFeed, storeConfig = {},
    CustomTooltip,
    handleTooltipOpen,
    handleClickAway,
    editQtyBulk,
    handleUpdateQtyBulk,
    vendor,
}) => {
    const styles = useStyles();
    const regexNumber = /^\d+$/;
    const [confirmDel, setConfirmDel] = React.useState(false);
    const [selectDelete, setSelectDelete] = React.useState(null);
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const confirmDelete = (item) => {
        setConfirmDel(true);
        setSelectDelete(item);
    };

    const handleDelete = () => {
        setConfirmDel(false);
        deleteItem({
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

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    const typographyProps = {
        variant: 'span',
        type: 'bold',
        letter: 'uppercase',
    };

    return (
        <>
            <ConfirmationDelete
                t={t}
                open={confirmDel}
                handleDelete={handleDelete}
                handleCancel={cancelDelete}
            />
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow className={styles.tableRowHead}>
                            <TableCell align="left" colSpan={2}>
                                <Typography {...typographyProps}>
                                    {t('common:title:product')}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography {...typographyProps}>
                                    {t('common:title:price')}
                                </Typography>
                            </TableCell>
                            <TableCell align="center">
                                <Typography {...typographyProps}>
                                    {t('common:title:qty')}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography {...typographyProps}>
                                    {t('common:subtotal')}
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography {...typographyProps}>
                                    {t('common:tierDiscount')}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { vendor && (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <div className={styles.vendor}>
                                        <div className={styles.vendorLabel}>
                                            {vendor?.vendor_name}
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                        {data && data.length > 0 ? (
                            <>
                                {
                                    isDesktop
                                        ? data.map((val, index) => {
                                            const { customizable_options, SimpleMiniCustomizable, ConfigurableMiniCustomizable } = val;
                                            const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;
                                            const qtyEditFind = editQtyBulk?.find((item) => item.cart_item_id === val.id);

                                            return (
                                                <React.Fragment key={index}>
                                                    <TableRow className={styles.tableRowResponsive} key={index}>
                                                        <TableCell
                                                            align="center"
                                                            rowSpan={2}
                                                            className={classNames(styles.imgCell, styles.noBorder)}
                                                        >
                                                            <div className={styles.productImgContainer}>
                                                                <Link
                                                                    href="/[...slug]"
                                                                    as={`/${val.product.url_key}`}
                                                                >
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
                                                                {
                                                                val?.prices?.price.value === 0 ? (
                                                                    <span>Free</span>
                                                                ) : null
                                                                }
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            align="left"
                                                            className={classNames(styles.noBorder)}
                                                        >
                                                            <div className="row">
                                                                <div className="col-xs-12">
                                                                    <Link
                                                                        href="/[...slug]"
                                                                        as={`/${val.product.url_key}`}
                                                                    >
                                                                        <a>
                                                                            <Typography variant="span" letter="capitalize">
                                                                                {val.product.name}
                                                                            </Typography>
                                                                        </a>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-xs-12 column">
                                                                    { val.configurable_options ? val.configurable_options.map((item, idx) => (
                                                                        <Typography variant="span" letter="capitalize" key={idx}>
                                                                            <strong>{item.option_label}</strong>
                                                                            {' '}
                                                                            :
                                                                            {' '}
                                                                            {item.value_label}
                                                                        </Typography>
                                                                    )) : null}
                                                                </div>
                                                                {
                                                                    val.links && val.links.length > 0 && (
                                                                        <div className="col-xs-12 row option-link">
                                                                            <Typography variant="span" letter="capitalize" type="bold">
                                                                                Downloads :
                                                                                {' '}
                                                                            </Typography>
                                                                            <div className="column">
                                                                                { val.links.map((item, idx) => (
                                                                                    <Typography variant="span" letter="capitalize" key={idx}>
                                                                                        {item.title}
                                                                                    </Typography>
                                                                                )) }
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
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
                                                                                        {(item.label && item.label !== '') ? item.label : item.value}
                                                                                    </p>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ) : null}
                                                        </TableCell>

                                                        <TableCell
                                                            align="right"
                                                            rowSpan={2}
                                                            className={classNames(styles.noBorder)}
                                                        >
                                                            <Typography variant="span" align="right" letter="capitalize">
                                                                {formatPrice(
                                                            val?.prices?.price.value,
                                                            val?.prices?.price.currency || 'IDR',
                                                                )}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell
                                                            align="center"
                                                            rowSpan={2}
                                                            className={classNames(styles.qtyTable, styles.noBorder)}
                                                        >
                                                            <TextField
                                                                variant="outlined"
                                                                inputProps={{
                                                                    className: styles.textField,
                                                                }}
                                                                value={qtyEditFind?.quantity}
                                                                onChange={(e) => {
                                                                    const qtyValue = e.target.value;
                                                                    if (qtyValue.match(regexNumber) && qtyValue > 0) {
                                                                        handleUpdateQtyBulk(val.id, e.target.value);
                                                                    } else if (qtyValue === '') {
                                                                        handleUpdateQtyBulk(val.id, '');
                                                                    }
                                                                }}
                                                                onBlur={() => {
                                                                    if (qtyEditFind?.quantity === '') {
                                                                        handleUpdateQtyBulk(val.id, val.quantity);
                                                                    }
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            rowSpan={2}
                                                            className={classNames(styles.noBorder)}
                                                        >
                                                            <Typography variant="span" align="right" letter="capitalize">
                                                                {formatPrice(
                                                            val?.prices?.row_total.value,
                                                            val?.prices?.row_total.currency,
                                                                )}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            rowSpan={2}
                                                            className={classNames(styles.noBorder)}
                                                        >
                                                            <Typography variant="span" align="right" letter="capitalize">
                                                                {val?.prices?.tier_price?.value
                                                                    ? formatPrice(
                                                                val?.prices?.tier_price.value,
                                                                val?.prices?.tier_price.currency,
                                                                    )
                                                                    : '-'}
                                                            </Typography>
                                                        </TableCell>

                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell
                                                            align="left"
                                                            className={styles.noBorder}
                                                            colSpan={isDesktop ? 1 : 5}
                                                        >
                                                            <div>
                                                                <IconButton className={styles.iconBtn} onClick={() => handleAddWishlist(val)}>
                                                                    <FavoriteBorderOutlined fontSize="small" className={styles.icon} />
                                                                </IconButton>
                                                                <ClickAwayListener onClickAway={() => handleClickAway(val.id)}>
                                                                    <div style={{ display: 'inline-block' }}>
                                                                        <CustomTooltip id={val.id}>
                                                                            <IconButton className={styles.iconBtn} onClick={() => handleTooltipOpen(val.id)}>
                                                                                <PlaylistAdd fontSize="small" className={styles.icon} />
                                                                            </IconButton>
                                                                        </CustomTooltip>
                                                                    </div>
                                                                </ClickAwayListener>
                                                                <IconButton className={styles.iconBtn} onClick={() => confirmDelete(val)}>
                                                                    <DeleteOutlineOutlined fontSize="small" className={styles.icon} />
                                                                </IconButton>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                        {(val && val.product.stock_status === 'OUT_OF_STOCK') ? (
                                                            <TableCell colSpan={6}>
                                                                <Alert severity="error">
                                                                    {t('cart:oos')}
                                                                </Alert>
                                                            </TableCell>
                                                        ) : (<TableCell colSpan={6} />)}
                                                    </TableRow>
                                                </React.Fragment>
                                            );
                                        })
                                        : data.map((val, index) => {
                                            const { customizable_options, SimpleMiniCustomizable, ConfigurableMiniCustomizable } = val;
                                            const cartCustomOptions = SimpleMiniCustomizable || ConfigurableMiniCustomizable || customizable_options;
                                            const qtyEditFind = editQtyBulk?.find((item) => item.cart_item_id === val.id);

                                            return (
                                                <React.Fragment key={index}>
                                                    <TableRow key={index}>
                                                        <TableCell
                                                            className={classNames(styles.noBorder)}
                                                        >
                                                            <div className={classNames('row', styles.rowMobile)}>
                                                                <div className={styles.productImgContainer}>
                                                                    <Link
                                                                        href="/[...slug]"
                                                                        as={`/${val.product.url_key}`}
                                                                    >
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
                                                                    {
                                                                    val?.prices?.price.value === 0 ? (
                                                                        <span>Free</span>
                                                                    ) : null
                                                                    }
                                                                </div>

                                                                <div className={classNames(styles.nameProduct)}>

                                                                    <div className="row">
                                                                        <div className="col-xs-12">
                                                                            <Link
                                                                                href="/[...slug]"
                                                                                as={`/${val.product.url_key}`}
                                                                            >
                                                                                <a>
                                                                                    <Typography variant="span" letter="capitalize">
                                                                                        {val.product.name}
                                                                                    </Typography>
                                                                                </a>
                                                                            </Link>
                                                                        </div>
                                                                        <div className="col-xs-12 column">
                                                                            { val.configurable_options ? val.configurable_options.map((item, idx) => (
                                                                                <Typography variant="span" letter="capitalize" key={idx}>
                                                                                    <strong>{item.option_label}</strong>
                                                                                    {' '}
                                                                                    :
                                                                                    {' '}
                                                                                    {item.value_label}
                                                                                </Typography>
                                                                            )) : null}
                                                                        </div>
                                                                        {
                                                                            val.links && val.links.length > 0 && (
                                                                                <div className="col-xs-12 row option-link">
                                                                                    <Typography variant="span" letter="capitalize" type="bold">
                                                                                        Downloads :
                                                                                        {' '}
                                                                                    </Typography>
                                                                                    <div className="column">
                                                                                        { val.links.map((item, idx) => (
                                                                                            <Typography variant="span" letter="capitalize" key={idx}>
                                                                                                {item.title}
                                                                                            </Typography>
                                                                                        )) }
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
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
                                                                                                {(item.label && item.label !== '') ? item.label : item.value}
                                                                                            </p>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    ) : null}

                                                                    <div>
                                                                        <IconButton className={styles.iconBtn} onClick={() => handleAddWishlist(val)}>
                                                                            <FavoriteBorderOutlined fontSize="small" className={styles.icon} />
                                                                        </IconButton>
                                                                        <ClickAwayListener onClickAway={() => handleClickAway(val.id)}>
                                                                            <div style={{ display: 'inline-block' }}>
                                                                                <CustomTooltip id={val.id}>
                                                                                    <IconButton className={styles.iconBtn} onClick={() => handleTooltipOpen(val.id)}>
                                                                                        <PlaylistAdd fontSize="small" className={styles.icon} />
                                                                                    </IconButton>
                                                                                </CustomTooltip>
                                                                            </div>
                                                                        </ClickAwayListener>
                                                                        <IconButton className={styles.iconBtn} onClick={() => confirmDelete(val)}>
                                                                            <DeleteOutlineOutlined fontSize="small" className={styles.icon} />
                                                                        </IconButton>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell
                                                            align="right"
                                                            className={classNames(styles.noBorder)}
                                                        >
                                                            <div className={classNames('row', styles.rowMobile)}>

                                                                <div className={classNames(styles.itemSplit)}>
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

                                                                <div className={classNames(styles.itemSplit)}>
                                                                    <Typography {...typographyProps} align="center">
                                                                        {t('common:title:qty')}
                                                                    </Typography>
                                                                    <div className={classNames(styles.textfieldMobileWrapper)}>
                                                                        <TextField
                                                                            variant="outlined"
                                                                            inputProps={{
                                                                                className: styles.textField,
                                                                            }}
                                                                            value={qtyEditFind?.quantity}
                                                                            onChange={(e) => {
                                                                                const qtyValue = e.target.value;
                                                                                if (qtyValue.match(regexNumber) && qtyValue > 0) {
                                                                                    handleUpdateQtyBulk(val.id, e.target.value);
                                                                                } else if (qtyValue === '') {
                                                                                    handleUpdateQtyBulk(val.id, '');
                                                                                }
                                                                            }}
                                                                            onBlur={() => {
                                                                                if (qtyEditFind?.quantity === '') {
                                                                                    handleUpdateQtyBulk(val.id, val.quantity);
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className={classNames(styles.itemSplit)}>
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

                                                            </div>
                                                        </TableCell>

                                                    </TableRow>

                                                    <TableRow>
                                                        <TableCell
                                                            align="right"
                                                            className={classNames(styles.noBorder)}
                                                        >
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
                                                        {(val && val.product.stock_status === 'OUT_OF_STOCK') ? (
                                                            <TableCell colSpan={6}>
                                                                <Alert severity="error">
                                                                    {t('cart:oos')}
                                                                </Alert>
                                                            </TableCell>
                                                        ) : (<TableCell colSpan={6} />)}
                                                    </TableRow>
                                                </React.Fragment>
                                            );
                                        })
                                }
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6}>
                                    <Alert severity="warning">{t('order:notFound')}</Alert>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TableListProduct;
