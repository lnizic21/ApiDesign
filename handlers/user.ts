import { prisma } from '../db';
import { createJWT, hashPassword, comparePasswords } from '../modules/auth';
import { Request, Response, NextFunction } from 'express';


export const createNewUser = async (req: Request, res: Response, next: NextFunction) => {

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(req.body.password)) {
    res.status(400);
    res.json({ error: 'Username must be 3-20 characters long and can only contain letters, numbers, and underscores' });
    return;
  }
  const hash = await hashPassword(req.body.password);

  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch(error) {
    next(error);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (!user) {
    res.status(401);
    res.send('Invalid username or password');
    return;
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.send('Invalid username or password');
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};


export const getUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { username: req.user.username },
  });

  res.json(user);
}


export const updateUsername = async (req, res) => {
  const username = req.body.username;
  const newUsername = req.body.newUsername;

  if(req.user.username !== username) {
    res.status(401).json({ error: 'Unauthorized' });
  }

  if (newUsername) {
    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      try {
        const updatedUser = await prisma.user.update({
          where: { username },
          data: { username: newUsername },
        });
        res.json({ message: 'Username updated successfully', user: updatedUser });
      } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to update username' });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Failed to find user' });
    }
  } else {
    res.status(400).json({ error: 'New username is required' });
  }
};
