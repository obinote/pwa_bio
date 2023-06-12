import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import classNames from 'classnames';
import useStyles from '@core_modules/distributor/pages/list/components/style';
import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@common_button';
import Pagination from '@core_modules/distributor/pages/list/components/Pagination';
import Search from '@core_modules/distributor/pages/list/components/Search';
import Modal from '@core_modules/distributor/pages/list/components/Modal';
import Link from 'next/link';
import { getLoginInfo } from '@helper_auth';
import SellerLogo from './SellerLogo/index';

const Component = (props) => {
    const {
        t,
        sellerList,
        pageInfo,
        loading,
        loadingFetchMore,
        handleLoadMore,
        handleCloseModal,
        handleOpenModal,
        openModal,
        selectedDistributor,
        handleSearch,
        setLoadingFetchmore,
    } = props;
    const styles = useStyles();
    const isLogin = getLoginInfo() === 1;
    const [distributorList, setDistributorList] = useState([]);

    const updateDistributor = (key) => {
        const newDistributorList = [...distributorList];
        newDistributorList[key] = {
            ...distributorList[key],
            approval_status: 2,
        };
        setDistributorList(newDistributorList);
    };

    useEffect(() => {
        if (sellerList) {
            const filtered = sellerList.filter((item) => item.category_id !== null);
            setDistributorList(filtered);
        }
    }, [sellerList]);

    return (
        <div className={classNames(styles.containerSeller)}>
            <div className={classNames('wrapper-seller', styles.wrapperSeller)}>
                <div className={classNames(styles.blockHeader)}>
                    <h2 className={classNames(styles.h2)}>{t('distributor:title')}</h2>
                    {!isLogin && (
                        <p className={classNames(styles.p)}>
                            <Trans i18nKey="distributor:pageDesc">
                                {' '}
                                <a className={classNames(styles.a)} href="/customer/account/login">
                                    register
                                </a>
                            </Trans>
                        </p>
                    )}
                </div>
                <Search t={t} fetchSearch={handleSearch} setLoadingFetchmore={setLoadingFetchmore} />
                {loading || loadingFetchMore ? (
                    <div className={classNames(styles.sellerList)}>
                        <Skeleton variant="rounded" className={classNames(styles.sellerItemPlaceholder)} />
                        <Skeleton variant="rounded" className={classNames(styles.sellerItemPlaceholder)} />
                        <Skeleton variant="rounded" className={classNames(styles.sellerItemPlaceholder)} />
                        <Skeleton variant="rounded" className={classNames(styles.sellerItemPlaceholder)} />
                    </div>
                ) : (
                    <>
                        <div className={classNames(styles.sellerList)}>
                            {distributorList.map((seller, key) => (
                                <div className={classNames(styles.sellerItem)}>
                                    <Link href={`/distributor/${seller.company_code}/highlight`}>
                                        <a className={classNames(styles.sellerContent)}>
                                            <div>
                                                <SellerLogo seller={seller} />
                                                <div className={classNames(styles.sellerName)}>{seller.company_name}</div>
                                            </div>
                                        </a>
                                    </Link>
                                    {isLogin && seller.approval_status === 1 && (
                                        <div className={classNames(styles.statusRegistered)}>
                                            <div>{t('distributor:statusRegistered')}</div>
                                            <div className={classNames(styles.iconContainer, 'icon-container')}>
                                                <img src="/assets/img/icon-distributor-approved.svg" alt="Approved" />
                                            </div>
                                        </div>
                                    )}
                                    {isLogin && seller.approval_status === 2 && (
                                        <div className={classNames(styles.statusVerification)}>{t('distributor:statusPending')}</div>
                                    )}
                                    {isLogin && seller.approval_status === 3 && (
                                        <div className={classNames(styles.statusNotRegistered)}>
                                            <div>{t('distributor:statusNotRegistered')}</div>
                                            <div>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => {
                                                        handleOpenModal(seller, key);
                                                    }}
                                                    className={classNames(styles.buttonRegister)}
                                                >
                                                    {t('distributor:register')}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {isLogin && (
                            <Modal
                                open={openModal}
                                t={t}
                                handleClose={handleCloseModal}
                                distributor={selectedDistributor}
                                updateDistributor={updateDistributor}
                            />
                        )}
                        <div className={classNames(styles.wrapperFooter)}>
                            <div className={classNames(styles.wrapperPagination)}>
                                {!loading && sellerList.length > 0 && (
                                    <Pagination
                                        numberOfPages={pageInfo.total_pages}
                                        page={pageInfo.current_page}
                                        onChange={(_, selectedPage) => {
                                            handleLoadMore(selectedPage);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Component;
