import productReducer from '../../store/reducers/productSlice';
import fetchSingleProduct from '../../store/thunks/fetchSingleProduct';

describe('test single product reducer functionality', () => {
  const initialState = {
    product: null,
    isLoading: false,
    isError: false,
    error: '',
  };
  it('check if initial state return correct', () => {
    expect(productReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });
  it('Check if it handles fetchSingleProduct.pending', () => {
    const action = { type: fetchSingleProduct.pending.type };
    const nextState = productReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  it('Check if it handles fetchSingleProduct.fulfilled', () => {
    const mockPayload = [
      {
        id: 4,
        title: 'Handmade Fresh Table',
        price: 687,
        description: 'Andy shoes are designed to keeping in...',
        category: {
          id: 5,
          name: 'Others',
          image: 'https://placeimg.com/640/480/any?r=0.591926261873231',
        },
        images: [
          'https://placeimg.com/640/480/any?r=0.9178516507833767',
          'https://placeimg.com/640/480/any?r=0.9300320592588625',
          'https://placeimg.com/640/480/any?r=0.8807778235430017',
        ],
      },
    ];
    const action = {
      type: fetchSingleProduct.fulfilled.type,
      payload: mockPayload,
    };
    const nextState = productReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      product: mockPayload,
    });
  });
  it('Check if it handles fetchProducts.rejected', () => {
    const action = {
      type: fetchSingleProduct.rejected.type,
    };
    const nextState = productReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      isError: true,
      error: nextState.error,
      isLoading: false,
    });
  });
});
