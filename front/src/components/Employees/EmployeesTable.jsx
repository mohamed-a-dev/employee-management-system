import { useEmployee } from "../../context/EmployeeContext";
import ColumnsDropdown from "./ColumnsDropdown";
import EmployeesTableToolbar from "./EmployeesTableToolbar";
import FilterDropdown from "../FilterDropdown";
import { Link } from "react-router-dom";

const EmployeesTable = () => {
    const { showFilterDropdown, handleEdit, handleDelete, employees, setFilter, filterEmployees, selectedColumns } = useEmployee();

    return (
        <main>
            <EmployeesTableToolbar />
            <table className="w-full text-left dark:shadow-none shadow-2xl dark:text-white">
                <thead className="relative bg-slate-900 text-white">
                    <tr>
                        {
                            selectedColumns.map((column) => <th className="p-3 capitalize">{column}</th>)
                        }
                    </tr>
                    <ColumnsDropdown />
                    <FilterDropdown showFilterDropdown={showFilterDropdown} setFilter={setFilter} filterAction={filterEmployees} />
                </thead>

                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id} className="border-b last:border-none border-slate-900/50 dark:border-white/50 ">
                            {selectedColumns.includes('name') && <td className="p-3 truncate max-w-40 capitalize">{emp.username}</td>}
                            {selectedColumns.includes('email') && <td className="p-3 truncate max-w-40">{emp.email}</td>}
                            {selectedColumns.includes('role') && <td className="p-3 capitalize">{emp.role?.roleName}</td>}
                            {selectedColumns.includes('status') && <td className="p-3 capitalize">{emp.status}</td>}
                            {selectedColumns.includes('created at') && <td className="p-3">{emp.createdAt.split('T')[0]}</td>}

                            {
                                selectedColumns.includes('actions')
                                &&
                                <td className="p-3 flex gap-2">
                                    <Link to={`/employees/${emp._id}`} className="text-yellow-500 cursor-pointer">View</Link>
                                    <button onClick={() => handleEdit(emp._id)} className="text-blue-500 cursor-pointer">Edit</button>
                                    <button onClick={() => handleDelete(emp._id)} className="text-red-500 cursor-pointer">Delete</button>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}

export default EmployeesTable