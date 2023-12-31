/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { generateThumborUrl, getImageFallbackUrl } from '@helpers/image';
import LazyImage from '@core_modules/commons/Image/LazyImage';

const CustomImage = ({
    src, width = 500, height = 500, magezon,
    classContainer = '', className = '', alt = 'Image', quality = 100, style = {}, lazy = false, ...other
}) => {
    const imageUrl = generateThumborUrl(src, width, height);
    const [imgSource, setImgSource] = useState(imageUrl);
    const styleImage = magezon ? {
        maxWidth: '100%',
        maxHeight: '100%',
    } : {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
    };

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onerror = () => setImgSource('/assets/img/placeholder-bio.jpg');
        img.onload = () => setImgSource(imageUrl);
    }, [imageUrl]);

    return (
        <div
            className={classContainer}
            style={magezon ? {
                width: 'fit-content',
                overflow: 'hidden',
            } : {
                backgroundColor: '#eee',
                width: '100%',
                position: 'relative',
                paddingTop: `${100}%`,
                overflow: 'hidden',
            }}
        >
            <picture>
                <source srcSet={imgSource} type="image/webp" />
                <source srcSet={getImageFallbackUrl(imgSource)} type="image/jpeg" />
                {!lazy ? (
                    <img
                        data-pagespeed-no-defer
                        style={styleImage}
                        className={`img ${className}`}
                        src={imgSource}
                        alt={alt}
                        {...other}
                    />
                ) : (
                    <LazyImage
                        style={styleImage}
                        src={imgSource}
                        alt={alt}
                    />
                )}
            </picture>
        </div>
    );
};

export default CustomImage;
