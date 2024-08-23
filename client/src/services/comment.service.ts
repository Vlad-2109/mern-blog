import { instance } from '../api/axios.api';
import { ICreateComment, ICreateCommentResponse, IGetComment, IGetComments } from '../types/types';

export const CommentService = {
  async createComment(
    commentData: ICreateComment
  ): Promise<ICreateCommentResponse> {
    const { data } = await instance.post<ICreateCommentResponse>(
      'api/comment/create',
      commentData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  },

  async getPostComments(postId: string | undefined): Promise<IGetComment[]> {
    const { data } = await instance.get<IGetComment[]>(
      `api/comment/get-post-comments/${postId}`
    );
    return data;
  },

  async likeComment(commentId: string | undefined): Promise<IGetComment> {
    const { data } = await instance.put<IGetComment>(
      `api/comment/likeComment/${commentId}`
    );
    return data;
  },

  async editComment(
    commentId: string | undefined,
    editedContent: string | undefined
  ): Promise<IGetComment> {
    const newContent = { content: editedContent };
    const { data } = await instance.put<IGetComment>(
      `api/comment/editComment/${commentId}`,
      newContent,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return data;
  },

  async deleteComment(commentId: string | undefined): Promise<string> {
    const { data } = await instance.delete<string>(
      `api/comment/deleteComment/${commentId}`
    );
    return data;
  },

  async getComments(): Promise<IGetComments> {
    const { data } = await instance.get<IGetComments>(`api/comment/get-comments`);
    return data;
  },

  async getCommentsWithLimit(): Promise<IGetComments> {
    const { data } = await instance.get<IGetComments>(`api/comment/get-comments?limit=5`);
    return data;
  },

  async getCommentsWithStartIndex(startIndex: number): Promise<IGetComments> {
    const { data } = await instance.get<IGetComments>(
      `api/comment/get-comments?startIndex=${startIndex}`
    );
    return data;
  },

  async deleteCommentById(commentIdToDelete: string): Promise<string> {
    const { data } = await instance.delete<string>(
      `api/comment/deleteComment/${commentIdToDelete}`
    );
    return data;
  },
};
