import createEventBus from '@helpers/EventBus';

const cartEventBus = createEventBus();

export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';

export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

export default cartEventBus;
