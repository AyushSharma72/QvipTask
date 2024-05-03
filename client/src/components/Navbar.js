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
    setTimeout(() => {
      toast.success("logout Successfull");
      window.location.reload();
    }, 500);
  }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary "
        style={{ zIndex: "3" }}
      >
        <div className="d-flex justify-content-between w-100 ">
          <div className="ml-3">
            <h3 style={{ color: "white" }}>Navbar</h3>
          </div>
          <div className="w-50 d-flex justify-content-around">
            {!auth.user ? (
              <>
                <NavLink to="/login" className="NavlinkStyle">
                  {" "}
                  <button className=" btn btn-primary"> Login </button>
                </NavLink>
                <NavLink to="/register" className="NavlinkStyle">
                  <button className=" btn btn-primary"> Register</button>
                </NavLink>
                <NavLink to="/alluser" className="NavlinkStyle">
                  <button className=" btn btn-primary">Users_Qrcodes</button>
                </NavLink>
                <NavLink to="/" className="NavlinkStyle">
                  <button className=" btn btn-primary">Your_Profile</button>
                </NavLink>
              </>
            ) : null}

            {auth.user ? (
              <>
                {" "}
                <NavLink to="/alluser" className="NavlinkStyle">
                  <button className=" btn btn-primary">Users_Qrcodes</button>
                </NavLink>
                <NavLink to="/" className="NavlinkStyle">
                  <button className=" btn btn-primary">UserProfile</button>
                </NavLink>
                <NavLink to="/" className="NavlinkStyle">
                  <button
                    className=" btn btn-primary"
                    onClick={() => {
                      HandleLogout();
                    }}
                  >
                    Logout
                  </button>
                </NavLink>
              </>
            ) : null}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
