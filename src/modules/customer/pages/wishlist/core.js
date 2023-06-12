/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { getCartId, setCartId } from '@helper_cartid';
import { useQuery } from '@apollo/client';
import Router from 'next/router';
import Layout from '@layout';
// import CustomerLayout from '@layout_customer';
import { getCartIdUser } from '@core_modules/customer/services/graphql/schema';
import { getCustomer, removeWishlist as gqlremoveWishlist, shareWishlist } from '@core_modules/customer/services/graphql';
import { addProductsToCartCustom, writeCartProductsReportMutation } from '@core_modules/product/services/graphql';
import dynamic from 'next/dynamic';

const CustomerLayout = dynamic(() => import('@layout_customer'), { ssr: false });

const Wishlist = (props) => {
    let wishlist = [];
    const {
        Content, t, isLogin, pageConfig, Skeleton, storeConfig,
    } = props;
    const config = {
        title: t('customer:wishlist:pageTitle'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('customer:wishlist:pageTitle'),
        bottomNav: false,
    };
    const [addToCart] = addProductsToCartCustom();
    const [removeWishlist] = gqlremoveWishlist();
    const {
        data, loading, error, refetch,
    } = getCustomer(storeConfig);
    const [setShareWishlist, { loading: shareLoading }] = shareWishlist();
    const [writeCartProductsReport] = writeCartProductsReportMutation();

    const handleShareWishlist = async (emails, message) => {
        if (emails === '' || message === '') {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: t('customer:wishlist:validateField'),
            });
            return 2;
        }
        const emailsToArray = emails.split(',');
        try {
            const res = await setShareWishlist({
                variables: {
                    emails: emailsToArray,
                    message,
                },
            });
            if (res) {
                window.toastMessage({
                    open: true,
                    variant: 'success',
                    text: t('customer:wishlist:shareSuccess'),
                });
                return 1;
            }
        } catch (e) {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: e.message.split(':')[1] || t('customer:wishlist:shareFailed'),
            });
            return -1;
        }

        return null;
    };
    const cartUser = useQuery(getCartIdUser, {
        context: {
            request: 'internal',
        },
        skip: !isLogin || typeof window === 'undefined',
    });

    if (!data || loading || error) {
        return (
            <Layout pageConfig={pageConfig || config} {...props}>
                <CustomerLayout {...props}>
                    <Skeleton />
                </CustomerLayout>
            </Layout>
        );
    }
    if (data) {
        wishlist = data.customer.wishlist.items.map(({ id, product }) => ({
            ...product,
            wishlistItemId: id,
            name: product.name,
            link: product.url_key,
            imageSrc: product.small_image.url || '/assets/img/placeholder.png',
            price: product.price_range.minimum_price.regular_price.value,
        }));
    }
    let cartId = '';

    if (typeof window !== 'undefined') {
        cartId = getCartId();
    }

    const handleToCart = ({
        sku, url_key, wishlistItemId, __typename, productId,
    }) => {
        if (__typename === 'ConfigurableProduct') {
            Router.push('/[...slug]', `/${url_key}`);
        } else {
            window.backdropLoader(true);
            if (cartId === '' || !cartId) {
                const cartToken = cartUser.data.customerCart.id || '';
                cartId = cartToken;
                setCartId(cartToken);
            }
            addToCart({
                variables: {
                    cartItems: [
                        {
                            sku,
                            quantity: parseFloat(1),
                        },
                    ],
                },
            })
                .then(() => {
                    window.reloadCartQty = true;
                    writeCartProductsReport({ variables: { productId: [productId] } });
                    removeWishlist({
                        variables: {
                            wishlistItemId,
                        },
                    }).then(() => {
                        window.backdropLoader(false);
                        window.toastMessage({
                            open: true,
                            variant: 'success',
                            text: t('customer:wishlist:successAddCart'),
                        });
                        refetch();
                    });
                })
                .catch(async (e) => {
                    window.backdropLoader(false);
                    window.toastMessage({
                        open: true,
                        variant: 'error',
                        text: e.message.split(':')[1] || e.message || t('customer:wishlist:failedAddCart'),
                    });
                });
        }
    };

    const handleRemove = ({ wishlistItemId }) => {
        window.backdropLoader(true);
        removeWishlist({
            variables: {
                wishlistItemId,
            },
        })
            .then(() => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'success',
                    text: t('customer:wishlist:removeSuccess'),
                });
                refetch();
            })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    variant: 'error',
                    text: e.message.split(':')[1] || t('customer:wishlist:removeFailed'),
                });
            });
    };

    function addToCartAll(dataItem) {
        return new Promise((resolve, reject) => {
            addToCart({
                variables: {
                    cartItems: [
                        {
                            sku: dataItem.sku,
                            quantity: parseFloat(1),
                        },
                    ],
                },
            }).then(() => {
                removeWishlist({
                    variables: {
                        wishlistItemId: dataItem.wishlistItemId,
                    },
                }).then(() => {
                    resolve(true);
                }).catch(() => {
                    reject();
                });
            }).catch(() => {
                reject();
            });
        });
    }

    const handleAddAlltoBag = async () => {
        window.backdropLoader(true);
        const successIds = [];
        if (cartId === '' || !cartId) {
            const cartToken = cartUser.data.customerCart.id || '';
            cartId = cartToken;
            setCartId(cartToken);
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const dataItem of wishlist) {
            try {
                // eslint-disable-next-line no-await-in-loop
                await addToCartAll(dataItem);
                successIds.push(dataItem.id);
            } catch (e) {
                console.log(e);
            }
        }
        writeCartProductsReport({ variables: { productId: successIds } });
        refetch();
        window.backdropLoader(false);
        window.reloadCartQty = true;
        window.toastMessage({
            open: true,
            text: t('customer:detailRequisition:atcSelectedSuccess', { countSuccess: successIds.length }),
            variant: 'success',
        });
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <CustomerLayout {...props}>
                <Content
                    t={t}
                    wishlist={wishlist}
                    refetch={refetch}
                    handleRemove={handleRemove}
                    handleToCart={handleToCart}
                    handleAddAlltoBag={handleAddAlltoBag}
                    loading={loading}
                    shareLoading={shareLoading}
                    handleShareWishlist={handleShareWishlist}
                />
            </CustomerLayout>
        </Layout>
    );
};

export default Wishlist;
