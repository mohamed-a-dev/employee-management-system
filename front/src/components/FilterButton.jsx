import React from 'react'
import { IoFilterSharp } from 'react-icons/io5'

const FilterButton = ({toggleFilterButton}) => {
    return (
        <button onClick={toggleFilterButton} className='flex items-center gap-1 cursor-pointer'>
            <span className='text-2xl'><IoFilterSharp /></span>
            <p>FILTERS</p>
        </button>)
}

export default FilterButton