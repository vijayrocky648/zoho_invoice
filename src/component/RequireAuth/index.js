import { Navigate, Outlet } from "react-router-dom";

 export const useAuth = () => {
   return localStorage.getItem("authToken")
};

const AUTHROUTER = () => {
  debugger
  const isAuth = useAuth();
  return isAuth!=null ? <Outlet /> : <Navigate to="/" />;
};

export default AUTHROUTER;