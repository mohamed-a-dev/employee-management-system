import { createContext, useContext, useEffect, useState } from 'react';
import { displayError } from '../utils/displayError';
import { displaySuccess } from '../utils/displaySuccess';
import { useEmployee } from './EmployeeContext';
import { useLocation, useNavigate } from 'react-router-dom';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
    const { employees } = useEmployee();

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        assignedTo: "",
        status: 'pending',
        deadline: '',
    });
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState({ title: '', status: '', creator: '', deadline: '' });
    const [task, setTask] = useState({});
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const getToken = () => localStorage.getItem('employees-dashboard-token') || '';

    const resetForm = () => setForm({
        title: "",
        description: "",
        assignedTo: "",
        status: 'pending',
        deadline: '',
    });

    const [load,setLoad] = useState(true);

    const openCreateTaskModal = () => { setModalMode('create'); setIsTaskModalOpen(true); }
    const openEditTaskModal = () => { setModalMode('edit'); setIsTaskModalOpen(true); }
    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        resetForm();
    }
    const toggleFilterButton = () => setShowFilterDropdown(!showFilterDropdown);

    const getTasks = async () => {
        const api = import.meta.env.VITE_API_URL + 'tasks/';
        try {
            setLoad(true);
            const res = await fetch(api, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });
            const data = await res.json();
            if (!res.ok) {
                // displayError(data.errorMsg, 'get tasks');
                return { success: false };
            }
            setTasks(data.tasks);
            return { success: true };
        } catch (error) {
            // displayError(error.message, 'get tasks');
            return { success: false };
        } finally {
            setLoad(false);
        }
    }

    const createTask = async () => {
        const api = import.meta.env.VITE_API_URL + 'tasks/';
        try {

            const res = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + getToken()
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!res.ok) {
                // displayError(data.errorMsg, 'create task');
                return { success: false };
            }
            setTasks([...tasks, data.task]);
            closeTaskModal();
            return { success: true };
        } catch (error) {
            // displayError(error.message, 'create task');
            return { success: false };
        }
    }



    const editTask = async () => {
        const taskId = form._id;
        const api = import.meta.env.VITE_API_URL + 'tasks/' + taskId;

        try {

            const res = await fetch(api, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + getToken()
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();
            if (!res.ok) {
                displayError(data.errorMsg, 'edit task');
                return { success: false };
            }
            setTasks((prev) =>
                prev.map((task) =>
                    task._id === taskId ? data.task : task
                )
            );
            setTask(data.task); // task.jsx page
            closeTaskModal();
            return { success: true };
        } catch (error) {
            displayError(error.message, 'edit task');
            return { success: false };
        }
    }



    const deleteTask = async (taskId) => {
        const api = import.meta.env.VITE_API_URL + 'tasks/' + taskId;
        try {

            const res = await fetch(api, {
                method: 'DELETE',
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });

            const data = await res.json();
            if (!res.ok) {
                displayError(data.errorMsg, 'delete task');
                return { success: false };
            }
            setTasks((prev) =>
                prev.filter((task) =>
                    task._id !== taskId
                )
            );
            closeTaskModal();
            if (pathname !== '/tasks') { // in task.jsx page
                // displaySuccess('Done', 'delete task');
                navigate('/tasks');
                return;
            }

            return { success: true };
        } catch (error) {
            // displayError(error.message, 'delete task');
            return { success: false };
        }
    }



    const searchTasks = async (search) => {
        const api = import.meta.env.VITE_API_URL + 'tasks/search?search=' + search;
        try {

            const res = await fetch(api, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });

            const data = await res.json();
            if (!res.ok) return;
            //  displayError(data.errorMsg, 'search tasks');

            setTasks(data.tasks);
        } catch (error) {
            // displayError(error.message, 'search tasks');
        }
    }



    const filterTasks = async () => {
        console.log(filter);
        
        const query = new URLSearchParams(filter).toString();
        const api = import.meta.env.VITE_API_URL + `tasks/filter?${query}`;

        try {
            const res = await fetch(api, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });
            const data = await res.json();
            if (!res.ok) return;
            //  displayError(data.errorMsg, 'filter tasks');

            setTasks(data.tasks);
        } catch (error) {
            // displayError(error.message, 'filter tasks');
        }

    }


    const handleSearch = async (search) => {
        await searchTasks(search);
    }



    return (
        <TaskContext.Provider value={{
            isTaskModalOpen,
            openCreateTaskModal,
            openEditTaskModal,
            closeTaskModal,
            toggleFilterButton,
            modalMode,
            setModalMode,
            showFilterDropdown,
            resetForm,
            form,
            setForm,
            tasks,
            createTask,
            editTask,
            resetForm,
            employees,
            deleteTask,
            handleSearch,
            setFilter,
            filterTasks,
            task,
            setTask,
            getTasks,
            load
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => useContext(TaskContext);