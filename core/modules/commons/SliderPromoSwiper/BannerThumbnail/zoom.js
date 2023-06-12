/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Zoom from 'react-prismazoom';

const ZoomBanner = ({
    zoomRef,
    renderImage,
    item,
    key,
}) => (
    <Zoom ref={zoomRef}>{renderImage(item, key)}</Zoom>
);
export default ZoomBanner;
