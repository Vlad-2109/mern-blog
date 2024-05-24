import { instance } from '../api/axios.api';
import { ISignUpData } from '../types/types';

export const AuthService = {
  async signUp(userData: ISignUpData): Promise<string> {
    const { data } = await instance.post<string>('api/auth/signup', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },
};
