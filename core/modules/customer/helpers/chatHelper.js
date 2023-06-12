/* eslint-disable no-case-declarations */
/* eslint-disable consistent-return */
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

// https://stackoverflow.com/questions/61237564/how-can-i-show-days-by-group-like-whatsapp-chat-screen
const groupedDays = (messages) => {
    if (messages && messages.length > 0) {
        const dataTest = messages.reduce((acc, el) => {
            const messageDay = dayjs(el.createdAt).format('YYYY-MM-DD');
            if (acc[messageDay]) {
                return {
                    ...acc,
                    [messageDay]: acc[messageDay].concat([el]),
                };
            }
            return {
                ...acc,
                [messageDay]: [el],
            };
        }, {});

        return dataTest;
    }
};

export const generateGroupedMessages = (messages) => {
    if (messages && messages.length > 0) {
        const days = groupedDays(messages);
        const sortedDays = Object.keys(days).sort(
            (x, y) => dayjs(x, 'YYYY-MM-DD').unix() - dayjs(y, 'YYYY-MM-DD').unix(),
        );
        const items = sortedDays.reduce((acc, date) => {
            const sortedMessages = days[date].sort(
                (x, y) => new Date(y.created_at) - new Date(x.created_at),
            );
            return acc.concat([{ type: 'day', date, id: date }, ...sortedMessages]);
        }, []);
        return items;
    }
    return [];
};

export const relativeTimeFrom = (date) => {
    if (date) {
        return dayjs(date).fromNow(true);
    }
    return '';
};

export const generateCombinedUser = (sessionMessage, firebaseMessage) => {
    const mergedDataUser = [];
    if (sessionMessage && firebaseMessage) {
        sessionMessage.forEach((session) => {
            if (session.agent_code) {
                // let available = false; di comment dulu karena belum di buthkan
                firebaseMessage.forEach((firebase) => {
                    const decodedParams = new URLSearchParams(`?email=${session.customer_email}`);
                    // if (`${session.customer_id}-${session.agent_code}` === firebase.chatId) {
                    if (`${decodedParams.get('email')}-${session.agent_code}` === firebase.chatId) {
                        // available = true;
                        const data = {
                            ...firebase,
                            // agent_code: firebase.seller_code,
                            // agent_name: firebase.seller_name,
                            // chat_session_id: session.chat_session_id,
                            agent_name: session.agent_name,
                            chat_session_id: session.chat_id,
                            updated_at: session.updated_at,
                            lastMessage: session.last_message,
                            auto_terminate: session.auto_terminate,
                        };
                        mergedDataUser.push(data);
                    }
                });
                // if (!available) {
                //     mergedDataUser.push(session);
                // }
            }
        });
    }
    return mergedDataUser;
};

export const combinedMessagesData = (magentoMsg, firebaseMsg) => {
    let combinedResult = [];
    if (magentoMsg && firebaseMsg) {
        const magentoData = [];
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < magentoMsg.messages.length; index++) {
            const message = magentoMsg.messages[index];
            // eslint-disable-next-line radix
            const availableinFirebase = firebaseMsg.find((firebase) => parseInt(firebase.uid) === message.message_id);
            if (!availableinFirebase) {
                magentoData.push({
                    message_id: message.message_id,
                    createdAt: message.created_at,
                    text: message.body_message,
                    is_customer_message: message.sender === 1 ? 'True' : 'False',
                    is_robot: message.is_robot === 1,
                    customer_name: message.sender,
                    agent_name: message.sender,
                    is_admin_read_db: message.is_read === '1',
                    is_customer_read: message.is_read_customer === '1',
                    customer_id: magentoMsg.customer_id,
                    customer_email: magentoMsg.customer_email,
                    agent_code: magentoMsg.agent_code,
                    filename: message.filename,
                    filetype: message.filetype,
                    type_magento: 'magento',
                    url_data: message.url_data,
                });
            }
        }
        combinedResult = [
            ...magentoData,
            ...firebaseMsg,
        ];
    }
    return combinedResult;
};

export const filteredUser = (keyword, users) => {
    if (users && users.length > 0) {
        if (keyword && keyword.length > 2) {
            return users.filter(
                (user) => {
                    const agentName = user.agent_name.toLowerCase();
                    const customerName = user.customer_name.toLowerCase();
                    if (agentName.includes(keyword.toLowerCase()) || customerName.includes(keyword.toLowerCase())) {
                        return true;
                    }
                    return false;
                },
            );
        }
        return users;
    }
    return [];
};

export const initialName = (name) => {
    const splitName = name.split(' ');
    switch (splitName.length) {
    case 1:
        return splitName[0].substring(0, 1).toUpperCase();
    default:
        const firstName = splitName[0].substring(0, 1).toUpperCase();
        const secondName = splitName[1].substring(0, 1).toUpperCase();
        return firstName + secondName;
    }
};

export const getUrlFilename = (url) => {
    let filename = url;

    const parsedUrl = url.split('/');
    if (parsedUrl.length) {
        filename = parsedUrl[parsedUrl.length - 1];
    }

    return filename;
};
