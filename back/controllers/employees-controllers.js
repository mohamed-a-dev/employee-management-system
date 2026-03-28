import BadRequest from '../errors/BadRequest.js';
import NotFound from '../errors/NotFound.js';
import EmployeesCollection from '../models/employee-model.js'
import httpStatusCodes from '../utils/status-codes.js';
import TasksCollection from '../models/task-model.js'

const getEmployees = async (req, res) => {
    const employees = await EmployeesCollection.find().select('-password').populate('role', 'roleName');
    res.status(httpStatusCodes.OK).json({ success: true, employees });
}

const createEmployee = async (req, res) => {
    const employee = await EmployeesCollection.create(req.body);
    await employee.populate('role', 'roleName');
    const { password, ...employeeWithoutPassword } = employee.toObject();

    res.status(httpStatusCodes.CREATED).json({
        success: true,
        employee: employeeWithoutPassword
    });
};

const editEmployee = async (req, res) => {
    const { employeeId } = req.params;
    const employee = await EmployeesCollection.findOneAndUpdate({ _id: employeeId }, req.body, { new: true, runValidators: true }).select('-password').populate('role', 'roleName');;
    if (!employee)
        throw new NotFound('Employee not found');

    res.status(httpStatusCodes.OK).json({ success: true, employee });
}

const getEmployee = async (req, res) => {
    const { employeeId } = req.params;
    const employee = await EmployeesCollection.findOne({ _id: employeeId }).select('-password').populate('role', 'roleName');;
    if (!employee)
        throw new NotFound('Employee not found');
    res.status(httpStatusCodes.OK).json({ success: true, employee });
}

const deleteEmployee = async (req, res) => {
    const { employeeId } = req.params;
    await TasksCollection.deleteMany({ assignedTo: employeeId });
    const employee = await EmployeesCollection.findOneAndDelete({ _id: employeeId });
    if (!employee)
        throw new NotFound('Employee not found');
    res.status(httpStatusCodes.OK).json({ success: true, employee });
}

const searchEmployees = async (req, res) => {
    const { search } = req.query;
    const employees = await EmployeesCollection.find({
        $or: [{ username: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }]
    }).select('-password').populate('role', 'roleName');;

    res.status(httpStatusCodes.OK).json({ success: true, employees });
}

const filterEmployees = async (req, res) => {
    const fields = ['username', 'email', 'role', 'status', 'createdAt'];
    let filterField;
    fields.forEach((field) => {
        if (req.query[field])
            filterField = field;
    });

    let employees;
    if (!filterField)
        employees = await EmployeesCollection.find().select('-password').populate('role', 'roleName');
    else {
        if (filterField === 'role') {
            employees = await EmployeesCollection.find().select('-password').populate('role', 'roleName');
            employees = employees.filter((emp) => emp.role.roleName === req.query[filterField].toLowerCase());
        }
        else if (filterField === 'createdAt') {
            const date = new Date(req.query['createdAt']);       // 2020-01-01T00:00:00.000Z
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);   // 2020-01-02T00:00:00.000Z         
            employees = await EmployeesCollection.find({ createdAt: { $gte: date, $lt: nextDay } }).select('-password').populate('role', 'roleName');
        }
        else
            employees = await EmployeesCollection.find({ [filterField]: { $regex: req.query[filterField], $options: 'i' } }).select('-password').populate('role', 'roleName');
    }

    res.status(httpStatusCodes.OK).json({ success: true, employees });
}

const changePassword = async (req, res) => {
    console.log(74445);

    const { id: employeeId } = req.user;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const employee = await EmployeesCollection.findOne({ _id: employeeId });
    if (!employee)
        throw new NotFound('employee not found');

    const isCurrentPasswordCorrect = await employee.comparePasswords(currentPassword);

    if (!isCurrentPasswordCorrect)
        throw new BadRequest('Current password is incorrect');

    if (newPassword !== confirmPassword)
        throw new BadRequest('Passwords do not match');

    employee.password = newPassword;
    await employee.save();

    res.status(httpStatusCodes.OK).json({ success: true });
};

export { getEmployees, createEmployee, editEmployee, getEmployee, deleteEmployee, searchEmployees, filterEmployees, changePassword };