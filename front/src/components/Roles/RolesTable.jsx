import React from 'react'
import { useRole } from '../../context/RoleContext';

const RolesTable = () => {
    const { openEditRoleModal, roles, deleteRole, setPermissions, setRoleName,setRoleID } = useRole();

    const handleDelete = async (role) => await deleteRole(role._id);
    const handleEdit = (role) => {
        const { roleName, permissions } = role;
        setRoleID(role._id);
        setRoleName(roleName);
        setPermissions(permissions);
        openEditRoleModal();
    }


    return (

        <div className="overflow-x-auto">
            <table className="w-full text-left dark:shadow-none shadow-2xl dark:text-white">
                <thead className="relative bg-slate-900 text-white">
                    <tr>
                        <th className="py-3 px-4">Role Name</th>
                        {/* <th className="py-3 px-4">Permissions</th> */}
                        {/* <th className="py-3 px-4">Users Assigned</th> */}
                        <th className="py-3 px-4">Actions</th>
                    </tr>
                </thead>

                <tbody className="text-gray-700 dark:text-gray-200">
                    {
                        roles.map((role) =>
                            <tr key={role._id} className="border-b last:border-none capitalize border-slate-900/50 dark:border-white/50">
                                <td className="py-3 px-4 font-medium">{role.roleName}</td>
                                {/* <td class="py-3 px-4">10</td> */}
                                {/* <td class="py-3 px-4">2</td> */}
                                <td className="p-3 flex gap-2">
                                    <button onClick={() => handleEdit(role)} className="text-blue-500 cursor-pointer">Edit</button>
                                    <button onClick={() => handleDelete(role)} className="text-red-500 cursor-pointer">Delete</button>
                                </td>
                            </tr>)
                    }

                </tbody>
            </table>
        </div>)
}

export default RolesTable