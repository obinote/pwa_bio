/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
import Typography from '@common_typography';
import classNames from 'classnames';
import useStyles from '@core_modules/order/pages/detail/style';
import Box from '@material-ui/core/Box';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Button from '@common_button';
import useDateFormatter from '@helpers/useDateFormatter';

const RatingStar = (props) => {
    const styles = useStyles();
    const { avgRating } = props;
    const activeRating = parseInt(avgRating);
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
            {rowsActive.map((val, index) => (
                <StarRoundedIcon className={classNames(styles.starReview)} style={{ color: '#ffd501' }} key={`active-${index}`} />
            ))}

            {rowsInactive.map((val, index) => (
                <StarRoundedIcon className={classNames(styles.starReview)} style={{ color: '#D5EAFB' }} key={`inactive-${index}`} />
            ))}
        </div>
    );
};

const ReplySection = (props) => {
    const { expanded, dataRating } = props;
    const styles = useStyles();
    const formatDate = useDateFormatter();
    const formattedRatingDate = formatDate(dataRating?.feedback?.submit_date);
    return (
        <div className={styles.replyContainer} style={{ display: expanded ? 'block' : 'none' }}>
            <div className="header">
                <div className="seller-container">
                    <Typography variant="p" className="seller-name" style={{ margin: 0 }}>{dataRating?.feedback?.company_name}</Typography>
                    <Typography variant="span" className="seller-chip">Distributor</Typography>
                </div>
                <Typography variant="p" className="date">{formattedRatingDate}</Typography>
            </div>
            <Typography variant="p" style={{ margin: 0 }}>{dataRating?.feedback?.content}</Typography>
        </div>
    );
};

const BlockRating = (props) => {
    const {
        t, dataRating, handleModalOpenImage, handleModalRatingOpen,
    } = props;
    const styles = useStyles();
    const formatDate = useDateFormatter();
    const formattedRatingDate = formatDate(dataRating?.submit_date);
    const [expanded, setExpanded] = React.useState(false);
    const [disableEdit, setDisableEdit] = React.useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    // disable edit button if rating 5
    React.useEffect(() => {
        if (dataRating?.rating === 5) {
            setDisableEdit(true);
        }
    }, [dataRating]);

    return (
        <div className={styles.blockRating}>
            <div className="rating-result">
                {
                    dataRating?.rating < 5 ? (
                        <Button
                            className="btn-edit-review"
                            size="small"
                            align="right"
                            onClick={() => handleModalRatingOpen(dataRating.rating, true)}
                        >
                            {t('order:reviewEdit')}
                        </Button>
                    ) : null
                }
                <Typography className="label-rating" variant="p" type="bold">
                    {t('order:rating')}
                </Typography>
                <div className="rating-info">
                    <RatingStar avgRating={dataRating.rating} />
                    <span className="rating-date">
                        {dataRating ? `${t('order:ratingDate')} ${formattedRatingDate}` : null}
                    </span>
                </div>
                <div className="rating-comment">{dataRating.content}</div>
                <Box display="flex" mt="1rem" style={{ marginBottom: 20, gap: '10px' }}>
                    {dataRating.images && dataRating.images.length > 0
                        && dataRating.images.map((val, index) => (
                            <ButtonBase onClick={() => handleModalOpenImage()} key={index}>
                                <img src={val.value} alt={`review-${index + 1}`} className={styles.blockRatingImage} />
                            </ButtonBase>
                        ))}
                </Box>
                {dataRating.feedback && (
                    <>
                        <div className="reply-control-container">
                            <Divider className="divider" />
                            <div className="show-hide-container" onClick={toggleExpand}>
                                <Typography variant="p" className="show-hide-label" style={{ margin: 0 }}>
                                    {expanded ? t('order:hideRatingReply') : t('order:showRatingReply')}
                                </Typography>
                                {expanded
                                    ? <ExpandMoreIcon className="show-hide-icon" />
                                    : <ExpandLessIcon className="show-hide-icon" />}
                            </div>
                        </div>
                        <ReplySection
                            expanded={expanded}
                            dataRating={dataRating}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default BlockRating;
