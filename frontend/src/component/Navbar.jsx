import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const login = localStorage.getItem("login");
  const name = localStorage.getItem("name");

  const logoutUser = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("name");

    navigate("/login");
  };

  return (
    <div className="bg-white shadow-sm sticky-top">
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* Logo */}
        <Link to="/" className="text-decoration-none fs-3 fw-bold text-primary">
          SocialApp
        </Link>

        {/* Search */}
        <div className="w-50">
          <input
            type="text"
            placeholder="Search..."
            className="form-control rounded-pill"
          />
        </div>

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
