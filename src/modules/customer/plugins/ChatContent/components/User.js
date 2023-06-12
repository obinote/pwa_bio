/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Badge from '@material-ui/core/Badge';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import useStyles from '@core_modules/customer/plugins/ChatContent/components/style';
// import MessageTextRendering from '@core_modules/customer/plugins/ChatContent/components/MessageTextRendering';
import parse from 'html-react-parser';
import TextMessage from '@core_modules/customer/plugins/ChatContent/components/Preview/TextMessage';

const DEFAULT_VENDOR_LOGO = '/assets/img/round_logo.png';

const User = (props) => {
    const {
        chat, selectUserToChat, user, db, msgsFirebase, logo = [],
    } = props;
    const styles = useStyles();
    const [dataUnread, setDataUnread] = useState([]);
    const [lastMessage, setLastMessage] = useState({});
    const [dataStatus, setDataStatus] = useState('0');
    const chatId = user && user.chatId;
    const agentCode = user && user.agent_code;
    const activeChat = () => (chatId === chat.chatId ? 'active' : 'unactive');
    const renderLastMessage = html => {
        return parse(html, {
            replace: (domNode) => {
                if (domNode.name === "pwa" && domNode.attribs) {
                    
                    switch (domNode.attribs.type) {
                    case "order":
                        const textOrder = domNode?.children[0]?.data || "";
                        return <TextMessage data={domNode.attribs} textOrder={textOrder} />;
                    default:
                        return null;
                    }
                }
                // eslint-disable-next-line react/no-danger
                return <p dangerouslySetInnerHTML={{ __html: domNode.data }} />;
                // return null;
            },
        });
    }
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

    const generateLogo = () => {
        if (logo.length === 0) {
            return DEFAULT_VENDOR_LOGO;
        }
        // eslint-disable-next-line eqeqeq
        const vendorLogo = logo.filter((val) => val.vendor_code == user.agent_code);
        return vendorLogo.length > 0 ? vendorLogo[0].logo : DEFAULT_VENDOR_LOGO;
    };

    return (
        <div onClick={() => selectUserToChat(user)} className={styles.userWrapper}>
            <div className={classNames(styles.userContent, activeChat())}>
                <div className={styles.userImage}>
                    {checkUnreadMessage().length > 0 ? <span className={styles.badgeCount} /> : null}
                    <img src={generateLogo()} alt="Logo of the chat" width={150} height={150} />
                </div>
                <div className={classNames(styles.userText)}>

                    <div className={styles.userUsernameWrapper}>
                        <div className={classNames(styles.userName, 'userName')}>{user.agent_name}</div>
                        <FiberManualRecordIcon className={
                            `${styles.userStatus} ${dataStatus === '1' ? styles.onlineStatus : styles.offlineStatus}`
                        }
                        />
                    </div>

                    <div className={styles.userBadge}>{user.agent_name}</div>
                    
                    {lastMessage && lastMessage.text ? (
                        <p className={styles.lastMessage}>{renderLastMessage(lastMessage?.text || "")}</p>
                    ) : (
                        <p
                            className={styles.lastMessage}
                            dangerouslySetInnerHTML={{ __html: user && user.lastMessage ? user.lastMessage.message : '', }}
                        />
                    )}
                </div>
                <div className={styles.userInfo}>
                    {/* <div className={styles.userDate}>
                        {formatDate(user.lastMessage.time, 'HH:mm')}
                    </div> */}
                    <Badge
                        // badgeContent={24}
                        badgeContent={dataUnread.length}
                        invisible={dataUnread && dataUnread.length === 0}
                        className={styles.customBadge}
                    />
                </div>
            </div>
        </div>
    );
};

export default User;
