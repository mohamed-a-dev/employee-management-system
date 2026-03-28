import { AiOutlineDashboard } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import Employees from "../pages/Employees";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Roles from "../pages/Roles";
import Settings from "../pages/Settings";

export const links = [
    { name: 'dashboard', path: '/', icon: <AiOutlineDashboard />, element: <Dashboard/> },
    { name: 'employees', path: '/employees', icon: <FaUserFriends />, element: <Employees/> },
    { name: 'tasks', path: '/tasks', icon: <FaTasks />, element: <Tasks/> },
    { name: 'roles', path: 'roles/', icon: <FaLock />, element: <Roles/> },
    { name: 'settings', path: 'settings/', icon: <IoMdSettings />, element: <Settings/> },
]
