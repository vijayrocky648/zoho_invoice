import axios from 'axios';
import {HTTP_HEADER} from './apiHeader'

export const  axiosGet = async (url,token)=>{
   
    let header = HTTP_HEADER(token).GET;
    console.log("Checking Header",header)
    return  await axios.get(url,header)
}
export const axiosPost = async (url,token,data)=>{
    return axios.post(url,JSON.stringify(data),HTTP_HEADER(token).POST)
}