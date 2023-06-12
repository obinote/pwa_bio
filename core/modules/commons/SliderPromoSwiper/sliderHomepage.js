/* eslint-disable react/forbid-prop-types */
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from '@modules/commons/Image/originalImage';
import 'swiper/swiper-bundle.css';
import PropTypes from 'prop-types';
import useStyles from '@common_sliderpromoswiper/style';

SwiperCore.use([Autoplay, Navigation, Pagination]);

const SliderHomePage = (props) => {
    const classes = useStyles();
    const {
        data = [],
        width,
    } = props;
    if (data.length === 0) {
        return null;
    }
    return (
        <div className={classNames(classes.swiperHomepage, classes.containerSlider)}>
            <div className="slider-box__homepage" style={{ maxWidth: width }}>
                <Swiper
                    slidesPerView="auto"
                    centeredSlides
                    loop
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    navigation
                >
                    {
                        data.map((val, idx) => (
                            <SwiperSlide key={idx}>
                                <Link href={val.link} as={val.link}>
                                    <a className="brand-link">
                                        <Image src={val.imageUrl} />
                                    </a>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
};

SliderHomePage.propTypes = {
    data: PropTypes.array.isRequired,
};

export default SliderHomePage;
