import { instance } from '../api/axios.api';
import { IGetUser, IGetUsers, IUpdateUser, IUpdateUserResponse } from '../types/types';

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

  async deleteUser(currentUserId: string): Promise<string> {
    const { data } = await instance.delete<string>(
      `api/user/delete/${currentUserId}`
    );
    return data;
  },

  async signout(): Promise<string> {
    const { data } = await instance.post<string>(`api/user/signout`);
    return data;
  },

  async getUser(userId: string): Promise<IGetUser> {
    const { data } = await instance.get<IGetUser>(`api/user/${userId}`);
    return data;
  },

  async getUsers(): Promise<IGetUsers> {
    const { data } = await instance.get<IGetUsers>(`api/user/get-users`);
    return data;
  },

  async getUsersWithStartIndex(startIndex: number): Promise<IGetUsers> {
    const { data } = await instance.get<IGetUsers>(
      `api/user/get-users?startIndex=${startIndex}`
    );
    return data;
  },

  async deleteUserById(userIdToDelete: string): Promise<string> {
    const { data } = await instance.delete<string>(
      `api/user/delete/${userIdToDelete}`
    );
    return data;
  },
};
