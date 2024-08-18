import { instance } from '../api/axios.api';
import { ICreateComment, ICreateCommentResponse } from '../types/types';

export const CommentService = {
  async createComment(commentData: ICreateComment): Promise<ICreateCommentResponse> {
    const { data } = await instance.post<ICreateCommentResponse>('api/comment/create', commentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return data;
  },
};
