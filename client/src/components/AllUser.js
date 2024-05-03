import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../layout/layout";
import { useAuth } from "../context/auth";
import { QRCode, Space } from "antd";
import { NavLink } from "react-router-dom";
import { IoCall } from 'react-icons/io5';

const AllUser = () => {
  const [Users, SetUsers] = useState([]);
  const [auth, Setauth] = useAuth();
  const [loading, Setloading] = useState(null);
  async function GetAllUsers() {
    try {
      Setloading(true);
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/get-allusers"
      );
      if (response.status == 200) {
        const data = await response.json();
        SetUsers(data.Users);
        Setloading(false);
      } else {
        Setloading(false);
        toast.error("Error in api");
      }
    } catch (error) {
      Setloading(false);
      toast.error("Error fetching users");
    }
  }
  useEffect(() => {
    GetAllUsers();
  }, []);

  return (
    <Layout>
      <h3 className="w-100 text-center">
        AllUser(Scan or click Qr to view profile)
      </h3>
      {!loading ? (
        <div className="w-100 d-flex justify-content-center flex-wrap mt-2 gap-2">
          {Users.map((u, _id) => (
            <div className="d-flex align-items-center gap-1 w-25">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                  style={{
                    width: "8rem",
                  }}
                  src={`http://localhost:8000/api/v1/auth/get-userPhoto/${u._id}`}
                  alt="Image(not set)"
                />
                <b>{u.Name}</b>
              </div>
              <div className="d-flex flex-column align-items-center mt-4">
                <Space>
                  <NavLink to={`/SingleUserInfo/${u._id}`}>
                    <QRCode type="canvas" value={`/SingleUserInfo/${u._id}`} />
                  </NavLink>
                </Space>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h5 className="w-100 text-center">Loading...</h5>
      )}
    </Layout>
  );
};

export default AllUser;
