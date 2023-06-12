/* eslint-disable no-plusplus */
/* eslint-disable no-alert */
/* eslint-disable no-shadow */
/* eslint-disable radix */
import firebaseApp from '@lib_firebase/index';
import 'firebase/firestore';
import { useFormik } from 'formik';
import { features } from '@config';
import React, { useEffect, useState, useMemo } from 'react';
import * as Yup from 'yup';
import {
    combinedMessagesData, filteredUser, generateCombinedUser, generateGroupedMessages,
} from '@core_modules/customer/helpers/chatHelper';
import {
    addMessage,
    getMessageList, getSessionMessageList, getBlacklist,
    markUnreadMessage,
} from '@core_modules/customer/services/graphql';
import { getLocalStorage, setLocalStorage } from '@helper_localstorage';
import { LIST_AUTO_TERMINATE_CHAT } from '@core_modules/customer/plugins/ChatContent/lib/constansta';
import useAutoTerminate from '@core_modules/customer/plugins/ChatContent/lib/useAutoTerminate';

const ChatContentCore = (props) => {
    const {
        // eslint-disable-next-line no-unused-vars
        Content, handleChatPdp = () => null, agentCode = '', agentName = '', initialMessage, getAgent = () => { },
        startChat = false, setStartChat = () => { }, customerData, customerLoading, msgsFirebase, toggleChat, t,
    } = props;
    const db = firebaseApp.firestore();
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState('');
    const [actionClear, setActionClear] = useState(false);
    const [msgs, setMsgs] = useState([]);
    const [msgFirebase, setMsgFirebase] = useState([]);
    const [searchUser, setSerchUser] = useState('');
    const [searchText, setSearchText] = useState('');
    const [firstLoad, setFirstLoad] = useState(true);
    // autoresponse
    const [isAutoResponse, setIsAutoResponse] = useState(false);
    const [autoResponseContent, setAutoResponseContent] = useState({});

    const customerEmail = customerData && customerData.customer && customerData.customer.email;
    const { data: blacklistStatus, loading: blacklistLoading } = getBlacklist({
        variables: {
            email: customerEmail,
        },
        skip: !customerEmail,
    });
    const { data, loading, refetch } = getSessionMessageList({
        variables: {
            customer_email: customerEmail,
        },
        skip: !customerEmail,
    });
    const [getMessage, { data: messageData, loading: loadingMessages }] = getMessageList();
    const [sendMessage, { loading: loadingSendMessage }] = addMessage();
    const [unreadMessage] = markUnreadMessage();

    // user data
    const sessionUserData = data && data.getSessionMessageList;

    const filteredUserResult = React.useMemo(() => {
        const combinedUserData = generateCombinedUser(sessionUserData, users);
        return filteredUser(searchUser, combinedUserData);
    }, [searchUser, users, sessionUserData]);

    // message data
    const magentoMessageData = messageData && messageData.getMessageList
     && messageData.getMessageList ? messageData.getMessageList : { messages: [] };
    const combinedMessageResult = useMemo(() => combinedMessagesData(magentoMessageData, msgFirebase),
        [magentoMessageData.messages.length, msgFirebase]);

    const combinedMessages = useMemo(() => generateGroupedMessages(combinedMessageResult), [combinedMessageResult.length, msgFirebase]);

    useEffect(() => {
        const messages = [...msgFirebase];
        for (let index = 0; index < msgs.length; index++) {
            const comingMessage = msgs[index];
            // eslint-disable-next-line eqeqeq
            const available = messages.findIndex((data) => data.uid == comingMessage.uid);
            if (available >= 0) {
                messages[available] = comingMessage;
            } else {
                messages.push(comingMessage);
            }
        }
        setMsgFirebase(messages);
    }, [msgs]);

    useAutoTerminate(filteredUserResult);
    // useSearch
    const changeSerchUser = (e) => {
        if (e.target.value === '') {
            setSerchUser('');
            setSearchText('');
        } else {
            setSearchText(e.target.value);
        }
    };

    const handleSeachUser = (e) => {
        e.preventDefault();
        setSerchUser(searchText);
    };

    // change unread messages to read messages when typing in form
    const onFocusDeleteRead = async (selectedChat) => {
        const adminReadChat = db.collection('messages').doc(selectedChat.chatId).collection('chat').where('is_customer_read', 'in', [0]);

        const selectedDoc = db.collection('messages').doc(selectedChat.chatId).collection('chat');

        const docReference = db.collection('messages').doc(selectedChat.chatId);

        await docReference.update({
            is_customer_read: 1,
        });

        adminReadChat.get().then(async (querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                batch.update(selectedDoc.doc(doc.id), { is_customer_read: 1 });
            });
            await batch.commit();
        });
    };

    const selectUserToChat = async (user) => {
        setChat('');
        setActionClear(false);
        setChat(user);

        const idChat = user.chatId;

        // mark unread message
        unreadMessage({
            variables: {
                chat_session_id: user.chat_session_id,
            },
        });

        // reference chat collection
        const chatReferance = db.collection('messages').doc(idChat).collection('chat').orderBy('createdAt', 'asc');

        // collection messages doc id chat reference
        const docReference = db.collection('messages').doc(idChat);

        // reference admin unread chat
        const adminUnreadChat = db
            .collection('messages')
            .doc(idChat)
            .collection('chat')
            // .where('is_admin_read', 'in', [0]);
            .where('is_customer_read', 'in', [0]);

        // reference read chat
        const adminReadChat = db
            .collection('messages')
            .doc(idChat)
            .collection('chat')
            // .where('is_admin_read', 'not-in', [0]);
            .where('is_admin_read', 'not-in', [0]);

        // select chat collection
        const selectUpdatedDoc = db.collection('messages').doc(idChat).collection('chat');

        // update messages doc id chat reference
        await docReference.update({
            // is_admin_read: 1,
            is_customer_read: 1,
        });

        // delete read message to replace with graphql
        adminReadChat.get().then(async (querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                batch.delete(selectUpdatedDoc.doc(doc.id));
            });
            await batch.commit();
        });

        // update unread message chat to read message chat
        adminUnreadChat.get().then(async (querySnapshot) => {
            const batch = db.batch();
            querySnapshot.forEach((doc) => {
                // batch.update(selectUpdatedDoc.doc(doc.id), { is_admin_read: 1 });
                batch.update(selectUpdatedDoc.doc(doc.id), { is_customer_read: 1 });
            });
            await batch.commit();
        });

        // listen incoming messages from collection chat
        chatReferance.onSnapshot((querySnapshot) => {
            const messages = [];
            querySnapshot.docs.forEach((doc) => {
                messages.push(doc.data());
            });
            setMsgs(messages);
        });

        // get message from grapql based on session id
        await getMessage({
            variables: {
                chat_session_id: user.chat_session_id,
            },
        });
        try {
            refetch();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    const clearChat = () => {
        setActionClear(true);
        setChat('');
    };

    // handle update activity
    const updateActivity = (chat_id) => {
        const list = getLocalStorage(LIST_AUTO_TERMINATE_CHAT);
        if (list && list[chat_id]) {
            list[chat_id].last_activity = new Date();
        }
        setLocalStorage(LIST_AUTO_TERMINATE_CHAT, list);
    };

    // submit chat
    const submitChat = async (data, chatPar = chat, response_question_id = null, isRobot = 0) => {
        const idChat = chatPar.chatId;
        // const chatReferance = db.collection('messages').doc(idChat).collection('chat');
        const docReference = db.collection('messages').doc(idChat);

        // customer has read and admin has not read
        await docReference.update({
            is_admin_read: 0,
            is_customer_read: 1,
        });

        // call update activity
        updateActivity(chatPar.chat_session_id);
        setIsAutoResponse(false);
        // send into magento
        sendMessage({
            variables: {
                body_message: data,
                chat_session_id: chatPar.chat_session_id,
                customer_email: chatPar.customer_email,
                // customer_id: parseInt(chat.customer_id),
                customer_name: chatPar.customer_name,
                is_robot: isRobot,
                agent_code: chatPar.agent_code,
                sender: 1,
                file: '',
                response_question_id,
            },
        }).then((response) => {
            if (
                response
                && response.data
                && response.data.addMessage
                && response.data.addMessage.auto_response
                && response.data.addMessage.auto_response.message
            ) {
                setIsAutoResponse(true);
                setAutoResponseContent(response.data.addMessage.auto_response);
            }
        });
    };

    const handleAutoTextSubmit = (ans) => {
        const messageText = ans.message;
        const responseQuestionId = ans.response_question_id && ans.response_question_id;

        const isRobot = 1;

        submitChat(messageText, chat, responseQuestionId, isRobot);
        setIsAutoResponse(false);
    };

    const handleDropFile = async (files) => {
        const { baseCode, file } = files[0];
        if ((file.size / 1000) > features.chatSystem.maxFileSizeUpload) {
            window.toastMessage({
                open: true,
                text: `Image file melebihi ${features.chatSystem.maxFileSizeUpload / 1000} Mb`,
                variant: 'error',
            });
        } else {
            const idChat = chat.chatId;
            const docReference = db.collection('messages').doc(idChat);

            // send into magento
            if (baseCode) {
                await docReference.update({
                    is_admin_read: 0,
                    is_customer_read: 1,
                });

                await sendMessage({
                    variables: {
                        body_message: '',
                        chat_session_id: chat.chat_session_id,
                        customer_email: chat.customer_email,
                        customer_name: chat.customer_name,
                        is_robot: 0,
                        agent_code: chat.agent_code,
                        sender: 1,
                        file: baseCode,
                    },
                });
            }
        }
    };

    const formik = useFormik({
        initialValues: {
            message: '',
        },
        validationSchema: Yup.object().shape({
            message: Yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            submitChat(values.message);
            resetForm();
        },
    });

    // get all list messeges
    useEffect(() => {
        let unsub = () => null;
        if (customerEmail) {
            const refereceUserDb = db.collection('messages').where('customer_email', 'in', [customerEmail]);
            unsub = refereceUserDb.onSnapshot((querySnapshot) => {
                const users = querySnapshot.docs.map((doc) => ({
                    chatId: doc.id,
                    ...doc.data(),
                }));
                setUsers(users);
            });
            // set customer chat status as online when the page is loaded
        }

        return unsub;
    }, [customerEmail]);

    /**
     * refetch if change agent
     *  */
    useEffect(() => {
        if (customerEmail || agentCode) {
            refetch();
        }
    }, [agentCode]);
    /**
     * select chat ketika
     * 1 tidak ada chat data default dan start chat
     * 2 firstload and have agent code
     *  */
    useEffect(() => {
        if ((initialMessage || !chat)
            && (firstLoad || (startChat && !chat)) && filteredUserResult.length > 0
            && customerEmail && agentCode && !actionClear) {
            const selectedChatPdp = filteredUserResult.filter((user) => user.chatId === `${customerEmail}-${agentCode}`);
            if (selectedChatPdp.length > 0) {
                selectUserToChat(selectedChatPdp[0]);
                if (initialMessage) {
                    const chatPar = {
                        ...selectedChatPdp[0],
                    };
                    submitChat(initialMessage, chatPar);
                }
                setFirstLoad(false);
            }
        }
    }, [initialMessage, firstLoad, customerEmail, agentCode, filteredUserResult, startChat]);

    return (
        <Content
            loading={loading || blacklistLoading || customerLoading}
            loadingMessages={loadingMessages}
            chat={chat}
            isBlacklisted={blacklistStatus ? blacklistStatus.getBlacklist.status : false}
            selectUserToChat={selectUserToChat}
            clearChat={clearChat}
            listUsers={filteredUserResult}
            onFocusDeleteRead={onFocusDeleteRead}
            db={db}
            messages={combinedMessages}
            formik={formik}
            changeSerchUser={changeSerchUser}
            searchText={searchText}
            handleSeachUser={handleSeachUser}
            handleDropFile={handleDropFile}
            customerEmail={customerEmail}
            isAutoResponse={isAutoResponse}
            handleAutoTextSubmit={handleAutoTextSubmit}
            autoResponseContent={autoResponseContent}
            handleChatPdp={handleChatPdp}
            getAgent={getAgent}
            agentCode={agentCode}
            startChat={startChat}
            setStartChat={setStartChat}
            loadingSendMessage={loadingSendMessage}
            msgsFirebase={msgsFirebase}
            toggleChat={toggleChat}
            t={t}
            {...props}
        />
    );
};

export default ChatContentCore;
