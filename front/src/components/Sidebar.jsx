import { NavLink } from 'react-router-dom'
import { links } from '../constants/nav-links'
import { IoMdClose } from "react-icons/io";
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { toggleSidebar } = useSidebar();
    const { logout, employee } = useAuth();

    return (
        <div className='h-screen overflow-hidden sticky top-0'>
            <nav className={`px-10 py-10 relative h-screen bg-slate-950 text-white`}>
                <header>
                    <div className='flex flex-col items-center'>
                        <div className='relative'>
                            <img src='/user.png' className='w-25 h-25 rounded-full' alt='user-loggined' />
                            <span className='absolute left-1/2 top-1/2 -translate-1/2 capitalize text-2xl'>{employee.username[0]}</span>
                        </div>
                        <p className='text-xl capitalize text-white'>{employee.username}</p>
                    </div>
                </header>
                <div className='flex flex-col items-center md:block'>
                    <ul className='mt-10'>
                        {
                            links.map((link, i) =>
                                <li key={i} className=' hover:bg-white/20 gap-2 text-xl'>
                                    <NavLink to={link.path} className={(({ isActive }) => `${isActive ? 'text-green-500' : ''} duration-300 px-2 py-2 flex items-center gap-2`)}>
                                        <div>{link.icon}</div>
                                        <span className='capitalize'>{link.name}</span>
                                    </NavLink>
                                </li>)
                        }
                    </ul>
                </div>

                <button onClick={logout} className='px-2 py-2 mt-5 w-full cursor-pointer duration-300 text-green-500 bg-slate-800 hover:bg-slate-700'>Logout</button>
                <button onClick={toggleSidebar} className='md:hidden absolute top-3 right-3 text-2xl cursor-pointer'><IoMdClose /></button>
            </nav>
        </div>

    )
}

export default Sidebar