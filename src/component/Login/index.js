import { React, useEffect, useState } from 'react'
import HEADER from '../Header';
import ICON from '../../Images/login.svg'


function LOGIN() {
    return (
        <div className='w-100 h-100'>
            <HEADER Name='Virtusa Invoice' />
            <div className='row align-item-center' style={{ height: "88%" }}>
                <div className='col-md-6 d-flex align-items-center'>
                    <img src={ICON} alt="Login Image" />
                </div>
                <div className='col-md-6 d-flex align-items-center justify-content-center'>
                    <div className='text-center'>
                        <h1>
                            Welcome to Virtusa Invoice
                        </h1>
                        <p className='text-center'>Manage all your invoice here!!</p>
                        <a className='invoice_login_button' href={'https://accounts.zoho.in/oauth/v2/auth?client_id=1000.BT9I3S8CS2QD7GEXT4AIROGM09VPBS&response_type=token&scope=ZohoInvoice.invoices.CREATE,ZohoInvoice.invoices.UPDATE,ZohoInvoice.invoices.READ,ZohoInvoice.invoices.DELETE,ZohoInvoice.contacts.READ&redirect_uri=http://localhost:3000/auth.html'}>Login</a>
                        {/* <a className='invoice_login_button' href={'https://accounts.zoho.in/oauth/v2/auth?client_id=1000.P642ZCOHAZF87GQ2969Z2VAR2UAIWP&response_type=token&scope=ZohoInvoice.invoices.CREATE,ZohoInvoice.invoices.UPDATE,ZohoInvoice.invoices.READ,ZohoInvoice.invoices.DELETE,ZohoInvoice.contacts.READ&redirect_uri=https://virtusainvoice.web.app/auth.html'}>Login</a> */}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LOGIN;