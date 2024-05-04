import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();
  const [auth, SetAuth] = useAuth();

  function HandleLogout() {
    localStorage.removeItem("auth");

    navigate("/login");
    window.location.reload();
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand">
            Navbar
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      <button className="btn btn-primary">Login</button>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      <button className="btn btn-primary">Register</button>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/alluser" className="nav-link">
                      <button className="btn btn-primary">Users_Qrcodes</button>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                      <button className="btn btn-primary">Your_Profile</button>
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/alluser" className="nav-link">
                      <button className="btn btn-primary">Users_Qrcodes</button>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                      <button className="btn btn-primary">UserProfile</button>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        HandleLogout();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
