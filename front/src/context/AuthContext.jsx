import { createContext, useContext, useEffect, useState } from 'react';
import { displayError } from '../utils/displayError';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(null);
    const token = localStorage.getItem('employees-dashboard-token');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({});

    const logout = () => {
        setIsAuth(null); // to prevent infinite loop in PublicRoute Wrapper 
        localStorage.removeItem('employees-dashboard-token');
        navigate('/login');
    }

    const verifyAuth = async () => {
        const api = import.meta.env.VITE_DOMAIN + 'auth/verify-auth';
        setLoading(true);
        try {
            const res = await fetch(api, {
                method: 'POST',
                headers: {
                    authorization: 'Bearer ' + token
                }
            });
            const data = await res.json();

            if (!res.ok || !data.success) {
                // displayError(data.errorMsg, 'verifyAuth')
                setIsAuth(false);
                return;
            }
            setIsAuth(true);
            setEmployee(data.employee);
        } catch (error) {
            setIsAuth(false);
            // displayError(error.message, 'verifyAuth')
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        verifyAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, token, setIsAuth, logout, employee, setEmployee }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);