import classNames from 'classnames';
import { features } from '@config';
import useStyles from '@common_sliderpromoswiper/Banner/style';

const Image = ({
    customClassContainer, src, width = 500, height = 500, className = '', alt = 'Image', lazy = false, withThumbor = features.thumbor.enable,
}) => {
    const styles = useStyles();
    return (

        <div
            className={customClassContainer || styles.thumborContainer}
        >
            {!lazy ? (
                <img
                    data-pagespeed-no-defer
                    className={classNames(styles.thumborImage, className)}
                    src={withThumbor
                        ? `https://thumbor.sirclocdn.xyz/unsafe/${width}x${height}/filters:format(webp)/${src} ` : src}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/img/placeholder.png'; }}
                    alt={alt}
                />
            ) : null}
        </div>
    );
};

export default Image;
