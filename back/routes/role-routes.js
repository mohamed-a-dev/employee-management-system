import { Router } from "express";
import { createRole, deleteRole, editRole, getRoles } from "../controllers/roles-controllers.js";
import checkPermissions from "../middleware/check-permissions-middleware.js";


const router = Router();


router.get('/', getRoles);
router.post('/', checkPermissions('createRole'), createRole);
router.delete('/:roleId', checkPermissions('deleteRole'), deleteRole);
router.patch('/:roleId', checkPermissions('editRole'), editRole);

export default router;