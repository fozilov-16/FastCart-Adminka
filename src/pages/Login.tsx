import { Input, Button, Form } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import logo from "../assets/logo.png";
import fastcart from "../assets/fastcart.png";
import { loginThunk } from "../api/api";

const Login = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      await dispatch(loginThunk(values));
      setLoading(false);
      navigate("/dashboard");
    },
  });

  return (
    <div className="flex min-h-screen">
      <div className="w-[680px] bg-[#0B2545] flex flex-col justify-center p-[30px] text-white">
        <h1 className="text-3xl font-semibold mb-4">
          Welcome to admin panel
        </h1>
        <div className="flex items-center gap-5">
          <img className="h-[100px]" src={logo} />
          <img className="mt-4" src={fastcart} />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-[400px]">
          <Form onFinish={handleSubmit} className="flex flex-col gap-6">
            <Input
              name="userName"
              placeholder="Username"
              size="large"
              value={values.userName}
              onChange={handleChange}
            />

            <Input.Password
              name="password"
              placeholder="Password"
              size="large"
              value={values.password}
              onChange={handleChange}
            />

            <Button
              htmlType="submit"
              type="primary"
              size="large"
              loading={loading}
            >
              Log in
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
