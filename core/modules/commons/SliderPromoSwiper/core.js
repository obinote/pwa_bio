/* eslint-disable react/forbid-prop-types */
import { useRouter } from 'next/router';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import RightIcon from '@material-ui/icons/ChevronRight';
import 'swiper/swiper-bundle.css';
import Box from '@modules/commons/Box';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useStyles from '@common_sliderpromoswiper/style';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const SliderPromoCore = (props) => {
    const {
        title, data = [], Content, rightElement = () => <span />,
        slideXs = 2, slideSm = 3, slideMd = 4, slideLg = 6, spaceBetweens = 10,
        typeContent = '', attributeCms = {}, contentProps = {}, source = '',
    } = props;
    const classes = useStyles();
    const navigationValue = attributeCms && attributeCms['data-show-arrows'] ? attributeCms['data-show-arrows'] === 'true' : true;
    const paginationValue = attributeCms && attributeCms['data-show-dots'] ? attributeCms['data-show-dots'] === 'true' : true;

    let autoplayValue = false;
    if (attributeCms && attributeCms['data-autoplay']) {
        autoplayValue = attributeCms['data-autoplay'] === 'true'
            ? { delay: attributeCms['data-autoplay-speed'] || 2000 }
            : false;
    }

    const { asPath } = useRouter();
    const url_params = asPath.split('/')[1];

    return (
        <div className={classes.containerSlider}>
            <Box title={title} rightElement={rightElement}>
                <div className={classNames('slider-box', url_params === 'brands-corner' ? 'brandSlide_' : null)}>
                    {
                        typeContent === 'brand'
                            ? (
                                <Link href="/brands-corner" as="/brands-corner">
                                    <a className="link-all-brand">
                                        All Brands
                                        <RightIcon />
                                        <RightIcon />
                                    </a>
                                </Link>
                            )
                            : null
                    }
                    <Swiper
                        navigation={navigationValue}
                        pagination={paginationValue}
                        autoplay={autoplayValue}
                        breakpoints={{
                            0: {
                                slidesPerView: data.length <= slideXs ? data.length : slideXs,
                                slidesPerGroup: slideXs,
                                spaceBetween: spaceBetweens,
                            },
                            767: {
                                slidesPerView: data.length <= slideSm ? data.length : slideSm,
                                slidesPerGroup: slideSm,
                                spaceBetween: spaceBetweens,
                            },
                            1024: {
                                slidesPerView: data.length <= slideSm ? data.length : slideSm,
                                slidesPerGroup: slideSm,
                                spaceBetween: spaceBetweens,
                            },
                            1200: {
                                slidesPerView: data.length <= slideMd ? data.length : slideMd,
                                slidesPerGroup: slideMd,
                                spaceBetween: spaceBetweens,
                            },
                            1366: {
                                slidesPerView: data.length <= slideLg ? data.length : slideLg,
                                slidesPerGroup: slideLg,
                                spaceBetween: spaceBetweens,
                            },
                        }}
                    >
                        {
                            data.map((val, idx) => (
                                <SwiperSlide key={idx}>
                                    <Content {...val} key={idx} className="slider-item" {...contentProps} source={source} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </Box>
        </div>
    );
};

SliderPromoCore.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    Content: PropTypes.func.isRequired,
};

export default SliderPromoCore;
