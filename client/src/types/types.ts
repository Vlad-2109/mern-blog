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
