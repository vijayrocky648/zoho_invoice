import { axiosGet } from "../api/api";
import { GETTOKEN } from "./getToken";
import { QUERY_KEYS } from "./query";
import { SERVICE_URLS } from "./serviceurls";
import {useQuery} from 'react-query'



const getContactById = async(id)=>{
    let token = GETTOKEN();    
    return axiosGet(SERVICE_URLS.GET_CONTACT_BY_ID(id),token)
}
export default function getContact(id){
    return getContactById(id);
}