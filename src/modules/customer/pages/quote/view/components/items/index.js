/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@common_typography';
import Button from '@material-ui/core/Button';
import { formatPrice } from '@helper_currency';
import useStyles from '@src_modules/customer/pages/quote/view/components/items/style';
import gqlService from '@src_modules/customer/services/graphql';
import React from 'react';
import Skeleton from '@common_skeleton';

const Items = (props) => {
    const {
        quote, uid, refetch, can_update, t, disable_update = false,
    } = props;
    const styles = useStyles();
    const [items, setItems] = React.useState([]);
    const [changedData, setChangedData] = React.useState(false);
    const [updateQuantities, { loading: loadingUpdate, data }] = gqlService.updateNegotiableQuoteQuantities();

    const typographyProps = {
        variant: 'span',
        type: 'bold',
        letter: 'none',
        align: 'center',
    };

    // eslint-disable-next-line no-shadow
    const handleInputQy = (qty, uid) => {
        let find = items.find((element) => element.uid === uid);
        const newItems = items.filter((i) => i !== find);
        find = {
            quantity: parseInt(qty, 10),
            quote_item_uid: find.uid,
        };
        const update = !changedData ? [find] : [...changedData.filter((el) => el.quote_item_uid !== find.quote_item_uid), find];
        setChangedData(update);
        newItems.push({ qty: parseInt(qty, 0), uid });
        setItems(newItems);
    };

    const handleUpdate = async () => {
        window.backdropLoader(true);
        if (!changedData) return;
        const variables = {
            quote_uid: uid,
            items: changedData,
        };

        await updateQuantities({ variables }).then((res) => {
            refetch();
            window.backdropLoader(false);
        });
        window.backdropLoader(false);
    };

    React.useEffect(() => {
        const tempQty = items;
        quote.items.forEach((item, index) => {
            tempQty[index] = {
                qty: item.quantity,
                uid: item.uid,
            };
        });

        setItems(tempQty);
    }, []);

    React.useEffect(() => {}, [items]);

    // let totalTax = subtotal_including_tax - subtotal_excluding_tax ?? 0;
    const totalTax = (quote.prices?.subtotal_including_tax.value ?? 0) - (quote.prices?.subtotal_with_discount_excluding_tax.value ?? 0);
    // const totalTaxWithCurrency = formatPrice(Math.ceil(totalTax), quote.prices?.subtotal_including_tax?.currency ?? undefined);

    let estimated_tax = (quote?.negotiable_data?.total_price_incl_tax ?? 0) - (quote?.negotiable_data?.total_price_excl_tax ?? 0);
    estimated_tax = formatPrice(Math.ceil(estimated_tax), quote.prices?.subtotal_including_tax?.currency ?? undefined);

    let quote_discount = quote?.negotiable_data.quote_discount ?? 0;
    quote_discount = quote_discount > 0 ? quote_discount * -1 : quote_discount;
    quote_discount = formatPrice(Math.ceil(quote_discount));

    let discount = quote?.negotiable_data.discount ?? 0;
    discount = discount > 0 ? discount * -1 : discount;
    discount = formatPrice(Math.ceil(discount));

    let subtotal_tier_price = quote?.negotiable_data?.quote_subtotal_tier_price_incl_tax ?? 0;
    subtotal_tier_price = subtotal_tier_price > 0
        ? formatPrice(subtotal_tier_price, undefined)
        : t('customer:quote:items:not_available');

    return (
        <>
            <TableContainer className={classNames(styles.tableContainer)}>
                <Table className={classNames(styles.table)}>
                    <TableHead>
                        <TableCell>
                            <Typography {...typographyProps}>{t('customer:quote:items:product_name')}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography {...typographyProps}>{t('customer:quote:items:sku')}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography {...typographyProps}>{t('customer:quote:items:price')}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography {...typographyProps}>{t('customer:quote:items:stock')}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography {...typographyProps}>{t('customer:quote:items:qty')}</Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography {...typographyProps}>{t('customer:quote:items:subtotal')}</Typography>
                        </TableCell>
                    </TableHead>
                    <TableBody>
                        {loadingUpdate ? (
                            <TableRow className={styles.trLoading}>
                                <TableCell>
                                    <Skeleton variant="text" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton variant="text" />
                                </TableCell>
                            </TableRow>
                        ) : (
                            quote.items.map((value, ii) => (
                                <TableRow key={ii}>
                                    <TableCell>
                                        {value.product.name}
                                        <br />
                                        <span className={classNames(styles.itemsVendor)}>{value.product.vendor_name}</span>
                                    </TableCell>
                                    <TableCell>{value.product.sku}</TableCell>
                                    <TableCell>{formatPrice(Math.ceil(value.prices.price.value), value.prices.price.currency)}</TableCell>
                                    <TableCell>{value.product.qty_stock ?? 0}</TableCell>
                                    <TableCell>
                                        {disable_update ? (
                                            <>{items.find((el) => el.uid === value.uid)?.qty ?? value.quantity}</>
                                        ) : (
                                            <input
                                                className={classNames(styles.inputItem)}
                                                type="number"
                                                disabled={!can_update}
                                                value={items.find((el) => el.uid === value.uid)?.qty ?? value.quantity}
                                                onChange={(e) => {
                                                    handleInputQy(e.target.value, value.uid);
                                                }}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        {formatPrice(Math.ceil(value.prices.row_total.value, value.prices.row_total.currency))}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className={classNames(styles.actionContainer)}>
                {!disable_update
                    && (loadingUpdate ? (
                        <Skeleton variant="text" width={52} height={36} />
                    ) : (
                        <Button className={classNames(styles.btnUpdate)} disabled={!can_update} onClick={handleUpdate}>
                            {t('customer:quote:items:updateBtn')}
                        </Button>
                    ))}
            </div>

            <TableContainer className={classNames(styles.tableTotal)}>
                {loadingUpdate ? (
                    <TableBody className={classNames(styles.tableTotalBody, 'loading')}>
                        <TableRow>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                            <TableCell>
                                <Skeleton variant="text" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody className={classNames(styles.tableTotalBody)}>
                        <TableRow>
                            <TableCell>{t('customer:quote:items:substotal_tier_price')}</TableCell>
                            <TableCell>
                                {subtotal_tier_price}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{t('customer:quote:items:subtotal_incl_tax')}</TableCell>
                            <TableCell>
                                {formatPrice(
                                    Math.ceil(quote?.negotiable_data?.total_price_incl_tax),
                                    quote?.prices?.subtotal_including_tax.currency ?? undefined,
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{t('customer:quote:items:discount')}</TableCell>
                            <TableCell className="negotiable_data.discount">{discount}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classNames(styles.cellPaddingBottom)}>
                                {t('customer:quote:items:tax')}
                            </TableCell>
                            <TableCell className={classNames(styles.cellPaddingBottom)}>{estimated_tax}</TableCell>
                        </TableRow>

                        {/* DI HIDE DULU
                            <TableRow>
                            <TableCell className={classNames(styles.tableCellBold, styles.cellPaddingTop)}>
                                {t('customer:quote:items:total_exclude_tax')}
                            </TableCell>
                            <TableCell className={classNames(styles.tableCellBold, styles.cellPaddingTop)}>
                                {formatPrice(Math.ceil(quote?.negotiable_data?.quote_subtotal_excl_tax ?? 0)) }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classNames(styles.tableCellBold)}>{t('customer:quote:items:discount')}</TableCell>
                            <TableCell className={classNames(styles.tableCellBold, 'negotiable_data.quote_discount')}>
                                { quote_discount }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classNames(styles.tableCellBold)}>{t('customer:quote:items:estimated_tax')}</TableCell>
                            <TableCell className={classNames(styles.tableCellBold)}>
                                { formatPrice(Math.ceil(quote.negotiable_data.quote_estimated_tax ?? 0)) }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classNames(styles.tableCellBold)}>{t('customer:quote:items:grand_total')}</TableCell>
                            <TableCell className={classNames(styles.tableCellBold)}>
                                {formatPrice(Math.ceil(quote?.negotiable_data?.quote_grand_total_with_discount ?? 0))}
                            </TableCell>
                        </TableRow> */}
                    </TableBody>
                )}
            </TableContainer>
        </>
    );
};

export default Items;
