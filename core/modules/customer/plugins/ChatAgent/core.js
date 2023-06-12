/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '@core_modules/customer/plugins/ChatAgent/components/style';
import {
    getAgentList, addActiveSession, createFirebaseDoc,
} from '@core_modules/customer/services/graphql';
import Button from '@material-ui/core/Button';

const ChatAgentCore = (props) => {
    const {
        handleSelectAgent, cancelGetAgent, customerData, t,
    } = props;
    const [loadingStart, setLoadingStart] = useState(false);
    const [resAgent, setRestAgent] = useState({
        agentName: '',
    });
    const intervalId = null;
    const [setActiveSession] = addActiveSession();
    const {
        data, refetch, error, loading,
    } = getAgentList({
        fetchPolicy: 'no-cache',
        notifyOnNetworkStatusChange: true,
        variables: {
            role: 'cs',
        },
    });
    const [createFirebaseMsg] = createFirebaseDoc();
    const customerEmail = customerData && customerData.customer && customerData.customer.email;
    const customerName = customerData && customerData.customer ? `${customerData.customer.firstname} ${customerData.customer.lastname}` : '';
    const customerWhatsappNumber = customerData && customerData.customer && customerData.customer.whatsapp_number;
    const handleNewChat = async (agentCode, agentName) => {
        createFirebaseMsg({
            variables: {
                agent_code: agentCode,
                agent_name: agentName,
                customer_email: customerEmail,
                customer_name: customerName,
                phone_number: customerWhatsappNumber,
            },
        }).then(async () => {
            setActiveSession({
                variables: {
                    agent_code: agentCode,
                    customer_email: customerEmail,
                },
            }).then((response) => {
                setLoadingStart(false);
                if (response.data.addActiveSession) {
                    handleSelectAgent({
                        agentCode,
                        agentName,
                    });
                }
            });
        });
    };

    const closeChat = () => {
        clearInterval(intervalId);
        cancelGetAgent();
    };

    useEffect(() => {
        if (error) {
            window.toastMessage({
                open: true,
                variant: 'error',
                text: 'Failed to get customer service',
            });
            closeChat();
        }
        if (data && data.getAgentList && !loadingStart) {
            setLoadingStart(true);
            const randNum = Math.floor(Math.random() * data.getAgentList.length);
            const agent = data.getAgentList[randNum];
            if (agent) {
                const agentCode = agent.agent_code.toString();
                const agentName = agent.agent_name;
                setRestAgent({
                    agentName,
                });
                setTimeout(() => {
                    handleNewChat(agentCode, agentName);
                }, 1000);
            }
        }
    }, [data, error]);

    const styles = useStyles();
    return (
        <div className={styles.container}>
            <div className={styles.chatWrapper}>
                <div className={styles.closeGetAgent}>
                    <div style={{ cursor: 'pointer' }} onClick={closeChat}>
                        <CloseIcon />
                    </div>
                </div>
                <div className={styles.loadingAgentWrapper}>
                    {loadingStart && (data && data.getAgentList && data.getAgentList.length > 0) ? (
                        <div className={styles.failedGetAgent}>
                            <p>
                                {t('common:chat:findagent:messageSuccess')}
                                {' '}
                                {resAgent.agentName}
                            </p>
                            <CircularProgress />
                        </div>
                    ) : null}
                    {loading ? <CircularProgress /> : null}
                    {(error || (data && data.getAgentList && data.getAgentList.length === 0)) && !loading ? (
                        <div className={styles.failedGetAgent}>
                            <p>{t('common:chat:findagent:messageFailed')}</p>
                            <Button
                                className={styles.messageButton}
                                type="button"
                                onClick={() => {
                                    refetch();
                                }}
                            >
                                {t('common:chat:findagent:retry')}

                            </Button>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default ChatAgentCore;
