import userReducer from '../../store/reducers/userSlice';

import { getCartFromStorage } from '../../utils/localStorage';
import cartReducer from '../../store/reducers/cartSlice';

describe('cart reducer functionality', () => {
  const initialState = {
    cartItems: getCartFromStorage() ?? null,
    total: 0,
    totalAmount: 0,
    isLoading: false,
  };
  it('Check initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});
