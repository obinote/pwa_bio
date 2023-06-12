/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { useEffect } from 'react';
import useStyles from '@core_modules/customer/plugins/ChatContent/components/style';
import User from '@core_modules/customer/plugins/ChatContent/components/User';
import ChatBot from '@core_modules/customer/plugins/ChatContent/components/ChatBot';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { getVendorLogo } from '@core_modules/customer/services/graphql';

const UserContainer = (props) => {
    const {
        t, chat, toggleChat, selectUserToChat, listUsers = [], db, changeSerchUser, searchText, handleSeachUser, msgsFirebase, getDistributor = () => {},
        chatBot,
    } = props;
    const styles = useStyles();
    const [getVendor, { data }] = getVendorLogo();
    useEffect(() => {
        if (listUsers.length > 0) {
            const vendorCode = [];
            listUsers.forEach((element) => {
                vendorCode.push(element.agent_code);
            });
            getVendor({
                variables: {
                    filter: {
                        company_code: {
                            in: [...vendorCode],
                        },
                    },
                },
            });
        }
    }, [listUsers.length]);

    return (
        <>

            <div className={styles.userMainTitle}>
                <h3>MedBiz Chat</h3>
                <div className="wrapper-button">
                    <button type="button" onClick={getDistributor}>{t('chat:chooseDistributor')}</button>
                    <div className="hidden-desktop closeWrapper" style={{ cursor: 'pointer' }} onClick={toggleChat}>
                        <CloseIcon className="mainCloseIcon" />
                    </div>
                </div>
            </div>

            <form className={styles.formUserSearch} onSubmit={handleSeachUser}>
                <TextField name="search" placeholder="Search user ..." className={styles.searchInput} value={searchText} onChange={changeSerchUser} />
                <Button type="submit" className={styles.searchButton}>
                    <SearchIcon
                        fontSize="small"
                        style={{
                            color: 'white',
                        }}
                    />
                </Button>
            </form>
            <div className={styles.overflowUser}>
                <ChatBot
                    chat={chatBot}
                    user="chat-bot"
                    selectUserToChat={selectUserToChat}
                />
                {listUsers && listUsers.length > 0 ? (
                    listUsers.map((user, i) => (
                        <User
                            key={i}
                            chat={chat}
                            user={user}
                            db={db}
                            selectUserToChat={selectUserToChat}
                            msgsFirebase={msgsFirebase}
                            logo={data && data.getMultipleImageSellerOms ? data.getMultipleImageSellerOms.items : []}
                        />
                    ))
                ) : (
                    <p className={styles.emptyText}>{t('chat:emptyUser')}</p>
                )}
            </div>
        </>
    );
};

export default UserContainer;
