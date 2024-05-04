import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import moment from "moment";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { IoCall } from "react-icons/io5";
import { Tag } from "antd";
import Layout from "../layout/layout";

const SingleUserProfile = () => {
  const [auth, SetAuth] = useAuth();
  const [QuestionAsked, SetQuestionAsked] = useState(0);
  const [AnswerAsked, SetAnswerAsked] = useState(0);
  const [Reputation, SetReputation] = useState(0);
  const [User, SetUser] = useState("");
  const { id } = useParams();

  async function GetUserDetails() {
    try {
      const Response = await fetch(
        `https://qviptaskbackend.onrender.com/api/v1/auth/Getuserinfo/${id}`
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
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    GetUserDetails();
  }, []);

  return (
    <Layout>
      {" "}
      <div className="d-flex align-items-center h-100 w-100 flex-column  gap-2 ">
        <h1>User Profile Page</h1>
        <div className=" d-flex justify-content-around w-100 UserInformationdiv" >
          <div className="panel-body inf-content " style={{ width: "65%" }}>
            <div className="row ">
              <div className="col-md-4 ">
                <img
                  style={{
                    width: "100%",
                  }}
                  src={`https://qviptaskbackend.onrender.com/api/v1/auth/get-userPhoto/${id}`}
                  className="hover-effect"
                  alt="User Photo(not Set) "
                />
              </div>
              <div className="col-md-6 allinfo">
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
              </div>
            </div>
          </div>
          {User.Github || User.LinkedIn || User.Website || User.MobileNo ? (
            <div
              className="d-flex flex-column align-items-center Contact"
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
                    <span className="Smalltxt">
                      {User.Github.substring(0, 40)}...
                    </span>
                  </NavLink>
                ) : null}
                {User.LinkedIn ? (
                  <NavLink
                    to={User.LinkedIn}
                    className="NavlinksDesign d-flex gap-2"
                  >
                    {" "}
                    <FaLinkedin />
                    <span className="Smalltxt">
                      {" "}
                      {User.LinkedIn.substring(0, 40)}...
                    </span>
                  </NavLink>
                ) : null}
                {User.Website ? (
                  <NavLink
                    to={User.Website}
                    className="NavlinksDesign d-flex gap-2"
                  >
                    {" "}
                    <FaGlobe />{" "}
                    <span className="Smalltxt">
                      {" "}
                      {User.Website.substring(0, 40)}...
                    </span>
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
    </Layout>
  );
};

export default SingleUserProfile;
