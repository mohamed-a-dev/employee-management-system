import BadRequest from '../errors/BadRequest.js';
import taskModel from '../models/task-model.js';
import TasksCollection from '../models/task-model.js'
import httpStatusCodes from '../utils/status-codes.js';


const getTasks = async (req, res) => {
    const tasks = await TasksCollection.find().populate('assignedTo', 'username _id');;
    res.status(httpStatusCodes.OK).json({ success: true, tasks });
}

const getEmployeeTasks = async (req, res) => {
    const { employeeId } = req.params;
    const tasks = await TasksCollection.find({ assignedTo: employeeId });

    const taskCountByStatus = tasks.reduce((acc, task) => {
        if (!acc[task.status])
            acc[task.status] = 0;

        acc[task.status] += 1;

        return acc;
    }, {});

    res.status(httpStatusCodes.OK).json({ success: true, tasks, taskCountByStatus });
}

const createTask = async (req, res) => {
    let taskBody = { ...req.body, creator: req.roleName }
    const task = await TasksCollection.create(taskBody);
    await task.populate('assignedTo', 'username _id');
    res.status(httpStatusCodes.CREATED).json({ success: true, task });
}

const editTask = async (req, res) => {
    const { taskId } = req.params;

    const task = await TasksCollection.findById(taskId);

    if (!task)
        throw new NotFound('task not found');

    const canEdit =
        req.roleName === 'admin' ||
        req.roleName === 'manager' ||
        task.assignedTo.toString() === req.user.id;

    if (!canEdit)
        throw new BadRequest('not authorized to edit this task');

    const updatedTask = await TasksCollection.findByIdAndUpdate(
        taskId,
        req.body,
        { new: true, runValidators: true }
    ).populate('assignedTo', 'username _id');

    res.status(httpStatusCodes.OK).json({ success: true, task: updatedTask });
};

const getTask = async (req, res) => {
    const { taskId } = req.params;
    const task = await TasksCollection.findOne({ _id: taskId }).populate('assignedTo', 'username _id');
    if (!task)
        throw new NotFound('task not found');

    res.status(httpStatusCodes.OK).json({ success: true, task });
}


const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    const task = await TasksCollection.findOneAndDelete({ _id: taskId });
    if (!task)
        throw new NotFound('Task not found');
    res.status(httpStatusCodes.OK).json({ success: true, task });
}

const searchTasks = async (req, res) => {
    const { search } = req.query;
    const tasks = await TasksCollection.find({
        $or: [{ title: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }]
    });

    res.status(httpStatusCodes.OK).json({ success: true, tasks });
}


const filterTasks = async (req, res) => {
    const { title, description, status, creator, deadline } = req.query;
    let filterObj = {};
    if (title)
        filterObj.title = { $regex: title, $options: "i" };
    if (description)
        filterObj.description = { $regex: description, $options: "i" };
    if (status)
        filterObj.status = status;
    if (creator)
        filterObj.creator = creator;
    if (deadline) {
        const date = new Date(deadline);       // 2020-01-01T00:00:00.000Z
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);   // 2020-01-02T00:00:00.000Z

        filterObj.deadline = { $gte: date, $lt: nextDay };
    }
    const tasks = await TasksCollection.find(filterObj).populate('assignedTo', 'username _id');
    res.status(httpStatusCodes.OK).json({ success: true, tasks });
}



export { getTasks, createTask, editTask, getTask, deleteTask, searchTasks, filterTasks, getEmployeeTasks }



