import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
   return localStorage.getItem("authToken")
};

const AUTHROUTER = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default AUTHROUTER;