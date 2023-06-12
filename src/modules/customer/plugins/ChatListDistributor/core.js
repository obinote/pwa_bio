/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
    getAgentList, addActiveSession, createFirebaseDoc, getApprovedSellerList,
} from '@core_modules/customer/services/graphql';

const ChatAgentCore = (props) => {
    const {
        handleSelectAgent, cancelGetAgent, customerData, Content,
    } = props;
    const [setActiveSession] = addActiveSession();
    const { data, loading } = getAgentList();
    const { data: approvedAgent, loading: loadingAppoved } = getApprovedSellerList();

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
        cancelGetAgent();
    };

    return (
        <Content
            closeChat={closeChat}
            agent={data}
            approvedAgent={approvedAgent}
            loadingAgent={loading || loadingAppoved}
            handleNewChat={handleNewChat}
        />
    );
};

export default ChatAgentCore;
