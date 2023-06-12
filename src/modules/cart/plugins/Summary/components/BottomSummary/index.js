/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import Slide from '@material-ui/core/Slide';
import Typography from '@common_typography';
import Button from '@common_button';
import { useState } from 'react';
import ExpansionPanel from '@material-ui/core/Accordion';
import ExpansionPanelDetails from '@material-ui/core/AccordionDetails';
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { formatPrice } from '@helper_currency';
import Divider from '@material-ui/core/Divider';
import classNames from 'classnames';
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined';
import useStyles from '@plugin_summary/components/BottomSummary/style';
import PaypalButtonView from '@plugin_paypalbutton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Loader = () => (
    <>
        <Skeleton variant="text" width="100%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="text" width="80%" height={20} animation="wave" style={{ marginBottom: 10 }} />
        <Skeleton variant="text" width="60%" height={20} animation="wave" style={{ marginBottom: 10 }} />
    </>
);

const CheckoutDrawer = ({
    editMode,
    t,
    summary,
    handleActionSummary,
    loading,
    checkout,
    disabled,
    showItems = false,
    items = [],
    label = '',
    isLoader,
    deleteCart,
    withAction,
    dataCart,
    isCart = false,
    storeConfig,
}) => {
    const styles = useStyles();
    const [expanded, setExpanded] = useState(null);
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const { data, total } = summary;
    const [openTax, setOpenTax] = React.useState(false);
    const [boxes, setBoxes] = useState([]);
    const useOtp = dataCart?.needOtpValidation ?? false;

    const handleCheckbox = (e) => {
        // Destructure the children from the parent of
        // the element that was changed (ie all the input elements)
        const { parentNode: { children } } = e.target;

        // Find the index of the box that was changed
        const index = [...children].indexOf(e.target);

        // Copy the state
        const newState = [...boxes];

        // Toggle the boolean at the index of
        // the `newState` array
        newState[index] = !newState[index];

        // Set the state with the updated array
        setBoxes(newState);

        if (useOtp) {
            if (newState[index] && !checkout?.selected?.checkoutOtp) {
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: t('checkout:message:otpValidation'),
                });
            }
        } else if (!dataCart?.signature_base64 && newState[index]) {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('checkout:message:signatureValidation'),
            });
        }
    };

    const isDisabled = () => {
        const len = boxes.filter((box) => box).length;

        if (useOtp) {
            if (!checkout?.selected?.checkoutOtp) {
                return true;
            }
        } else {
            if (!dataCart?.signature_base64) {
                return true;
            }
            return len === 0 || len > 1;
        }
    };

    const point = dataCart?.earn_points ?? 0;

    return (
        <Slide direction="up" in={!editMode} mountOnEnter unmountOnExit>
            <div className={styles.checkoutBox} id="bottomSummary">
                <ExpansionPanel expanded={expanded === 1} onChange={handleChange(1)} className={styles.expand}>
                    <ExpansionPanelSummary
                        classes={{
                            root: styles.expanHead,
                            expanded: styles.expandHeadOpen,
                        }}
                    >
                        {expanded === 1 ? <ExpandLess /> : <ExpandMore />}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={styles.expanBody}>
                        {isLoader ? (
                            <Loader />
                        ) : (
                            <>
                                {showItems ? (
                                    <>
                                        <div className={classNames('row', styles.itemContainer)}>
                                            {items.map((item, index) => (
                                                <div className="col-xs-12 row" key={index} id="bottomListItemProductSummary">
                                                    <div className="col-xs-12 row between-xs clear-margin-padding">
                                                        <div className="col-xs-6">
                                                            <Typography
                                                                variant="span"
                                                                size="14"
                                                            >
                                                                {item.product.name}
                                                            </Typography>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            <Typography variant="p" align="right" type="bold" size="14">
                                                                {formatPrice(
                                                                    Math.round(item.prices.row_total.value),
                                                                    item.prices.row_total.currency || 'IDR',
                                                                )}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    {withAction && (
                                                        <div className={classNames('col-xs-12  row between-xs clear-margin-padding', styles.action)}>
                                                            <div className="col-xs-6">
                                                                {/* <span
                                                                    className="item-minus qty-update"
                                                                    onClick={() => {
                                                                        if (item.quantity > 1) {
                                                                            setExpanded(false);
                                                                            updateCart(item.id, item.quantity - 1);
                                                                        }
                                                                    }}
                                                                /> */}
                                                                <Typography
                                                                    variant="span"
                                                                    size="14"
                                                                >
                                                                    Qty
                                                                </Typography>
                                                                <span className="item-count">{item.quantity}</span>
                                                                {/* <span
                                                                    className="item-plus qty-update"
                                                                    onClick={() => {
                                                                        setExpanded(false);
                                                                        updateCart(item.id, item.quantity + 1);
                                                                    }}
                                                                /> */}
                                                            </div>
                                                            <div
                                                                className="col-xs-6 delete"
                                                                onClick={() => {
                                                                    setExpanded(0);
                                                                    deleteCart(item.id);
                                                                }}
                                                            >
                                                                <IconButton className="delete-button" color="inherit">
                                                                    <DeleteOutlineOutlined className="icon-delete" />
                                                                </IconButton>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <Divider />
                                    </>
                                ) : null}
                            </>
                        )}
                        {isLoader ? (
                            <Loader />
                        ) : (
                            <List>
                                {data.map((dt, index) => (
                                    <ListItem className={styles.list} key={index}>
                                        <ListItemText
                                            className={styles.labelItem}
                                            primary={(
                                                <Typography
                                                    variant="p"
                                                    size="14"
                                                    letter="capitalize"
                                                    type="regular"
                                                    className={styles.noMargin}
                                                >
                                                    {dt.item}
                                                </Typography>
                                            )}
                                        />
                                        <ListItemSecondaryAction>
                                            <Typography
                                                variant="span"
                                                size="14"
                                                letter="capitalize"
                                                type="regular"
                                                className={styles.noMargin}
                                            >
                                                {dt.value}
                                            </Typography>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                                {summary.totalTax ? (
                                    <div className={classNames('row between-xs')} onClick={() => setOpenTax(!openTax)}>
                                        <div className="col-xs-12">
                                            <ListItem className={styles.list}>
                                                <ListItemText
                                                    className={styles.labelItem}
                                                    primary={(
                                                        <Typography
                                                            variant="p"
                                                            size="14"
                                                            letter="capitalize"
                                                            type="regular"
                                                            className={styles.noMargin}
                                                        >
                                                            {t('common:summary:tax')}
                                                        </Typography>
                                                    )}
                                                />
                                                <ListItemSecondaryAction>
                                                    <Typography
                                                        variant="span"
                                                        size="14"
                                                        letter="capitalize"
                                                        type="regular"
                                                        className={styles.noMargin}
                                                    >
                                                        {summary.totalTax}
                                                    </Typography>
                                                    {openTax ? <ExpandLess className="expandtax" /> : <ExpandMore className="expandtax" />}
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            {openTax ? summary.dataTax.map((dt, index) => (
                                                <ListItem className={styles.list} key={index}>
                                                    <ListItemText
                                                        className={styles.labelItem}
                                                        primary={(
                                                            <Typography
                                                                variant="p"
                                                                size="14"
                                                                letter="capitalize"
                                                                type="regular"
                                                                className={styles.noMargin}
                                                            >
                                                                {dt.item}
                                                            </Typography>
                                                        )}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        <Typography
                                                            variant="span"
                                                            size="14"
                                                            letter="capitalize"
                                                            type="regular"
                                                            className={styles.noMargin}
                                                        >
                                                            {dt.value}
                                                        </Typography>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            )) : null}
                                        </div>
                                    </div>
                                ) : null}
                                <ListItem className={styles.list}>
                                    <ListItemText
                                        primary={(
                                            <Typography variant="title" type="bold" className={classNames(styles.size, styles.colorPrimary)}>
                                                {t('checkout:orderTotal')}
                                            </Typography>
                                        )}
                                    />
                                    <ListItemSecondaryAction>
                                        <Typography variant="title" type="bold" className={classNames(styles.size, styles.colorPrimary)}>
                                            {total.currency ? formatPrice(Math.round(total.value), total.currency) : null}
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
                                                    className="point-text"
                                                >
                                                    <div dangerouslySetInnerHTML={{ __html: t('common:summary:infoPoint', { point }) }} />
                                                </Typography>
                                            )}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        )}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                {expanded === null || expanded === false ? (
                    <FormControlLabel
                        className="form-checkout"
                        onChange={handleCheckbox}
                        control={(
                            <Checkbox
                                id="checkout_agrrement_checkbox"
                                className="checkout-checkbox"
                                name="privacytrue"
                                color="primary"
                                size="small"
                            />
                        )}
                        label={(
                            <Typography
                                className="no-margin"
                                variant="p"
                                size="14"
                            >
                                {t('Dengan ini saya setuju untuk mengikuti syarat dan ketentuan yang berlaku.')}
                            </Typography>
                        )}
                    />
                ) : null}
                <div className={styles.actions}>
                    <Button
                        id="button_Buat_Pesanan"
                        loading={loading}
                        disabled={
                            disabled
                            || isDisabled()
                        }
                        customRootStyle={{ width: 'fit-content' }}
                        className={styles.goToCheckout}
                        onClick={handleActionSummary}
                    >
                        <Typography variant="span" color="white" type="regular" letter="capitalize">
                            {label || t('common:button:checkout')}
                        </Typography>
                    </Button>
                    {
                        isCart && dataCart && (
                            <div className={styles.paypalBtn}>
                                <PaypalButtonView cart={dataCart} t={t} storeConfig={storeConfig} />
                            </div>
                        )
                    }
                </div>
            </div>
        </Slide>
    );
};

export default CheckoutDrawer;
