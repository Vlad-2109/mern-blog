import { instance } from '../api/axios.api';
import { User } from '../redux/types';
import { IGoogleData, ISignInData, ISignUpData } from '../types/types';

export const AuthService = {
  async signUp(userData: ISignUpData): Promise<string> {
    const { data } = await instance.post<string>('api/auth/signup', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },

  async signIn(userData: ISignInData): Promise<User> {
    const { data } = await instance.post<User>('api/auth/signin', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },

  async google(userData: IGoogleData): Promise<User> {
    const { data } = await instance.post<User>('api/auth/google', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },
};
