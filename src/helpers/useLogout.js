import { getCustomer, removeToken } from '@core_modules/theme/services/graphql';
import firebase from 'firebase/app';
import firebaseApp from '@lib_firebase/index';
import 'firebase/firestore';
import Cookies from 'js-cookie';
import { removeIsLoginFlagging } from '@helper_auth';
import { removeCartId } from '@helpers/cartId';
import { removeCookies } from '@helper_cookies';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { custDataNameCookie, features } from '@config';
import { localCompare, localTotalCart } from '@services/graphql/schema/local';

export default function useLogout() {
    const client = useApolloClient();
    const [deleteTokenGql] = removeToken();
    const { data: customer } = getCustomer();
    const router = useRouter();

    const setOfflineStatus = async () => {
        if (!customer?.customer?.email) return;
        const db = firebaseApp.firestore();
        // set customer as offline
        const updateStatus = async () => {
            const docReference = db.collection('status').doc(customer.customer.email);
            await docReference.update({ status: '0' });
        };
        await updateStatus();
    };

    const logout = async () => {
        window.backdropLoader(true);
        await setOfflineStatus();
        if (features.firebase.config.apiKey && features.firebase.config.apiKey !== '') {
            await firebase.auth().signOut().then(() => {
                // Sign-out successful.
            }).catch(() => {
                // An error happened.
            });
        }
        await deleteTokenGql()
            .then(() => {
                Cookies.remove(custDataNameCookie);
                removeIsLoginFlagging();
                removeCartId();
                removeCookies('uid_product_compare');
                client.writeQuery({ query: localTotalCart, data: { totalCart: 0 } });
                client.writeQuery({ query: localCompare, data: { item_count: 0 } });
            })
            .finally(() => {
                window.backdropLoader(false);
                router.push('/customer/account/login');
            });
    };

    return logout;
}
