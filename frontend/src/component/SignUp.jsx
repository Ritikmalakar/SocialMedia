import React, { useState } from "react";
import { toast } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import { baseUrl1 } from "../../Axios";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const dataSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await baseUrl1.post("/register", formData);

      if (data?.success) {
        toast.success(data?.message);

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f4f6f9",
      }}
    >
      <div
        className="card shadow border-0 p-4 rounded-4"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4 text-primary fw-bold">
          Create Account
        </h2>

        <form onSubmit={dataSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={changeData}
              className="form-control rounded-pill p-2"
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={changeData}
              className="form-control rounded-pill p-2"
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={changeData}
              className="form-control rounded-pill p-2"
            />
          </div>

          <button className="btn btn-primary w-100 rounded-pill py-2">
            Signup
          </button>

          <p className="text-center mt-3 mb-0">
            Already have an account?
            <Link to="/login" className="text-decoration-none ms-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
