import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { useRole } from "../context/RoleContext";

const FilterDropdown = ({ showFilterDropdown, setFilter, filterAction }) => {
    const { pathname } = useLocation();
    const keys = pathname === '/tasks' ? ['title', 'description'] : ['username', 'email', 'role', 'status', 'createdAt'];
    const [selectedField, setSelectedField] = useState(pathname === '/tasks' ? 'title' : 'username');
    const [filterValue, setFilterValue] = useState('');
    const handleInputChange = (e) => {
        setFilterValue(e.target.value);
        setFilter(prev => {
            const newObj = { ...prev };
            keys.forEach(key => {
                delete newObj[key];
            });
            return { ...newObj, [e.target.name]: e.target.value };
        });
    }

    const handleSelectChange = (e) => {
        let value = e.target.value;
        if (e.target.value === 'all')
            value = '';
        if (pathname === '/employees')
            setFilter({ [e.target.name]: value })
        else {
            if (e.target.name === 'fields') {
                setFilter(prev => {
                    const newObj = { ...prev };
                    keys.forEach(key => {
                        delete newObj[key];
                    });
                    return { ...newObj, [e.target.value]: filterValue };
                });
            }
            else
                setFilter((prev) => ({ ...prev, [e.target.name]: value }))

        }
    }

    const { roles } = useRole();


    return (
        <div className={`${showFilterDropdown ? 'visible' : 'invisible'} p-2 absolute left-0 top-full bg-slate-400 dark:text-white dark:bg-slate-500 text-black `}>
            <div className='grid grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] xl:grid-cols-[1fr_1fr_1fr_1fr_1fr] items-center gap-5'>
                <div>
                    <p className='text-sm opacity-70'>Fields</p>
                    <select name="fields" onChange={(e) => {
                        setSelectedField(e.target.value);
                        handleSelectChange(e);
                    }} className='pr-20 py-1 outline-none capitalize text-sm font-semibold border-b dark:text-white'>
                        {

                            keys.map((ele) => <option key={ele} className='text-sm dark:bg-slate-900 capitalize dark:text-white text-black' value={ele}>{ele === 'createdAt' ? 'Created At' : ele}</option>)

                        }
                    </select>
                </div>
                <div>
                    <p className='text-sm opacity-70'>Value</p>
                    {selectedField === 'createdAt' ? 
                        <input name={selectedField} value={filterValue} onChange={handleInputChange} type="date" className='py-1 text-sm outline-none border-b font-semibold dark:placeholder:text-white/50 placeholder:text-black/80 placeholder:font-normal dark:scheme-dark' placeholder='Filter value' />
                    :
                        <input name={selectedField} value={filterValue} onChange={handleInputChange} type="text" className='py-1 text-sm outline-none border-b font-semibold dark:placeholder:text-white/50 placeholder:text-black/80 placeholder:font-normal' placeholder='Filter value' />
                    }
                </div>
                {
                    pathname === '/tasks'
                    &&
                    <>
                        <div>
                            <p className='text-sm opacity-70'>Status</p>
                            <select onChange={handleSelectChange} name="status" className='pr-20 py-1 capitalize outline-none text-sm font-semibold border-b dark:text-white'>
                                {

                                    ['all', 'pending', 'in progress', 'completed'].map((ele) => <option key={ele} className='text-sm dark:bg-slate-900 dark:text-white text-black' value={ele}>{ele}</option>)

                                }
                            </select>
                        </div>

                        <div>
                            <p className='text-sm opacity-70'>Creator</p>
                            <select onChange={handleSelectChange} name="creator" className='pr-20 py-1 capitalize outline-none text-sm font-semibold border-b dark:text-white'>
                                {

                                    [{ roleName: 'all' }, ...roles].map((role) => <option key={role.roleName} className='text-sm dark:bg-slate-900 dark:text-white text-black' value={role.roleName}>{role.roleName}</option>)

                                }
                            </select>
                        </div>

                        <div>
                            <p className='text-sm opacity-70'>Deadline</p>
                            <input name="deadline" type="date" onChange={handleSelectChange} className="py-1 text-sm outline-none border-b font-semibold dark:placeholder:text-white/50" />
                        </div>
                    </>

                }
            </div>
            <div className=' flex justify-end'>
                <button onClick={filterAction} className='mt-3 px-5 py-1 cursor-pointer hover:bg-slate-800 duration-300 transition-colors dark:bg-slate-700 bg-slate-900 text-green-500'>Filter</button>
            </div>
        </div>
    )
}

export default FilterDropdown