import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl1 } from "../AxiosR";

export default function Navbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const login = localStorage.getItem("login");
  const name = localStorage.getItem("name");

  const logoutUser = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("name");
    navigate("/login");
  };

  // Search Function
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    try {
      const { data } = await baseUrl1.get(`/search?query=${search}`);

      console.log(data);

      navigate("/search", {
        state: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-sm sticky-top">
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* Logo */}
        <Link to="/" className="text-decoration-none fs-3 fw-bold text-primary">
          SocialApp
        </Link>

        {/* Search */}
        <form className="w-50 d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search user..."
            className="form-control rounded-pill"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className="btn btn-primary ms-2">Search</button>
        </form>

        {/* Right */}
        <div className="d-flex gap-2 align-items-center">
          {login ? (
            <>
              <span>{name}</span>

              <button className="btn btn-danger" onClick={logoutUser}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary">
                Login
              </Link>

              <Link to="/signup" className="btn btn-primary">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
