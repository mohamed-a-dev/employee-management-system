import BadRequest from "../errors/BadRequest.js";
import Unauthenticated from "../errors/Unauthenticated.js";
import EmployeesCollection from '../models/employee-model.js'
import httpStatusCodes from "../utils/status-codes.js";
import RolesCollection from '../models/role-model.js'

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequest("Provide email and password");
    }

    const employee = await EmployeesCollection.findOne({ email }).populate('role', 'roleName');

    if (!employee) {
        throw new Unauthenticated("Invalid credentials");
    }

    const isPasswordCorrect = await employee.comparePasswords(password);

    if (!isPasswordCorrect) {
        throw new Unauthenticated("Invalid credentials");
    }

    const token = await employee.createToken();

    const employeeObj = employee.toObject();
    delete employeeObj.password;

    res.status(httpStatusCodes.OK).json({ success: true, token, employee: { ...employeeObj, roleName: employeeObj.role.roleName } });
};

const verifyAuth = async (req, res) => {
    const employeeRole = await RolesCollection.findOne({ _id: req.user.roleId })
    res.status(httpStatusCodes.OK).json({ success: true, employee: { ...req.user, roleName: employeeRole.roleName } });
}

export { login, verifyAuth };