export const SERVICE_URLS = {
    GET_CONTACT_INFO : '/api/v3/contacts',
    ADDINVOICE : '/api/v3/invoices',
    GETINVOICEDETAILS:"/api/v3/invoices",
    GETINVOICEBYID : (id)=>`/api/v3/invoices/${id}`,
    UPDATE_INVOICE:(id)=>`/api/v3/invoices/${id}`,
    ADDCUSTOMER:"/api/v3/contacts",
    DELETEINVOICE:(id)=>`/api/v3/invoices/${id}`,
    GET_CONTACT_BY_ID:(id)=>`/api/v3/contacts/${id}`,
    UPDATE_CONTACT:(id)=>`/api/v3/contacts/${id}`,
    DELETE_CONTACT:(id)=>`/api/v3/contacts/${id}`
}