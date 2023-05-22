import categoriesReducer from '../../store/reducers/categoriesSlice';
import { fetchCategories } from '../../store/store';

describe('test categories reducer', () => {
  const initialState = {
    categories: [],
    isLoading: false,
    isError: false,
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
      isLoading: false,
    });
  });
});
