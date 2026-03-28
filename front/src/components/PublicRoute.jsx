import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { isAuth, token } = useAuth();
  
  if (!isAuth || !token)
    return children;

  if (isAuth)
    return <Navigate to={'/'} replace />
}

export default PublicRoute