import { instance } from '../api/axios.api';
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

  async signIn(userData: ISignInData): Promise<string> {
    const { data } = await instance.post<string>('api/auth/signin', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },

  async google(userData: IGoogleData): Promise<string> {
    const { data } = await instance.post<string>('api/auth/google', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },
};
