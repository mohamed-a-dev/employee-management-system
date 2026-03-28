import Forbidden from '../errors/Forbidden.js';
import NotFound from '../errors/NotFound.js';
import RolesCollection from '../models/role-model.js'
import EmployeesCollection from '../models/employee-model.js'

const checkPermissions = (permission) => {
    return async (req, res, next) => {
        const { id } = req.user;

        const employee = await EmployeesCollection.findById(id);
        if (!employee) throw new NotFound('Employee not found');

        const role = await RolesCollection.findById(employee.role);
        if (!role) throw new NotFound('Role not found');

        req.roleName = role.roleName;

        if (permission === 'editTask' && role.roleName === 'employee')
            req.body = { status: req.body.status }

        // admin bypass
        if (role.roleName === 'admin') return next();

        const isAllowed = role.permissions[permission];

        if (!isAllowed)
            throw new Forbidden('You are not allowed to do this action');

        next();
    };
};
export default checkPermissions;