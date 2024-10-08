import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model';
import { errorHandler } from '../utils/error';
import { SortOrder } from 'mongoose';

export const test = (req: Request, res: Response) => {
  res.json({ message: 'API is working!' });
};

export const updateUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 7 and 20 characters')
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const { password, ...rest } = updatedUser.toObject();
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this user'))
  };
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }

};

export const signout = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('access_token').status(200).json('User has been signed out');
  } catch (error) {
    next(error);
  }
}

export const getUsers = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }
  try {
    const startIndex: number = parseInt(req.query.startIndex) || 0;
    const limit: number = parseInt(req.query.limit) || 5;
    const sortDirection: SortOrder = req.query.sort === 'asc' ? 1 : -1;

    const users = await User.find().sort({ createdAt: sortDirection }).skip(startIndex).limit(limit);

    const usersWithoutPassword = users.map((user) => {
      const { password, ...rest } = user.toObject();
      return rest;
    })

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    )

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    })

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers
    })
    
  } catch (error) {
    next(error);
  }
}

export const getUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    if (user) {
      const { password, ...rest } = user.toObject();
      res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
