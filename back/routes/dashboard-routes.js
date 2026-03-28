import { Router } from "express";
import { getEmployeesStats, getTasksStats, getTopEmployees } from "../controllers/dashboard-controllers.js";

const router = Router();

router.get('/employees', getEmployeesStats);
router.get('/tasks', getTasksStats);
router.get('/top-employees', getTopEmployees);


export default router;