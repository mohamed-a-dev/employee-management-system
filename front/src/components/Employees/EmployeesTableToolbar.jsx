import React from 'react'
import { HiViewColumns } from "react-icons/hi2";
import { IoFilterSharp } from "react-icons/io5";
import { useEmployee } from '../../context/EmployeeContext';
import FilterButton from '../FilterButton';

const EmployeesTableToolbar = () => {
    const { toggleColumnsDropdown, toggleFilterButton } = useEmployee();

    return (
        <section className='flex items-center gap-5 text-sm font-semibold dark:text-white'>
            <button onClick={toggleColumnsDropdown} className='flex items-center gap-1 cursor-pointer'>
                <span className='text-2xl'><HiViewColumns /></span>
                <p>COLUMNS</p>
            </button>
            <FilterButton toggleFilterButton={toggleFilterButton} />
        </section>
    )
}

export default EmployeesTableToolbar