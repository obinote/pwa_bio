import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { getLoginInfo } from '@helper_auth';
import { getCartCustom } from '@core_modules/cart/services/graphql/schema';
import { EventBus, ADD_TO_CART, DELETE_FROM_CART } from './EventBus';

// -- FOR NOW, THIS IS UNSAFE TO BE USED IN MULTIPLE COMPONENTS. IT WILL
// -- CAUSE MULTIPLE FETCHES
// The goal of this function is to check if the cart has items in it. It should
// only fetch the cart if it doesn't already have the data in the cache, so
// using this in many different components should not trigger multiple fetches.
// It updates when ADD_TO_CART or DELETE_FROM_CART events are emitted.
export default function useHasItemsInCart() {
    const [hasItemsInCart, setHasItemsInCart] = useState(false);
    const client = useApolloClient();

    async function update() {
        if (!getLoginInfo()) setHasItemsInCart(false);
        else {
            try {
                const res = await client.query({
                    query: getCartCustom,
                    variables: { vendor_code: '' },
                    context: { request: 'internal' },
                    fetchPolicy: 'no-cache',
                });
                const hasItems = res.data.customerQuotes.length > 0;
                setHasItemsInCart(hasItems);
            } catch (e) {
                // console.log(e);
            }
        }
    }

    useEffect(() => {
        const unsubscribeAdd = EventBus.on(ADD_TO_CART, update);
        const unsubscribeDelete = EventBus.on(DELETE_FROM_CART, update);

        update();

        return () => {
            unsubscribeAdd();
            unsubscribeDelete();
        };
    }, []);

    return hasItemsInCart;
}
