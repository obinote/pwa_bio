/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable no-plusplus */

import useStyles from '@core_modules/distributor/pages/detail/components/review/style';
import classNames from 'classnames';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Pagination from '@plugin_productlist/components/Pagination';
import Modal from '@core_modules/distributor/pages/detail/components/review/modal';
import Skeleton from '@material-ui/lab/Skeleton';
import useDateFormatter from '@helpers/useDateFormatter';
import _ from 'lodash';
import { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import ReviewItem from '@core_modules/distributor/pages/detail/components/review/item';
import ModalRating from '@core_modules/order/pages/detail/components/OrderComplete/ModalRating';

const LoadingContent = () => (
    <>
        <Skeleton height={150} />
        <Skeleton height={150} />
        <Skeleton height={150} />
    </>
);

export const RatingStar = (props) => {
    const { avgRating } = props;
    const styles = useStyles();
    const activeRating = parseInt(_.round(avgRating));
    const invactiveRating = 5 - activeRating;
    const rowsActive = [];
    const rowsInactive = [];
    let i = 0;
    let j = 0;
    while (++i <= activeRating) {
        rowsActive.push(i);
    }
    while (++j <= invactiveRating) {
        rowsInactive.push(j);
    }
    return (
        <div className={classNames('star')}>
            {rowsActive.map(() => (
                <StarRoundedIcon className={classNames(styles.starReview)} style={{ color: '#ffd501' }} />
            ))}

            {rowsInactive.map(() => (
                <StarRoundedIcon className={classNames(styles.starReview)} style={{ color: '#D5EAFB' }} />
            ))}
        </div>
    );
};

export const RatingStarActiveOnly = (props) => {
    const { avgRating } = props;
    const styles = useStyles();
    const activeRating = parseInt(_.round(avgRating));
    const rowsActive = useMemo(() => new Array(activeRating).fill(null), []);
    return (
        <div className={classNames('star')}>
            {rowsActive.map(() => (
                <StarRoundedIcon className={classNames(styles.starReview)} style={{ color: '#ffd501' }} />
            ))}
        </div>
    );
};

const RatingActive = (props) => {
    const {
        t, isDesktop, value, index, handleFilterRating,
    } = props;
    let i = 6;
    const rows = [];

    if (!isDesktop) {
        i = index;
        while (--i > value) {
            const rating = i;
            rows.push(
                <div className="filter-rating" role="presentation" onClick={() => handleFilterRating(rating)}>
                    <span>{t('distributor:filterRating', { rating: i })}</span>
                    <RatingStarActiveOnly avgRating={i} />
                </div>,
            );
        }
    } else {
        while (--i > 0) {
            const rating = i;
            rows.push(
                // eslint-disable-next-line no-loop-func
                <div data-rating={i} className="filter-rating" role="presentation" onClick={() => handleFilterRating(rating)}>
                    <span>{t('distributor:filterRating', { rating: i })}</span>
                    <RatingStarActiveOnly avgRating={i} />
                </div>,
            );
        }
    }

    const result = rows.map((val) => val);
    return result;
};

const RatingProgress = (props) => {
    const { ratingData } = props;
    let i = 6;
    const styles = useStyles();
    const ratingProgress = [];
    const ratingValue = {
        5: ratingData.count_rating.count_5 ?? 0,
        4: ratingData.count_rating.count_4 ?? 0,
        3: ratingData.count_rating.count_3 ?? 0,
        2: ratingData.count_rating.count_2 ?? 0,
        1: ratingData.count_rating.count_1 ?? 0,
    };
    const totalReviewer = Object.entries(ratingValue).reduce((acc, val) => acc + val[1], 0);
    while (--i > 0) {
        const ratingCounter = ratingValue[i] ?? 0;
        const value = totalReviewer > 0 ? Math.round((100 / totalReviewer) * ratingCounter) : 0;
        ratingProgress.push(
            <>
                <Box display="flex" alignItems="center" height="min-content">
                    <StarRoundedIcon className={classNames(styles.starReview)} style={{ color: '#ffd501' }} />
                    <span className="linear-rating-info">{i}</span>
                </Box>
                <LinearProgress variant="determinate" value={value} />
                <span className="linear-rating">{ratingCounter}</span>
            </>,
        );
    }
    const result = ratingProgress.map((val) => val);
    return result;
};

const Review = (props) => {
    const {
        t, loadingReview, avgRating, totalReviewer, handleLoadMoreReview,
        pageInfoReview, reviewList, handleChangeSortReview, valueSortReview,
        baseSort, loadingFetchmoreReview, handleFilterRating, ratingRefetch, dataCustomer,
    } = props;

    const formatDate = useDateFormatter();
    const { items } = reviewList;
    const styles = useStyles();
    const [defaultIndex, setDefaultIndex] = React.useState(1);
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalRating, setOpenModalRating] = React.useState(false);
    const [idOrder, setIdOrder] = React.useState(null);
    const [dataReview, setDataReview] = React.useState(null);
    const [valueRating, setValueRating] = React.useState(0);
    const [modalData, setModalData] = React.useState({
        buyer: '',
        rating: 0,
        images: [],
        date: '',
    });
    const handleModalOpen = ({
        buyer_company_name, buyer_name, rating, images, submit_date,
    }) => {
        setOpenModal(true);
        setModalData({
            buyer: `${buyer_company_name}, ${buyer_name}`,
            rating,
            images: images.map(({ value }) => value),
            date: formatDate(submit_date, { removeClock: true }),
        });
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setDefaultIndex(1);
    };

    const handleModalRatingOpen = (val) => {
        const newDataReview = {
            rating: val?.rating,
            rating_comment: val?.content,
            rating_images: val?.images,
        };
        setOpenModalRating(true);
        const numberId = val?.id ? val.id.toString() : idOrder;
        setIdOrder(numberId);
        setDataReview(newDataReview);
        setValueRating(val.rating);
    };

    const handleModalRatingClose = () => {
        setOpenModalRating(false);
        setValueRating(0);
        setIdOrder(null);
        setDataReview(null);
    };

    return (
        <div className={classNames('row', styles.reviewContainer)}>
            <div className={classNames('col-xs-3', styles.sidebarContainer)}>
                <div className="sidebar-review-rating">
                    <div className="main-rating">
                        <div className="main-rating-sidebar">
                            <span className="rating-value">{avgRating}</span>
                            <RatingStar avgRating={avgRating} />
                            <span className="info-rating-from">{t('distributor:ratingForm', { rating: totalReviewer })}</span>
                        </div>
                        <div className="main-rating-sidebar with-progress">
                            <RatingProgress ratingData={reviewList} />
                        </div>
                    </div>
                </div>
                <div className="sidebar-review-filter">
                    <span className="filter-title">{t('distributor:filterReview')}</span>
                    <div className={styles.ratingFilterContent}>
                        <div
                            className="filter-all-review filter-rating"
                            role="presentation"
                            onClick={() => handleFilterRating(0)}
                        >
                            <span>{t('distributor:filterAllReview')}</span>
                        </div>
                        <RatingActive t={t} isDesktop handleFilterRating={handleFilterRating} />
                    </div>
                </div>
            </div>
            <div className={classNames('col-xs-9', styles.mainContainer)}>
                <div className="review-sort">
                    <span><span>{t('distributor:filterSort')}</span></span>
                    <Select
                        defaultValue={valueSortReview}
                        value={valueSortReview}
                        className={styles.select}
                        onChange={handleChangeSortReview}
                        name="sort"
                        MenuProps={{
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                            },
                            transformOrigin: {
                                vertical: 'top',
                                horizontal: 'left',
                            },
                            getContentAnchorEl: null,
                        }}
                    >
                        {baseSort.map((data, sortIndex) => (
                            <MenuItem
                                key={`sort_index_${sortIndex}`}
                                className={styles.ratingFilterPopupover}
                                value={data.value}
                            >
                                {data.label}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div className="review-content">
                    {loadingReview || loadingFetchmoreReview ? <LoadingContent />
                        : items.length ? items.map((val, index) => (
                            <ReviewItem
                                t={t}
                                key={`review_${index}`}
                                reviewData={val}
                                customerData={dataCustomer}
                                ratingStar={RatingStar}
                                handleModalOpen={handleModalOpen}
                                handleModalRatingOpen={handleModalRatingOpen}
                            />
                        )) : t('distributor:reviewEmpty')}

                    {items.length ? (
                        <div className="pagination">
                            <Pagination
                                numberOfPages={pageInfoReview.total_pages}
                                page={pageInfoReview.current_page}
                                onChange={(event, selectedPage) => {
                                    handleLoadMoreReview(selectedPage);
                                }}
                            />
                        </div>
                    ) : null}
                </div>
            </div>
            <Modal
                t={t}
                rating={modalData.rating}
                open={openModal}
                handleModalClose={handleModalClose}
                ratingImages={modalData.images}
                buyer={modalData.buyer}
                date={modalData.date}
                defaultIndex={defaultIndex}
                setDefaultIndex={setDefaultIndex}
            />
            { openModalRating && (
                <ModalRating
                    t={t}
                    orderId={idOrder}
                    modalRating={openModalRating}
                    handleModalClose={handleModalRatingClose}
                    valueRating={valueRating}
                    setValueRating={setValueRating}
                    dataReview={dataReview}
                    ratingRefetch={ratingRefetch}
                    isEdit
                    isOrder={false}
                />
            )}
        </div>
    );
};

export default Review;
