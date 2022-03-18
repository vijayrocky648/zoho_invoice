import React, { useState, useEffect } from 'react';
import HEADER from '../Header/index';
import { Link } from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import useGetInvoice from '../../query/useGetInvoice'
import './index.css'
import MyVerticallyCenteredModal from '../CreateModel';
import { useAuth } from '../RequireAuth';
import useDeleteInvoice from '../../query/useDeleteInvoice';
import useGetContactInfo from '../../query/useGetContactInfo';
import useDeleteContact from '../../query/useDeleteContact';




function LISTPAGE() {

  const getInvoiceInfo = useGetInvoice();
  const [modelVisibility, setModelVisibility] = useState(false);
  const deleteInvoices = useDeleteInvoice();
  const getContactInfo = useGetContactInfo();
  const [customerId,setCustomerId] = useState(null);
  const deleteContacts = useDeleteContact();

  useEffect(() => {
    console.log(getInvoiceInfo.data)
  }, getInvoiceInfo.data)

  const CustomHeaderCell = (props) => {
    return <HeaderCell {...props} style={{ padding: 4, backgroundColor: '#3498ff', color: '#fff' }} />
  }

  const deleteInvoice = (id) => {
    deleteInvoices.mutateAsync(id).then((data) => {
      getInvoiceInfo.refetch();
    }).catch((ex) => {

    })
    console.log(id)
  }
  const deleteContact = (id)=>{
    deleteContacts.mutateAsync(id).then((data)=>{
      getContactInfo.refetch();
      setModelVisibility(false);
    }).catch((ex)=>{
      setModelVisibility(false);
    }).finally((data)=>{
      getContactInfo.refetch();
      setModelVisibility(false);
    })
  }
  const editContact = (id)=>{
    debugger
    setModelVisibility(true)
    setCustomerId(id)
  }
  return (

    <div >
      <HEADER Name="Virtusa Invoice" />
      <div className='row p-5'>
        <div className='col-md-6'>
          <h3 className=''>All Invoices</h3>
        </div>
        <div className='col-md-6 row align-item-center justify-content-end '>
          <div className='text-end'>
            {/* <label to="/createinvoice" className='invoice_customer' onClick={()=>setModelVisibility(true)}>New Customer</label> */}
            <Link to="/create" className='btn invoice_new'>New Invoice</Link>
          </div>
        </div>
      </div>
      <div className='row p-2'>
        <div className='col-md-12'>
          <Table
            loading={getInvoiceInfo.isLoading}
            height={300}
            autoHeight
            affixHeader
            data={getInvoiceInfo.isSuccess ? getInvoiceInfo.data.data.invoices : []}
            onRowClick={(data) => {
              console.log(data);
            }}
          >

            <Column resizable sortable flexGrow={1}>
              <CustomHeaderCell>Invoice Name</CustomHeaderCell>
              <Cell dataKey="invoice_number" />
            </Column>
            <Column resizable sortable flexGrow={1}>
              <CustomHeaderCell>Order Number</CustomHeaderCell>
              <Cell dataKey="reference_number" />
            </Column>
            <Column resizable sortable flexGrow={1}>
              <CustomHeaderCell>customer_name</CustomHeaderCell>
              <Cell dataKey="customer_name" />
            </Column>
            <Column resizable sortable flexGrow={1}>
              <CustomHeaderCell>Due Date</CustomHeaderCell>
              <Cell dataKey="due_date" />
            </Column>
            <Column resizable sortable flexGrow={1}>
              <CustomHeaderCell>Amount</CustomHeaderCell>
              <Cell dataKey="total" />
            </Column>
            <Column resizable sortable flexGrow={1}>
              <CustomHeaderCell>Balance</CustomHeaderCell>
              <Cell dataKey="balance" />
            </Column>
           

            
            <Column width={180} fixed="right">
              <CustomHeaderCell>Action</CustomHeaderCell>

              <Cell>
                {rowData => {
                  function handleAction() {
                    debugger;

                  }

                  return (
                    <span className='link'>
                      <Link to={{ pathname: `/editInvoice/${rowData.invoice_id}`, state: { fromDashboard: false } }}>Edit</Link> |
                      <Link to={{ pathname: `/preview/${rowData.invoice_id}`, state: { fromDashboard: false } }} >Preview</Link>|
                      <label style={{ color: "red" }} onClick={() => { deleteInvoice(rowData.invoice_id) }}>Delete</label>
                    </span>
                  );
                }}
              </Cell>
            </Column>
          </Table>
        </div>

      </div>
      <div className='row p-5'>
        <div className='col-md-6'>
          <h3 className=''>Add Customer</h3>
        </div>
        <div className='col-md-6 row align-item-center justify-content-end '>
          <div className='text-end'>
            <label to="/createinvoice" className='invoice_customer' onClick={() => setModelVisibility(true)}>New Customer</label>
            <Link to="/create" className='btn invoice_new'>Edit Customer</Link>
          </div>
        </div>
      </div>
      <div className='row p-2'>
        <div className='col-md-12'>
          <Table
            loading={getContactInfo.isLoading}
            height={300}
            autoHeight
            affixHeader
            data={getContactInfo.isSuccess ? getContactInfo.data.data.contacts : []}
            onRowClick={(data) => {
              console.log(data);
            }}
          >

            <Column resizable sortable flexGrow={1}>
              <CustomHeaderCell>contact_name</CustomHeaderCell>
              <Cell dataKey="contact_name" />
            </Column>
            <Column resizable sortable flexGrow={1}>
              <CustomHeaderCell>email</CustomHeaderCell>
              <Cell dataKey="email" />
            </Column>
            <Column resizable sortable flexGrow={1}>
              <CustomHeaderCell>mobile</CustomHeaderCell>
              <Cell dataKey="mobile" />
            </Column>
            <Column resizable sortable flexGrow={1}>
              <CustomHeaderCell>company_name</CustomHeaderCell>
              <Cell dataKey="company_name" />
            </Column>
            <Column width={180} fixed="right">
              <CustomHeaderCell>Action</CustomHeaderCell>

              <Cell>
                {rowData => {
                  function handleAction() {
                    debugger;

                  }

                  return (
                    <span className='link'>
                       <label style={{ color: "green" }} onClick={() => { editContact(rowData.contact_id) }}>Edit</label>|
                      <label style={{ color: "red" }} onClick={() => { deleteContact(rowData.contact_id) }}>Delete</label>
                    </span>
                  );
                }}
              </Cell>
            </Column>
          </Table>
        </div>

      </div>
      <MyVerticallyCenteredModal show={modelVisibility} onHide={() => setModelVisibility(false)} id = {customerId} />
    </div>)

}

export default LISTPAGE;