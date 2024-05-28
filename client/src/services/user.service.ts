import { instance } from '../api/axios.api';
import { IUpdateUser, IUpdateUserResponse } from '../types/types';

export const UserService = {
  async updateUser(
    userData: Partial<IUpdateUser>,
    currentUserId: string | undefined
  ): Promise<IUpdateUserResponse | null> {
    const { data } = await instance.put<IUpdateUserResponse | null>(
      `api/user/update/${currentUserId}`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  },
};