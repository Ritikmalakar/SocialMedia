import React, { useState } from "react";
import { baseUrl1 } from "../../Axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await baseUrl1.post("/login", formData);

      if (data.success) {
        localStorage.setItem("token", data.token);

        localStorage.setItem("login", true);

        localStorage.setItem("userId", data.user._id);

        localStorage.setItem("name", data.user.name);

        toast.success("Login Success");

        navigate("/");
      }
    } catch (error) {
      console.log(error.response?.data);

      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={loginUser}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={changeData}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            value={formData.password}
            onChange={changeData}
          />

          <button className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
