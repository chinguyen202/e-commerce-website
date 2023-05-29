export interface User {
  id: number;
  name: string;
  role: 'admin' | 'customer';
  email: string;
  password: string;
  avatar: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UpdateUserData {
  id: number;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface RegisterData extends LoginData {
  name: string;
  avatar: string;
}

export interface UserState {
  token?: string;
  isAuth: boolean;
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
}
