import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
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
          <h2>Login Form</h2>

          <Form.Item label="Email" name="email">
            <Input type="email" required className="p-2" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required className="p-2" />
          </Form.Item>
          <Link
            to="/register"
            className="text-decoration-none text-primary m-2"
          >
            Don't have an account? Register
          </Link>
          <button className="btn btn-primary">Login</button>
        </Form>
      </div>
    </>
  );
};

export default Login;
