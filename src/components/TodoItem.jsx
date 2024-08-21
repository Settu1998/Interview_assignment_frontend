import axios from "axios";
import React, { useEffect,useState } from "react";
import Model from '../Modal/Modal'
import { useForm } from "react-hook-form";
import EditModel from "../Modal/EditModel";
import { RiCloseLargeFill } from "react-icons/ri";


const TodoItem = ({ filteredLeaddata ,handleDelete,handleedit,setFiterValue,FiterValue, handleChange, deleteTodo,setLeaddata,Leaddata,editopen,seteditopen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    fetchlead();

  },[]);

  console.log('FILTER DATA VALUE',FiterValue);
  

const fetchlead = async() => {
  const res = await axios.get('https://interview-assignment-backend-zzx0.onrender.com/api/getlead');
  if(res.data.code == 200){
    setLeaddata(res.data.message);
  }else{
    console.log(res.data.message);
    
  }
}

  const todo = '';

const handleeditdata = async(e) => {
  e.preventDefault()
  const res = await axios.patch('https://interview-assignment-backend-zzx0.onrender.com/api/UpateLead',FiterValue);
  console.log(res.data);
  if(res.data.code == 200){
    seteditopen(false);
    updateDataById(FiterValue.id,FiterValue);
  }else{
    console.log(res.data.message);
  }
}

const updateDataById = (id, newData) => {
  const updatedData = Leaddata.map(item => 
    item.id === id ? { ...item, ...newData } : item
  );
  setLeaddata(updatedData);
};

  return (
    <div className="todo_items">

{
  filteredLeaddata  && filteredLeaddata .map((lead)=>(
    <div
    className={`item_card ${todo.status === "completed" ? "active" : ""}`}
    key={todo.id}
  >
    <div className="item_card_top">
      <h3 className="item_title">{todo.title}</h3>
      <p className={`status ${todo.status}`}>{todo.status}</p>
    </div>
    <div className="item_card_content">
      <p
        className="item_description"
        style={{
          opacity: todo.status === "completed" ? 0.5 : 1,
          textDecoration:
            todo.status === "completed" ? "line-through" : "none",
        }}
      >
       Email : {lead.email}
      </p>
      <p
        className="item_description"
        style={{
          opacity: todo.status === "completed" ? 0.5 : 1,
          textDecoration:
            todo.status === "completed" ? "line-through" : "none",
        }}
      >
       Name : {lead.name}
      </p>
      <p
        className="item_description"
        style={{
          opacity: todo.status === "completed" ? 0.5 : 1,
          textDecoration:
            todo.status === "completed" ? "line-through" : "none",
        }}
      >
       Number : {lead.number}
      </p>
      <p
        className="item_description"
        style={{
          opacity: todo.status === "completed" ? 0.5 : 1,
          textDecoration:
            todo.status === "completed" ? "line-through" : "none",
        }}
      >
       Product : {lead.product}
      </p>
     
      <div
        className="item_buttons"
        style={{ display: "flex", justifyContent: "end" }}
      >
        <button
          className="btn_completed"
          onClick={() => handleedit(lead.id)}
          disabled={todo.status === "completed"}
        >
         Edit
        </button>
        <button
          className="btn_delete"
          onClick={() => handleDelete(lead.id)}
        >
          Delete
        </button>
      </div>
    </div>
    {editopen && (
      <div className="modal-overlay">
        <div className="modal-card">
          <div className="modal_top">
            <h2>Edit Lead</h2>
            <button
              className="close-btn"
              onClick={() => {
                seteditopen(false);
                setFiterValue("");
              }}
            >
              <RiCloseLargeFill />
            </button>
          </div>
          <div className="modal_content">
            <form onSubmit={handleeditdata}>
              <div className="form_group">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={FiterValue?.email || ""}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>

              <div className="form_group">
                <label htmlFor="name">Name</label>
                <textarea
                  name="name"
                  value={FiterValue?.name || ""}
                  onChange={handleChange}
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
                  value={FiterValue?.mobile || ""}
                  onChange={handleChange}
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
                  value={FiterValue?.product || ""}
                  onChange={handleChange}
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
    )}
  </div>
  ))
}

   
    </div>
  );
};

export default TodoItem;
