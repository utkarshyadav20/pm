import { Router } from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskControllers";
import { getUsers } from "../controllers/userControllers";


const router=Router();

router.get("/",getUsers);


export default router;

