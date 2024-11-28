import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all tasks
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.json(tasks);
  } catch (err: any) {
    res.status(500).json({
      message: `Error retrieving tasks ${err.message}`,
    });
  }
};

//create a new task
export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    res.json(newTask);
  } catch (err: any) {
    res.status(201).json({
      message: `Error creating task ${err.message}`,
    });
  }
};

//update the status of a task upon sliding
export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const {status}=req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
       status:status,
      },
    });
    res.json(updatedTask);
  } catch (err: any) {
    res.status(500).json({
      message: `Error upadating the status of task upon sliding ${err.message}`,
    });
  }
};



export const getUserTasks = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try { 
    const tasks = await prisma.task.findMany({
      where: {
       OR:[
        {authorUserId:Number(userId)},
        {assignedUserId:Number(userId)}
       ],
      },
      include: {
        author: true,
        assignee: true,
      },
    });
    res.json(tasks);
  } catch (err: any) {
    res.status(500).json({
      message: `Error retrieving User tasks ${err.message}`,
    });
  }
};