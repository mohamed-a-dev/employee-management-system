import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            document.documentElement.classList.add('dark');
            localStorage.setItem('dashboard-theme', 'dark')
        }
        else {
            setTheme('light');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('dashboard-theme', 'light')
        }
    };

    useEffect(() => {
        const localStorageTheme = localStorage.getItem('dashboard-theme');
        if (localStorageTheme) {
            setTheme(localStorageTheme);
            if (localStorageTheme === 'dark')
                document.documentElement.classList.add(localStorageTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);