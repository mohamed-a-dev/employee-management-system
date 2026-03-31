import { Link, useNavigate, useParams } from 'react-router-dom'
import Stat from '../components/Employee/Stat';
import { useEffect, useState } from 'react';
import { displaySuccess } from '../utils/displaySuccess';
import { useEmployee } from '../context/EmployeeContext';
import EmployeeModal from '../components/Employees/EmployeeModal'
import Loading from '../components/Loading';
import { displayError } from '../utils/displayError';
import { useRole } from '../context/RoleContext';

const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    "in progress": "bg-blue-100 text-blue-700",
    completed: "bg-green-200 text-green-700",
};

const Employee = () => {
    const { id: employeeId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [taskCountByStatus, setTaskCountByStatus] = useState({});
    const { deleteEmployee, setForm, openEditEmployeeModal, employee, setEmployee } = useEmployee();
    const navigate = useNavigate();
    const [load, setLoad] = useState(true);
    const { setRoles, roles } = useRole();

    const getToken = () => localStorage.getItem('employees-dashboard-token') || '';


    const handleDelete = async (employeeId) => {
        const { success } = await deleteEmployee(employeeId);
        if (success) {
            displaySuccess('Done', 'employee/ delete employee');
            navigate('/employees')
        }
    }

    const handleEdit = () => {
        setForm({ ...employee, role: employee.role._id });
        openEditEmployeeModal();
    }

    const getEmployeeDetails = async () => {
        const employeeApi = import.meta.env.VITE_API_URL + 'employees/' + employeeId;
        const employeeTasksApi = import.meta.env.VITE_API_URL + 'tasks/employee/' + employeeId;
        const rolesApi = import.meta.env.VITE_API_URL + 'roles';


        try {
            setLoad(true);
            const [employeeRes, tasksRes, rolesRes] = await Promise.all([fetch(employeeApi, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            }), fetch(employeeTasksApi, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            }), await fetch(rolesApi, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            })]);

            const employeeData = await employeeRes.json();
            const tasksData = await tasksRes.json();
            const rolesData = await rolesRes.json();

            if (!employeeRes.ok) return displayError(employeeData.errorMsg, 'get employee');

            if (!tasksRes.ok) return displayError(tasksData.errorMsg, 'get employee tasks');

            if (!rolesRes.ok) return displayError(rolesData.errorMsg, 'get roles ');


            setEmployee(employeeData.employee);
            setTasks(tasksData.tasks);
            setTaskCountByStatus(tasksData.taskCountByStatus);
            setRoles(rolesData.roles);

        } catch (error) {
            displayError(error.message, 'get employee');
        } finally {
            setLoad(false);
        }
    };

    useEffect(() => {
        getEmployeeDetails();
    }, []);

    if (load) return <Loading />


    return (
        <section className='px-5 py-5 relative min-h-[calc(100vh-72px)] break-all dark:bg-slate-800 bg-white duration-300 dark:text-white'>
            <div className="mb-6 space-y-6">
                {/* Employee Card */}
                <div className="px-6 py-6 dark:bg-slate-900 border border-black/50 shadow-2xl dark:border-white/50 rounded-lg flex gap-5 ">
                    <img src="/user.png" className="w-20 h-20 rounded-full" />
                    <div>
                        <h2 className="capitalize text-xl font-semibold">{employee.username}</h2>
                        <p className="capitalize text-gray-500">{employee.role?.roleName}</p>
                        <div className="mt-2 text-sm space-y-1">
                            <p>Email: {employee.email}</p>
                            <p>Phone: {employee.phone}</p>
                            <p className='capitalize'>Status: {employee.status}</p>
                        </div>
                        <div className='space-x-2'>
                            <button onClick={() => handleEdit(employee._id)} className="text-blue-500  cursor-pointer hover:underline">Edit</button>
                            <button onClick={() => handleDelete(employee._id)} className="text-red-500 cursor-pointer hover:underline">Delete</button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
                    <Stat title="Total Tasks" value={tasks.length || 0} />
                    <Stat title="Completed" value={taskCountByStatus.completed || 0} />
                    <Stat title="Pending" value={taskCountByStatus.pending || 0} />
                    <Stat title="In progress" value={taskCountByStatus['in progress'] || 0} />
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-black/50 dark:border-white/50 shadow-2xl">
                    <h3 className="font-semibold mb-6 text-lg">Employee Tasks</h3>
                    <div className="space-y-4">
                        {/* Task Card */}
                        {
                            tasks.map((task) =>
                                <div key={task._id} className="capitalize flex flex-col md:flex-row md: gap-3 md:gap-0 md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition">

                                    <div>
                                        <p className="font-medium">{task.title}</p>
                                        <p className="text-sm text-gray-500">Deadline: {new Date(task.deadline).toLocaleDateString('en-GB')}</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <span className={`px-3 py-1 text-sm rounded-full ${statusColors[task.status]}`}>
                                            {task.status}
                                        </span>
                                        <Link to={`/tasks/${task._id}`} className="text-sm text-green-500 hover:underline">
                                            View
                                        </Link>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <EmployeeModal />
        </section>
    )
}

export default Employee

