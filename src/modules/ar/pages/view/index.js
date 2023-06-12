/* eslint-disable jsx-a11y/media-has-caption */
import classNames from 'classnames';
import 'aframe';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Scene, Entity } from 'react-aframe-ar';
import Button from '@common_button';
import useStyles from './style';

const AR = ({ t, arLink, url_key }) => {
    const handleGoToProduct = () => {
        window.location.href = `/${url_key}`;
    };

    const AppScene = () => {
        const styles = useStyles();
        const videoRef = useRef(null);
        const getVideo = () => {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        facingMode: {
                            ideal: 'environment',
                        },
                    },
                })
                .then((stream) => {
                    const video = videoRef.current;
                    video.srcObject = stream;
                    video.play();
                })
                .catch((err) => {
                    // eslint-disable-next-line no-console
                    console.error('error:', err);
                });
        };

        useEffect(() => {
            getVideo();
        }, [videoRef]);

        return (
            <Scene>
                <Button type="button" onClick={() => handleGoToProduct()} className={classNames(styles.backToProduct)}>
                    {t('product:ar:backToProduct')}
                </Button>

                <a-entity gltf-model={arLink} scale="12 12 12" click-drag />

                <Entity position="0 0 6">
                    <a-camera look-controls-enabled keyboard-controls="mode: fps">
                        <video
                            ref={videoRef}
                            style={{
                                display: 'block',
                                height: '100vh',
                                width: '100vw',
                                objectFit: 'cover',
                            }}
                            autoPlay
                            playsInline
                        />
                    </a-camera>
                </Entity>
            </Scene>
        );
    };

    ReactDOM.render(<AppScene />, document.querySelector('#__next'));
    return (null);
};

export default AR;
