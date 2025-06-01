import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from '../model/User';
dotenv.config();

const generateToken = (userID: string) => {
  return jwt.sign({ id: userID }, process.env.JWT_SECRET as string, {
    expiresIn: '12h',
  });
};

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    const newUser = await User.create({ username, password, email });
    res.status(201).json({
      message: 'created',
      userId: newUser._id,
      username: username,
      email: email,
    });
    return;
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ message: 'Username does not exist' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Incorrect Password or Username' });
      return;
    }

    const token = generateToken(user._id.toString());
    res.status(201).json({ username: username, userId: user._id, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { signup, login };
