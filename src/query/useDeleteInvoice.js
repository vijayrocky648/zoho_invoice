import { axiosDelete, axiosPost,axiosGet } from "../api/api";
import { GETTOKEN } from "./getToken";
import { QUERY_KEYS } from "./query";
import { SERVICE_URLS } from "./serviceurls";
import {useQuery,useMutation} from 'react-query'



const deleteInvoice = async(id)=>{
  
    let token = GETTOKEN();    
    return axiosDelete(SERVICE_URLS.DELETEINVOICE(id),token)
}
export default function useDeleteInvoice(){
  
    
    return useMutation(deleteInvoice)
}