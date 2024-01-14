import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="card p-4 shadow w-25"
        >
          <h2>Register Form</h2>
          <Form.Item label="Name" name="name">
            <Input type="text" required className="p-2" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required className="p-2" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required className="p-2" />
          </Form.Item>
          <Link to="/login" className="text-decoration-none text-primary m-2">
            Already have an account? Login
          </Link>
          <button className="btn btn-primary">Register</button>
        </Form>
      </div>
    </>
  );
};

export default Register;
