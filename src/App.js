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
  Navigate,
} from "react-router-dom";


function App() {
  const getToken = GETTOKEN();
  const queryClient = new QueryClient();

  useEffect(() => {

  }, [])
  return (

    <div className='App' id='App'>
      <QueryClientProvider client={queryClient}>
        {/* {getToken ? <LISTPAGE /> : <LOGIN />} */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LOGIN />}/>
            <Route path="/createinvoice" element={<CREATEINVOICE />}/>
            <Route path="/editInvoice/:id" element={<CREATEINVOICE />}/>
            <Route path="/listpage" element={<LISTPAGE/>}/>
            <Route path="/preview/:id" element={<INVOICE/>}/>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>

    </div>
  );
}

export default App;
