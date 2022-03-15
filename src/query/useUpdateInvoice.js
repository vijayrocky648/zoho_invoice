import { axiosPost, axiosPut } from "../api/api";
import { GETTOKEN } from "./getToken";
import { QUERY_KEYS } from "./query";
import { SERVICE_URLS } from "./serviceurls";
import {useQuery,useMutation} from 'react-query'



const updateInvoiceById = async(data)=>{
    debugger;
    let token = GETTOKEN();    
    return axiosPut(SERVICE_URLS.UPDATE_INVOICE(data.id),token,data.data)
}
export default function useUpdateInvoice(){
    return useMutation(updateInvoiceById)
}