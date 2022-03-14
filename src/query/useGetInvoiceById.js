import { axiosGet } from "../api/api";
import { GETTOKEN } from "./getToken";
import { QUERY_KEYS } from "./query";
import { SERVICE_URLS } from "./serviceurls";
import {useQuery} from 'react-query'



const getInvoice = async(id)=>{
    let token = GETTOKEN();    
    return axiosGet(SERVICE_URLS.GETINVOICEBYID(id),token)
}
export default function useGetInvoice (id){
    return useQuery([QUERY_KEYS.INVOICE_DETAILS_BY_ID,id],()=>getInvoice(id),{cacheTime:5000,staleTime:Infinity})
}