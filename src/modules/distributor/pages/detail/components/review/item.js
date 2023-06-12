/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import useStyles from '@core_modules/distributor/pages/detail/components/review/style';
import useDateFormatter from '@helpers/useDateFormatter';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const ReviewItemReply = (props) => {
    const { expanded, feedback } = props;
    const { company_name, content, submit_date } = feedback;
    const formatDate = useDateFormatter();
    const styles = useStyles();

    return (
        <div className={styles.replyContainer} style={{ display: expanded ? 'block' : 'none' }}>
            <div className="header">
                <p className="seller-name">{company_name}</p>
                <p className="date">{formatDate(submit_date)}</p>
            </div>
            <p className="content">{content}</p>
        </div>
    );
};

const ReviewItem = (props) => {
    const {
        t, key, reviewData, customerData, handleModalOpen, handleModalRatingOpen, ratingStar,
    } = props;
    const formatDate = useDateFormatter();
    const RatingStar = ratingStar;
    const [expanded, setExpanded] = React.useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div key={key} className="review-item">
            <div>
                <div className="review-name-edit-container">
                    <span className="review-name">
                        {`${reviewData.buyer_name}, ${reviewData.buyer_company_name}`}
                    </span>
                    { reviewData?.buyer_email === customerData?.customer?.email && reviewData?.rating < 5 && (
                        <Button className="btn-edit-review" size="small" onClick={() => handleModalRatingOpen(reviewData)}>
                            {t('distributor:reviewItem:edit')}
                        </Button>
                    )}
                </div>
                <div className="review-rating">
                    <RatingStar avgRating={reviewData.rating} />
                    <span>{formatDate(reviewData.submit_date)}</span>
                </div>
                <div className="review-comment">
                    {reviewData.content}
                </div>
                {reviewData?.images?.length > 0 && (
                    <div className="review-images" role="presentation" onClick={() => handleModalOpen(reviewData)}>
                        {reviewData.images.map((item) => {
                            if (item.value) {
                                return (<img src={item.value} alt={item.filename} />);
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
            {reviewData.feedback && (
                <>
                    <div className="toggle-reply" onClick={toggleExpand}>
                        <span className="label">{expanded ? t('order:hideRatingReply') : t('order:showRatingReply')}</span>
                        {expanded
                            ? <ExpandLessIcon className="show-hide-icon" />
                            : <ExpandMoreIcon className="show-hide-icon" />}
                    </div>
                    <ReviewItemReply expanded={expanded} feedback={reviewData.feedback} />
                </>
            )}
        </div>
    );
};

export default ReviewItem;
