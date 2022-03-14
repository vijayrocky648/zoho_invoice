import { axiosGet } from "../api/api";
import { GETTOKEN } from "./getToken";
import { QUERY_KEYS } from "./query";
import { SERVICE_URLS } from "./serviceurls";
import {useQuery} from 'react-query'



const getContact = async()=>{
    let token = GETTOKEN();    
    return axiosGet(SERVICE_URLS.GET_CONTACT_INFO,token)
}
export default function useGetContactInfo (){
    return useQuery(QUERY_KEYS.CONTACT_INFO,()=>getContact(),{cacheTime:5000,staleTime:Infinity})
}