import { instance } from '../api/axios.api';
import { ICreateComment, ICreateCommentResponse, IGetComment } from '../types/types';

export const CommentService = {
  async createComment(commentData: ICreateComment): Promise<ICreateCommentResponse> {
    const { data } = await instance.post<ICreateCommentResponse>('api/comment/create', commentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },

  async getPostComments(postId: string | undefined): Promise<IGetComment[]> {
    const { data } = await instance.get<IGetComment[]>(`api/comment/get-post-comments/${postId}`);
    return data;
  },
};
