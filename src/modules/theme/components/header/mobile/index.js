/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';

import classNames from 'classnames';
import Typography from '@common_typography';
import propTypes from 'prop-types';
import useStyles from '@core_modules/theme/components/header/mobile/style';
import { getAppEnv } from '@root/core/helpers/env';
import { modules } from '@config';
import { getStoreHost } from '@helpers/config';
import TopMenu from '@core_modules/theme/components/header/desktop/components/mtop';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBagIcon from '@plugin_shoppingbag';
import NotificationBell from '@plugin_notificationbell';
import Autocomplete from '@core_modules/theme/components/header/desktop/components/autocomplete';
import { useTranslation } from '@i18n';
import { getCategoryById } from '@core_modules/theme/services/graphql';
import IconButton from '@material-ui/core/IconButton';
import VoiceRecognition from '@core_modules/theme/components/header/desktop/components/voicerecognition';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import BrowseModal from '@common_searchmodal';

const Header = ({
    showTopMenu,
    showCenterComponent,
    CenterComponent,
    LeftComponent,
    RightComponent,
    className,
    pageConfig,
    storeConfig,
    isPdp = false,
    isLogin,
    isFixed = true,
}) => {
    const { t } = useTranslation(['common']);
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (val) => {
        setOpenModal(val);
    };
    const styles = useStyles();
    const router = useRouter();
    const { data: dataCategory } = getCategoryById(115);
    const back = () => {
        if (modules.checkout.checkoutOnly) {
            window.location.replace(getStoreHost(getAppEnv()));
        } else if (sessionStorage.getItem('prevUrl') === '/') {
            router.push('/');
        } else {
            router.back();
        }
    };

    /**
     * Voice Recognition
     */
    const { transcript, listening } = useSpeechRecognition();
    const [VRText, setVRText] = useState('');
    const [listen, setListen] = useState(false);
    const [searchPlaceholder, setSearchPlaceholder] = useState(t('common:search:placeholder'));
    // set listening to false after .. second(s)
    const listeningTimeout = 5000;

    const checkCompatibility = () => {
        const { browserSupportsSpeechRecognition } = useSpeechRecognition();
        return browserSupportsSpeechRecognition;
    };

    const voiceClickHandler = async () => {
        setSearchPlaceholder(t('common:search:listening'));
        await SpeechRecognition.startListening({ language: 'id-ID', continuous: false });
        setListen(true);
        setTimeout(() => {
            if (transcript === '') {
                SpeechRecognition.stopListening();
                setSearchPlaceholder(t('common:search:placeholder'));
            }
        }, listeningTimeout);
    };

    React.useEffect(() => {
        if (listening === false && listen && VRText !== transcript) {
            if (transcript !== '') {
                setVRText(transcript);
                setSearchPlaceholder(t('common:search:placeholder'));
                setListen(false);
                setOpenModal(false);
                Router.push(`/catalogsearch/result?q=${transcript}`);
            }
            setListen(false);
        }
    }, [listening, listen, transcript]);

    React.useEffect(() => {
        if (transcript !== '') {
            setSearchPlaceholder(transcript);
        }
    }, [transcript]);

    const enableVoice = checkCompatibility();

    // if (pageConfig && !pageConfig.header) return null;

    // eslint-disable-next-line no-nested-ternary
    const position = pageConfig && pageConfig.header === 'absolute' ? styles.headerAbsolute : isFixed ? styles.headerFixed : styles.headerRelative;

    const containerStyle = classNames(styles.container, position, className);
    return (
        <div>
            {showTopMenu && (
                <div className="row header-top">
                    <main className="header-top-main" style={{ width: '97%' }}>
                        <TopMenu t={t} />
                    </main>
                </div>
            )}
            <div className={containerStyle}>
                <div className={styles.leftContainer}>
                    {React.isValidElement(LeftComponent) ? (
                        LeftComponent
                    ) : (
                        <Button onClick={(LeftComponent && LeftComponent.onClick && LeftComponent.onClick) || back} className={styles.btnBack}>
                            {pageConfig.headerBackIcon && pageConfig.headerBackIcon === 'close' ? (
                                <CloseIcon className={styles.backIcon} />
                            ) : (
                                <ArrowBack className={styles.backIcon} />
                            )}
                        </Button>
                    )}
                </div>
                {showCenterComponent && (
                    <div className={styles.centerContainer}>
                        {React.isValidElement(CenterComponent) ? (
                            CenterComponent
                        ) : (
                            <>
                                {pageConfig.headerTitle ? (
                                    <Typography variant="h1" type="bold" letter="uppercase" align="center" className={styles.title}>
                                        {pageConfig.headerTitle}
                                    </Typography>
                                ) : null}
                            </>
                        )}
                    </div>
                )}
                <div className={styles.rightContainer} style={{ width: isPdp ? '85%' : '60%' }}>
                    {React.isValidElement(RightComponent) ? (
                        RightComponent
                    ) : (
                        <div className={styles.headerRight}>
                            <div
                                className={isPdp ? styles.mobileSearch : 'mobile-search'}
                                onClick={() => handleOpenModal(true)}
                                id="searchbar-mobile"
                            >
                                <VoiceRecognition enableVoice={enableVoice} />
                                <Autocomplete width="100%" disabled forcePopupIcon={false} placeholder={searchPlaceholder} />
                                <div className={isPdp ? styles.searchIcon : 'search-icon'}>
                                    <IconButton edge="start" aria-label="close">
                                        <SearchIcon style={{ fill: '#f58732' }} />
                                    </IconButton>
                                </div>
                            </div>
                            {isPdp ? (
                                <ShoppingBagIcon withLink storeConfig={storeConfig} />
                            ) : (
                                <div className="notification" id="notification-mobile">
                                    <NotificationBell withLink />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <BrowseModal
                open={openModal}
                setOpenModal={handleOpenModal}
                enableVoice={enableVoice}
                voiceClickHandler={voiceClickHandler}
                searchPlaceholder={searchPlaceholder}
                dataCategory={dataCategory}
                storeConfig={storeConfig}
                t={t}
                isLogin={isLogin}
            />
            <style jsx>
                {`
                    .mobile-search {
                        padding-left: 10px;
                        width: 100%;
                        position: relative;
                    }
                    .search-icon {
                        position: absolute;
                        right: 0;
                        z-index: 9;
                        top: -3px;
                    }
                `}
            </style>
        </div>
    );
};

Header.propTypes = {
    showTopMenu: propTypes.any,
    showCenterComponent: propTypes.any,
    LeftComponent: propTypes.any,
    CenterComponent: propTypes.any,
    RightComponent: propTypes.any,
    className: propTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    pageConfig: propTypes.object,
};

Header.defaultProps = {
    showTopMenu: true,
    showCenterComponent: false,
    LeftComponent: null,
    CenterComponent: null,
    RightComponent: null,
    className: '',
    pageConfig: {
        header: 'relative',
    },
};

export default Header;
