/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-return-assign */
import React, { useState } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import LeftArrowIcon from '@material-ui/icons/ArrowBackIos';
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos';
import useStyles from '@common_slick/Caraousel/style';

const Caraousel = (props) => {
    const {
        data = [], xxs = 445, xs = 767, sm = 1024, md = 1200,
        slideXxs = 2, slideXs = 2, slideSm = 4, slideMd = 5, slideLg = 6,
        centerModeLg = false, centerModeMd = false, centerModeSm = false, centerModeXs = false, centerModeXxs = false,
        slidesToScrollLg = 5, slidesToScrollMd = 4, slidesToScrollSm = 3, slidesToScrollXs = 1, slidesToScrollXxs = 1,
        showArrow = false, Item, onReInit = () => {}, ...other
    } = props;

    const styles = useStyles();
    const [slideIndex, setIndex] = useState(0);
    const [count, setCount] = useState(0);

    let sliderRef = React.createRef();

    const handleLeftArrow = () => {
        if (slideIndex === 0) {
            sliderRef.slickPrev(data.length - 1);
        } else {
            sliderRef.slickPrev(slideIndex - 1);
        }
    };

    const handleRightArrow = () => {
        if (slideIndex === data.length - 1) {
            sliderRef.slickNext(0);
        } else {
            sliderRef.slickNext(slideIndex + 1);
        }
    };

    const settings = {
        arrows: true,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: slidesToScrollLg,
        rtl: false,
        className: 'slider',
        centerMode: false,
        afterChange: () => setCount(count + 1),
        beforeChange: (current, next) => setIndex(next),
        responsive: [
            {
                breakpoint: md,
                settings: {
                    slidesToShow: slideMd,
                    slidesToScroll: slidesToScrollMd,
                    className: 'slider',
                    centerMode: centerModeMd,
                    // infinite: data.length >= slideMd,
                },
            },
            {
                breakpoint: sm,
                settings: {
                    slidesToShow: slideSm,
                    slidesToScroll: slidesToScrollSm,
                    centerMode: centerModeSm,
                    className: 'slider',
                    // infinite: data.length >= slideSm,
                },
            },
            {
                breakpoint: xs,
                settings: {
                    slidesToShow: slideXs,
                    slidesToScroll: slidesToScrollXs,
                    centerMode: centerModeXs,
                    className: 'slider',
                    infinite: data.length >= slideXs,
                },
            },
            {
                breakpoint: xxs,
                settings: {
                    slidesToShow: slideXxs,
                    slidesToScroll: slidesToScrollXxs,
                    centerMode: centerModeXxs,
                    className: 'slider',
                    infinite: data.length >= slideXxs,
                },
            },
        ],
    };

    return (
        <div className={classNames('carousel', styles.caraousel)}>
            <Slider onInit={onReInit} ref={(slider) => sliderRef = slider} {...settings}>
                {
                    data && data.length > 0 && data.map((item, key) => (
                        <Item key={key} {...item} {...other} />
                    ))
                }
            </Slider>
            {
                showArrow ? (
                    <>
                        <div className={classNames(styles.arrow, styles.leftArrow, 'arrow left')} onClick={handleLeftArrow}>
                            <LeftArrowIcon fontSize="inherit" />
                        </div>
                        <div className={classNames(styles.arrow, styles.rightArrow, 'arrow right')} onClick={handleRightArrow}>
                            <RightArrowIcon fontSize="inherit" />
                        </div>
                    </>
                ) : null
            }
            <style jsx global>
                {`
                    .carousel .slick-track {
                        margin-left: auto;
                        margin-right: auto;
                    }
                `}
            </style>
        </div>
    );
};

export default Caraousel;
