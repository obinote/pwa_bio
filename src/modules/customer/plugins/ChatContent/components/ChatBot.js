/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import React from 'react';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import useStyles from '@core_modules/customer/plugins/ChatContent/components/style';
import clsx from 'clsx';
import { useTranslation } from '@i18n';

const User = (props) => {
    const {
        chat, selectUserToChat, user,
    } = props;
    const styles = useStyles();
    const { t } = useTranslation(['chat']);
    const activeChat = () => (chat ? 'active' : 'unactive');

    return (
        <div onClick={() => selectUserToChat(user)} className={styles.userWrapper}>
            <div className={classNames(styles.userContent, activeChat(), 'userBot')}>
                <div className={classNames(styles.userImage, 'imageBot')}>
                    <img
                        src="/assets/img/customer-service.svg"
                        alt="img of the chat"
                        width={150}
                        height={150}
                    />
                </div>
                <div className={styles.userText}>
                    <div className={styles.userName}>
                        Chat Bot
                        {' '}
                        <FiberManualRecordIcon
                            className={clsx(styles.userStatus, styles.onlineStatus)}
                        />
                    </div>
                    <div className={styles.userBadge}>Chat Bot</div>
                    <p className={styles.lastMessage}>{t('chat:needHelp')}</p>
                </div>
            </div>
        </div>
    );
};

export default User;
