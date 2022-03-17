import React, { useEffect, useState } from 'react';
import './index.css';
import INVOICEMODEL from '../../Model/InvoiceModel';
import { useForm } from "react-hook-form";
import LISTMODEL from '../../Model/invoiceModelList';
import TABLEROW from './tablerow';
import TABLEHEADER from './tableheader';
import GetInvoice from '../../query/useGetInvoiceById';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


function INVOICE() {
    const { id } = useParams();
    // const getInvoiceInfo = useGetInvoice(id);
    const { register, handleSubmit } = useForm();
    const [invoiceModel, setInvoiceModel] = useState({});
    const [itemsInfo, setItemsInfo] = useState([])
    const [totalAmount, setTotalAmount] = useState({ subTotal: 0, salesTax: 0, total: 0 })

    useEffect(() => {
        GetInvoice(id).then((getInvoiceInfo)=>{
            setInvoiceModel({ ...getInvoiceInfo.data.invoice })
            findSubTotal([...getInvoiceInfo.data.invoice.line_items])
        })
        // if (getInvoiceInfo.isSuccess) {
        //     setInvoiceModel({ ...getInvoiceInfo.data.data.invoice })
        //     findSubTotal([...getInvoiceInfo.data.data.invoice.line_items])
        //     console.log(getInvoiceInfo.data.data)
        // }
    }, [])
    const addItem = () => {
        ///console.log(LISTMODEL)
        setItemsInfo([...itemsInfo, {

            line_item_id: 982000000567021,
            item_id: 982000000030049,
            project_id: 90300000087378,
            project_name: "Sample Project",
            time_entry_ids: [],
            item_type: "goods",
            product_type: "goods",
            expense_id: "",
            name: "Hard Drive",
            item_order: 1,
            bcy_rate: 0,
            rate: 0,
            quantity: 0,
            unit: "",
            discount_amount: 0,
            discount: 0,
            tax_id: 982000000557028,
            tax_name: "VAT",
            tax_type: "tax",
            tax_percentage: 12.5,
            item_total: 0

        }])
    }
    const removeItem = (index) => {
        let removeItemList = [...itemsInfo];
        removeItemList.pop();
        setItemsInfo(removeItemList)

    }
    const addTextForList = (e, text, index) => {


        let copyList = [...itemsInfo];

        copyList[index][text] = e.target.value;


        copyList = findAmount(copyList, text, index, e);

        findSubTotal(copyList, text, e)

        setItemsInfo(copyList);

    }
    const findSubTotal = (copyList) => {

        const ITEMS_TOTAL = "item_total";
        debugger;
        let itemTotal = 0;
        copyList.forEach(x => {
            itemTotal += x[ITEMS_TOTAL];
        })
        totalAmount.subTotal = itemTotal;
        totalAmount.salesTax = (.1 * itemTotal).toFixed(2);
        totalAmount.total = totalAmount.subTotal + parseInt(totalAmount.salesTax);
        setTotalAmount({ ...totalAmount })

    }
    const findAmount = (copyList, text, index, e) => {

        const ITEMS_TOTAL = "item_total";
        if (text === "quantity") {
            copyList[index][ITEMS_TOTAL] = parseInt(copyList[index]["rate"]) * parseInt(e.target.value);
        }
        if (text === "rate") {
            copyList[index][ITEMS_TOTAL] = parseInt(copyList[index]["quantity"]) * parseInt(e.target.value);
        }
        /////console.log(copyList[index][ITEMS_TOTAL])
        return copyList;
    }

    const generatePdf = () => {
         exportPdf()
    }
    function exportPdf() {
       let  content = document.getElementById("invoice_area");
    
        var useWidth = content.scrollWidth
        var useHeight = content.scrollHeight;
    
        debugger;
    
        html2canvas((content), { width: useWidth+600, height: useHeight+600, background :'#FFFFFF'}).then(function (canvas) {
            debugger;
            var img = canvas.toDataURL("image/png");
            var doc = new jsPDF({
                unit:'px', 
                format:'a4'
            });
    
            debugger;
            doc.addImage(img, 'JPEG', 0, 0);
            doc.save('test.pdf');
        });
    }
    return (

        <form onSubmit={handleSubmit((data) => console.log(JSON.stringify(data)))}>
            <div class="invoice_parent">
                <div class="container invoice_parent">
                    <div class="row justify-content-center">
                        <div class="col-md-9 d-flex justify-content-center">

                            <input type="button" className="invoice_button" value="Send" />
                            <input type="button" className="invoice_button" value="Get PDF" onClick={generatePdf} />
                            <input type="button" className="invoice_button" value="Send" />

                        </div>
                        <div class="col-md-8 col-sm-12 invoice_main" id='invoice_area'>
                            <div class="row">
                                <div class="col-md-9 col-sm-12 order-sm-2 order-lg-1 invoice_user_info">
                                    <label classname='labelValue'>Virtusa</label>      <br />
                                    <label classname='labelValue'>Vijay</label>        <br />
                                    <label classname='labelValue'>DLF,Ramapuram</label><br />
                                    <label classname='labelValue'>Chennai</label>      <br />
                                    <label classname='labelValue'>India</label>        <br />
                                </div>
                                <div class="col-md-3 order-sm-1 order-lg-2 invoice_heading">
                                    <h1>INVOICE</h1>
                                </div>
                            </div>
                            <div class="row invoice_client_info_parent">
                                <div class="col-md-9 ">
                                    <label classname='labelValue' style={{ textDecoration: "underline" }}>Bill To</label>      <br />
                                    <label classname='labelValue'>{invoiceModel["customer_name"]}</label>        <br />
                                    <label classname='labelValue'>{invoiceModel.billing_address?.address}</label><br />
                                    <label classname='labelValue'>{invoiceModel.billing_address?.city}</label>      <br />
                                    <label classname='labelValue'>{invoiceModel.billing_address?.country}</label>        <br />

                                </div>
                                <div class="col-md-3">
                                    <div>
                                        <label >Invoice#: {invoiceModel["invoice_number"]} </label>
                                      
                                        <br />
                                        <label>Invoice Date: {invoiceModel["date"]}</label>
                                       
                                        <br />
                                        <label>Due Date:  {invoiceModel["due_date"]}</label>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class="row invoice_table_parent">
                                <div class="col-md-12">
                                    <table class="table">
                                        <TABLEHEADER />
                                        <TABLEROW itemsList={invoiceModel["line_items"] || []} removeItem={removeItem} addTextForList={addTextForList} isEdittable={false} />
                                    </table>
                                </div>
                                <div class="col-md-12 invoice_table_footer" >
                                    <div className='row'>
                                        <div class="col-md-6">

                                        </div>
                                        <div class="col-md-4 offset-lg-2">
                                            <div className='row'>
                                                <div className='invoice_subtotal col-md-6 col-sm-6'>
                                                    <input type="text" value='SubTotal' />
                                                    <input type="text" value='Sales Tax(10%)' />
                                                </div>
                                                <div className='invoice_subtotal_value col-md-6 col-sm-6'>
                                                    <input type="text" disabled={true} value={totalAmount.subTotal} />
                                                    <input type="text" disabled={true} value={totalAmount.salesTax} />
                                                </div>
                                            </div>
                                            <div className='row invoice_total'>
                                                <div className='col-md-6 col-sm-6'>
                                                    <input type="text" value='Total' />
                                                </div>
                                                <div className='col-md-6 col-sm-6'>
                                                    {totalAmount.total}
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div class="row invoice_notes">
                                <div className='col-md-12'>
                                    <input type="text" className="invoice_text" value="Note" />
                                </div>
                                <div className='col-md-8'>
                                    <textarea type="text" className="invoice_text" value={invoiceModel["notes"]} />
                                </div>
                            </div>
                            <div class="row invoice_notes">
                                <div className='col-md-12'>
                                    <input type="text" className="invoice_text" value="Term & Condition" />
                                </div>
                                <div className='col-md-8'>
                                    <textarea type="text" className="invoice_text" value={invoiceModel["terms"]} />
                                </div>
                            </div>
                        </div >

                    </div >
                    {/* <div className='row'>
                        <div className='col-md-9'>
                            <input placeholder='Notes' class="invoice_notes w-100" type="text" />
                        </div>
                    </div> */}
                </div >
            </div >

        </form >
    );
}

export default INVOICE;