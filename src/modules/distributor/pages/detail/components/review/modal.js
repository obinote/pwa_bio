/* eslint-disable no-plusplus */
/* eslint-disable radix */
import classNames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from '@core_modules/distributor/pages/detail/components/review/style';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ButtonBase from '@material-ui/core/ButtonBase';
import withStyles from '@material-ui/core/styles/withStyles';

const RatingStar = (props) => {
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
            {rowsActive.map(() => (
                <StarRoundedIcon style={{ color: '#ffd501' }} />
            ))}

            {rowsInactive.map(() => (
                <StarRoundedIcon style={{ color: '#D5EAFB' }} />
            ))}
        </div>
    );
};

const StyledDialog = withStyles(() => ({ paper: { padding: 20 } }))(Dialog);
const StyledDialogTitle = withStyles(() => ({ root: { padding: 0, marginBottom: 21 } }))(DialogTitle);
const StyledDialogContent = withStyles(() => ({ root: { padding: 0 } }))(DialogContent);

export const Modal = (props) => {
    const {
        t, rating, open, handleModalClose, ratingImages, buyer, date, defaultIndex, setDefaultIndex,
    } = props;
    const styles = useStyles();
    const [defaultImage, setDefaultImage] = React.useState(null);
    const handleChangeImages = (image, index) => {
        setDefaultImage(image);
        setDefaultIndex(index + 1);
    };
    const imagesCount = `${defaultIndex}/${ratingImages.length}`;
    const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

    React.useEffect(() => {
        setDefaultImage(ratingImages[0]);
    }, [ratingImages]);

    return (
        <StyledDialog
            className={classNames(styles.modalReview)}
            fullScreen={!isDesktop}
            fullWidth="true"
            maxWidth="xs"
            open={open}
            close={handleModalClose}
        >
            <StyledDialogTitle>
                <div className="modal-header">
                    <span className="info-buyer">{buyer}</span>
                    <div className="info-rating">
                        <RatingStar avgRating={rating} />
                        <span className="date-rating">{date}</span>
                        <span className="file-rating">{`${imagesCount} ${t('common:images')}`}</span>
                    </div>
                    <IconButton aria-label="close" className="modal-review-close" onClick={handleModalClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </StyledDialogTitle>
            <StyledDialogContent>
                <div className="review-images">
                    <img src={defaultImage} alt="" />
                </div>
                <div className="review-images-selector">
                    {ratingImages.map((value, index) => (
                        <ButtonBase key={index} onClick={() => handleChangeImages(value, index)}>
                            <img src={value} alt="" />
                        </ButtonBase>
                    ))}
                </div>
            </StyledDialogContent>
        </StyledDialog>
    );
};

export default Modal;
