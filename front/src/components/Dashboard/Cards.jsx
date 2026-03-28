import React from 'react'
import { FaUsers } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { GrInProgress } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { useDashboard } from '../../context/DashboardContext';

const Cards = () => {
    const { employeesStats, tasksStats } = useDashboard();
    const { employeesCount, activeEmployeesCount } = employeesStats;
    const { tasksCount, completedTasksCount, PendingTasksCount, inProgressTasksCount } = tasksStats;

    const cards = [
        { icon: <FaUsers />, number: employeesCount, label: 'Total Employees', percent: '0.25', arrow: <FaArrowDown />, percentColor: 'text-blue-500' },
        { icon: <FaUserCheck />, number: activeEmployeesCount, label: 'Active Employees', percent: '0.66', arrow: <FaArrowUp />, percentColor: 'text-green-500' },
        { icon: <FaClipboardList />, number: tasksCount, label: 'Total Tasks', percent: '0.72', arrow: <FaArrowDown />, percentColor: 'text-blue-500' },
        { icon: <MdOutlinePendingActions />, number: PendingTasksCount, label: 'Pending Tasks', percent: '0.14', arrow: <FaArrowUp />, percentColor: 'text-green-500' },
        { icon: <GrInProgress />, number: inProgressTasksCount, label: 'In Progress Tasks', percent: '0.14', arrow: <FaArrowUp />, percentColor: 'text-green-500' },
        { icon: <FaCheckCircle />, number: completedTasksCount, label: 'Completed Tasks', percent: '0.18', arrow: <FaArrowUp />, percentColor: 'text-green-500' },
    ];
    return (
        <article className='grid md:grid-cols-[1fr_1fr] xl:grid-cols-[1fr_1fr_1fr] gap-5'>
            {
                cards.map((card, i) => {
                    const { icon, number, label, percent, arrow, percentColor } = card;
                    return (
                        <div key={i} className='p-5 duration-300 dark:bg-slate-900 bg-white dark:text-white text-black dark:shadow-none shadow-xl'>
                            <div className='p-2 w-9 h-9 flex items-center justify-center bg-slate-300 text-green-500 text-2xl rounded-full'>{icon}</div>
                            <div className='mt-3'>
                                <p>{number}</p>
                                <div className='flex items-center justify-between'>
                                    <span className='opacity-60 text-sm'>{label}</span>
                                    <div className={`flex items-center ${percentColor}`}>
                                        <span>{percent}%</span>
                                        <span className='text-sm'>{arrow}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </article>)
}

export default Cards