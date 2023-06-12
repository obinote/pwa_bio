/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '@core_modules/customer/plugins/ChatListDistributor/components/style';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from '@i18n';

const DistributorView = (props) => {
    const {
        closeChat, loadingAgent, agent, handleNewChat, approvedAgent,
    } = props;
    const styles = useStyles();
    const { t } = useTranslation(['chat']);
    const generateAgent = () => {
        const agentList = [];
        agent.getAgentList.forEach((agn) => {
            const available = approvedAgent.getApprovedSellerListCustomerLogin.findIndex((data) => agn.agent_code == data.vendor_code);
            if (available >= 0) {
                agentList.push(agn);
            }
        });

        return agentList.map((data) => (
            <div className={styles.listContainer}>
                <p className={styles.listAgentName}>
                    {data.agent_name}
                </p>
                <IconButton
                    type="button"
                    key={data.agent_id}
                    onClick={() => handleNewChat(data.agent_code, data.agent_name)}
                    className={styles.buttonStartChat}
                >
                    <img src="/assets/img/send-icon.svg" alt="send" className={styles.distributorSendIcon} />
                </IconButton>
            </div>
        ));
    };
    return (
        <div className={styles.container}>
            <div className={styles.chatWrapper} style={{ overflowY: 'scroll' }}>

                <div className={styles.topBar}>
                    <div className={styles.userBackIcon} onClick={closeChat}>
                        <ArrowBackIosIcon />
                    </div>
                    <div onClick={closeChat}>
                        <h4 className={styles.chatTitle}>{t('chat:chooseDistributorList')}</h4>
                    </div>
                    <div onClick={closeChat}>
                        <CloseIcon className={styles.userCloseIcon} />
                    </div>
                </div>

                <div className={styles.listSeller}>
                    {loadingAgent ? (
                        <div className={styles.loadingAgentWrapper}>
                            <CircularProgress />
                        </div>
                    ) : generateAgent()}
                </div>

            </div>
        </div>
    );
};

export default DistributorView;
