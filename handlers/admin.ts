
import { prisma } from '../db';
import { createJWT, hashPassword, comparePasswords } from '../modules/auth';
import { Request, Response } from 'express';

export const createNewUserAdmin = async (req, res) => {
  const hash = await hashPassword(req.body.password);
  try {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: hash,
    },
  });
  } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Failed to create user' });
  }
  res.json({ "Ok": true });
};
export const deleteUserAdmin = async (req, res) => {
  const username = req.body.username;
  const user = await prisma.user.findUnique({
    where: { username },
  });
  if (!user) {
    res.status(404);
    res.send('User not found');
    return;
  }
  await prisma.user.delete({
    where: { username },
  });
  res.json({ "Ok": true });
}
export const deleteAllUsersAdmin = async (req, res) => {
    const users = await prisma.user.deleteMany({
      where: { role: "USER" },
    });
    res.json({ "Ok": true });
}
export const getAllUsersAdmin = async (req, res) => {
  const users = await prisma.user.findMany({ where: { role: "USER" } });
  res.json(users);
}
