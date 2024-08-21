import React, { useState } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import Modal from "../Modal/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";

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
    setLeaddata((previewdata) => [...previewdata,data])
    console.log(res.data);
    reset();
    setIsOpen(false);
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
