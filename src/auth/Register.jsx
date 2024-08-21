import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Await, useNavigate } from "react-router-dom";
import "./Login.css";
import video from "../assets/videos/loginVideo.mp4";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async(data) => {
    const trimmedName = data.name.trim();
    const trimmedPassword = data.password.trim();
    const trimmedUsername = data.username
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_");
    
      const res = await axios.post('https://interview-assignment-backend-zzx0.onrender.com/api/signup',{
        name: trimmedName,
        username: trimmedUsername,
        password: trimmedPassword
      });
      console.log(res.data);
  
      login(trimmedName, trimmedUsername);
      if(res.status === 200) {
        navigate("/home");
      }else{
        alert('Invalid credentials');
      }
   
   
  };

  // Custom password validation function that shows one error at a time
  const validatePassword = (password) => {
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[@$!%*?&#]/.test(password)) {
      return "Password must contain at least one special character.";
    }
    if (password.length < 7) {
      return "Password must be at least 7 characters long.";
    }
    return true;
  };

  return (
    <div className="login">
      <div className="login_left">
        <div className="login_video">
          <video src={video} autoPlay loop muted playsInline preload="auto" />
        </div>
      </div>
      <div className="login_right">
        <div className="login_card">
          <h2 className="login_heading">Todo List</h2>
          <form
            className="login_form"
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Login Form"
          >
            <div className="form_group">
              <label className="form_label" htmlFor="name">
                Name:
              </label>
              <input
                className="form_input"
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
                aria-required="true"
                aria-label="Enter your name"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="error_message">{errors.name.message}</p>
              )}
            </div>
            <div className="form_group">
              <label className="form_label" htmlFor="username">
                Username:
              </label>
              <input
                className="form_input"
                type="text"
                id="username"
                {...register("username", {
                  required: "Username is required",
                  pattern: {
                    value: /^[A-Za-z0-9_]+$/,
                    message:
                      "Username must not contain special characters or spaces",
                  },
                })}
                aria-required="true"
                aria-label="Enter your username"
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="error_message">{errors.username.message}</p>
              )}
            </div>
            <div className="form_group">
              <label className="form_label" htmlFor="password">
                Password:
              </label>
              <input
                className="form_input"
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  validate: validatePassword,
                })}
                aria-required="true"
                aria-label="Enter your Password"
                placeholder="Enter your Password"
              />
              {errors.password && (
                <p className="error_message">{errors.password.message}</p>
              )}
            </div>
            <button
              className="submit_button"
              type="submit"
              aria-label="Submit Login Form"
            >
              Submit
            </button>
          </form>
          <Link to={"/"}>I already have an account, sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
