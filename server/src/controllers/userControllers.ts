import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({
      message: `Error retrieving users ${err.message}`,
    });
  }
};
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: Number(id),
      },
    });
    res.json(user);
  } catch (err: any) {
    res.status(500).json({
      message: `Error retrieving user ${err.message}`,
    });
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const {
      username,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;

    const newUser = await prisma.user.create({
      data: {
        username,
        profilePictureUrl,
        teamId,
      },
    });
    res.json({ message: "User created Successfully ", newUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving users: ${error.message}` });
  }
};
