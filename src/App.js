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
  Navigate
} from "react-router-dom";
import  AUTHROUTER  from './component/RequireAuth';
import { useIdleTimer } from 'react-idle-timer'


  function App() {
  const getToken = GETTOKEN();
  const queryClient = new QueryClient();

  const handleOnIdle = event => {
    new Date().getMilliseconds
     localStorage.removeItem("authToken")
     alert("Seesion Has Been Expired")
  }

  const handleOnActive = event => {
    console.log('user is active', event)
    
  }

  const handleOnAction = event => {
    console.log('user did something', event)
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout:180000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500
  })
  return (

    <div className='App' id='App'>
      <QueryClientProvider client={queryClient}>
        {/* {getToken ? <LISTPAGE /> : <LOGIN />} */}
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LOGIN />} />
            <Route element={<AUTHROUTER />}>
              <Route path="/create" element={<CREATEINVOICE />} />  
              <Route path="/listpage" element={<LISTPAGE />} />       
              <Route path="/editInvoice/:id" element={<CREATEINVOICE/>} /> 
              <Route path="/preview/:id" element={<INVOICE/>} />             
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>

    </div>
  );
}

export default App;
