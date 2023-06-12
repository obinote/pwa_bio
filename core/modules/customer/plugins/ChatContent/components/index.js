/* eslint-disable no-new */
import ChatWrapper from '@core_modules/customer/plugins/ChatContent/components/ChatWrapper';
import React from 'react';
import ChatLoading from '@core_modules/customer/plugins/ChatContent/components/ChatLoading';

const Content = (props) => {
    const {
        chat,
        isBlacklisted,
        loading,
        loadingMessages,
        selectUserToChat,
        clearChat,
        listUsers,
        db,
        messages,
        formik,
        changeSerchUser,
        searchText,
        handleSeachUser,
        onFocusDeleteRead,
        handleDropFile,
        isAutoResponse,
        handleAutoTextSubmit,
        autoResponseContent,
        msgsFirebase,
        getAgent,
        startChat,
        loadingSendMessage = false,
        toggleChat = () => {},
        t,
    } = props;
    if (loading) {
        return <ChatLoading />;
    }

    return (
        <ChatWrapper
            loading={loading}
            loadingMessages={loadingMessages}
            chat={chat}
            isBlacklisted={isBlacklisted}
            selectUserToChat={selectUserToChat}
            clearChat={clearChat}
            listUsers={listUsers}
            onFocusDeleteRead={onFocusDeleteRead}
            db={db}
            messages={messages}
            formik={formik}
            changeSerchUser={changeSerchUser}
            searchText={searchText}
            handleSeachUser={handleSeachUser}
            toggleChat={toggleChat}
            handleDropFile={handleDropFile}
            isAutoResponse={isAutoResponse}
            handleAutoTextSubmit={handleAutoTextSubmit}
            autoResponseContent={autoResponseContent}
            getAgent={getAgent}
            startChat={startChat}
            msgsFirebase={msgsFirebase}
            loadingSendMessage={loadingSendMessage}
            t={t}
            {...props}
        />
    );
};

export default Content;
