export const SERVICE_URLS = {
    GET_CONTACT_INFO : '/api/v3/contacts',
    ADDINVOICE : '/api/v3/invoices',
    GETINVOICEDETAILS:"/api/v3/invoices",
    GETINVOICEBYID : (id)=>`/api/v3/invoices/${id}`,
    UPDATE_INVOICE:(id)=>`/api/v3/invoices/${id}`
}