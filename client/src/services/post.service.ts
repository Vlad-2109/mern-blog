import { instance } from '../api/axios.api';
import { ICreatePost, ICreatePostResponse, IGetPosts } from '../types/types';

export const PostService = {
  async createPost(postData: ICreatePost): Promise<ICreatePostResponse | null> {
    const { data } = await instance.post<ICreatePostResponse | null>(
      `api/post/create`,
      postData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  },

  async getPosts(currentUserId: string | undefined): Promise<IGetPosts> {
    const { data } = await instance.get<IGetPosts>(`api/post/get-posts?userId=${currentUserId}`);
    return data;
  },
};
