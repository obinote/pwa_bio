/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { loaderImage } from '@config';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import CloseIcon from '@material-ui/icons/Close';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import SendIcon from '@material-ui/icons/Send';
import Skeleton from '@material-ui/lab/Skeleton';
import formatDate from '@root/core/helpers/date';

import { initialName, relativeTimeFrom } from '@core_modules/customer/helpers/chatHelper';
import CustomDropFile from '@core_modules/customer/plugins/ChatContent/components/CustomDropFile';
import useStyles from '@core_modules/customer/plugins/ChatContent/components/style';
import AutoCompleteAction from '@core_modules/customer/plugins/ChatContent/components/AutoCompleteAction';

const MessageContainer = (props) => {
    const {
        chat,
        clearChat,
        loadingMessages,
        messages,
        formik,
        onFocusDeleteRead,
        toggleChat,
        handleDropFile,
        isAutoResponse,
        handleAutoTextSubmit,
        autoResponseContent,
        db,
        getAgent,
        loadingSendMessage = false,
        t,
    } = props;
    const styles = useStyles();
    const scrollRef = useRef();
    const chatId = chat && chat.chatId;
    const agentCode = chat && chat.agent_code;
    const [dataStatus, setDataStatus] = React.useState('0');
    const [dataIsTerminate, setDataIsTerminate] = React.useState('0');

    // eslint-disable-next-line max-len
    const containerMessageStyle = (msgObject1) => (msgObject1.is_customer_message !== 'True' || msgObject1.is_robot
        ? styles.messageLeftWrapper
        : styles.messageRightWrapper);

    // eslint-disable-next-line max-len
    const contentMessageText = (msgObject3) => (msgObject3.is_customer_message !== 'True' || msgObject3.is_robot
        ? styles.messageLeftText
        : styles.messageRightText);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        // get is_terminate status
        if (chatId) {
            const doc = db.collection('messages').doc(chatId);
            doc.onSnapshot((docSnapshot) => {
                const sessionStatus = docSnapshot.data();
                if (sessionStatus.is_terminate) {
                    setDataIsTerminate(sessionStatus.is_terminate.toString());
                }
            });
        }
    }, [messages]);

    useEffect(() => {
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
    }, [chatId]);

    if (loadingMessages) {
        return (
            <div>
                <div className={styles.selectedUser}>
                    <div className={styles.selectedUserImage}>
                        <Skeleton animation="wave" variant="circle" height={25} width={25} />
                    </div>
                    <div className={styles.userText}>
                        <Skeleton animation="wave" variant="rect" height={25} width="100%" />
                    </div>
                </div>
                <div className={styles.messageContent}>
                    <Skeleton animation="wave" variant="text" height={80} width="100%" />
                    <Skeleton animation="wave" variant="text" height={80} width="100%" />
                    <Skeleton animation="wave" variant="text" height={80} width="100%" />
                </div>
                <div className={styles.formContent}>
                    <Skeleton animation="wave" variant="rect" height={35} width="100%" />
                </div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.selectedUser}>
                <div className={styles.userImageWrapper}>
                    <div className={classNames(styles.userBackIcon, 'hidden-desktop')} onClick={clearChat}>
                        <ArrowBackIosIcon />
                    </div>

                    <div onClick={clearChat} className={styles.selectedUserImage}>
                        <span>{initialName(chat.agent_name)}</span>
                    </div>
                </div>
                <div className={styles.userText}>
                    <div className={styles.userName}>{chat.agent_name}</div>
                    <div className={styles.userLastMessage}>
                        {dataStatus === '1' ? 'online' : `Terakhir online ${relativeTimeFrom(chat.lastMessage.time)} yang lalu.`}
                    </div>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={toggleChat}>
                    <CloseIcon />
                </div>
            </div>
            <div className={styles.messageContent}>
                {messages
                    && messages.length > 0
                    && messages.map((message, i) => {
                        if (message.type && message.type === 'day') {
                            return (
                                <p key={i} className={styles.messageCenterDate}>
                                    {formatDate(message.date, 'D MMM YYYY')}
                                </p>
                            );
                        }
                        // if (chat.chatId === `${message.customer_id}-${message.agent_code}`) {
                        if (chat.chatId === `${message.customer_email}-${message.agent_code}`) {
                            return (
                                <div key={i} className={containerMessageStyle(message)}>
                                    <div className={styles.messageLeftContent}>
                                        {message.filename ? (
                                            <span className={contentMessageText(message)}>
                                                {message.filetype === 'image' ? (
                                                    <>
                                                        <img className={styles.messageImage} src={message.filename} alt="messageImage" />
                                                        <span>{formatDate(message.createdAt, 'HH:mm')}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <a href={message.filename} target="_blank" rel="noopener noreferrer">
                                                            <DescriptionOutlinedIcon fontSize="large" />
                                                            <div>Click to Open</div>
                                                        </a>
                                                        <span>{formatDate(message.createdAt, 'HH:mm')}</span>
                                                    </>
                                                )}
                                            </span>
                                        ) : (
                                            <span className={contentMessageText(message)}>
                                                {message.text}
                                                <span>{formatDate(message.createdAt, 'HH:mm')}</span>
                                            </span>
                                        )}
                                        {message.is_robot ? (
                                            <span className={styles.botName}>bot</span>
                                        ) : (
                                            <>
                                                {message.is_customer_message === 'True' ? (
                                                    <span className={styles.customerName}>you</span>
                                                ) : (
                                                    <span className={styles.botName}>{message.agent_code}</span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                {isAutoResponse && (
                    <div className={styles.autoResponseWrapper}>
                        <div className={styles.autoResponseTitle}>
                            <span>{autoResponseContent && autoResponseContent.message}</span>
                        </div>
                        <div className={styles.autoResponseBody}>
                            {autoResponseContent
                                && autoResponseContent.answer
                                && autoResponseContent.answer.length > 0
                                && autoResponseContent.answer.map((ans) => (
                                    <AutoCompleteAction ans={ans} handleAutoTextSubmit={handleAutoTextSubmit} getAgent={getAgent} />
                                ))}
                        </div>
                    </div>
                )}
                {loadingSendMessage && (
                    <div key="loading" className={styles.messageRightWrapper}>
                        <div className={styles.messageLeftContent}>
                            <span className={clsx(styles.messageRightText, styles.messageLoading)}>
                                <img alt="loading" src={loaderImage} width="60px" height="12px" />
                            </span>
                        </div>
                    </div>
                )}
                <div ref={scrollRef} />
            </div>
            {dataIsTerminate == '0' || dataIsTerminate === undefined ? (
                <>
                    <div className={styles.formContent}>
                        <div className={styles.uploadContainer}>
                            <CustomDropFile
                                showFiles={false}
                                textButton={<AttachFileSharpIcon />}
                                formatFile=".jpg, .jpeg, .png, .gif, .pdf, .doc"
                                getBase64={handleDropFile}
                            />
                        </div>
                        <form noValidate autoComplete="off" className={styles.messageForm} onSubmit={formik.handleSubmit}>
                            <TextField
                                name="message"
                                placeholder="Tulis Pesan..."
                                className={styles.messageInput}
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                error={!!formik.errors.message}
                                errorMessage={formik.errors.message || null}
                                onFocus={() => onFocusDeleteRead(chat)}
                            />
                            <Button type="submit" className={styles.messageButton}>
                                <SendIcon
                                    style={{
                                        color: 'white',
                                    }}
                                />
                            </Button>
                        </form>
                    </div>
                </>
            ) : (
                <div className={styles.sessionTerminated}>
                    {t('common:chat:terminate:message')}
                </div>
            )}
        </>
    );
};

export default MessageContainer;
