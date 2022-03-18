import { axiosPost, axiosPut } from "../api/api";
import { GETTOKEN } from "./getToken";
import { QUERY_KEYS } from "./query";
import { SERVICE_URLS } from "./serviceurls";
import {useQuery,useMutation} from 'react-query'



const updateContact = async(data)=>{    
  
    let token = GETTOKEN();    
    return axiosPut(SERVICE_URLS.UPDATE_CONTACT(data.id),token,data.data)
}
export default function useUpdateContact(){
    return useMutation(updateContact)
}