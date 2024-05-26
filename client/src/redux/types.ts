export interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface UserState {
  currentUser: null | User;
  error: null | string;
  loading: boolean;
}
