import { useEffect, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import { displayError } from '../utils/displayError';

const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
    const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [employees, setEmployees] = useState([]);
    const [form, setForm] = useState({
        username: "",
        email: "",
        role: '',
        phone: '',
        address: '',
        password: '',
        status: '',
    });
    const [filter, setFilter] = useState({ username: '' });
    const [tableColumns, setTableColumns] = useState(['name', 'email', 'role', 'status', 'created at', 'actions']);
    const [selectedColumns, setSelectedColumns] = useState(tableColumns);
    const [employee, setEmployee] = useState({}); // employee.jsx page
    const [load, setLoad] = useState(true);

    const getToken = () => localStorage.getItem('employees-dashboard-token') || '';

    const resetForm = () => setForm({
        username: "",
        email: "",
        role: '',
        phone: '',
        address: '',
        password: '',
        status: '',
    });




    const toggleColumnsDropdown = () => {
        setShowFilterDropdown(false);
        setShowColumnsDropdown(!showColumnsDropdown);
    }
    const toggleFilterButton = () => {
        setShowColumnsDropdown(false);
        setShowFilterDropdown(!showFilterDropdown);
    }

    const openCreateEmployeeModal = () => { setModalMode('create'); setIsEmployeeModalOpen(true); }
    const openEditEmployeeModal = () => { setModalMode('edit'); setIsEmployeeModalOpen(true); }
    const closeEmployeeModal = () => {
        resetForm();
        setIsEmployeeModalOpen(false);
    }

    const getEmployees = async () => {
        const api = import.meta.env.VITE_DOMAIN + 'employees/';

        try {
            setLoad(true);
            const res = await fetch(api, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });
            const data = await res.json();

            if (!res.ok) {
                // displayError(data.errorMsg);
                return;
            }
            setEmployees(data.employees);

        } catch (error) {
            // displayError(error.message, 'get employees');
        } finally{
            setLoad(false);
        }
    };

    const createEmployee = async () => {
        const api = import.meta.env.VITE_DOMAIN + 'employees/';
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
                displayError(data.errorMsg, 'create employee');
                return { success: false };
            }
            setEmployees([...employees, data.employee]);
            closeEmployeeModal();
            return { success: true };
        } catch (error) {
            displayError(error.message, 'create employee');
            return { success: false };
        }
    }


    const editEmployee = async (employeeId) => {
        const api = import.meta.env.VITE_DOMAIN + 'employees/' + employeeId;

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
                displayError(data.errorMsg, 'edit employee');
                return { success: false };
            }
            setEmployees((prev) =>
                prev.map((employee) =>
                    employee._id === employeeId ? data.employee : employee
                )
            );
            setEmployee(data.employee); // employee.jsx page
            closeEmployeeModal();
            return { success: true, employee: data.employee };
        } catch (error) {
            displayError(error.message, 'edit employee');
            return { success: false };
        }
    }


    const deleteEmployee = async (employeeId) => {
        const api = import.meta.env.VITE_DOMAIN + 'employees/' + employeeId;

        try {

            const res = await fetch(api, {
                method: 'DELETE',
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });

            const data = await res.json();
            if (!res.ok) {
                displayError(data.errorMsg, 'delete employee');
                return { success: false };
            }
            setEmployees((prev) =>
                prev.filter((employee) =>
                    employee._id !== employeeId
                )
            );
            closeEmployeeModal();
            return { success: true, };
        } catch (error) {
            displayError(error.message, 'delete employee');
            return { success: false };
        }
    }


    const searchEmployees = async (search) => {
        const api = import.meta.env.VITE_DOMAIN + 'employees/search?search=' + search;
        try {

            const res = await fetch(api, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });

            const data = await res.json();
            if (!res.ok)
                return;
            //  displayError(data.errorMsg, 'search employees');

            setEmployees(data.employees);
        } catch (error) {
            // displayError(error.message, 'search employees');
        }
    }

    const filterEmployees = async () => {
        const query = new URLSearchParams(filter).toString();
        const api = import.meta.env.VITE_DOMAIN + `employees/filter?${query}`;
        try {
            const res = await fetch(api, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });

            const data = await res.json();
            if (!res.ok) return;
            displayError(data.errorMsg, 'filter employees');

            setEmployees(data.employees);
        } catch (error) {
            displayError(error.message, 'filter employees');
        }
    }


    // edit button of employee
    const handleEdit = (id) => {
        const employee = employees.find((employee) => employee._id === id);
        setForm({ ...employee, role: employee.role._id });
        openEditEmployeeModal();
    }

    // delete button of employee
    const handleDelete = async (id) => { await deleteEmployee(id); }

    // search bar
    const handleSearch = async (search) => {
        await searchEmployees(search);
    }

    // to make table responsive
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1050) {
                setSelectedColumns(['name', 'actions']);
                setTableColumns(['name', 'actions']);
            } else {
                setSelectedColumns(['name', 'email', 'role', 'status', 'created at', 'actions']);
                setTableColumns(['name', 'email', 'role', 'status', 'created at', 'actions']);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <EmployeeContext.Provider value={{
            showColumnsDropdown,
            setShowColumnsDropdown,
            toggleColumnsDropdown,
            showFilterDropdown,
            setShowFilterDropdown,
            toggleFilterButton,
            isEmployeeModalOpen,
            closeEmployeeModal,
            openCreateEmployeeModal,
            openEditEmployeeModal,
            modalMode,
            employees,
            createEmployee,
            resetForm,
            setForm,
            form,
            handleEdit,
            editEmployee,
            handleDelete,
            handleSearch,
            setFilter,
            filterEmployees,
            tableColumns,
            selectedColumns,
            setSelectedColumns,
            deleteEmployee,
            employee,
            setEmployee,
            getEmployees,
            load,
        }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployee = () => useContext(EmployeeContext);