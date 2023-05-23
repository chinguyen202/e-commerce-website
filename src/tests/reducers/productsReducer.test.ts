import productsReducer from '../../store/reducers/productsSlice';
import { fetchProducts } from '../../store/store';
import { ProductsState } from '../../types/Product';

describe('test products reducer functionality', () => {
  const initialState: ProductsState = {
    products: [],
    product: null,
    filterProducts: [],
    sortedProducts: [],
    isFilter: false,
    isSort: false,
    gridView: true,
    isLoading: false,
    isError: false,
    error: '',
    filterOptions: null,
    productsByCategory: [],
    categories: [],
  };
  it('Check initial state', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });
  it('Check if it handles fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const nextState = productsReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  it('Check if it handles fetchProducts.fulfilled', () => {
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
      type: fetchProducts.fulfilled.type,
      payload: mockPayload,
    };
    const nextState = productsReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      products: mockPayload,
    });
  });
  it('Check if it handles fetchProducts.rejected', () => {
    const action = {
      type: fetchProducts.rejected.type,
    };
    const nextState = productsReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      isError: true,
      error: nextState.error,
      isLoading: false,
    });
  });
});
