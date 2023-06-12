/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable object-curly-newline */
/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import Layout from '@layout';
import Route, { useRouter } from 'next/router';
import {
    getDistributorDetail,
    getDistributorEtalase,
    getOmsAccessKey,
    getVendorReviewByCompany,
    getProductPromoList,
} from '@core_modules/distributor/services/graphql';
import { getCustomer } from '@core_modules/customer/services/graphql';
import _ from 'lodash';
import Error404 from '@core_modules/error/pages/default/components/404';
import { getLoginInfo } from '@helper_auth';

const Base = (props) => {
    const {
        t, Content, pageConfig,
    } = props;

    const router = useRouter();
    const initPageReview = router.query.page ? parseInt(router.query.page, 10) : 1;
    const [code, tab] = router.query.slug;
    const isLogin = getLoginInfo() === 1;
    const [seller, setSeller] = useState(null);
    const [sellerEtalase, setSellerEtalase] = useState([]);

    const [pageInfoReview, setPageInfoReview] = useState([]);
    const [reviewList, setReviewList] = useState(null);
    const [totalReviewer, setTotalReviewer] = useState(null);

    const baseSort = [
        { value: JSON.stringify({ key: 'submit_date', value: 'ASC' }), label: t('distributor:sort:date:asc') },
        { value: JSON.stringify({ key: 'submit_date', value: 'DESC' }), label: t('distributor:sort:date:desc') },
        { value: JSON.stringify({ key: 'rating', value: 'ASC' }), label: t('distributor:sort:rating:asc') },
        { value: JSON.stringify({ key: 'rating', value: 'DESC' }), label: t('distributor:sort:rating:desc') },
    ];
    const baseFilter = {
        company_code: { eq: code },
    };
    const [valueFilterReview, setValueFilterReview] = useState(baseFilter);
    const [valueSortReview, setValueSortReview] = useState(baseSort[1].value);
    const [loadingFetchmoreReview, setLoadingFetchmoreReview] = useState(false);

    const { data: dataOmsAccessKey } = getOmsAccessKey();
    const { data: dataCustomer, loading: loadingCustomer } = getCustomer();
    const { data, loading } = getDistributorDetail({
        code,
    });

    const [pageVoucher, setPageVoucher] = React.useState(1);
    const pageSizeVoucher = 20;
    const { data: dataPromoProduct, loading: loadingPromoList } = getProductPromoList({
        variables: {
            vendor_code: code,
            page_size: pageSizeVoucher,
            current_page: pageVoucher,
        },
        skip: !isLogin,
    });

    const sortReview = JSON.parse(valueSortReview);
    let omsAccessKey;
    if (dataOmsAccessKey) {
        omsAccessKey = dataOmsAccessKey?.storeConfig?.swiftoms_omsconnect_configurations_access_key;
    }
    const [getVendorReview, { data: dataReview, loading: loadingReview, refetch: ratingRefetch, fetchMore }] = getVendorReviewByCompany();

    const generateOmsGqlContext = (omsAccessKeyHeader) => ({
        request: 'oms',
        headers: isLogin ? { authorization: `Bearer ${omsAccessKeyHeader}` } : {},
    });

    useEffect(() => {
        if (isLogin && omsAccessKey) {
            getVendorReview({
                variables: {
                    sort: {
                        [sortReview.key]: sortReview.value,
                    },
                    filter: valueFilterReview,
                    currentPage: initPageReview,
                    pageSize: 10,
                },
                context: generateOmsGqlContext(omsAccessKey),
            });
        }
    }, [omsAccessKey]);

    const { data: etalaseData } = getDistributorEtalase({
        attributes: [
            {
                attribute_code: 'main_kategori',
                entity_type: '4',
            },
        ],
    });

    React.useEffect(() => {
        if (isLogin) {
            getVendorReview({
                variables: {
                    sort: {
                        [sortReview.key]: sortReview.value,
                    },
                    filter: valueFilterReview,
                    currentPage: initPageReview,
                    pageSize: 10,
                },
                context: generateOmsGqlContext(omsAccessKey),
            });
        }
    }, [isLogin]);
    const handleChangePage = (event, value) => {
        setPageVoucher(value);
    };

    const handleFilterRating = (ratingValue) => {
        const { key, value } = JSON.parse(valueSortReview);
        setLoadingFetchmoreReview(true);
        let filter = {};
        if (ratingValue) {
            filter = {
                rating: {
                    eq: String(ratingValue),
                },
                ...baseFilter,
            };
        }
        fetchMore({
            variables: {
                currentPage: pageInfoReview.current_page,
                sort: {
                    [key]: value,
                },
                filter,
                pageSize: 10,
                vendor_code: code,
            },
            context: generateOmsGqlContext(omsAccessKey),
        })
            .then((fetchMoreResult) => {
                const list = fetchMoreResult.data.getVendorReviewByCompany;
                const dataPageInfo = fetchMoreResult.data.getVendorReviewByCompany.page_info;
                setReviewList(list);
                setPageInfoReview(dataPageInfo);
                setValueFilterReview(filter);
            }).finally(() => {
                setLoadingFetchmoreReview(false);
            });
    };

    const handleLoadMoreReview = (selectedPage) => {
        if (selectedPage !== pageInfoReview.current_page) {
            setLoadingFetchmoreReview(true);
            Route.push({ pathname: `/distributor/${code}`, query: { page: selectedPage } }, undefined);
            const { key, value } = JSON.parse(valueSortReview);
            fetchMore({
                variables: {
                    currentPage: selectedPage,
                    filter: valueFilterReview,
                    sort: {
                        [key]: value,
                    },
                    pageSize: 10,
                    vendor_code: code,
                },
                context: generateOmsGqlContext(omsAccessKey),
            })
                .then((fetchMoreResult) => {
                    const list = fetchMoreResult.data.getVendorReviewByCompany;
                    const dataPageInfo = fetchMoreResult.data.getVendorReviewByCompany.page_info;
                    setReviewList(list);
                    setPageInfoReview(dataPageInfo);
                }).finally(() => {
                    setLoadingFetchmoreReview(false);
                });
        }
    };

    const handleChangeSortReview = (event) => {
        const selectedValue = baseSort.filter((val) => val.value === event.target.value);
        const { key, value } = JSON.parse(selectedValue[0].value);
        setLoadingFetchmoreReview(true);
        setValueSortReview(selectedValue[0].value);
        fetchMore({
            variables: {
                currentPage: pageInfoReview.current_page,
                sort: {
                    [key]: value,
                },
                filter: valueFilterReview,
                pageSize: 10,
                vendor_code: code,
            },
            context: generateOmsGqlContext(omsAccessKey),
        })
            .then((fetchMoreResult) => {
                const list = fetchMoreResult.data.getVendorReviewByCompany;
                const dataPageInfo = fetchMoreResult.data.getVendorReviewByCompany.page_info;
                setReviewList(list);
                setPageInfoReview(dataPageInfo);
            }).finally(() => {
                setLoadingFetchmoreReview(false);
            });
    };

    useEffect(() => {
        if (dataReview) {
            const list = _.get(dataReview, 'getVendorReviewByCompany') || null;
            const dataPageInfo = _.get(dataReview, 'getVendorReviewByCompany.page_info');
            setReviewList(list);
            setPageInfoReview(dataPageInfo);
            if (totalReviewer === null) {
                const reviewCount = _.get(dataReview, 'getVendorReviewByCompany.count_rating.count_all') ?? 0;
                setTotalReviewer(reviewCount);
            }
        }
    }, [dataReview]);

    useEffect(() => {
        if (data) {
            const detail = _.get(data, 'getSellerOmsByCompanyCode') ?? null;
            setSeller(detail);
        }
    }, [data]);

    useEffect(() => {
        if (etalaseData) {
            const etalase = _.get(etalaseData, 'customAttributeMetadata.items[0].attribute_options') ?? [];
            setSellerEtalase(etalase);
        }
    }, [etalaseData]);

    const config = {
        title: seller?.company_name ?? 'Distributor',
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: seller?.company_name ?? 'Distributor',
        headerBackIcon: 'arrow', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'distributor',
    };

    if (!seller && !loading) {
        return (
            <Layout {...props} pageConfig={pageConfig || config}>
                <Error404 {...props} />
            </Layout>
        );
    }

    const contentProps = {
        tab,
        seller,
        loading,
        isDistributorPlp: true,
        categoryPath: seller?.url_path,
        catId: seller?.category_id || null,
        sellerEtalase,
        vendorCode: code,
        reviewList,
        loadingReview,
        handleLoadMoreReview,
        pageInfoReview,
        handleChangeSortReview,
        valueSortReview,
        baseSort,
        loadingFetchmoreReview,
        handleFilterRating,
        totalReviewer,
        loadingPromoList,
        handleChangePage,
        pageVoucher,
        pageSizeVoucher,
        ratingRefetch,
        dataCustomer,
        loadingCustomer,
        dataPromoProduct,
    };

    return (
        <Layout {...props} pageConfig={pageConfig || config}>
            <Content {...props} {...contentProps} />
        </Layout>
    );
};

Base.propTypes = {
    Content: PropTypes.func,
};

Base.defaultProps = {
    Content: () => { },
};

export default Base;
