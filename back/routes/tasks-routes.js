import { Router } from "express";
import { createTask, deleteTask, editTask, filterTasks, getEmployeeTasks, getTask, getTasks, searchTasks } from "../controllers/tasks-controllers.js";
import checkPermissions from "../middleware/check-permissions-middleware.js";

const router = Router();

router.get('/', getTasks);
router.post('/',checkPermissions('createTask'), createTask);
router.get('/search', searchTasks);
router.get('/filter', filterTasks);
router.get('/employee/:employeeId', getEmployeeTasks);
router.patch('/:taskId',checkPermissions('editTask'), editTask);
router.get('/:taskId', getTask);
router.delete('/:taskId',checkPermissions('deleteTask'), deleteTask);


export default router;