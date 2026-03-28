import { FaBarsStaggered } from "react-icons/fa6";
import { useSidebar } from '../context/SidebarContext';
import { useTheme } from "../context/ThemeContext";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { toggleSidebar } = useSidebar();
    const { theme, toggleTheme } = useTheme();
    const dropdownRef = useRef(null);
    const [showdrop, setShowdrop] = useState(false);
    const toggleDropdown = () => setShowdrop(!showdrop);
    const { logout, employee } = useAuth();
    const { username, roleName } = employee;



    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setShowdrop(false);
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    return (

        <nav className='px-5 sticky top-0 z-100 flex items-center justify-between dark:bg-slate-950 dark:text-white bg-white shadow-xl duration-500 transition-colors'>
            <button onClick={toggleSidebar} className='py-6 text-2xl cursor-pointer'><FaBarsStaggered /></button>

            {/* <div className="relative">
                <span className="text-2xl absolute left-2 top-1/2 -translate-y-1/2"><CiSearch /></span>
                <input type="search" className="pl-9 py-6 w-50 md:w-70 outline-none border-0 dark:placeholder:text-white/40 placeholder:text-black/40" placeholder="Type to search" />
            </div> */}

            <main className="flex gap-5 items-center">
                <div className={`${theme === 'light' ? 'bg-slate-400' : 'bg-slate-50'} px-1 w-15 flex items-center rounded-2xl `}>
                    <button onClick={toggleTheme} className={`${theme === 'light' ? 'translate-x-0' : 'translate-x-7'} py-x duration-150 text-xl text-white cursor-pointer`}>🌙</button>
                </div>

                <div ref={dropdownRef} className="relative hidden sm:flex gap-2 items-center">
                    <div className="text-center">
                        <p className="capitalize">{username}</p>
                        <span className="text-sm opacity-45 capitalize">{roleName}</span>
                    </div>
                    <div className="overflow-hidden flex justify-center items-center">
                        <div className='relative'>
                            <img src="/user.png" className="w-10 h-10 rounded-full " alt="user" />
                            <span className='absolute left-1/2 top-1/2 -translate-1/2 capitalize'>{employee.username[0]}</span>
                        </div>
                    </div>
                    <button onClick={toggleDropdown} className="cursor-pointer"><IoIosArrowDown /></button>
                    <button onClick={logout} className={`${showdrop ? 'visible' : 'invisible'} py-1 absolute top-15 left-0 cursor-pointer hover:bg-slate-400 dark:bg-slate-700 dark:text-green-500  hover:text-white transition-colors duration-300 text-slate-900 border border-black bg-white w-full`}>Logout</button>
                </div>
            </main>



        </nav>
    )
}

export default Navbar