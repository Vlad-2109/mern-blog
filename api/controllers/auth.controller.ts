import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model';

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
