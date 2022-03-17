import { axiosPost } from "../api/api";
import { GETTOKEN } from "./getToken";
import { QUERY_KEYS } from "./query";
import { SERVICE_URLS } from "./serviceurls";
import {useQuery,useMutation} from 'react-query'



const addCustomer = async(data)=>{
  
    let token = GETTOKEN();    
    return axiosPost(SERVICE_URLS.ADDCUSTOMER,token,data)
}
export default function useAddCustomer(){
    return useMutation(addCustomer)
}