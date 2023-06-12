/* eslint-disable jsx-a11y/media-has-caption */
import classNames from 'classnames';
import useStyles from '@core_modules/product/pages/default/components/AR/style';
import 'aframe';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Scene, Entity } from 'react-aframe-ar';
import Button from '@common_button';
import userAgent from '@helper_useragent';
import View from './view';

const AR = (props) => {
    const { t, arLink, data } = props;
    function refreshPage() {
        setTimeout(() => {
            window.location.reload(false);
        }, 500);
    }
    function AppScene() {
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
                <Button type="button" onClick={() => refreshPage()} className={classNames(styles.backToProduct)}>
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
    }

    const handleClickAr = () => {
        if (userAgent.isIosApps() === true) {
            window.open(`/ar/${data.url_key}`, '_blank').focus();
        } else {
            ReactDOM.render(<AppScene />, document.querySelector('#__next'));
        }
    };

    const checkObjectExtension = arLink?.toString().includes('.glb');

    return <>{checkObjectExtension ? <View t={t} handleClickAr={handleClickAr} /> : null}</>;
};

export default AR;
