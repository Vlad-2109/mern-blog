export interface SignUpForm {
  username: string;
  email: string;
  password: string;
}

export interface ISignUpData {
  username: string;
  email: string;
  password: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface UpdateForm {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
}

export interface IUpdateUser {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
}

export interface IUpdateUserResponse {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface IGoogleData {
  name: string | null;
  email: string | null;
  googlePhotoUrl: string | null;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface PrivateRouteProps {
  children: React.ReactNode;
}
