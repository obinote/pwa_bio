/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Badge from '@material-ui/core/Badge';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { initialName } from '@core_modules/customer/helpers/chatHelper';
import useStyles from '@core_modules/customer/plugins/ChatContent/components/style';

const User = (props) => {
    const {
        chat, selectUserToChat, user, db, msgsFirebase,
    } = props;
    const styles = useStyles();
    const [dataUnread, setDataUnread] = useState([]);
    const [lastMessage, setLastMessage] = useState({});
    const [dataStatus, setDataStatus] = useState('0');
    const chatId = user && user.chatId;
    const agentCode = user && user.agent_code;
    const activeChat = () => (chatId === chat.chatId ? 'active' : 'unactive');

    useEffect(() => {
        const refereceUserDb = db.collection('messages');
        const customerUnreadQuery = refereceUserDb.doc(chatId).collection('chat').where('is_customer_read', 'in', [0]);

        const unsub = customerUnreadQuery.onSnapshot((querySnapshot) => {
            const adminUnread = querySnapshot.docs.map((doc) => doc.data());
            setDataUnread(adminUnread);
        });

        // get agent online status
        if (agentCode) {
            const doc = db.collection('status').doc(agentCode);
            doc.onSnapshot((docSnapshot) => {
                const agentStatus = docSnapshot.data();
                if (agentStatus) {
                    setDataStatus(agentStatus.status);
                }
            });
        }

        return unsub;
    }, [chatId]);

    useEffect(() => {
        if (dataUnread && dataUnread.length > 0) {
            setLastMessage(dataUnread[0]);
        }
    }, [dataUnread]);
    const checkUnreadMessage = () => {
        if (msgsFirebase) {
            return msgsFirebase.filter((msgs) => msgs.agent_code === agentCode);
        }
        return [];
    };
    return (
        <div onClick={() => selectUserToChat(user)} className={styles.userWrapper}>
            <div className={classNames(styles.userContent, activeChat())}>
                <div className={styles.userImage}>
                    {checkUnreadMessage().length > 0 ? <span className={styles.badgeCount} /> : null}
                    <span>{initialName(user.agent_name)}</span>
                </div>
                <div className={styles.userText}>
                    <div className={styles.userName}>
                        {user.agent_name}
&nbsp;&nbsp;
                        <FiberManualRecordIcon
                            className={`${styles.userStatus} ${dataStatus === '1' ? styles.onlineStatus : styles.offlineStatus}`}
                        />
                    </div>
                    <div className={styles.userBadge}>{user.agent_name}</div>
                    {lastMessage && lastMessage.text ? <p className={styles.lastMessage}>{lastMessage.text}</p>
                        : <p className={styles.lastMessage}>{user && user.lastMessage ? user.lastMessage.message : ''}</p>}
                </div>
                <div className={styles.userInfo}>
                    {/* <div className={styles.userDate}>
                        {formatDate(user.lastMessage.time, 'HH:mm')}
                    </div> */}
                    <Badge
                        badgeContent={dataUnread.length}
                        invisible={dataUnread && dataUnread.length === 0}
                        color="error"
                        className={styles.customBadge}
                    />
                </div>

            </div>
        </div>
    );
};

export default User;
