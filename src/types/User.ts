export interface User {
  id: string;
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

export interface UpdateUserData extends LoginData {
  id: number;
}

export interface RegisterData extends LoginData {
  name: string;
  avatar: string;
}

export interface UserState {
  token: string | null;
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
}
