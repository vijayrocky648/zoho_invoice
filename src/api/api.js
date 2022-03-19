import axios from 'axios';
import {HTTP_HEADER} from './apiHeader'

export const  axiosGet = async (url,token)=>{
   
    let header = HTTP_HEADER(token).GET;

    return  await axios.get(url,header)
}
export const axiosPost = async (url,token,data)=>{
    return axios.post(url,JSON.stringify(data),HTTP_HEADER(token).POST)
}
export const axiosPut = async (url,token,data)=>{
    return axios.put(url,JSON.stringify(data),HTTP_HEADER(token).PUT)
}
export const axiosDelete = async (url,token)=>{
    return axios.delete(url,HTTP_HEADER(token).DELETE)
}