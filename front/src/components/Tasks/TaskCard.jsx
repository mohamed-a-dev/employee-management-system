import { Link, useLocation } from 'react-router-dom';
import { useTask } from '../../context/TaskContext';
import { FaCalendarDays } from 'react-icons/fa6';


const TaskCard = ({ task }) => {
    const { openEditTaskModal, setForm, deleteTask } = useTask();
    const { pathname } = useLocation();

    const statusColors = {
        pending: "bg-yellow-100 text-yellow-700",
        "in progress": "bg-blue-100 text-blue-700",
        completed: "bg-green-200 text-green-700",
    };

    const handleEdit = () => {
        setForm({ ...task, assignedTo: task.assignedTo._id });
        openEditTaskModal();
    };

    const handleDelete = async () => await deleteTask(task._id);

    return (
        <div className="p-4 capitalize bg-white dark:text-white duration-300 shadow-2xl dark:bg-slate-900 flex flex-col justify-between gap-4">

            <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{task.title}</h3>

                <span className={`text-xs px-2 py-1 rounded ${statusColors[task.status]}`}>
                    {task.status}
                </span>
            </div>

            <p className="text-sm text-gray-500">
                {
                    pathname === '/tasks'  && task.description?.length > 100 ?
                        <>
                            {task.description.slice(0, 200)}
                            <span className='text-lg'> ...</span>
                            <Link to={`/tasks/${task._id}`} className='text-yellow-500'>ReadMore</Link>
                        </>
                        :
                        <>
                            {task.description}
                        </>
                }
            </p>

            <div className="text-sm">
                <span className="font-medium">Assigned To:</span>{" "}
                {task.assignedTo?.username}
            </div>

            <div className="text-sm">
                <span className="font-medium">Created By:</span>{" "}
                {task.creator}
            </div>

            <div className="flex items-center gap-2 text-sm dark:text-white/70 text-black/70">
                <FaCalendarDays size={16} />
                {new Date(task.deadline).toLocaleDateString('en-GB')}
            </div>

            <div className="flex justify-end gap-2 mt-2">
                {
                    pathname === '/tasks' &&
                    <Link to={`/tasks/${task._id}`} className="text-xs bg-yellow-500 text-white px-3 py-1 cursor-pointer">
                        View
                    </Link>
                }


                <button onClick={handleEdit} className="text-xs bg-green-500 text-white px-3 py-1 cursor-pointer">
                    Edit
                </button>

                <button onClick={handleDelete} className="text-xs bg-red-500 text-white px-3 py-1 cursor-pointer">
                    Delete
                </button>
            </div>
        </div>
    );
}


export default TaskCard;