import { useAuth } from "../../context/AuthContext";
import { useTask } from "../../context/TaskContext";

export default function TaskModal() {
    const { isTaskModalOpen, closeTaskModal, modalMode, form, setForm, createTask, editTask, resetForm, employees } = useTask();
    const { employee } = useAuth();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success } = modalMode === 'create' ? await createTask() : await editTask();
        if (success)
            resetForm();
    };

    if (!isTaskModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-105">

            <div className="bg-white dark:bg-slate-900 dark:border dark:text-white dark:placeholder:text-white w-80 sm:w-100 md:w-120  p-6">

                <h2 className="text-xl font-semibold mb-4">
                    {modalMode === 'create' ? 'Create New' : 'Edit'} Task
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        className="w-full p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50 disabled:cursor-not-allowed"
                        value={form.title}
                        onChange={handleChange}
                        disabled={employee.roleName === 'employee' ? true : false}
                    />

                    {/* Email */}
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        className="w-full p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50 disabled:cursor-not-allowed"
                        value={form.description}
                        onChange={handleChange}
                        disabled={employee.roleName === 'employee' ? true : false}
                    />

                    <select
                        value={form.assignedTo}
                        onChange={handleChange}
                        name="assignedTo"
                        className=" w-full p-2 outline-none border-b capitalize dark:border-white/50 dark:bg-slate-800/50 disabled:cursor-not-allowed"
                        disabled={employee.roleName === 'employee' ? true : false}
                    >
                        <option value="" hidden>Assign To Employee</option>

                        {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>
                                {emp.username}
                            </option>
                        ))}
                    </select>

                    {
                        modalMode === 'edit'
                        &&
                        <label>
                            <span className="opacity-60">Status:</span>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full p-2 outline-none border-b capitalize dark:border-white/50 dark:bg-slate-800/50"
                            >
                                {['pending', 'in progress', 'completed'].map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </label>
                    }

                    <label>
                        <span className="opacity-60">Deadline:</span>
                        <input
                            type="date"
                            name="deadline"
                            placeholder="Deadline"
                            className="w-full p-2 outline-none border-b dark:border-white/50 dark:bg-slate-800/50 dark:scheme-dark disabled:cursor-not-allowed"
                            value={form.deadline.split('T')[0]}
                            onChange={handleChange}
                            disabled={employee.roleName === 'employee' ? true : false}
                        />
                    </label>



                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-2">

                        <button
                            type="button"
                            onClick={closeTaskModal}
                            className="px-4 py-2  cursor-pointer duration-300 bg-slate-700 text-white hover:bg-slate-800"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 text-green-500 bg-slate-700 hover:bg-slate-800 duration-300  cursor-pointer"
                        >
                            {modalMode === 'create' ? 'Create' : 'Edit'}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
}