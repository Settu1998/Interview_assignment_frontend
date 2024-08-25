import React, { useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddTodoForm = ({ handleAddTodo, toast,setLeaddata }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {

    const res = await axios.post('https://interview-assignment-backend-zzx0.onrender.com/api/createLead',data);
    if(res.data.code === 200){
      toast.success("New Lead Added Successfully");
      setLeaddata((previewdata) => [...previewdata,data])
      console.log(res.data);
      reset();
      setIsOpen(false);
    }else{
       toast.error(res.data.message)
    }
  };

  return (
    <div className="add_todo">
      <button className="add_todo_btn" onClick={() => setIsOpen(true)}>
        <HiOutlinePlusSm />
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default AddTodoForm;
