export  const  HTTP_HEADER = (authToken) => {    
    let _header = {};
    Object.assign(_header,{
        'Authorization': `Zoho-oauthtoken ${authToken}`,
        'X-com-zoho-invoice-organizationid':process.env.REACT_APP_ORGANISATION_ID,
        'Content-Type': 'application/json',
        'mode':'cors'
    })
    return {
        GET:{
            method:METHODS.GET,
            mode:'cors',
            headers:_header,
            credentials:'include'
        },
        POST:{
            method:METHODS.POST,
            mode:'cors',
            headers:_header,
            credentials:'include'
        },
        DELETE:{
            method:METHODS.DELETE,
            mode:'cors',
            headers:_header,
            credentials:'include'
        },
        PUT:{
            method:METHODS.DELETE,
            mode:'cors',
            headers:_header,
            credentials:'include'
        }

    }
}
export const METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete'
}