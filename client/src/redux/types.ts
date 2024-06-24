export interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  isAdmin?: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface UserState {
  currentUser: null | User;
  error: null | string;
  loading: boolean;
}

export interface ThemeState {
  theme: 'light' | 'dark';
}
