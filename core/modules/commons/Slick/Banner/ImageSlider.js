/* eslint-disable no-nested-ternary */
import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import useStyles from '@common_slick/Banner/style';
import Thumbor from '@common_slick/Banner/Thumbor';
import ProductVideo from '@common_slick/Banner/productVideo';

/**
 slug page need props 'href' & 'as' to prevent browser reloading
 *isSlug == true => <link href="/[...slug]" as={link} />
 *isSlug == false => <link href={link} />
*/

const ImageSlide = ({
    width, height, imageUrl = '', link = '#', isSlug = true, mobileImageUrl = '', noLink,
    contentWidth, customClass = '', videoUrl, storeConfig,
}) => {
    const styles = useStyles();
    const href = link && link[0] === '/' ? link : `/${link}`;

    if (noLink) {
        return (
            imageUrl && videoUrl && videoUrl.video_url
                ? <ProductVideo videoUrl={videoUrl} />
                : (
                    <Thumbor
                        src={imageUrl}
                        srcMobile={mobileImageUrl}
                        width={width || storeConfig?.pwa?.home_slider_desktop_width}
                        height={height || storeConfig?.pwa?.home_slider_desktop_height}
                        widthMobile={width || storeConfig?.pwa?.home_slider_mobile_width}
                        heightMobile={height || storeConfig?.pwa?.home_slider_mobile_height}
                        alt={href}
                        quality={100}
                        className={
                            contentWidth === 'auto'
                                ? classNames(styles.imageSliderAuto, styles.imageSlider, customClass)
                                : classNames(styles.imageSlider, customClass)
                        }
                    />
                )
        );
    }
    return (
        <Link href={isSlug ? '/[...slug]' : href} {...(isSlug && { as: href })}>
            <a>
                <Thumbor
                    src={imageUrl}
                    srcMobile={mobileImageUrl}
                    width={width || storeConfig?.pwa?.home_slider_desktop_width}
                    height={height || storeConfig?.pwa?.home_slider_desktop_height}
                    widthMobile={width || storeConfig?.pwa?.home_slider_mobile_width}
                    heightMobile={height || storeConfig?.pwa?.home_slider_mobile_height}
                    alt={href}
                    quality={100}
                    className={contentWidth === 'auto' ? classNames(styles.imageSliderAuto, styles.imageSlider) : styles.imageSlider}
                    contentWidth={contentWidth}
                    customClass={customClass}
                />
            </a>
        </Link>
    );
};

export default ImageSlide;
