/* eslint-disable no-nested-ternary */
import React from 'react';
import Link from 'next/link';
// import { features } from '@config';
import setDefaultWhenEmpty from '@helper_checkimagesrc';
import { breakPointsUp } from '@helper_theme';
import classNames from 'classnames';
import useStyles from '@common_sliderpromoswiper/Banner/style';
import Thumbor from '@common_sliderpromoswiper/Banner/Thumbor';

/**
 slug page need props 'href' & 'as' to prevent browser reloading
 *isSlug == true => <link href="/[...slug]" as={link} />
 *isSlug == false => <link href={link} />
*/

const ImageSlide = ({
    imageUrl = '', link = '#', isSlug = true, width, height, mobileImageUrl = '', noLink,
    contentWidth, customClass = '', view = {},
}) => {
    const styles = useStyles();
    const href = link && link[0] === '/' ? link : `/${link}`;
    const desktop = breakPointsUp('sm');
    // const defaultWidth = desktop ? features.imageSize.homeSlider.desktop.width : features.imageSize.homeSlider.mobile.width;
    const defaultWidth = desktop ? 450 : 360;
    // const defaultHeight = desktop ? features.imageSize.homeSlider.desktop.height : features.imageSize.homeSlider.mobile.height;
    const defaultHeight = desktop ? 450 : 360;
    const defaultImageUrl = typeof window !== 'undefined' && mobileImageUrl
        ? desktop ? setDefaultWhenEmpty(imageUrl) : setDefaultWhenEmpty(mobileImageUrl) : setDefaultWhenEmpty(imageUrl);
    if (noLink) {
        return (
            <Thumbor
                src={defaultImageUrl}
                alt={href}
                width={width || defaultWidth}
                height={height || defaultHeight}
                quality={100}
                className={contentWidth === 'auto' ? classNames(styles.imageSliderAuto, styles.imageSlider, customClass)
                    : classNames(styles.imageSlider, customClass)}
            />
        );
    }
    return (
        <Link
            href={isSlug ? '/[...slug]' : href}
            {...(isSlug && { as: href })}
        >
            <a className={view.isHomepage ? 'banner-homepage' : ''}>
                <Thumbor
                    src={defaultImageUrl}
                    alt={href}
                    width={width || defaultWidth}
                    height={height || defaultHeight}
                    quality={100}
                    className={contentWidth === 'auto' ? classNames(styles.imageSliderAuto, styles.imageSlider)
                        : styles.imageSlider}
                    contentWidth={contentWidth}
                    customClass={customClass}
                />
            </a>
        </Link>
    );
};

export default ImageSlide;
