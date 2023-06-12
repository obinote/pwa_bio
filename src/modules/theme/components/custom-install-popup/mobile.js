/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import useStyles from '@core_modules/theme/components/custom-install-popup/style';
import propTypes from 'prop-types';
import TagManager from 'react-gtm-module';
import { useTranslation } from '@i18n';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import userAgent from '@helper_useragent';
import { getDateNumber } from '@helpers/dateNumber';

const PopupInstalation = ({ appName, setShowPopUp }) => {
    const styles = useStyles();
    const { t } = useTranslation(['common']);
    const onClick = () => {
        const timestamp = Date.now();
        const identifier = `${Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100)}_${timestamp}`;
        const dataLayer = {
            event: 'countPopupInstallation',
            eventCategory: 'Count Popup Installation',
            eventAction: 'Installed',
            eventLabel: 'installPWA',
            eventValue: identifier,
        };
        TagManager.dataLayer({ dataLayer });
    };

    const closePopup = () => {
        const el = document.getElementById('popup-mobile__install');
        setShowPopUp(false);
        // hidden popup
        if (el) {
            el.style.display = 'none';
        }

        const date = new Date();
        // add a day
        date.setDate(date.getDate() + 1);
        localStorage.setItem('hideInstallPopup', true);
        localStorage.setItem('expiredHideInstallPopup', getDateNumber(date));
    };

    // disable popup install on mobile apps
    if (typeof window === 'undefined') {
        return <></>;
    }
    if (userAgent.isMobileApps()) {
        return <></>;
    }

    return (
        <div id="popup-mobile__install" className={classNames('row', styles.containerMobile)}>
            <div className={styles.iconClose}>
                <IconButton className={styles.iconCloseButton} onClick={() => closePopup()}>
                    <CloseIcon style={{ fill: '#fff' }} />
                </IconButton>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.titleMobile}>{appName}</div>
                <p style={{ margin: 0 }}>{t('common:popupInstall:desc')}</p>
            </div>
            <div className={styles.btnInstallContainer}>
                <Button className={styles.btnInstall} id="btn-install__mobile" variant="contained" color="primary" onClick={onClick}>
                    {t('common:button:install')}
                </Button>
            </div>
        </div>
    );
};

PopupInstalation.propTypes = {
    appName: propTypes.string,
};

PopupInstalation.defaultProps = {
    appName: 'Swift PWA',
};

export default PopupInstalation;
