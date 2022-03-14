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
    useParams,
} from "react-router-dom";
import useGetInvoiceById from '../../query/useGetInvoiceById'

function CREATEINVOICE() {

    const [invoiceValue, setInvoiceValue] = useState({invoice_number:"dww"});

    const { register, handleSubmit, watch, formState: { errors }, control,setValue } = useForm({
        defaultValues: {
            due_date: new Date(),
        }
    })
    ////console.log(watch('invoiceid'))

    ////console.log(register('invoiceid'))
    const invoiceModel = INVOICEMODEL;

    let { id } = useParams();




    const getInvoiceById = useGetInvoiceById(id);

    const [itemsInfo, setItemsInfo] = useState([])
    const [totalAmount, setTotalAmount] = useState({ subTotal: 0, salesTax: 0, total: 0 })

    const [invoiceId, setInvoiceId] = useState('');
    const getUserInfo = useGetContactInfo();
    const addInvoice = useAddInvoice();
    const [showModel, setModelInfo] = useState({ isVisible: false, header: "", body: "" });

    const [customerDropDown, setCustomerDropDown] = useState([]);

    if (getUserInfo.isError) {
        ////console.log(getUserInfo.error);
    }

    useEffect(() => {
        if (getInvoiceById && getInvoiceById.isSuccess) {
            debugger;
            let invoiceData = getInvoiceById.data.data.invoice;
            setInvoiceValue({...getInvoiceById.data.data.invoice})
            setItemsInfo([...invoiceData.line_items])
            Object.keys(invoiceData).map(x=>{
                if(!x.includes('date')){
                    setValue(x,invoiceData[x])                    
                }else{
                    setValue(x,Date.parse(invoiceData[x]))      
                }                
            })
            console.log("this is invoice vlaue ",invoiceValue)
            findSubTotal([...invoiceData.line_items])
        }
    }, getInvoiceById.data)


    useEffect(() => {
        if (getUserInfo.data) {
            ////console.log(getUserInfo.data.data.contacts)
            let getContactInfo = getUserInfo.data.data.contacts;
            if (getContactInfo) {
                let getCustomerValue = [];
                getCustomerValue.push({ 'label': '', 'value': '' })
                getContactInfo.forEach(x => {
                    getCustomerValue.push({ 'label': x.first_name, 'value': x.contact_id })
                })
                setCustomerDropDown(getCustomerValue)
            }
        }

    }, getUserInfo.data)

    const addItem = () => {
        ///////console.log(LISTMODEL)
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
        addItem();
    }, [])
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

        ////console.log(copyList)

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
        /////////console.log(copyList[index][ITEMS_TOTAL])
        return copyList;
    }

    const onSubmit = (datas) => {
        if (totalAmount.total == 0 || totalAmount.total == undefined) {
            alert("Please Add Item and Amount")
            return;
        }

        for (let index = 0; index < itemsInfo.length; index++) {
            if (!itemsInfo[index].description || !itemsInfo[index].rate || !itemsInfo[index].item_total) {
                setModelInfo({ isVisible: true, header: "validation error", body: `Please fill the ${index + 1} list item to proceed further` })
                return;
            }
        }
        debugger
        if (datas['date'] > datas['due_date']) {
            alert("Due date should be after invoice date")
            return;
        }
        console.log(datas);
        Object.keys(datas).map((x) => {


            if (x.includes('date')) {
                datas[x] = datas[x] ? datas[x]?.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
                // ////console.log(datas[x]?.toISOString().split('T')[0])
                //datas[x] = datas[x].toString().toISOString();
            }
            invoiceModel[x] = datas[x]
        })

        invoiceModel.line_items = itemsInfo;

        addInvoice.mutateAsync(invoiceModel).then((x) => {
            ////console.log(x.data.invoice)
            setInvoiceId(x.data.invoice.invoice_number)
            setModelInfo({ isVisible: true, body: `Invoice Created Successfully, Invoice Number: ${x.data.invoice.invoice_number}`, header: "Error" })

        }).catch((error) => {
            setModelInfo({ isVisible: true, body: error.toString(), header: "Error" })
            ////console.log(error)
        })

    }
    const handleClose = () => {
        setModelInfo({ isVisible: false, body: "", header: "" })
    }

    return (
        <div>
            <HEADER Name='Create Invoice'></HEADER>
            <form id='createinvoice' onSubmit={handleSubmit(onSubmit)}>
                <div class='container-fluid invoiceform'>

                    <div class='row '>
                        <label className='col-md-2 invoice_id_label' >Invoice #<br /><span>Invoice id will automically generate</span></label>
                        <input placeholder="" disabled='true'
                           {...register('invoice_number')}
                            className={errors.invoiceid?.type === 'required' ? "col-md-2 fieldrequired" : 'col-md-2 '}
                             />

                    </div>
                    <div class="row">
                        <label className='col-md-2 requiredLabel'>Customer Name</label>

                        {/* <Select options={options} /> */}
                        <select className={errors.customer_id?.type === 'required' ? "col-md-2 fieldrequired" : 'col-md-2'} {...register("customer_id", { required: true })} defaultValue="">
                            {customerDropDown.map((x, y) => {
                                return <option value={x.value}>{x.label}</option>
                            })}
                        </select>

                    </div>
                    <div class="row">
                        <label className='col-md-2'>Order Number</label>
                        <input type="text" className='col-md-2' />
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
                                        ////console.log(date)
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
                            <table class="table table-hover">
                                <TABLEHEADER />
                                <TABLEROW itemsList={itemsInfo} removeItem={removeItem} addTextForList={addTextForList} />
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
                        <div className='col-md-8'>
                            <textarea type="text" placeholder="It was great doing business with you." 
                            {...register("notes", { required: false })} 
                            className='customTextArea' />
                        </div>
                    </div>
                    <div class="row invoice_notes">
                        <div className='col-md-12'>
                            <label>Terms & Condition</label>
                        </div>
                        <div className='col-md-8'>
                            <textarea type="text" className='customTextArea'  {...register("terms", { required: false })} 
                            placeholder="It was great doing business with you." />
                        </div>
                    </div>

                </div>
                <div className='create_invoice_footer' >
                    <div className='row justify-content-end'>
                        <input type="submit" value={invoiceId ? "Update" : "Save"} className='col-md-2 btn btn-success  savebutton' />
                    </div>
                </div>
            </form>
            <Modal show={showModel.isVisible} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{showModel.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{showModel.body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default CREATEINVOICE;