import { axiosGet } from "../api/api";
import { GETTOKEN } from "./getToken";
import { QUERY_KEYS } from "./query";
import { SERVICE_URLS } from "./serviceurls";
import {useQuery} from 'react-query'



const getInvoice = async()=>{
    let token = GETTOKEN();    
    return axiosGet(SERVICE_URLS.GETINVOICEDETAILS,token)
}
export default function useGetInvoice (){
    return useQuery(QUERY_KEYS.INVOICE_DETAILS,()=>getInvoice(),{cacheTime:5000,staleTime:Infinity})
}