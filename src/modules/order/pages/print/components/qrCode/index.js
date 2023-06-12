import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const QrGenerator = (props) => {
    const { orderid } = props;
    return (
        <>
            <QRCode
                id={`qr_code_${orderid}`}
                {...props}
            />
        </>
    );
};

QrGenerator.defaultProps = {
    orderid: '-',
    value: 'https://medbiz.id',
    qrStyle: 'dots', // squares | dots
    size: 150,
    bgColor: '#FFFFFF',
    fgColor: '#414048',
    logoImage: 'https://cdn.medbiz.id/media/logo/stores/2/logo_medbiz_2x_1.png',
    logoWidth: 150,
    logoHeight: 35,
    logoOpacity: 0.7,
    eyeRadius: [
        { // top/left eye
            outer: 2,
            inner: 2,
        },
        { // top/right eye
            outer: 2,
            inner: 2,
        },
        { // bottom/left
            outer: [2, 2, 2, 2],
            inner: 2,
        },
    ],
    eyeColor: [
        {
            // top/left eye
            outer: '#414048',
            inner: '#42929D',
        },
        {
            // top/right eye
            outer: '#414048',
            inner: '#42929D',
        },
        {
            // bottom/left eye
            outer: '#414048',
            inner: '#42929D',
        },
    ],
};

export default QrGenerator;
