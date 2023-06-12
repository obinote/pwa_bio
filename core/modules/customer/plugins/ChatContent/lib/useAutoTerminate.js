import { useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '@helper_localstorage';
import { LIST_AUTO_TERMINATE_CHAT } from '@core_modules/customer/plugins/ChatContent/lib/constansta';
import {
    terminateSession,
} from '@core_modules/customer/services/graphql';
import {
    features,
} from '@config';

let terminateInterfal = null;

const useAutoTerminate = (filteredUserResult) => {
    const [terminateSessionChat] = terminateSession();
    /**
     * auto terminate if more than config
     */
    useEffect(() => {
        const time = features.chatSystem.autoTerminate * 60; // seconds
        if (terminateInterfal) {
            clearInterval(terminateInterfal);
        }
        terminateInterfal = setInterval(() => {
            const list = getLocalStorage(LIST_AUTO_TERMINATE_CHAT);
            if (list) {
                Object.keys(list).forEach((key) => {
                    const element = list[key];
                    const lastActiviy = (new Date() - new Date(element.last_activity)) / 1000;
                    if (lastActiviy > time) {
                        terminateSessionChat({
                            variables: {
                                chat_id: element.chat_session_id,
                            },
                        }).then(() => {
                            delete list[element.chat_session_id];
                            setLocalStorage(LIST_AUTO_TERMINATE_CHAT, list);
                        });
                    }
                });
            }
        }, [time * 1000]);
    }, []);

    /**
     * add message to local storage with auto terminate to check if no activity
     */

    useEffect(() => {
        const list = getLocalStorage(LIST_AUTO_TERMINATE_CHAT);
        if (filteredUserResult && filteredUserResult.length > 0) {
            const tempData = list || {};
            // eslint-disable-next-line no-plusplus
            for (let index = 0; index < filteredUserResult.length; index++) {
                const element = filteredUserResult[index];
                // eslint-disable-next-line eqeqeq
                if (element.auto_terminate && (element.is_terminate == '0' || !element.is_terminate)) {
                    tempData[element.chat_session_id] = {
                        last_activity: tempData[element.chat_session_id] && tempData[element.chat_session_id].last_activity
                            ? tempData[element.chat_session_id].last_activity : new Date(),
                        chat_session_id: element.chat_session_id,
                        is_terminate: element.is_terminate,
                    };
                }
            }
            setLocalStorage(LIST_AUTO_TERMINATE_CHAT, tempData);
        }
    }, [filteredUserResult]);

    return 'success';
};

export default useAutoTerminate;
