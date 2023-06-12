/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import dynamic from 'next/dynamic';
// import AmastyLabel from '@modules/catalog/plugin/ProductItem/components/AmastyLabel/index';
import useStyles from '@common_sliderpromoswiper/BannerThumbnail/style';
import ImageSlide from '@common_sliderpromoswiper/Banner/ImageSlide';
import Thumbor from '@common_sliderpromoswiper/Banner/Thumbor';

const ZoomBanner = dynamic(() => import('core/modules/commons/SliderPromoSwiper/BannerThumbnail/zoom'));

SwiperCore.use([Navigation, Pagination, Thumbs]);

const Banner = ({
    data = [],
    // labels = [],
    // showArrow,
    pagination,
    height,
    width,
    noLink = false,
    thumbnail = false,
    actionImage = () => {},
    zoom = false,
    zoomRef = null,
}) => {
    const styles = useStyles();
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [playButtonClicked, setPlayButtonClicked] = useState(false);
    const sliderPagination = pagination ?? true;

    const renderImage = (item, key = 0) => {
        const { __typename, video_content = {} } = item;
        const videoUrl = __typename === 'ProductVideo' && video_content.video_url
            ? video_content.video_url.replace('https://youtu.be', 'https://www.youtube.com/embed')
            : '';

        return (
            <div className={styles.imageContainer}>
                {__typename === 'ProductVideo' && (
                    <div className="overlay">
                        {playButtonClicked ? (
                            <iframe
                                width="100%"
                                height="100%"
                                src={`${videoUrl}?autoplay=1`}
                                title={video_content.video_title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ zIndex: 99 }}
                            />
                        ) : (
                            <div className="overlay__play-button" onClick={() => setPlayButtonClicked(!playButtonClicked)} />
                        )}
                    </div>
                )}
                <ImageSlide
                    height={height}
                    customClass={styles.customClass}
                    width={width}
                    noLink={noLink}
                    key={key}
                    {...item}
                />
            </div>
        );
    };

    return (
        <div className={styles.productSlider}>
            <div className="productSlider__main">
                <Swiper pagination={sliderPagination} navigation thumbs={{ swiper: thumbsSwiper }} className="product-swiper">
                    {data.map((item, key) => {
                        const { __typename } = item;
                        return (
                            <SwiperSlide key={key}>
                                <div
                                    onClick={() => {
                                        if (__typename === 'ProductImage') actionImage();
                                    }}
                                >
                                    {zoom ? <ZoomBanner zoomRef={zoomRef} renderImage={renderImage} item={item} key={key} /> : renderImage(item, key)}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                {/* <AmastyLabel data={labels} fullHeight="94%" /> */}
            </div>
            { (thumbnail && data.length > 1) && (
                <div className="productSlider__thumbnail">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        freeMode
                        watchSlidesVisibility
                        watchSlidesProgress
                        className="thumb-swiper"
                        breakpoints={{
                            0: {
                                slidesPerView: 4,
                                slidesPerGroup: 1,
                                centeredSlides: data.length >= 4,
                            },
                            767: {
                                slidesPerView: 4,
                                slidesPerGroup: 1,
                                centeredSlides: false,
                            },
                        }}
                    >
                        {data.map((item, idx) => (
                            <SwiperSlide>
                                <div className="productSlider__thumbnail--item" key={idx}>
                                    <Thumbor
                                        src={item.imageUrl}
                                        alt="thumbnail"
                                        width={100}
                                        height={100}
                                        quality={100}
                                        className="productSlider__thumbnail--img"
                                        customClassContainer={styles.thumborContainer}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    );
};
export default Banner;
