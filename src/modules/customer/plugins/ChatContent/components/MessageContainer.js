/* eslint-disable react/no-danger */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import classNames from 'classnames';
import Image from 'next/image';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import Skeleton from '@material-ui/lab/Skeleton';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import formatDate from '@root/core/helpers/date';
import CloseIcon from '@material-ui/icons/Close';

import { loaderImage } from '@config';
import { relativeTimeFrom } from '@core_modules/customer/helpers/chatHelper';
import CustomDropFile from '@core_modules/customer/plugins/ChatContent/components/CustomDropFile';
import useStyles from '@core_modules/customer/plugins/ChatContent/components/style';
import AutoCompleteAction from '@core_modules/customer/plugins/ChatContent/components/AutoCompleteAction';
import MessageAttachment from '@core_modules/customer/plugins/ChatContent/components/MessageAttachment';
import MessageTextRendering from '@core_modules/customer/plugins/ChatContent/components/MessageTextRendering';
import MessageAutotext from '@core_modules/customer/plugins/ChatContent/components/MessageAutotext';

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
        getDistributor,
        loadingSendMessage = false,
        fileMaxSize,
        t,
    } = props;
    const styles = useStyles();
    const scrollRef = useRef();
    const chatId = chat && chat.chatId;
    const agentCode = chat && chat.agent_code;
    const [dataStatus, setDataStatus] = React.useState('0');
    const [dataIsTerminate, setDataIsTerminate] = React.useState('0');
    const [isExpanded, setIsExpanded] = React.useState(false);

    // eslint-disable-next-line max-len
    const containerMessageStyle = (msgObject1) => (msgObject1.is_customer_message !== 'True' || msgObject1.is_robot ? styles.messageLeftWrapper : styles.messageRightWrapper);

    // eslint-disable-next-line max-len
    const contentMessageText = (msgObject3) => (msgObject3.is_customer_message !== 'True' || msgObject3.is_robot ? styles.messageLeftText : styles.messageRightText);

    useEffect(() => {
        setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 1000);

        // get is_terminate status
        if (chatId) {
            const doc = db.collection('messages').doc(chatId);
            doc.onSnapshot((docSnapshot) => {
                const sessionStatus = docSnapshot.data();
                if (sessionStatus.is_terminate) {
                    setDataIsTerminate(sessionStatus.is_terminate.toString());
                } else {
                    setDataIsTerminate('0');
                }
            });
        }
    }, [messages, loadingSendMessage]);

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
                        <Image src="/assets/img/round_logo.png" alt="Picture of the chat" width={150} height={150} />
                    </div>
                </div>
                <div className={styles.userText}>
                    <div className={styles.userName}>
                        {chat.agent_name}
                    </div>
                    <div className={styles.userLastMessage}>
                        {dataStatus === '1' ? 'Online' : `Terakhir online ${relativeTimeFrom(chat.lastMessage.time)} yang lalu`}
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
                        const decodedParams = new URLSearchParams(`?email=${message.customer_email}`);
                        if (chat.chatId === `${decodedParams.get('email')}-${message.agent_code}`) {
                            return (
                                <div key={i} className={containerMessageStyle(message)}>
                                    <div className={styles.messageLeftContent}>
                                        {message.filename ? (
                                            <MessageAttachment message={message} contentMessageText={contentMessageText} />
                                        ) : (
                                            <span className={contentMessageText(message)}>
                                                <MessageTextRendering html={message.text} />
                                                <span>{formatDate(message.createdAt, 'HH:mm')}</span>
                                                {message.is_customer_message === 'True' ? (
                                                    <DoneAllIcon
                                                        className={
                                                            message.is_admin_read != 0 || message.is_admin_read_db == true
                                                                ? classNames(styles.chatDeliver, styles.chatDelivered)
                                                                : styles.chatDeliver
                                                        }
                                                    />
                                                ) : null}
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
                                    <AutoCompleteAction
                                        ans={ans}
                                        handleAutoTextSubmit={handleAutoTextSubmit}
                                        getAgent={getAgent}
                                        getDistributor={getDistributor}
                                    />
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
            {dataIsTerminate == '0' || dataIsTerminate === undefined || chat.auto_terminate == '0' ? (
                <>
                    <MessageAutotext formik={formik} setIsExpanded={setIsExpanded} isExpanded={isExpanded} />
                    <div className={styles.formContent}>
                        <form noValidate autoComplete="off" className={styles.messageForm} onSubmit={formik.handleSubmit}>
                            <TextField
                                name="message"
                                placeholder={t('chat:writeMessage')}
                                className={styles.messageInput}
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                error={!!formik.errors.message}
                                errorMessage={formik.errors.message || null}
                                onFocus={() => {
                                    onFocusDeleteRead(chat);
                                    setIsExpanded(false);
                                }}
                            />
                            <div className={styles.uploadContainer}>
                                <CustomDropFile
                                    showFiles={false}
                                    textButton={<AttachFileSharpIcon />}
                                    formatFile=".jpg, .jpeg, .png, .gif, .pdf, .doc, .docx, .mp4, .mkv, .webm, .csv"
                                    getBase64={handleDropFile}
                                    maxSize={fileMaxSize * 1024}
                                />
                            </div>
                            <Button type="submit" className={styles.messageButton}>
                                {t('chat:sendingMessage')}
                            </Button>
                        </form>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.sessionTerminated}>{t('common:chat:terminate:message')}</div>
                </>
            )}
        </>
    );
};

export default MessageContainer;
