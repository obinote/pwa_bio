/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import useStyles from '@core_modules/customer/plugins/ChatContent/components/style';
import React from 'react';

import MessageContainer from '@core_modules/customer/plugins/ChatContent/components/MessageContainer';
import UserContainer from '@core_modules/customer/plugins/ChatContent/components/UserContainer';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import { QuestionAnswer } from '@root/node_modules/@material-ui/icons/index';

const ChatWrapper = (props) => {
    const {
        chat,
        isBlacklisted,
        // loading,
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
        toggleChat,
        handleDropFile,
        isAutoResponse,
        handleAutoTextSubmit,
        autoResponseContent,
        getAgent,
        msgsFirebase = [],
        loadingSendMessage,
        t,
    } = props;
    const styles = useStyles();
    const desktopView = (
        <>
            {isBlacklisted === 0 ? (
                <>
                    <div className={classNames(styles.userContainer, 'hidden-mobile')}>
                        <UserContainer
                            chat={chat}
                            selectUserToChat={selectUserToChat}
                            listUsers={listUsers}
                            db={db}
                            changeSerchUser={changeSerchUser}
                            searchText={searchText}
                            handleSeachUser={handleSeachUser}
                            msgsFirebase={msgsFirebase}
                            {...props}
                        />
                        <button onClick={() => getAgent()} className={classNames(styles.chatCsButton, 'hidden-mobile')}>
                            <QuestionAnswer
                                fontSize="medium"
                                style={{
                                    color: 'white',
                                    marginRight: '.3em',
                                }}
                            />
                            Butuh Bantuan
                        </button>
                    </div>
                    <div className={classNames(styles.messageContainer, 'hidden-mobile')}>
                        {chat ? (
                            <MessageContainer
                                chat={chat}
                                clearChat={clearChat}
                                messages={messages}
                                formik={formik}
                                onFocusDeleteRead={onFocusDeleteRead}
                                toggleChat={toggleChat}
                                handleDropFile={handleDropFile}
                                isAutoResponse={isAutoResponse}
                                handleAutoTextSubmit={handleAutoTextSubmit}
                                autoResponseContent={autoResponseContent}
                                loadingMessages={loadingMessages}
                                db={db}
                                getAgent={getAgent}
                                loadingSendMessage={loadingSendMessage}
                                t={t}
                            />
                        ) : (
                            <>
                                <div className={styles.selectedUser}>
                                    <div className={styles.userText} />
                                    <div style={{ cursor: 'pointer' }} onClick={toggleChat}>
                                        <CloseIcon />
                                    </div>
                                </div>
                                <div className={styles.messageContent}>
                                    <div style={{ textAlign: 'center' }}>
                                        <img style={{ width: '125px' }} src="/assets/img/ghosts.png" alt="empty" />
                                        <p className={styles.emptyText}>Select User to Chat</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className={classNames(styles.messageContent, 'hidden-mobile')}>
                        <div className={styles.closeBlockedUser}>
                            <div style={{ cursor: 'pointer' }} onClick={toggleChat}>
                                <CloseIcon />
                            </div>
                        </div>
                        <div className={styles.blockedUserContent}>
                            <img style={{ width: '125px' }} src="/assets/img/ghosts.png" alt="empty" />
                            <p className={styles.emptyText}>Your Account was blocked in our blacklist. So, you will not get any messages.</p>
                        </div>
                    </div>
                </>
            )}
        </>
    );

    const mobileView = (
        <>
            {isBlacklisted === 0 ? (
                <>
                    {!chat ? (
                        <div className={classNames(styles.userContainer, 'hidden-desktop')}>
                            <UserContainer
                                chat={chat}
                                toggleChat={toggleChat}
                                selectUserToChat={selectUserToChat}
                                listUsers={listUsers}
                                db={db}
                                changeSerchUser={changeSerchUser}
                                searchText={searchText}
                                handleSeachUser={handleSeachUser}
                                msgsFirebase={msgsFirebase}
                                {...props}
                            />
                            <button onClick={() => getAgent()} className={classNames(styles.chatCsButton, 'hidden-desktop')}>
                                <QuestionAnswer
                                    fontSize="medium"
                                    style={{
                                        color: 'white',
                                        marginRight: '.3em',
                                    }}
                                />
                                Cari Bantuan
                            </button>
                        </div>
                    ) : (
                        <div className={classNames(styles.messageContainer, 'hidden-desktop')}>
                            <MessageContainer
                                chat={chat}
                                clearChat={clearChat}
                                messages={messages}
                                formik={formik}
                                onFocusDeleteRead={onFocusDeleteRead}
                                toggleChat={toggleChat}
                                handleDropFile={handleDropFile}
                                isAutoResponse={isAutoResponse}
                                handleAutoTextSubmit={handleAutoTextSubmit}
                                autoResponseContent={autoResponseContent}
                                loadingMessages={loadingMessages}
                                db={db}
                                getAgent={getAgent}
                                loadingSendMessage={loadingSendMessage}
                                t={t}
                            />
                        </div>
                    )}
                </>
            ) : (
                <>
                    <div className={classNames(styles.messageContent, 'hidden-desktop')}>
                        <div className={styles.closeBlockedUser}>
                            <div style={{ cursor: 'pointer' }} onClick={toggleChat}>
                                <CloseIcon />
                            </div>
                        </div>
                        <div style={{ height: '70%' }} className={styles.blockedUserContent}>
                            <img style={{ width: '125px' }} src="/assets/img/ghosts.png" alt="empty" />
                            <p className={styles.emptyText}>Your Account was blocked in our blacklist. So, you will not get any messages.</p>
                        </div>
                    </div>
                </>
            )}
        </>
    );

    return (
        <div className={styles.container}>
            {typeof window && window.innerWidth > 758 ? desktopView : null}
            {typeof window && window.innerWidth <= 758 ? mobileView : null}
        </div>
    );
};

export default ChatWrapper;
