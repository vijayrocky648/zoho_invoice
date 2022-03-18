import { Modal, Button } from 'react-bootstrap'
import './index.css'
import { useForm } from "react-hook-form";
import useAddCustomer from '../../query/useAddCustomer';
import { useEffect } from 'react';
import getContact from '../../query/useGetContactById';
import useUpdateContact from '../../query/useUpdateContact';


function MyVerticallyCenteredModal(props) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const { register, handleSubmit, watch,reset,setValue, formState: { errors } } = useForm();
  const addCustomer =useAddCustomer();
  const updateCustomer = useUpdateContact();


  const onSubmit = (data) => {
   
    console.log(data);
    if(props.id){
      delete data.trader_name
      delete data.legal_name
      updateCustomer.mutateAsync({id:props.id,data:data}).then((data)=>{
        alert("update")
      }).catch((ex)=>{
        alert(ex)
      })
    }else{
      addCustomer.mutateAsync(data).then((data)=>{
        alert("success")
      }).catch((ex)=>{
        alert("failed")
      }).finally(()=>{
        reset()
      })
    }    
  };


   useEffect(()=>{

    getContact(props.id).then((data)=>{
      console.log(data.data.contact)
       reset(data.data.contact)
    }).catch((ex)=>{
      console.log(ex)
    })

   },[props.id])
  return (
    <Modal

      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>



          <div className='row justify-content-center'>
            <label className='col-md-4' >Customer Name</label>        
            <input className={`col-md-4 invoice_custom_input ${errors.contact_name?.type === 'required' && "invoice_error_input"}`} placeholder='Customer Name' {...register("contact_name", { required: true })} />
          </div>
          <div className='row row justify-content-center' >
            <label className='col-md-4'>Company Name</label>
            <input className={`col-md-4 invoice_custom_input ${errors.company_name?.type === 'required' && "invoice_error_input"}`} placeholder='Company Name' {...register("company_name", { required: true })} />
          </div>

          <div className='row  justify-content-center '>
            <label className='col-md-4'>Email</label>
            <input className={`col-md-4 invoice_custom_input ${errors.contact_persons?errors.contact_persons[0].email?.type === 'required' && "invoice_error_input":""}`} placeholder='Customer Email' {...register("contact_persons[0].email", { required: true,pattern: emailRegex })} />
          </div>
          <div className='row justify-content-center'>
            <label className='col-md-4'>Phone</label>
            <input className={`col-md-4 invoice_custom_input ${errors.contact_persons?[0].email?.type === 'required' && "invoice_error_input":""}`} placeholder='Customer Phone' {...register("contact_persons[0].phone", { required: false })} />
          </div>
          <div className='row' style={{ backgroundColor: "#0a58ca", borderRadius: "5px" }}>
            <div className='col-md-6'>
              <div className='row'>
                <label className='col-md-12 text-center text-white'>Customer Address</label>
              </div>
            </div>
            <div className='col-md-6'>
              <div className='row'>
                <label className='col-md-12 text-center text-white'>Billing Address</label>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <div className='row'>
                <label className='col-md-6'>Address</label>
                <textarea className={`col-md-4 invoice_custom_input ${errors?.billing_address?.address?.type === 'required' && "invoice_error_input"}`} {...register("billing_address.address")} placeholder='Address' />
              </div>
              <div className='row'>
                <label className='col-md-6'>City</label>
                <input className={`col-md-4 invoice_custom_input ${errors?.billing_address?.city?.type === 'required' && "invoice_error_input"}`}  {...register("billing_address.city")} placeholder='Address' />
              </div>
              <div className='row'>
                <label className='col-md-6'>State</label>
                <input className={`col-md-4 invoice_custom_input ${errors?.billing_address?.state?.type === 'required' && "invoice_error_input"}`} {...register("billing_address.state")} placeholder='State' />
              </div>
              <div className='row'>
                <label className='col-md-6'>Pincode</label>
                <input className={`col-md-4 invoice_custom_input ${errors?.billing_address?.zip?.type === 'required' && "invoice_error_input"}`} {...register("billing_address.zip")} placeholder='Pincode' />
              </div>

            </div>
            <div className='col-md-6'>
              <div className='row'>
                <label className='col-md-6'>Address</label>
                <textarea className={`col-md-4 invoice_custom_input ${errors?.shipping_address?.address?.type === 'required' && "invoice_error_input"}`} {...register("shipping_address.address")} placeholder='Address' />
              </div>
              <div className='row'>
                <label className='col-md-6'>City</label>
                <input className={`col-md-4 invoice_custom_input ${errors?.shipping_address?.city?.type === 'required' && "invoice_error_input"}`}  {...register("shipping_address.city")} placeholder='Address' />
              </div>
              <div className='row'>
                <label className='col-md-6'>State</label>
                <input className={`col-md-4 invoice_custom_input ${errors?.shipping_address?.state?.type === 'required' && "invoice_error_input"}`} {...register("shipping_address.state")} placeholder='State' />
              </div>
              <div className='row'>
                <label className='col-md-6'>Pincode</label>
                <input className={`col-md-4 invoice_custom_input ${errors?.shipping_address?.zip?.type === 'required' && "invoice_error_input"}`} {...register("shipping_address.zip")} placeholder='Pincode' />
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <label onClick={()=>{ reset();props.onHide()}} className='btn btn-danger text-white'>Close</label>
          <input value={"Submit"} className="btn btn-primary" type="submit" />
        </Modal.Footer>
      </form>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;  