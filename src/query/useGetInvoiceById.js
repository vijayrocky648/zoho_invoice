import { axiosGet } from "../api/api";
import { GETTOKEN } from "./getToken";
import { QUERY_KEYS } from "./query";
import { SERVICE_URLS } from "./serviceurls";
import {useQuery} from 'react-query'



const getInvoice = async(id)=>{
    let token = GETTOKEN();    
    return axiosGet(SERVICE_URLS.GETINVOICEBYID(id),token)
}
export default function GetInvoice(id){
    return getInvoice(id);
}