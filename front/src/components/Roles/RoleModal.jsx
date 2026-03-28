"use client";
import { useState } from "react";
import { useRole } from "../../context/RoleContext";

export default function RoleModal() {
    const { isRoleModalOpen, closeRoleModal, modalMode, createRole, setPermissions, permissions, roleName, setRoleName, editRole } = useRole();


    const handlePermissionChange = (perm) => {
        setPermissions((prev) => ({
            ...prev,
            [perm]: !prev[perm],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newRole = {
            roleName,
            permissions,
        };
        const { success } = modalMode === 'create' ? await createRole(newRole) : await editRole();
        if (success)
            closeRoleModal();
    };



    if (!isRoleModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-105">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 dark:border dark:text-white dark:placeholder:text-white w-80 sm:w-100 md:w-120  p-6">


                <h2 className="text-xl font-semibold mb-4">
                    {modalMode === 'create' ? 'Create New' : 'Edit'} Role
                </h2>
                {/* Role Name */}
                <div className="mb-4">
                    <label className="block text-sm mb-1">Role Name:</label>
                    <input
                        type="text"
                        className="w-full p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        placeholder="Type role name..."
                        required
                    />
                </div>

                <p className="text-lg mb-1">Permissions:</p>
                {/* Permissions */}
                <div className="grid grid-cols-2 gap-2 mb-6">

                    {Object.keys(permissions).map((perm) => (
                        <label key={perm} className="flex items-center gap-2 capitalize">
                            <input
                                type="checkbox"
                                checked={permissions[perm]}
                                onChange={() => handlePermissionChange(perm)}
                            />
                            {perm}
                        </label>
                    ))}

                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2 pt-2">

                    <button
                        type="button"
                        onClick={closeRoleModal}
                        className="px-4 py-2  cursor-pointer duration-300 bg-slate-700 text-white hover:bg-slate-800"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-4 pty-2 text-green-500 bg-slate-700 hover:bg-slate-800 duration-300  cursor-pointer"
                    >
                        {modalMode === 'create' ? 'Create' : 'Edit'}
                    </button>

                </div>
            </form>
        </div>
    );
}