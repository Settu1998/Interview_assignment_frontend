import React, { useEffect } from "react";
import { category } from "../Content/data";
import { RiCloseLargeFill } from "react-icons/ri";


const EditModel = ({ isOpen, onClose, handleSubmit, register, errors ,seteditopen,FiterValue,Leaddata}) => {
  if (!isOpen) return null;

  const today = new Date().toISOString().split("T")[0];
   console.log('edit model',Leaddata);
   
   

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card">
        <div className="modal_top">
          <h2>Edit Lead</h2>
          <button className="close-btn" onClick={()=>seteditopen(false)}>
            <RiCloseLargeFill />
          </button>
        </div>
        <div className="modal_content">
          <form onSubmit={handleSubmit}>
            <div className="form_group">
              <label htmlFor="title">E-mail</label>
              <input
  type="email"
  name="email"
  value={FiterValue.email}
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  })}
  placeholder="Enter your email"
/>

              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>
            <div className="form_group">
              <label htmlFor="description">Name</label>
              <textarea
                name="name"
                {...register("name", {
                  required: "Name is required",
                })}
                placeholder="Enter the Name"
              />
              {errors.name && (
                <span className="error">{errors.name.message}</span>
              )}
            </div>
            <div className="form_group">
  <label htmlFor="mobile">Mobile Number</label>
  <input
    type="tel"
    name="mobile"
    {...register("mobile", {
      required: "Mobile number is required",
      pattern: {
        value: /^[0-9]{10}$/,
        message: "Please enter a valid 10-digit mobile number",
      },
    })}
    placeholder="Enter your mobile number"
  />
  {errors.mobile && (
    <span className="error">{errors.mobile.message}</span>
  )}
</div>

            <div className="form_group">
              <label htmlFor="product">Product</label>
              <select
                name="product"
                {...register("product", { required: "Product is required" })}
              >
                <option value="" disabled>
                  Select a Product
                </option>
               <option value="A">A</option>
               <option value="B">B</option>
               <option value="C">C</option>
              </select>
              {errors.product && (
                <span className="error">{errors.product.message}</span>
              )}
            </div>
            <button type="submit" className="submit-btn">
              Edit Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModel;
