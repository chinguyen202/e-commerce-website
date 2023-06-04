import userReducer from '../../store/reducers/userSlice';
import { fetchAllUsers } from '../../store/store';
import customFetch from '../../utils/axios';
import { UserState } from '../../types/User';
import { getTokenFromStorage } from '../../utils/localStorage';

describe('user reducer functionality', () => {
  const initialState: UserState = {
    isAuth: getTokenFromStorage() ? true : false,
    users: [],
    isLoading: false,
    currentUser: null,
  };

  const userResponse = [
    {
      id: 1,
      email: 'john@mail.com',
      password: 'changeme',
      name: 'Jhon',
      role: 'customer',
      avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=867',
    },
  ];
  it('Check initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
  it('Check if it handle fetchAllUsers.pending', () => {
    const action = { type: fetchAllUsers.pending };
    const nextState = userReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      isLoading: true,
    });
  });
  it('Check if it handle fetchAllUser sucsess', () => {
    const action = { type: fetchAllUsers.fulfilled, payload: userResponse };
    const nextState = userReducer(initialState, action);
    expect(nextState).toEqual({
      ...initialState,
      users: userResponse,
    });
  });
});
