import EmployeesCollection from '../models/employee-model.js'
import TasksCollection from '../models/task-model.js'
import httpStatusCodes from '../utils/status-codes.js';


const getEmployeesStats = async (req, res) => {
    const employeesCount = await EmployeesCollection.countDocuments();

    const activeEmployeesCount = await EmployeesCollection.countDocuments({ status: 'active' });

    res.status(httpStatusCodes.OK).json({ stats: { employeesCount, activeEmployeesCount } });
}


const getTasksStats = async (req, res) => {
    const tasksCount = await TasksCollection.countDocuments();

    const completedTasksCount = await TasksCollection.countDocuments({ status: 'completed' });

    const PendingTasksCount = await TasksCollection.countDocuments({ status: 'pending' });

    const inProgressTasksCount = await TasksCollection.countDocuments({ status: 'in progress' });

    res.status(httpStatusCodes.OK).json({ stats: { tasksCount, completedTasksCount, PendingTasksCount, inProgressTasksCount } });
}


const getTopEmployees = async (req, res) => {
    const topEmployees = await TasksCollection.aggregate([
        {
            $group: {
                _id: "$assignedTo",
                taskCount: { $sum: 1 }
            }
        },
        {
            $sort: { taskCount: -1 }
        },
        {
            $limit: 5
        },
        {
            $lookup: {
                from: "employees",
                localField: "_id",
                foreignField: "_id",
                as: "employee"
            }
        },
        {
            $unwind: "$employee"
        },
        {
            $project: {
                _id: 0,
                employeeId: "$employee._id",
                username: "$employee.username",
                email: "$employee.email",
                taskCount: 1
            }
        }
    ]);

    res.status(httpStatusCodes.OK).json({ success: true, data: topEmployees });

};


export { getEmployeesStats, getTasksStats, getTopEmployees }