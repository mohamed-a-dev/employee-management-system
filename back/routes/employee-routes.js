import { Router } from "express";
import { changePassword, createEmployee, deleteEmployee, editEmployee, filterEmployees, getEmployee, getEmployees, searchEmployees, } from "../controllers/employees-controllers.js";
import checkPermissions from "../middleware/check-permissions-middleware.js";

const router = Router();

router.get('/', getEmployees);
router.post('/', checkPermissions('createEmployee'), createEmployee);
router.patch('/change-password', changePassword);
router.get('/search', searchEmployees);
router.get('/filter', filterEmployees)
router.patch('/:employeeId', checkPermissions('editEmployee'), editEmployee);
router.delete('/:employeeId', checkPermissions('deleteEmployee'), deleteEmployee)
router.get('/:employeeId', getEmployee)

export default router;