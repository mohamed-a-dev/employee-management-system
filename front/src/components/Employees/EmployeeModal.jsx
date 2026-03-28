import { useEmployee } from "../../context/EmployeeContext";
import { useRole } from "../../context/RoleContext";

export default function EmployeeModal() {
    const { isEmployeeModalOpen, closeEmployeeModal, modalMode, createEmployee, resetForm, setForm, form, editEmployee } = useEmployee();
    const {roles} = useRole();


    const handleChange = (e) => {        
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { success } = modalMode === 'create' ? await createEmployee() : await editEmployee(form._id);
        if (success)
            resetForm();
    };

    if (!isEmployeeModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-105">

            <div className="bg-white dark:bg-slate-900 dark:border dark:text-white dark:placeholder:text-white w-80 sm:w-100 md:w-120  p-6">

                <h2 className="text-xl font-semibold mb-4">
                    {modalMode === 'create' ? 'Create New' : 'Edit'} Employee
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Username */}
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        className="w-full p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50"
                        value={form.username}
                        onChange={handleChange}
                    />

                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50"
                        value={form.email}
                        onChange={handleChange}
                    />

                    {/* Phone */}
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        required
                        className="w-full p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50"
                        value={form.phone}
                        onChange={handleChange}
                    />

                    {/* Address */}
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        required
                        className="w-full  p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50"
                        value={form.address}
                        onChange={handleChange}
                    />

                    {
                        modalMode === 'create'
                        &&
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            className="w-full  p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50"
                            value={form.password}
                            onChange={handleChange}
                        />

                    }

                    {/* Role */}
                    <select
                        name="role"
                        required
                        className="w-full  p-2 capitalize outline-none border-b dark:border-white/50 dark:bg-slate-800/50"
                        value={form.role}
                        onChange={handleChange}
                    >
                        <option value="" hidden>Select Role</option>
                        {
                            roles.map((role) => <option key={role._id} value={role._id} className="dark:bg-slate-800 dark:text-white">{role.roleName}</option>)
                        }
                    </select>

                    {/* Status */}
                    <select
                        name="status"
                        required
                        className="w-full p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="" hidden>
                            Select Status
                        </option>

                        <option value="active" className="dark:bg-slate-800 dark:text-white">
                            Active
                        </option>

                        <option value="suspended" className="dark:bg-slate-800 dark:text-white">
                            Suspended
                        </option>
                    </select>


                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-2">

                        <button
                            type="button"
                            onClick={closeEmployeeModal}
                            className="px-4 py-2  cursor-pointer duration-300 bg-slate-700 text-white hover:bg-slate-800"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 text-green-500 bg-slate-700 hover:bg-slate-800 duration-300  cursor-pointer"
                        >
                            {
                                modalMode === 'create' ? 'Create' : 'Edit'
                            }
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}