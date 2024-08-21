import axios from "axios";
import React, { useEffect,useState } from "react";
import Model from '../Modal/Modal'
import { useForm } from "react-hook-form";
import EditModel from "../Modal/EditModel";


const TodoItem = ({ setFiterValue,FiterValue, completeTodo, deleteTodo,setLeaddata,Leaddata,editopen,seteditopen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    fetchlead();

  },[]);
  console.log(Leaddata);
const fetchlead = async() => {
  const res = await axios.get('http://localhost:8001/api/getlead');
  if(res.data.code == 200){
    setLeaddata(res.data.message);
  }else{
    console.log(res.data.message);
    
  }
}

  const todo = '';

const handleedit = (id) => {
  seteditopen(true);
  const fiterdata = Leaddata.filter((data) => data.id == id);
  setFiterValue(fiterdata[0]);
  console.log('fiterdata',fiterdata);
  
}

  return (
    <div className="todo_items">

{
  Leaddata && Leaddata.map((lead)=>(
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
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
    <EditModel
    Leaddata={Leaddata}
    FiterValue={FiterValue}
    seteditopen={seteditopen}
        isOpen={editopen}
        onClose={() => seteditopen(false)}
        handleSubmit={handleSubmit()}
        register={register}
        errors={errors}
      />
  </div>
  ))
}

   
    </div>
  );
};

export default TodoItem;
