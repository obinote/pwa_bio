/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PriceFormat from '@common_priceformat';
import Typography from '@common_typography';
import ConfirmationDelete from '@common_confirmdialog';
import IconButton from '@material-ui/core/IconButton';
import Link from 'next/link';
import Image from '@common_image';
import { setResolver, getResolver } from '@helper_localstorage';
import useStyles from '@core_modules/customer/pages/wishlist/components/item/style';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const WishlistComp = ({
    price_range, price_tiers, __typename, imageSrc,
    name, wishlistItemId, t, sku, url_key,
    handleRemove, handleToCart, special_from_date, special_to_date,
    storeConfig, id,
}) => {
    const styles = useStyles();

    const [openDelete, setOpenDelete] = React.useState(false);
    const handleDelete = () => {
        handleRemove({ wishlistItemId });
        setOpenDelete(!openDelete);
    };
    const handleAddToCart = () => {
        handleToCart({
            sku, url_key, wishlistItemId, __typename, productId: id,
        });
    };
    const handleClick = async (link) => {
        const urlResolver = getResolver();
        urlResolver[link] = {
            type: 'PRODUCT',
        };
        await setResolver(urlResolver);
    };

    let defaultWidth = storeConfig?.pwa?.image_product_width;
    let defaultHeight = storeConfig?.pwa?.image_product_height;

    if (typeof defaultWidth === 'string') defaultWidth = parseInt(defaultWidth, 0);
    if (typeof defaultHeight === 'string') defaultHeight = parseInt(defaultHeight, 0);

    return (
        <>
            <ConfirmationDelete
                open={openDelete}
                handleCancel={() => setOpenDelete(!openDelete)}
                handleYes={handleDelete}
                message={t('customer:wishlist:warningDelete')}
            />
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table className={styles.table}>
                    <TableBody>
                        <TableRow className={styles.tableRowHead}>
                            <div className={styles.card}>
                                <div className={styles.imgItem}>
                                    <Image
                                        src={imageSrc}
                                        className={styles.productImg}
                                        alt={name}
                                        width={defaultWidth}
                                        height={defaultHeight}
                                        quality={80}
                                    />
                                </div>
                                <div className={styles.content}>
                                    <Link href="/[...slug]" as={`/${url_key}`}>
                                        <a onClick={() => handleClick(`/${url_key}`)}>
                                            <Typography className="product-name" variant="p">{name}</Typography>
                                        </a>
                                    </Link>
                                    <PriceFormat
                                        priceRange={price_range}
                                        priceTiers={price_tiers}
                                        productType={__typename}
                                        specialFromDate={special_from_date}
                                        specialToDate={special_to_date}
                                        className="price_text"
                                    />
                                </div>
                                <div className={styles.action}>
                                    <IconButton className={styles.btnAdd} onClick={handleAddToCart}>
                                        <Typography variant="p">
                                            {t('customer:wishlist:addToBag')}
                                        </Typography>
                                    </IconButton>
                                    <IconButton className={styles.btnDelete} onClick={() => setOpenDelete(!openDelete)}>
                                        <Typography variant="p">
                                            {t('customer:wishlist:deleteItem')}
                                        </Typography>
                                    </IconButton>
                                </div>
                            </div>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default WishlistComp;
