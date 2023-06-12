/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
/* eslint-disable linebreak-style */
import useStyles from '@src_modules/distributor/pages/detail/components/voucher/style';
import classNames from 'classnames';
import Pagination from '@common_pagination';
import ProductItem from '@plugin_productitem';
import ProductListSkeleton from '@plugin_productlist/components/ProductListSkeleton';
import ErrorMessage from '@plugin_productlist/components/ErrorMessage';

const VoucherDistributor = (props) => {
    const {
        t,
        handleChangePage,
        pageVoucher,
        pageSizeVoucher,
        loadingPromoList,
        dataPromoProduct,
        categoryPath,
    } = props;
    const styles = useStyles();
    const promoItemData = dataPromoProduct?.getProductPromoList?.items || [];
    const paginationCount = Math.ceil(dataPromoProduct?.getProductPromoList?.total_count / pageSizeVoucher);

    return (
        <div className={classNames(styles.wrapperPromotion, 'container')}>
            <div className={styles.highlightProductArea}>
                {loadingPromoList && <ProductListSkeleton />}
                {!loadingPromoList && promoItemData.length < 1 && (
                    <div className={styles.voucherEmptyWrapper}>
                        <ErrorMessage variant="warning" text={t('distributor:voucherEmpty')} open />

                    </div>
                )}
                {
                    !loadingPromoList && promoItemData.length > 0 ? (
                        <>
                            {
                                promoItemData.map((product) => (
                                    <div key={product.sku} className={styles.highlightProductItem}>
                                        <ProductItem {...product} categorySelect={categoryPath} />
                                    </div>
                                ))
                            }
                        </>
                    ) : null
                }
            </div>
            <div className={classNames(styles.tabelPagination, 'tabel-pagination')}>
                {paginationCount > 1 && (
                    <Pagination count={paginationCount} page={pageVoucher} onChange={handleChangePage} />
                )}
            </div>
        </div>
    );
};

export default VoucherDistributor;
