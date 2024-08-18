import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/error';
import Comment from '../models/comment.model';

export const createComment = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { content, postId, userId } = req.body;
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, 'You are not allowed to create this comment')
      );
    }

    const newComment = new Comment({ content, userId, postId });
    await newComment.save();

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};
