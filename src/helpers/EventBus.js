/* eslint-disable no-unused-expressions, no-bitwise */

export default function createEventBus(config) {
    const bus = {};

    const off = (key, handler) => {
        const index = bus[key]?.indexOf(handler) ?? -1;
        bus[key]?.splice(index >>> 0, 1);
    };

    const on = (key, handler) => {
        if (!bus[key]) bus[key] = [];
        bus[key]?.push(handler);
        return () => {
            off(key, handler);
        };
    };

    const emit = (key, ...payload) => {
        bus[key]?.forEach((handler) => {
            try {
                handler(...payload);
            } catch (e) {
                config?.onError(e);
            }
        });
    };

    const once = (key, handler) => {
        const handleOnce = (...payload) => {
            handler(payload);
            off(key, handleOnce);
        };
        on(key, handleOnce);
    };

    return {
        on, off, emit, once,
    };
}

export const EventBus = createEventBus();

export const ADD_TO_CART = 'ADD_TO_CART';

export const DELETE_FROM_CART = 'DELETE_FROM_CART';
