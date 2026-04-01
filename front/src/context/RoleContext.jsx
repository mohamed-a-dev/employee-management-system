import { createContext, useContext, useEffect, useState } from 'react';
import { displayError } from '../utils/displayError';

const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create');
    const [roles, setRoles] = useState([]);
    const [roleName, setRoleName] = useState("");
    const [permissions, setPermissions] = useState({
        'createEmployee': false,
        'editEmployee': false,
        'deleteEmployee': false,
        'createTask': false,
        'editTask': false,
        'deleteTask': false,
        'viewDashboard': false,
    });
    const [roleID, setRoleID] = useState('');

    const [load, setLoad] = useState(true);

    const getToken = () => localStorage.getItem('employees-dashboard-token') || '';


    const resetForm = () => {
        setRoleID('');
        setRoleName('');
        setPermissions({
            'createEmployee': false,
            'editEmployee': false,
            'deleteEmployee': false,
            'createTask': false,
            'editTask': false,
            'deleteTask': false,
            'viewDashboard': false,
        }
        );
    }

    const openCreateRoleModal = () => {
        setModalMode('create');
        setIsRoleModalOpen(true)
    }

    const openEditRoleModal = () => {
        setModalMode('edit');
        setIsRoleModalOpen(true)
    }
    const closeRoleModal = () => {
        resetForm();
        setIsRoleModalOpen(false)
    };

    const getRoles = async () => {
        const api = import.meta.env.VITE_API_URL + 'roles';
        try {
            setLoad(true);
            const res = await fetch(api, {
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });
            const data = await res.json();
            if (!res.ok) {
                // displayError(data.errorMsg, 'get roles');
                return { success: false };
            }
            setRoles(data.roles);

            return { success: true };
        } catch (error) {
            // displayError(error.message, 'get roles');
            return ({ success: false });
        } finally {
            setLoad(false);
        }
    }

    const createRole = async (newRole) => {
        const api = import.meta.env.VITE_API_URL + 'roles';
        try {
            const res = await fetch(api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + getToken()
                },
                body: JSON.stringify(newRole)
            });
            const data = await res.json();
            if (!res.ok) {
                displayError(data.errorMsg, 'create role');
                return { success: false };
            }
            setRoles([...roles, data.role]);
            return { success: true };
        } catch (error) {
            displayError(error.message, 'create role');
            return ({ success: false });
        }
    }



    const deleteRole = async (roleId) => {
        const api = import.meta.env.VITE_API_URL + 'roles/' + roleId;
        try {

            const res = await fetch(api, {
                method: 'DELETE',
                headers: {
                    authorization: 'Bearer ' + getToken()
                }
            });

            const data = await res.json();
            if (!res.ok) {
                displayError(data.errorMsg, 'delete role');
                return { success: false };
            }
            setRoles((prev) =>
                prev.filter((role) =>
                    role._id !== roleId
                )
            );
            closeRoleModal();
            return { success: true };
        } catch (error) {
            displayError(error.message, 'delete role');
            return { success: false };
        }
    }

    const editRole = async () => {
        const api = import.meta.env.VITE_API_URL + 'roles/' + roleID;

        try {

            const res = await fetch(api, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + getToken()
                },
                body: JSON.stringify({ roleName, permissions })
            });

            const data = await res.json();
            if (!res.ok) {
                displayError(data.errorMsg, 'edit role');
                return { success: false };
            }
            setRoles((prev) =>
                prev.map((role) =>
                    role._id === roleID ? data.role : role
                )
            );
            closeRoleModal();
            return { success: true };
        } catch (error) {
            displayError(error.message, 'edit role');
            return { success: false };
        }
    }

    useEffect(()=>{
        getRoles();
    },[])


    return (
        <RoleContext.Provider value={{
            isRoleModalOpen, openCreateRoleModal, closeRoleModal, openEditRoleModal,
            modalMode,
            roles,
            createRole,
            deleteRole,
            permissions,
            setPermissions,
            setRoleName,
            roleName,
            editRole,
            setRoleID,
            getRoles,
            load,
            setRoles,
        }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => useContext(RoleContext);
