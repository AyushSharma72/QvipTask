import React, { useEffect, useState } from "react";
import Layout from "../layout/layout";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import moment from "moment";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import "../App.css";
import toast from "react-hot-toast";
import { IoCall } from "react-icons/io5";

const UserProfile = () => {
  const [auth, SetAuth] = useAuth();

  const [User, SetUser] = useState("");

  async function GetUserDetails() {
    try {
      const Response = await fetch(
        `http://localhost:8000/api/v1/auth/Getuserinfo/${auth.user._id}`
      );
      if (Response) {
        const data = await Response.json();
        if (Response.status == 200) {
          SetUser(data.user);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.addEventListener("mousemove", calculateParallax);
  }, []);

  function calculateParallax(e) {
    const container = document.querySelector(".cont");
    if (container) {
      const rekt = container.getBoundingClientRect();
      const anchorX = rekt.left + rekt.width / 2;
      const anchorY = rekt.top + rekt.height / 2;

      const image = document.querySelector(".hover-effect");
      if (image) {
        const dx = e.clientX - anchorX;
        const dy = e.clientY - anchorY;
        const translateX = dx * 0.1;
        const translateY = dy * 0.1;
        image.style.transform = `translate(${translateX}px, ${translateY}px)`;
      }
    }
  }

  useEffect(() => {
    GetUserDetails();
  }, [auth]);

  return (
    <Layout>
      {" "}
      <h2 className="w-100 text-center"> Your Profile </h2>
      <div className="d-flex align-items-center h-100 flex-column  gap-2 ">
        {auth?.user ? (
          <div>
            <div className=" d-flex justify-content-around w-100">
              <div className="panel-body inf-content " style={{ width: "65%" }}>
                <div className="row">
                  <div className="col-md-4 cont">
                    {auth.user && auth.user._id ? (
                      <img
                        style={{
                          width: "100%",
                        }}
                        src={`http://localhost:8000/api/v1/auth/get-userPhoto/${auth.user._id}`}
                        className="hover-effect"
                      />
                    ) : null}
                  </div>
                  <div className="col-md-6">
                    <strong className="UserInfo">User Information</strong>
                    <br />
                    <div className="table-responsive">
                      <table className="table table-user-information">
                        <tbody>
                          <tr>
                            <td>
                              <span className="glyphicon glyphicon-asterisk text-primary" />
                              Id
                            </td>
                            <td className="Info">{User._id}</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="glyphicon glyphicon-user  text-primary" />
                              Name
                            </td>
                            <td className="Info">{User.Name}</td>
                          </tr>

                          <tr>
                            <td>
                              <span className="glyphicon glyphicon-envelope text-primary" />
                              Email
                            </td>
                            <td className="Info">{User.Email}</td>
                          </tr>
                          <tr>
                            <td>
                              <span className="glyphicon glyphicon-calendar text-primary" />
                              Location
                            </td>
                            <td className="Info">{User.Location}</td>
                          </tr>

                          <tr>
                            <td>
                              <span className="glyphicon glyphicon-calendar text-primary" />
                              Joined
                            </td>

                            <td className="Info">
                              {moment(User.createdAt).fromNow()}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <NavLink to="/Update" className="NavlinkStyle">
                      <button className=" btn btn-dark">Update info</button>
                    </NavLink>
                  </div>
                </div>
              </div>
              {User.Github || User.LinkedIn || User.Website || User.MobileNo ? (
                <div
                  className="d-flex flex-column align-items-center "
                  style={{ width: "25%" }}
                >
                  <h4> Contact Info</h4>
                  <div className="d-flex flex-column gap-3 justify-content-center contactinfo p-2 w-100">
                    {User.Github ? (
                      <NavLink
                        to={User.Github}
                        className="NavlinksDesign d-flex align-items-center gap-2"
                      >
                        {" "}
                        <FaGithub />
                        <span className="Smalltxt"> {User.Github}</span>
                      </NavLink>
                    ) : null}
                    {User.LinkedIn ? (
                      <NavLink
                        to={User.LinkedIn}
                        className="NavlinksDesign d-flex gap-2"
                      >
                        {" "}
                        <FaLinkedin />
                        <span className="Smalltxt"> {User.LinkedIn}</span>
                      </NavLink>
                    ) : null}
                    {User.Website ? (
                      <NavLink
                        to={User.Website}
                        className="NavlinksDesign d-flex gap-2"
                      >
                        {" "}
                        <FaGlobe />{" "}
                        <span className="Smalltxt"> {User.Website}</span>
                      </NavLink>
                    ) : null}
                    {User.MobileNo ? (
                      <div className="NavlinksDesign d-flex gap-2">
                        {" "}
                        <IoCall />
                        <span className="numberStyle"> {User.MobileNo}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : (
                "No contact info"
              )}
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center ">
            <h3>Please login to access this page</h3>
            <NavLink to="/login">
              <button className="btn btn-dark">Login</button>
            </NavLink>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserProfile;
