import React, { useEffect, useState } from 'react';
import INVOICEMODEL from '../../Model/InvoiceModel';
import TABLEHEADER from '../EditInvoice/tableheader';
import TABLEROW from '../EditInvoice/tablerow';
import { useForm, Controller } from "react-hook-form";
import '../CreateInvoice/index.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import useGetContactInfo from '../../query/useGetContactInfo';
import useAddInvoice from '../../query/useAddInvoice';
import { Button, Modal } from 'react-bootstrap';
import HEADER from '../Header/index'
import {
    useParams,useNavigate
} from "react-router-dom";
import GetInvoice from '../../query/useGetInvoiceById'
import useUpdateInvoice from '../../query/useUpdateInvoice';
import COMMONMODEL from '../Model';


function CREATEINVOICE() {



    const { register, handleSubmit, watch, formState: { errors }, control, setValue } = useForm({
        defaultValues: {
            due_date: new Date(),
        }
    })
    //////console.log(watch('invoiceid'))

    //////console.log(register('invoiceid'))


    let { id } = useParams();



    const getUserInfo = useGetContactInfo();
    let history = useNavigate();

    const [itemsInfo, setItemsInfo] = useState([])
    const [totalAmount, setTotalAmount] = useState({ subTotal: 0, salesTax: 0, total: 0 })


   
    const addInvoice = useAddInvoice();
    const [showModel, setModelInfo] = useState({ isVisible: false, header: "", body: "" });
    const updateInvoice = useUpdateInvoice();
    const [customerDropDown, setCustomerDropDown] = useState([]);
    var customerId = "";

    if (getUserInfo.isError) {
        //////console.log(getUserInfo.error);
    }

     const updateValue =  (getInvoiceById) => {       
        if (getInvoiceById) {       
            let invoiceData = getInvoiceById.data.invoice;
            console.log(invoiceData);
            setItemsInfo([...invoiceData.line_items])
            Object.keys(invoiceData).map(x => {
              
                if (x.includes('date')) {
                    setValue(x, new Date(invoiceData[x]))
                   
                }else if(x=="customer_id"){
                    console.log("customer id is set Successfully")
                    customerId = invoiceData[x];
                    setValue(x, invoiceData[x])
                } 
                else {
                    setValue(x, invoiceData[x])
                }
            })           
            findSubTotal([...invoiceData.line_items])
        }
    }


    useEffect(() => {
        if (getUserInfo.data) {
            
            //////console.log(getUserInfo.data.data.contacts)
            let getContactInfo = getUserInfo.data.data.contacts;
            if (getContactInfo) {
                let getCustomerValue = [];
                getCustomerValue.push({ 'label': '---SELECT---', 'value': '' })
                getContactInfo.forEach(x => {
                    getCustomerValue.push({ 'label': x.contact_name, 'value': x.contact_id })
                })
                setCustomerDropDown(getCustomerValue)
                console.log("This is for customerId",customerId)
                customerId&&setValue("customer_id",customerId)
                 
                if(id){
                     GetInvoice(id).then((data)=>{
                         updateValue(data)
                     })
                }
               
            }
        }
        

    }, [getUserInfo.data])

    const addItem = () => {
        /////////console.log(LISTMODEL)
        setItemsInfo([...itemsInfo, {
            item_order: '0',
            rate: '0',
            description: '',
            quantity: '0',
            discount: '0%',
            tax_id: '',
            project_id: '',
            item_total: '',
            item_custom_fields: []
        }])
    }
    useEffect(() => {
       
    }, [])
    const removeItem = (index) => {
        let removeItemList = [];
        for(let i=0;i<itemsInfo.length;i++){
           if(index!=i){
               removeItemList.push(itemsInfo[i])
           }
        }
        setItemsInfo(removeItemList)
        findSubTotal(removeItemList)
    }
    const addTextForList = (e, text, index) => {

       const re = /^[0-9\b]+$/;
        

        let copyList = [...itemsInfo];
         
        if(text=="quantity"||text=="rate"){
            if(re.test(e.target.value)||e.target.value==''){
                copyList[index][text] = e.target.value;
            }         
        }else{
            copyList[index][text] = e.target.value;
        }
        

        if ((e.target.value === '' || re.test(e.target.value)) && (text=="quantity"||text=="rate")) {
            copyList = findAmount(copyList, text, index, e);
            findSubTotal(copyList, text, e);
         }
      

        setItemsInfo(copyList);

    }
    const findSubTotal = (copyList) => {

        const ITEMS_TOTAL = "item_total";
        debugger
        let itemTotal = 0;
        copyList.forEach(x => {
            itemTotal += x[ITEMS_TOTAL];
        })
        let itemValue = isNaN(itemTotal)|| itemTotal=="NaN"?0:parseInt(itemTotal);
        totalAmount.subTotal = itemValue
        totalAmount.salesTax = (.1 * itemValue).toFixed(2);
        totalAmount.total = totalAmount.subTotal + parseInt(totalAmount.salesTax);
        setTotalAmount({ ...totalAmount })


    }
    const findAmount = (copyList, text, index, e) => {

        const ITEMS_TOTAL = "item_total";
        if (text === "quantity") {
            debugger
            let quantity = isNaN(parseInt(e.target.value))?0:parseInt(e.target.value); 
            let value = parseInt(copyList[index]["rate"]) * quantity;
            copyList[index][ITEMS_TOTAL] = value;
        }
        if (text === "rate") {
            
            copyList[index][ITEMS_TOTAL] = parseInt(copyList[index]["quantity"]) * isNaN(parseInt(e.target.value))?0:parseInt(e.target.value); 
        }
        ///////////console.log(copyList[index][ITEMS_TOTAL])
        return copyList;
    }

    const onSubmit = (datas) => {
        debugger
        let invoiceModel = INVOICEMODEL;
       
        console.log(invoiceModel)
        if (totalAmount.total == 0 || totalAmount.total == undefined) {
            setModelInfo({ isVisible: true, header: "Validation error", body: `Fill the items to proceed further` })
            return;
        }

        for (let index = 0; index < itemsInfo.length; index++) {
            if (!itemsInfo[index].description || !itemsInfo[index].rate || !itemsInfo[index].item_total) {
                setModelInfo({ isVisible: true, header: "validation error", body: `Please fill the ${index + 1} list item to proceed further` })
                return;
            }
        }

        if (datas['date'] > datas['due_date']) {
            setModelInfo({ isVisible: true, header: "Validation error", body: `Due date should be greater than Date` })
            return;
        }
        //console.log(datas);
        Object.keys(datas).map((x) => {

            if (invoiceModel[x] != undefined) {
                try {
                    console.log('entering with key value ' + { x });
                    if (x.includes('date')) {
                        datas[x] = datas[x] ? datas[x]?.toISOString().split('T')[0] : new Date()?.toISOString().split('T')[0];
                    }
                    invoiceModel[x] = datas[x]
                } catch (ex) {
                    //console.log(ex);
                }
            }


        })

        invoiceModel.line_items = itemsInfo;

        if (id) {
            console.log(id);
            updateInvoice.mutateAsync({ id: id, data: invoiceModel }).then((x) => {
                setModelInfo({ isVisible: true, body: `Invoice Updated Successfully`, header: "Success" })
                console.log(x)
            }).catch((ex) => {
                setModelInfo({ isVisible: true, body: `Invoice Update Failed`, header: "Failed to Update" })
                
            })
        } else {
            console.log(invoiceModel)
            addInvoice.mutateAsync(invoiceModel).then((x) => {
                //////console.log(x.data.invoice)
             
                setModelInfo({ isVisible: true, body: `Invoice Created Successfully, Invoice Number: ${x.data.invoice.invoice_number}`, header: "Error" })
               
            }).catch((error) => {
                setModelInfo({ isVisible: true, body: error.toString(), header: "Error" })
               
            })
        }



    }
    
    useEffect(()=>{
        if(!id){
            addItem();
        }
    },[])

    const handleClose = () => {
        history("/listpage")
        setModelInfo({ isVisible: false, body: "", header: "" })
    }

    return (
        <div>
            <HEADER Name={id ? "Edit Invoice" : "Create Invoice"}></HEADER>
            <form id='createinvoice' onSubmit={handleSubmit(onSubmit)}>
                <div class='container-fluid invoiceform'>

                    <div class='row  invoice_id_row'>
                        <label className='col-md-2 invoice_id_label' >Invoice #<br /><span>Invoice id will automically generate</span></label>
                        <input placeholder="" disabled='true'
                            {...register('invoice_number')}
                            className={errors.invoiceid?.type === 'required' ? "col-md-2 fieldrequired" : 'col-md-2 '}
                        />

                    </div>
                    <div class="row">
                        <label className='col-md-2 requiredLabel'>Customer Name</label>

                        {/* <Select options={options} /> */}
                        <select className={errors.customer_id?.type === 'required' ? "col-md-2 fieldrequired" : 'col-md-2'} {...register("customer_id", { required: true })} >
                            {customerDropDown.length>0&&customerDropDown.map((x, y) => {
                                return <option value={x.value}>{x.label}</option>
                            })}
                        </select>                        
                    </div>
                    <div class="row">
                        <label className='col-md-2'>Order Number</label>
                        <input type="text" className='col-md-2' {...register('reference_number')} />
                    </div>
                    <div class="row">
                        <label className='col-md-2 requiredLabel'>Invoice Date* </label>
                        <div className='col-md-2 customDatePicker'>
                            <Controller name='date' rules={{ required: true }}
                                control={control} render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <div className={errors.date?.type == 'required' && 'fieldrequired'}>
                                        <DatePicker
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            selected={value}
                                        />
                                    </div>
                                )}

                            />
                        </div>

                        <label className='offset-0 col-md-2 text-end d-flex align-items-center justify-content-end'>Due Date </label>
                        <div className='col-md-2' style={{ padding: "0px" }}>
                            <Controller name='due_date' control={control} render={({ field: { onChange, onBlur, value, ref } }) => (

                                <DatePicker
                                    onChange={(date) => {
                                        //////console.log(date)
                                        onChange(date);
                                    }}
                                    onBlur={onBlur}
                                    selected={value}
                                />

                            )} />
                        </div>
                    </div>
                    <div class="row">
                        <label className='col-md-2'>Subject</label>
                        <textarea className='col-md-3' type="text"  {...register('subject_content')} />
                    </div>
                    <div className="row customborder">
                        <div className="col-md-12">
                            <table class="table">
                                <TABLEHEADER />
                                <TABLEROW itemsList={itemsInfo} removeItem={removeItem} addTextForList={addTextForList}  isEdittable = {true}/>
                            </table>
                        </div>
                        <div class="col-md-12 invoice_table_footer" >
                            <div className='row'>
                                <div class="col-md-6">
                                    <label class='invoice_add_item ' onClick={addItem}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
                                        <span>Add Item</span>
                                    </label>
                                </div>
                                <div class="col-md-4 offset-lg-2 invoice_subtotal_area">
                                    <div className='row'>
                                        <label className='col-md-6'>SubTotal</label>
                                        <input type="text" className='col-md-6' disabled={true} value={totalAmount.subTotal} />
                                    </div>
                                    <div className='row'>
                                        <label className='col-md-6'>Sales Tax(10%)</label>
                                        <input type="text" className='col-md-6' disabled={true} value={totalAmount.salesTax} />
                                    </div>
                                    <div className='row '>
                                        <label className='col-md-6'>Total</label>
                                        <input type="text" className='col-md-6' disabled={true} {...register('total')} value={totalAmount.total} />
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="row invoice_notes">
                        <div className='col-md-12'>
                            <label>Notes</label>
                        </div>
                        <div className='col-md-6'>
                            <textarea type="text" placeholder="It was great doing business with you."
                                {...register("notes", { required: false })}
                                className='customTextArea' />
                        </div>
                    </div>
                    <div class="row invoice_notes">
                        <div className='col-md-12'>
                            <label>Terms & Condition</label>
                        </div>
                        <div className='col-md-6'>
                            <textarea type="text" className='customTextArea'  {...register("terms", { required: false })}
                                placeholder="It was great doing business with you." />
                        </div>
                    </div>

                </div>
                <div className='create_invoice_footer' >
                    <div className='row justify-content-end'>
                        <input type="submit" value={id ? "Update" : "Save"} className='col-md-2 btn btn-success  savebutton' />
                    </div>
                </div>
            </form>
            <COMMONMODEL isVisible = {showModel.isVisible} handleClose = {handleClose} body={showModel.body} header={showModel.header}/>
        </div>

    );
}

export default CREATEINVOICE;