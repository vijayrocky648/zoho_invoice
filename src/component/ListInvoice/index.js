import React, { useState, useEffect } from 'react';
import HEADER from '../Header/index';
import { Link } from "react-router-dom";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import "rsuite-table/dist/css/rsuite-table.css";
import useGetInvoice from '../../query/useGetInvoice'
import './index.css'
function LISTPAGE() {

  const getInvoiceInfo = useGetInvoice();

  useEffect(() => {
    console.log(getInvoiceInfo.data)
  }, getInvoiceInfo.data)

  const CustomHeaderCell = (props) => {
    return <HeaderCell {...props} style={{ padding: 4, backgroundColor: '#3498ff', color: '#fff' }} />
  }
  return (
    <div >
      <HEADER Name="Virtusa Invoice" />
      <div className='row p-5'>
        <div className='col-md-6'>
          <h3 className=''>All Invoices</h3>
        </div>
        <div className='col-md-6 row align-item-center justify-content-end '>
          <div className='text-end'><Link to="/createinvoice" className='invoice_new'>New Invoice</Link></div>
        </div>
      </div>
      <div className='row p-2'>
        <div className='col-md-12'>
          <Table
            loading={getInvoiceInfo.isLoading}
            height={400}
            autoHeight
            affixHeader
            data={getInvoiceInfo.isSuccess ? getInvoiceInfo.data.data.invoices : []}
            onRowClick={(data) => {
              console.log(data);
            }}
          >

            <Column align="center" resizable flexGrow={1}>
              <CustomHeaderCell>Invoice Id</CustomHeaderCell>
              <Cell dataKey="invoice_id" />
            </Column>

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
            <Column width={120} fixed="right">
              <CustomHeaderCell>Action</CustomHeaderCell>

              <Cell>
                {rowData => {
                  function handleAction() {
                    debugger;

                  }

                  return (
                    <span>
                      <Link to={{pathname:`/editInvoice/${rowData.invoice_id}`,state: { fromDashboard: false }}}>Edit</Link> | 
                      <Link to={{pathname:`/preview/${rowData.invoice_id}`,state:{ fromDashboard: false }}} >Preview</Link>
                    </span>
                  );
                }}
              </Cell>
            </Column>
          </Table>
        </div>

      </div>
    </div>);
}

export default LISTPAGE;