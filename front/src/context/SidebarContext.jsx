import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
    const [showSidebar, setShowSidebar] = useState(true);
    const toggleSidebar = () => setShowSidebar(!showSidebar);
    

    return (
        <SidebarContext.Provider value={{ showSidebar, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);