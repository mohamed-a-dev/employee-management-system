import React, { useEffect, useState } from 'react'
import { useEmployee } from '../../context/EmployeeContext';

const ColumnsDropdown = () => {
    const { showColumnsDropdown, tableColumns, setSelectedColumns, selectedColumns, } = useEmployee();

    const toggleColumn = (curColumn) => {
        setSelectedColumns((prevColumns) => {
            const hasColumn = prevColumns.includes(curColumn);

            const updatedColumns = hasColumn
                ? prevColumns.filter((column) => column !== curColumn)
                : [...prevColumns, curColumn];

            return tableColumns.filter(col => updatedColumns.includes(col));
        });
    }

    const handleHideAll = () => setSelectedColumns([]);

    const handleShowAll = () => setSelectedColumns(tableColumns);

    


    return (
        <div className={`${showColumnsDropdown ? 'visible' : 'invisible'} p-2 w-70 absolute left-0 top-full bg-slate-400 dark:bg-slate-900 flex flex-col gap-5`}>
            <h1>Select Columns...</h1>
            {
                tableColumns.map((column) =>
                    <div key={column} className="flex items-center gap-4 text-sm">
                        <button onClick={() => toggleColumn(column)} className={`${selectedColumns.includes(column) ? 'bg-white dark:bg-slate-300' : 'bg-white/70 dark:bg-slate-700'} relative w-10 h-3 rounded-2xl bg-white cursor-pointer`}>
                            <p className={`${selectedColumns.includes(column) ? 'translate-x-6 ' : 'translate-x-0'} absolute duration-300 transition-transform top-0 -translate-y-0.5 w-4 h-4 rounded-full bg-slate-900 dark:bg-white`}></p>
                        </button>
                        <span className="text-sm font-semibold capitalize">{column}</span>
                    </div>
                )
            }
            <div className="flex justify-between items-center">
                <button onClick={handleHideAll} className="cursor-pointer">HideAll</button>
                <button onClick={handleShowAll} className="cursor-pointer">ShowAll</button>
            </div>
        </div>
    )
}

export default ColumnsDropdown