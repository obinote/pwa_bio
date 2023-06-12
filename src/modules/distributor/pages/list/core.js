import React, { useEffect, useState } from 'react';
import Route, { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import Layout from '@layout';
import { getDistributorList } from '@core_modules/distributor/services/graphql';
import _ from 'lodash';

const Base = (props) => {
    const router = useRouter();
    const initPage = router.query.page ? parseInt(router.query.page, 10) : 1;
    const { Content, pageConfig, t } = props;
    const [sellerList, setSellerList] = useState([]);
    const [pageInfo, setPageInfo] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loadingFetchMore, setLoadingFetchmore] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedDistributor, setSelectedDistributor] = useState({});
    const [companyName, setCompanyName] = useState('');
    const { loading, data, fetchMore } = getDistributorList({
        variables: {
            currentPage: initPage,
        },
        fetchPolicy: 'network-only',
    });

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedDistributor(null);
    };

    const handleOpenModal = (distributor, key) => {
        setOpenModal(true);
        setSelectedDistributor({ key, data: distributor });
    };

    const handleSearch = (query) => {
        setCompanyName(query);
        fetchMore({
            variables: {
                currentPage: 1,
                filter: {
                    company_name: {
                        like: `%${query}%`,
                    },
                },
            },
        })
            .then((fetchMoreResult) => {
                const list = fetchMoreResult.data.getAllActiveSeller.items;
                const dataPageInfo = fetchMoreResult.data.getAllActiveSeller.page_info;
                setSellerList(list);
                setPageInfo(dataPageInfo);
            })
            .finally(() => {
                setLoadingFetchmore(false);
            });
    };

    const handleLoadMore = (selectedPage) => {
        if (selectedPage !== pageInfo.current_page) {
            Route.push({ pathname: router.pathname, query: { page: selectedPage } }, undefined);
            setLoadingFetchmore(true);
            fetchMore({
                variables: {
                    currentPage: selectedPage,
                    filter: {
                        company_name: {
                            like: `%${companyName}%`,
                        },
                    },
                },
            })
                .then((fetchMoreResult) => {
                    const list = fetchMoreResult.data.getAllActiveSeller.items;
                    const dataPageInfo = fetchMoreResult.data.getAllActiveSeller.page_info;
                    setSellerList(list);
                    setPageInfo(dataPageInfo);
                })
                .finally(() => {
                    setLoadingFetchmore(false);
                });
        }
    };

    useEffect(() => {
        if (data) {
            const list = _.get(data, 'getAllActiveSeller.items') || [];
            const dataPageInfo = _.get(data, 'getAllActiveSeller.page_info');
            const dataTotalCount = _.get(data, 'getAllActiveSeller.total_count') || 0;
            setSellerList(list);
            setPageInfo(dataPageInfo);
            setTotalCount(dataTotalCount);
        }
    }, [data]);

    const config = {
        title: t('distributor:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('distributor:title'),
        headerBackIcon: 'arrow', // available values: "close", "arrow"
        bottomNav: false,
        pageType: 'selleroms',
    };

    const contentProps = {
        sellerList,
        pageInfo,
        totalCount,
        loading,
        setLoadingFetchmore,
        loadingFetchMore,
        handleLoadMore,
        openModal,
        handleCloseModal,
        setOpenModal,
        handleOpenModal,
        selectedDistributor,
        setSelectedDistributor,
        companyName,
        handleSearch,
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
    Content: () => {},
};

export default Base;
