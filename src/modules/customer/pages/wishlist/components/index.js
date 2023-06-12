/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
// Library
import Typography from '@common_typography';
import Button from '@common_button';
import Alert from '@material-ui/lab/Alert';
import { useEffect } from 'react';
// import Layout from '@layout_customer';
import useStyles from '@core_modules/customer/pages/wishlist/components/style';
import Item from '@core_modules/customer/pages/wishlist/components/item';
import ShareWishlistComponent from '@core_modules/customer/pages/wishlist/components/sharewishlist';
import classNames from 'classnames';
import Pagination from '@material-ui/lab/Pagination';

// Main Render Page
const Content = (props) => {
    const styles = useStyles();
    const {
        t, wishlist, refetch, handleRemove, handleToCart, handleAddAlltoBag, loading,
        handleShareWishlist, shareLoading, data,
    } = props;
    const [openShare, setOpenShare] = React.useState(false);
    const handleOpenShare = () => {
        setOpenShare(true);
    };

    // custom pageination handle ======
    const pageSize = 9;
    const [page, setPage] = React.useState(1);
    const [dataPerPage, setDataPerPage] = React.useState([]);
    const pageCount = Math.ceil(wishlist.length / pageSize);
    const handleChange = (event, value) => {
        const sliceData = wishlist.slice(pageSize * (value - 1), pageSize * value);
        setPage(value);
        setDataPerPage(sliceData);
    };
    useEffect(() => {
        if (wishlist) {
            const sliceData = wishlist.slice(pageSize * (page - 1), pageSize * page);
            setDataPerPage(sliceData);
        }
    }, [wishlist]);
    // =================================
    return (
        <>
            <div className={styles.root}>
                {
                    openShare && (
                        <ShareWishlistComponent
                            open={openShare}
                            setOpen={() => setOpenShare(false)}
                            handleShareWishlist={handleShareWishlist}
                            shareLoading={shareLoading}
                            t={t}
                        />
                    )
                }
                {wishlist.length === 0 && (
                    <Alert className="m-15" severity="warning">
                        {t('customer:wishlist:notFound')}
                    </Alert>
                )}
                <div className={[styles.content, styles.wishlistItems, 'row'].join(' ')}>
                    {dataPerPage.map((item, index) => (
                        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-6">
                            <Item key={index} {...item} {...props} refetch={refetch} handleRemove={handleRemove} handleToCart={handleToCart} />
                        </div>
                    ))}
                </div>
                <div className={styles.footer}>
                    <div>
                        <Button
                            onClick={handleOpenShare}
                            disabled={loading || wishlist.length === 0}
                            className={classNames(styles.btnWishlist, 'btn-share')}
                        >
                            <Typography variant="span" color="white">
                                {t('customer:wishlist:shareWishlist')}
                            </Typography>
                        </Button>
                    </div>
                    <div>
                        <Button
                            id="button_addAllToCart"
                            onClick={handleAddAlltoBag}
                            disabled={loading || wishlist.length === 0}
                            className={classNames(styles.btnWishlist, 'btn-addtobag')}
                        >
                            <Typography variant="span" color="white">
                                {t('customer:wishlist:addAllToBag')}
                            </Typography>
                        </Button>
                    </div>
                </div>
                <div className={classNames(styles.tabelPagination, 'tabel-pagination')}>
                    {pageCount > 1 && (
                        <Pagination count={pageCount} onChange={handleChange} />
                    )}
                </div>
            </div>
        </>
    );
};

export default Content;
