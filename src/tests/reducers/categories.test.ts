import categoriesReducer from '../../store/reducers/categoriesSlice';
import { fetchCategories } from '../../store/store';
import fetchProductsByCategory from '../../store/thunks/fetchProductsByCategory';

describe('test categories reducer', () => {
  const initialState = {
    categories: [],
    productsByCategory: [],
    isLoading: false,
    isError: false,
    error: '',
  };
  it('Check initial state', () => {
    expect(categoriesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });
  it('Check if it handles fetchCategories.pending', () => {
    const action = { type: fetchCategories.pending.type };
    const categoriesState = categoriesReducer(initialState, action);
    expect(categoriesState).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  it('Check if it handles fetchCategories.fulfilled', () => {
    const mockPayload = [
      {
        id: 1,
        name: 'Clothes',
        image: 'https://api.lorem.space/image/fashion?w=640&h=480&r=4278',
      },
    ];
    const action = {
      type: fetchCategories.fulfilled.type,
      payload: mockPayload,
    };
    const categoriesState = categoriesReducer(initialState, action);
    expect(categoriesState).toEqual({
      ...initialState,
      isLoading: false,
      categories: mockPayload,
    });
  });
  it('Check if it handles fetchCategories.rejected', () => {
    const action = {
      type: fetchCategories.rejected.type,
    };
    const categoriesState = categoriesReducer(initialState, action);
    expect(categoriesState).toEqual({
      ...initialState,
      isError: true,
      error: categoriesState.error,
      isLoading: false,
    });
  });
  it('Check if it handles fetchProductsByCategory.pending', () => {
    const action = { type: fetchProductsByCategory.pending.type };
    const nextState = categoriesReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  it('Check if it handles fetchProductsByCategory.fulfilled', () => {
    const mockPayload = [
      {
        id: 4,
        title: 'Handmade Fresh Table',
        price: 687,
        description: 'Andy shoes are designed to keeping in...',
        category: {
          id: 1,
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
      type: fetchProductsByCategory.fulfilled.type,
      payload: mockPayload,
    };
    const nextState = categoriesReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      productsByCategory: mockPayload,
    });
  });
  it('Check if it handles fetchProductsByCategory.rejected', () => {
    const action = {
      type: fetchProductsByCategory.rejected.type,
    };
    const nextState = categoriesReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      isError: true,
      error: nextState.error,
      isLoading: false,
    });
  });
});
