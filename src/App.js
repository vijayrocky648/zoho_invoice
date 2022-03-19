import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import HEADER from './component/Header'
import INVOICE from './component/EditInvoice'
import CREATEINVOICE from './component/CreateInvoice';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { GETTOKEN } from './query/getToken';
import LOGIN from './component/Login';
import { useEffect } from 'react';
import LISTPAGE from './component/ListInvoice';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate, Outlet,useLocation
} from "react-router-dom";
import AUTHROUTER, { useAuth } from './component/RequireAuth';
import { useIdleTimer } from 'react-idle-timer'
import { useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const getToken = GETTOKEN();
  const queryClient = new QueryClient();

  const handleOnIdle = event => {
    console.log(location)
    localStorage.removeItem("authToken")

    alert("Seesion Has Been Expired")
    navigate('/');
  }

  const ProtectedRoute = ({ redirectPath = '/landing' }) => {
    if (!useAuth) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  const handleOnActive = event => {

   
  }

  const handleOnAction = event => {

  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 180000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })
  return (

    <div className='App' id='App'>
      <QueryClientProvider client={queryClient}>
        {/* {getToken ? <LISTPAGE /> : <LOGIN />} */}
       
          <Routes>
            <Route exact path="/" element={<LOGIN />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/create" element={<CREATEINVOICE />} />
              <Route path="/listpage" element={<LISTPAGE />} />
              <Route path="/editInvoice/:id" element={<CREATEINVOICE />} />
              <Route path="/preview/:id" element={<INVOICE />} />
            </Route>
          </Routes>
        
      </QueryClientProvider>

    </div>
  );
}

export default App;
