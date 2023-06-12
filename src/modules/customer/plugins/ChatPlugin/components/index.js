/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-new */
import React, { useState, useEffect } from 'react';
import useStyles from '@core_modules/customer/plugins/ChatPlugin/components/style';
import ChatWrapper from '@core_modules/customer/plugins/ChatPlugin/components/ChatWrapper';
import Badge from '@material-ui/core/Badge';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import Fab from '@material-ui/core/Fab';

const Content = (props) => {
    const {
        chat,
        loading,
        loadingMessages,
        selectUserToChat,
        clearChat,
        listUsers,
        db,
        messages,
        formik,
        changeSerchUser,
        searchText,
        handleSeachUser,
        onFocusDeleteRead,
        handleDropFile,
        customerEmail,
        isAutoResponse,
        handleAutoTextSubmit,
        autoResponseContent,
        isPdp,
        handleChatPdp,
        isLogin,
    } = props;

    const styles = useStyles();
    const [showChat, setShowChat] = useState(false);
    const [msgs, setMsgs] = useState([]);
    const toggleChat = () => {
        if (isLogin) {
            if (isPdp) {
                handleChatPdp();
            } else {
                setShowChat(!showChat);
                clearChat();
            }
        }
    };

    useEffect(() => {
        let unsub = () => null;

        if (customerEmail && !isPdp) {
            const refereceUserDb = db.collection('messages');
            const customerQuery = refereceUserDb
                .where('is_customer_read', 'in', [0])
                .where('customer_email', '==', customerEmail);
            const q = customerQuery;

            unsub = q.onSnapshot((querySnapshot) => {
                const unread = [];
                querySnapshot.docs.forEach((doc) => {
                    unread.push({
                        chatId: doc.id,
                        ...doc.data(),
                    });
                });
                setMsgs(unread);
            });
        }

        return unsub;
    }, [customerEmail, isPdp]);

    useEffect(() => {
        if (msgs && msgs.length > 0 && typeof window !== 'undefined') {
            if (Notification.permission !== 'granted') {
                Notification.requestPermission();
            } else {
                new Notification('New Messages', {
                    icon: '/assets/img/pwa.png',
                    body: `you have ${msgs.length} messages`,
                });
            }
        }
    }, [msgs]);

    if (loading) {
        return null;
    }

    return (
        <div>
            {
                isPdp ? (
                    <ChatWrapper
                        loading={loading}
                        loadingMessages={loadingMessages}
                        chat={chat}
                        selectUserToChat={selectUserToChat}
                        clearChat={clearChat}
                        listUsers={listUsers}
                        onFocusDeleteRead={onFocusDeleteRead}
                        db={db}
                        messages={messages}
                        formik={formik}
                        changeSerchUser={changeSerchUser}
                        searchText={searchText}
                        handleSeachUser={handleSeachUser}
                        toggleChat={toggleChat}
                        handleDropFile={handleDropFile}
                        isAutoResponse={isAutoResponse}
                        handleAutoTextSubmit={handleAutoTextSubmit}
                        autoResponseContent={autoResponseContent}
                    />
                ) : (
                    <>
                        {
                            showChat ? (
                                <>
                                    <ChatWrapper
                                        loading={loading}
                                        loadingMessages={loadingMessages}
                                        chat={chat}
                                        selectUserToChat={selectUserToChat}
                                        clearChat={clearChat}
                                        listUsers={listUsers}
                                        onFocusDeleteRead={onFocusDeleteRead}
                                        db={db}
                                        messages={messages}
                                        formik={formik}
                                        changeSerchUser={changeSerchUser}
                                        searchText={searchText}
                                        handleSeachUser={handleSeachUser}
                                        toggleChat={toggleChat}
                                        handleDropFile={handleDropFile}
                                        isAutoResponse={isAutoResponse}
                                        handleAutoTextSubmit={handleAutoTextSubmit}
                                        autoResponseContent={autoResponseContent}
                                    />
                                </>
                            ) : (
                                <div onClick={toggleChat} className={styles.buttonChat}>
                                    <Fab color="primary" size="medium" aria-label="Chat">
                                        <ForumOutlinedIcon style={{ color: '#fff' }} />
                                        {
                                            msgs && msgs.length > 0 && (
                                                <Badge
                                                    badgeContent={msgs.length}
                                                    color="error"
                                                    className={styles.indexBadge}
                                                />
                                            )
                                        }
                                    </Fab>
                                </div>
                            )
                        }
                    </>
                )
            }
        </div>
    );
};

export default Content;
