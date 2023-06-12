/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ImageSlide from '@common_sliderpromoswiper/Banner/ImageSlide';
import useStyles from '@common_sliderpromoswiper/Banner/style';

SwiperCore.use([Autoplay, Navigation, Pagination]);

const Banner = ({
    data = [],
    height,
    width,
    contentWidth = '',
    noLink = false,
    withThumbor = 'true',
    configBanner = {},
}) => {
    const styles = useStyles();

    return (
        configBanner.status === 1
            ? (
                <div className={styles.caraousel} style={{ maxWidth: `${width || 1920}px` }}>
                    <Swiper
                        pagination={(data.length > 1) || configBanner.navigation_bullets === 1}
                        navigation={(data.length > 1) || configBanner.navigation_arrows === 1}
                        loop
                        autoplay={configBanner.autoplay === 1 ? {
                            delay: configBanner.transition_speed,
                            disableOnInteraction: false,
                        } : false}
                    >
                        {data.map((item, key) => (
                            <SwiperSlide key={key}>
                                <ImageSlide
                                    withThumbor={withThumbor}
                                    height={height}
                                    width={width}
                                    noLink={noLink}
                                    contentWidth={contentWidth}
                                    {...item}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )
            : null
    );
};

export default Banner;
