/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Button from '@common_button';
import Typography from '@common_typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { formatPrice } from '@helper_currency';
import classNames from 'classnames';
import Skeleton from '@material-ui/lab/Skeleton';
import useStyles from '@plugin_summary/components/DesktopSummary/style';
import PaypalButtonView from '@plugin_paypalbutton';
import Collapse from '@material-ui/core/Collapse';
import Modal from '@core_modules/cart/plugins/Summary/components/DesktopSummary/components/Modal';
import { useTranslation } from '@i18n';

const Loader = ({ isDesktop, isOnTop }) => {
    const { t } = useTranslation();
    const styles = useStyles();

    return (
        <div id="desktopSummary" className={isDesktop && !isOnTop ? classNames(styles.container, 'hidden-mobile') : styles.container}>
            <Typography variant="h1" type="regular" letter="capitalize">
                {t('common:summary:title')}
            </Typography>
            <ListItem className={classNames(styles.list, 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </ListItem>
            <ListItem className={classNames(styles.list, 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </ListItem>
            <ListItem className={classNames(styles.list, 'listSummary')}>
                <Skeleton variant="rect" width="100%" height="30px" animation="wave" />
            </ListItem>
            <ListItem className={classNames(styles.list, 'listSummary')}>
                <ListItemText
                    primary={(
                        <Typography variant="title" type="bold">
                            Total
                        </Typography>
                    )}
                />
                <Skeleton variant="rect" width="60%" height="30px" animation="wave" />
            </ListItem>
        </div>
    );
};

const Summary = (props) => {
    const {
        t,
        summary,
        handleActionSummary = () => { },
        loading,
        disabled,
        showItems = false,
        items = [],
        hideButton = false,
        isDesktop,
        isLoader,
        withAction,
        withLabel = true,
        labelItemAlign = 'left',
        dataCart,
        storeConfig,
        isOnTop,
        maxSize,
    } = props;
    const styles = useStyles();
    const [openItem, setOpenItem] = React.useState(false);
    const [openTax, setOpenTax] = React.useState(false);

    const handleClickTax = () => {
        setOpenTax(!openTax);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let isOutOfStock = false;
    items.forEach((productItem) => {
        if (productItem && productItem.quantity > productItem.product.qty_stock) {
            isOutOfStock = true;
        }
    });
    const point = dataCart?.earn_points ?? 0;

    if (isLoader) {
        return <Loader isDesktop={isDesktop} isOnTop={isOnTop} />;
    }

    return (
        <div id="desktopSummary" className={isDesktop && !isOnTop ? classNames(styles.container, 'hidden-mobile') : styles.container}>
            {withLabel && (
                <Typography
                    className={classNames(styles.size, styles.colorPrimary, styles.summaryTitle)}
                    variant="h1"
                    type="bold"
                    letter="capitalize"
                >
                    {t('common:summary:title')}
                </Typography>
            )}
            {showItems ? (
                <>
                    <div className={classNames('row between-xs')} onClick={() => setOpenItem(!openItem)}>
                        <div className="col-xs-8">
                            <Typography variant="span" size="14">
                                {`${items.length}`}
                                {' '}
                                {t('common:summary:itemsText')}
                            </Typography>
                        </div>
                        <div className="col-xs-2">{openItem ? <ExpandLess /> : <ExpandMore />}</div>
                    </div>
                    {openItem ? (
                        <div className={classNames('row')}>
                            {items.map((item, index) => (
                                <div
                                    id="listItemProductSummary"
                                    className={classNames('col-xs-12 row between-xs', styles.list, styles.listProduct)}
                                    key={index}
                                >
                                    <div className="col-xs-7">
                                        <Typography variant="span" type="bold" size="14" className={styles.productName}>
                                            {item.product.name}
                                        </Typography>
                                        {item.configurable_options && item.configurable_options.length ? (
                                            <div className="product-options">
                                                {item.configurable_options.map((val, idx) => (
                                                    <div className="option-wrapper" key={idx}>
                                                        <strong>{val.option_label}</strong>
                                                        {' '}
                                                        :
                                                        {val.value_label}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}
                                        <div className="flex-grow" />
                                        {withAction && (
                                            <div>
                                                <span className="quantity-margin" size="14">
                                                    Qty:
                                                </span>
                                                <span className="item-count" size="14">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={classNames('col-xs-5', styles.bodyProductItem)}>
                                        <Typography variant="span" size="14" letter="uppercase">
                                            {item.prices.row_total.value === 0
                                                ? t('common:title:free')
                                                : formatPrice(Math.round(item.prices.row_total.value), item.prices.row_total.currency || 'IDR')}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </>
            ) : null}
            <div className={classNames('row total between-xs')}>
                <div className="col-xs-12 col-sm-6 col-md-6">
                    <List>
                        {summary.data.map((dt, index) => (
                            <>
                                <ListItem
                                    className={classNames(
                                        'list-summary',
                                        styles.list,
                                        dt.childrenTax ? styles.borderTop : '',
                                        !!dt.childrenTax && !openTax ? styles.borderBottom : '',
                                    )}
                                    key={index}
                                    button={!!dt.childrenTax}
                                    onClick={() => (dt.childrenTax ? handleClickTax() : {})}
                                >
                                    <ListItemText
                                        className={styles.labelItem}
                                        primary={(
                                            <Typography variant="p" letter="capitalize" size="14" align={labelItemAlign} className={styles.noMargin}>
                                                {dt.item}
                                            </Typography>
                                        )}
                                    />
                                    {!dt.childrenTax && (
                                        <ListItemSecondaryAction>
                                            <Typography variant="span" type="regular">
                                                {dt.value}
                                            </Typography>
                                        </ListItemSecondaryAction>
                                    )}

                                    {!!dt.childrenTax && (
                                        <>
                                            <ListItemText />
                                            <Typography variant="span" type="regular">
                                                {dt.value}
                                            </Typography>
                                            <div className={styles.iconWrapper}>
                                                {openTax ? <ExpandLess className={styles.arrowIcon} /> : <ExpandMore className={styles.arrowIcon} />}
                                            </div>
                                        </>
                                    )}
                                </ListItem>
                                {!!dt.childrenTax && (
                                    <Collapse in={openTax} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {dt.childrenTax.map((tax, idx) => (
                                                <ListItem
                                                    button
                                                    className={classNames(
                                                        'list-children',
                                                        styles.list,
                                                        idx === dt.childrenTax.length - 1 ? styles.borderBottom : '',
                                                    )}
                                                >
                                                    <ListItemText
                                                        className={styles.labelItem}
                                                        primary={(
                                                            <Typography
                                                                variant="p"
                                                                letter="capitalize"
                                                                size="14"
                                                                align={labelItemAlign}
                                                                className={styles.noMargin}
                                                            >
                                                                {tax.item}
                                                            </Typography>
                                                        )}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <Typography variant="span" type="regular">
                                                            {tax.value}
                                                        </Typography>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </>
                        ))}
                        {summary.totalTax ? (
                            <div className={classNames('row between-xs')} onClick={() => setOpenTax(!openTax)}>
                                <div className="col-xs-12">
                                    <ListItem className={classNames(styles.list, 'listSummary')}>
                                        <ListItemText
                                            className={styles.labelItem}
                                            primary={(
                                                <Typography
                                                    variant="p"
                                                    letter="capitalize"
                                                    size="14"
                                                    align={labelItemAlign}
                                                    className={styles.noMargin}
                                                >
                                                    {t('common:summary:tax')}
                                                </Typography>
                                            )}
                                        />
                                        <ListItemSecondaryAction>
                                            <Typography variant="span" type="regular">
                                                {summary.totalTax}
                                            </Typography>
                                            {openTax ? <ExpandLess className="expandtax" /> : <ExpandMore className="expandtax" />}
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    {openTax
                                        ? summary.dataTax.map((dt, index) => (
                                            <ListItem className={classNames(styles.list, 'listSummary')} key={index}>
                                                <ListItemText
                                                    className={styles.labelItem}
                                                    primary={(
                                                        <Typography
                                                            variant="p"
                                                            letter="capitalize"
                                                            size="14"
                                                            align={labelItemAlign}
                                                            className={styles.noMargin}
                                                        >
                                                            {dt.item}
                                                        </Typography>
                                                    )}
                                                />
                                                <ListItemSecondaryAction>
                                                    <Typography variant="span" type="regular">
                                                        {dt.value}
                                                    </Typography>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))
                                        : null}
                                </div>
                            </div>
                        ) : null}

                        <ListItem className={classNames(styles.list, 'listSummary')}>
                            <ListItemText
                                className={styles.labelItem}
                                primary={(
                                    <Typography
                                        variant="title"
                                        type="bold"
                                        align={labelItemAlign}
                                        className={classNames(styles.size, styles.colorPrimary)}
                                    >
                                        {t('common:summary:totalOrder')}
                                    </Typography>
                                )}
                            />
                            <ListItemSecondaryAction>
                                <Typography type="bold" variant="title" className={classNames(styles.size, styles.colorPrimary)}>
                                    {summary.total.currency ? formatPrice(Math.round(summary.total.value), summary.total.currency) : null}
                                </Typography>
                            </ListItemSecondaryAction>
                        </ListItem>

                        {point > 0 && (
                            <ListItem className={classNames(styles.list, 'listInfoPoint')}>
                                <img
                                    src="/assets/img/point.svg"
                                    alt="icon"
                                />
                                <ListItemText
                                    className="point-list"
                                    primary={(
                                        <Typography
                                            variant="span"
                                            type="regular"
                                            align={labelItemAlign}
                                            className="point-text"
                                        >
                                            <div dangerouslySetInnerHTML={{ __html: t('common:summary:infoPoint', { point }) }} />
                                        </Typography>
                                    )}
                                />
                            </ListItem>
                        )}
                    </List>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-4">
                    <div className={classNames(styles.footer, 'wrapper-action')}>
                        {!hideButton ? (
                            <>
                                {!isOutOfStock ? (
                                    <Button
                                        id="button_lanjutkan_ke_pembayaran"
                                        loading={loading}
                                        disabled={disabled}
                                        className={styles.btnCheckout}
                                        onClick={() => handleActionSummary(dataCart)}
                                    >
                                        <Typography variant="span" color="white" type="bold" letter="uppercase">
                                            {t('common:button:proceedToCheckout')}
                                        </Typography>
                                    </Button>
                                ) : (
                                    <Button
                                        loading={loading}
                                        disabled={disabled}
                                        className={styles.btnQuote}
                                        onClick={handleOpen}
                                    >
                                        <Typography variant="span" color="white" type="bold" letter="uppercase">
                                            {t('common:button:proceedToQuotation')}
                                        </Typography>
                                    </Button>
                                )}

                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    dataCart={dataCart}
                                    maxSize={maxSize}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                />

                            </>
                        ) : null}
                        {!hideButton && dataCart && (
                            <div className={styles.paypalBtn}>
                                <PaypalButtonView cart={dataCart} t={t} storeConfig={storeConfig} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Summary;
