import { Navigate } from "react-router-dom";
import { displayError } from "../utils/displayError";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
    const {isAuth, token} = useAuth();
    if (!token)
        return <Navigate to="/login" replace />;

    if (isAuth === null)
        return <></>
    if (isAuth)
        return children;
    if (isAuth === false)
        <Navigate to="/login" replace />;
};

export default ProtectedRoute;