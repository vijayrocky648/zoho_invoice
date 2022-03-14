import React, { useState } from 'react';
import './index.css';
import INVOICEMODEL from '../../Model/InvoiceModel';
import { useForm } from "react-hook-form";
import LISTMODEL from '../../Model/invoiceModelList';
import TABLEROW from './tablerow';
import TABLEHEADER from './tableheader';



function INVOICE() {
    const { register, handleSubmit } = useForm();
    const [invoiceModel, setInvoiceModel] = useState(INVOICEMODEL);
    const [itemsInfo, setItemsInfo] = useState([])
    const [totalAmount,setTotalAmount] = useState({subTotal:0,salesTax:0,total:0})

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


        copyList = findAmount(copyList,text,index,e);

        findSubTotal(copyList,text,e)
        
        setItemsInfo(copyList);
        
    }
    const findSubTotal = (copyList,text,index,e)=>{

        const ITEMS_TOTAL = "item_total";
        if (text === "quantity" || text === "rate") {
            let itemTotal = 0;
            copyList.forEach(x=>{
                itemTotal += x[ITEMS_TOTAL];
            })
            totalAmount.subTotal = itemTotal;
            totalAmount.salesTax = (.1*itemTotal).toFixed(2);
            totalAmount.total = totalAmount.subTotal+totalAmount.salesTax;
            setInvoiceModel({...totalAmount})
        } 
       
    }
    const findAmount = (copyList,text,index,e)=>{
       
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
    return (
        <form onSubmit={handleSubmit((data) => console.log(JSON.stringify(data)))}>
            <div class="invoice_parent">
                <div class="container invoice_parent">
                    <div class="row">
                        <div class="col-md-9 d-flex">

                            <input type="button" className="invoice_button" value="Send" />
                            <input type="button" className="invoice_button" value="Get PDF" />
                            <input type="button" className="invoice_button" value="Send" />
                            <input type="submit" className="invoice_button ms-auto invoice_save" value="Save" />
                        </div>
                        <div class="col-md-9 col-sm-12 invoice_main">
                            <div class="row">
                                <div class="col-md-9 col-sm-12 order-sm-2 order-lg-1 invoice_user_info">
                                    <input type="text" className="invoice_text" {...register("companyName",{required: true})} placeholder="Your Company" /><br />
                                    <input type="text" className="invoice_text" {...register("name",{required: true})} placeholder="Your Name" /><br />
                                    <input type="text" className="invoice_text" {...register("companyAddress",{required: true})} placeholder="Company Address" /><br />
                                    <input type="text" className="invoice_text" {...register("cityinfo",{required: true})} placeholder="City,State Zip" /><br />
                                    <input type="text" className="invoice_text" {...register("country",{required: true})} placeholder="Country" />
                                </div>
                                <div class="col-md-3 order-sm-1 order-lg-2 invoice_heading">
                                    <h1>INVOICE</h1>
                                </div>
                            </div>
                            <div class="row invoice_client_info_parent">
                                <div class="col-md-6">
                                    <label>Bill To</label><br />
                                    <input type="text" className="invoice_text" placeholder="Your Name" /><br />
                                    <input type="text" className="invoice_text" placeholder="Company Address" /><br />
                                    <input type="text" className="invoice_text" placeholder="City,State Zip" /><br />
                                    <input type="text" className="invoice_text" placeholder="Country" />
                                </div>
                                <div class="col-md-6">                                   
                                    <input type="text" className="invoice_text_sec" value="Invoice#" /><input type="text" className="invoice_text" placeholder="Your Company" /><br />
                                    <input type="text" className="invoice_text_sec" value="Invoice Date" /><input type="text" className="invoice_text" placeholder="Your Name" /><br />
                                    <input type="text" className="invoice_text_sec" value="Due Date" /><input type="text" className="invoice_text" placeholder="Company Address" /><br />
                                </div>
                            </div>
                            <div class="row invoice_table_parent">
                                <div class="col-md-12">
                                    <table class="table">
                                        <TABLEHEADER />
                                        <TABLEROW itemsList={itemsInfo} removeItem={removeItem} addTextForList={addTextForList} />
                                    </table>
                                </div>
                                <div class="col-md-12 invoice_table_footer" >
                                    <div className='row'>
                                        <div class="col-md-6">
                                            <input value="+ Add Items" class="invoice_add_list_but" type="button" onClick={addItem} />

                                        </div>
                                        <div class="col-md-4 offset-lg-2">
                                            <div className='row'>
                                                <div className='invoice_subtotal col-md-6 col-sm-6'>
                                                    <input type="text" value='SubTotal'  />
                                                    <input type="text" value='Sales Tax(10%)'/>
                                                </div>
                                                <div className='invoice_subtotal_value col-md-6 col-sm-6'>
                                                    <input type="text" disabled={true} value={totalAmount.subTotal}  />
                                                    <input type="text" disabled={true} value={totalAmount.salesTax}/>
                                                </div>
                                            </div>
                                            <div className='row invoice_total'>
                                               <div className='col-md-6 col-sm-6'>
                                                  <input type="text" value='Total'  />
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
                                  <input type="text" className="invoice_text" placeholder="Note" />
                                </div>
                                <div className='col-md-8'>
                                  <textarea type="text" className="invoice_text" placeholder="It was great doing business with you." />
                                </div>
                            </div>
                            <div class="row invoice_notes">
                                <div className='col-md-12'>
                                  <input type="text" className="invoice_text" placeholder="Term & Condition" />
                                </div>
                                <div className='col-md-8'>
                                  <textarea type="text" className="invoice_text" placeholder="It was great doing business with you." />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    {/* <div className='row'>
                        <div className='col-md-9'>
                            <input placeholder='Notes' class="invoice_notes w-100" type="text" />
                        </div>
                    </div> */}
                </div>
            </div>

        </form>
    );
}

export default INVOICE;