export const GETTOKEN = ()=>{
    let token = localStorage.getItem("authToken");
    return token;
}