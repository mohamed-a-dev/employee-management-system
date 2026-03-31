import { createContext, useContext, useEffect, useState } from 'react';
import { displayError } from '../utils/displayError';

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
    const [employeesStats, setEmployeesStats] = useState({});
    const [tasksStats, setTasksStats] = useState({});
    const [topEmployees, setTopEmployees] = useState([]);
    const [load, setLoad] = useState(true);

    const getToken = () => localStorage.getItem('employees-dashboard-token') || '';

    const getEmployeesStats = async () => {
        const api = import.meta.env.VITE_API_URL + 'dashboard/employees';
        try {
            const res = await fetch(api, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });
            const data = await res.json();
            if (!res.ok)
                return;
            // displayError(data.errorMsg, 'getEmployeesStats');
            else
                setEmployeesStats(data.stats);

        } catch (error) {
            // displayError(error.message, 'getEmployeesStats');
            return { success: false };
        }
    }

    const getTasksStats = async () => {
        const api = import.meta.env.VITE_API_URL + 'dashboard/tasks';
        try {
            const res = await fetch(api, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });
            const data = await res.json();
            if (!res.ok)
                return;
            // displayError(data.errorMsg, 'getEmployeesStats');
            else
                setTasksStats(data.stats);

        } catch (error) {
            // displayError(error.message, 'getEmployeesStats');
            return { success: false };
        }
    }


    const getTopEmployees = async () => {
        const api = import.meta.env.VITE_API_URL + 'dashboard/top-employees';
        try {
            const res = await fetch(api, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });
            const data = await res.json();
            if (!res.ok)
                return;
            // displayError(data.errorMsg, 'getTopEmployees');
            else
                setTopEmployees(data.data);

        } catch (error) {
            // displayError(error.message, 'getTopEmployees');
            return { success: false };
        }
    }

    const fetchAllStats = async () => {
        try {
            setLoad(true);
            await Promise.all([getEmployeesStats(), getTasksStats(), getTopEmployees()]);

        } catch (error) {
            console.error(error);
        } finally {
            setLoad(false);
        }
    };

    return (
        <DashboardContext.Provider value={{
            employeesStats,
            tasksStats,
            topEmployees,
            fetchAllStats,
            load,
        }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => useContext(DashboardContext);