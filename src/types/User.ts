export interface User {
  id: string;
  name: string;
  role: 'admin' | 'customer';
  email: string;
  password: string;
  avatar: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserInitialState {
  user: string | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
