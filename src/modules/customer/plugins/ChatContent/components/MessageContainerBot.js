/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-unused-expressions */
import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from '@core_modules/customer/plugins/ChatContent/components/style';
import AutoCompleteAction from '@core_modules/customer/plugins/ChatContent/components/AutoCompleteAction';

const MessageContainer = (props) => {
    const {
        clearChat,
        toggleChat,
        handleAutoTextSubmit,
        getAgent,
        getDistributor,
    } = props;
    const styles = useStyles();
    const ansDefault = {
        message: 'Halo Ada yang bisa kami bantu',
        answer: [
            {
                message: '<pwa type="start-with-cs">Bicara dengan CS</pwa>',
                answer_id: 4,
            },
            {
                message: '<pwa type="start-with-distributor">Bicara dengan Distributor</pwa>',
                answer_id: 5,
            },
            {
                message: '<pwa type="link" href="/contact">Ajukan Komplain</pwa>',
                answer_id: 9,
            },
        ],
    };

    return (
        <>
            <div className={styles.selectedUser}>
                <div className={styles.userImageWrapper}>
                    <div className={classNames(styles.userBackIcon, 'hidden-desktop')} onClick={clearChat}>
                        <ArrowBackIosIcon />
                    </div>

                    <div onClick={clearChat} className={styles.selectedUserImage}>
                        <Image
                            src="/assets/img/round_logo.png"
                            alt="Picture of the chat"
                            width={150}
                            height={150}
                        />
                    </div>
                </div>
                <div className={styles.userText}>
                    <div className={styles.userName}>Chat Bot</div>
                    <div className={styles.userLastMessage}>
                        Online
                    </div>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={toggleChat}>
                    <CloseIcon />
                </div>
            </div>
            <div className={styles.messageContent}>
                <div className={styles.autoResponseWrapper}>
                    <div className={styles.autoResponseTitle}>
                        <span>{ansDefault.message}</span>
                    </div>
                    <div className={styles.autoResponseBody}>
                        {ansDefault.answer.map((ans) => (
                            <AutoCompleteAction
                                ans={ans}
                                handleAutoTextSubmit={handleAutoTextSubmit}
                                getAgent={getAgent}
                                getDistributor={getDistributor}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MessageContainer;
