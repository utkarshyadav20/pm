import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all teams
export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();

    const teamsWithprojectOwnerAndManger = await Promise.all(
      teams.map(async (team: any) => {
        const projectOwner = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId! },
          select: { username: true },
        });

        const projectManager = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId! },
          select: { username: true },
        });

        return {
            ...team,
            projectOwnerUsername:projectOwner?.username,
            projectManagerUsername:projectManager?.username,

        }
      })
     
    );
    res.json(teamsWithprojectOwnerAndManger)
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `Error retrieving the teams ${err.message}` });
  }
};
