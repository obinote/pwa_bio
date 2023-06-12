/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import firebaseApp from '@lib_firebase/index';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';
import ChatContent from '@core_modules/customer/plugins/ChatContent';
import ChatAgent from '@core_modules/customer/plugins/ChatAgent';
import ChatLoading from '@core_modules/customer/plugins/ChatContent/components/ChatLoading';
import {
    addActiveSession, getCustomerSettings, createFirebaseDoc,
} from '@core_modules/customer/services/graphql';
import useStyles from '@core_modules/customer/plugins/ChatContent/components/style';

const ChatPluginCore = (props) => {
    const { customerData, customerLoading, t } = props;
    const styles = useStyles();
    const db = firebaseApp.firestore();
    const [requestAgent, setRequestAgent] = React.useState(false);
    const [msgs, setMsgs] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [startChat, setStartChat] = React.useState(false);
    const [agent, setAgent] = React.useState({ agentName: props.agentName, agentCode: props.agentCode } || { agentCode: '', agentName: '' });
    const [setActiveSession] = addActiveSession();
    const [createFirebaseMsg] = createFirebaseDoc();

    const customerEmail = customerData && customerData.customer && customerData.customer.email;
    const customerName = customerData && customerData.customer
        ? `${customerData.customer.firstname} ${customerData.customer.lastname}` : '';

    const getAgent = () => {
        setRequestAgent(true);
    };
    const handleSelectAgent = (agentData) => {
        setRequestAgent(false);
        setStartChat(true);
        setAgent(agentData);
    };
    const cancelGetAgent = () => {
        setRequestAgent(false);
        setStartChat(false);
    };

    const toggleChat = () => {
        setStartChat(!startChat);
        setAgent({ agentCode: '', agentName: '' });
    };

    /**
     * create global function to start chat
     * data need like state agent
     * example: { agentCode: '', agentName: '' , initialMessage: 'example initial message'}
     */
    const createCallFunction = () => {
        window.startChat = (data) => {
            setLoading(true);
            setStartChat(true);
            createFirebaseMsg({
                variables: {
                    agent_code: data.agentCode,
                    agent_name: data.agentName,
                    customer_email: customerEmail,
                    customer_name: customerName,
                },
            }).then(async () => {
                setActiveSession({
                    variables: {
                        agent_code: data.agentCode,
                        customer_email: customerEmail,
                    },
                }).then((response) => {
                    if (response && response.data && response.data.addActiveSession && response.data.addActiveSession.status === 'success') {
                        setTimeout(() => {
                            setLoading(false);
                            if (data) {
                                handleSelectAgent(data);
                            }
                        }, 500);
                    } else {
                        setLoading(false);
                        window.toastMessage({
                            open: true,
                            variant: 'warning',
                            text: 'Failed to start Chat',
                        });
                    }
                });
            }).catch(() => {
                setLoading(false);
                setStartChat(false);
                window.toastMessage({
                    open: true,
                    variant: 'warning',
                    text: 'Failed to start Chat',
                });
            });
        };
    };

    const handleTabClose = async () => {
        // set customer as offline
        const updateStatus = async () => {
            const docReference = db.collection('status').doc(customerEmail);
            await docReference.update({
                status: '0',
            });
        };
        // eslint-disable-next-line no-console
        await updateStatus().catch((e) => console.log(e));
    };

    useEffect(() => {
        let unsub = () => null;
        if (customerEmail) {
            createCallFunction();
            const refereceUserDb = db.collection('messages');
            const customerQuery = refereceUserDb.where('is_customer_read', 'in', ['0']).where('customer_email', '==', customerEmail);
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

            (async () => {
                // set customer as online
                const statusDoc = await db.collection('status').doc(customerEmail).get();
                if (statusDoc && statusDoc.exists) {
                    // update status doc if exist
                    await statusDoc.ref.update({
                        status: '1',
                    });
                } else {
                    // create status doc if not exist
                    await statusDoc.ref.set({
                        status: '1',
                    });
                }
            })();
        }

        return unsub;
    }, [customerEmail]);

    useEffect(() => {
        if (msgs && msgs.length > 0 && typeof window !== 'undefined') {
            if (Notification.permission !== 'granted') {
                Notification.requestPermission();
            } else {
                // eslint-disable-next-line no-new
                new Notification('New Messages', {
                    icon: '/assets/img/pwa.png',
                    body: `you have ${msgs.length} messages`,
                });
            }
        }
    }, [msgs]);

    /**
     * handle if close tabs and set status offline
     */
    useEffect(() => {
        const unloadCallback = () => {
            handleTabClose();
        };

        window.addEventListener('beforeunload', unloadCallback, { capture: true });
        return () => window.removeEventListener('beforeunload', unloadCallback, { capture: true });
    }, []);

    if (!startChat) {
        return (
            <div className={styles.chatPlugin}>
                <Fab color="primary" size="medium" onClick={() => toggleChat()} className={styles.buttonChat}>
                    { msgs && msgs.length > 0 ? (
                        <Badge badgeContent={msgs.length} color="error" className={styles.indexBadge} max={99}>
                            <ChatIcon className={styles.chatIcon} />
                        </Badge>
                    ) : (
                        <ChatIcon className={styles.chatIcon} />
                    )}
                </Fab>
            </div>
        );
    }

    if (loading) {
        return <ChatLoading />;
    }
    return (
        <>
            {requestAgent ? (
                <ChatAgent
                    handleSelectAgent={handleSelectAgent}
                    cancelGetAgent={cancelGetAgent}
                    customerData={customerData}
                    customerLoading={customerLoading}
                    t={t}
                />
            )
                : (
                    <ChatContent
                        {...props}
                        getAgent={getAgent}
                        agentName={agent.agentName}
                        agentCode={agent.agentCode}
                        initialMessage={agent.initialMessage}
                        startChat={startChat}
                        setStartChat={setStartChat}
                        customerData={customerData}
                        customerLoading={customerLoading}
                        msgsFirebase={msgs}
                        toggleChat={toggleChat}
                        t={t}
                    />
                )}
        </>
    );
};

const ChatPlugin = (props) => {
    const { data: customerData, loading: customerLoading } = getCustomerSettings();
    if (customerLoading) {
        return null;
    }
    return <ChatPluginCore customerData={customerData} customerLoading={customerLoading} {...props} />;
};

export default ChatPlugin;
