import React from "react";
import Layout from "../layout/layout";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
import { Tabs } from "antd";

import { FaEye, FaEyeSlash } from "react-icons/fa";

const UpdateProfile = () => {
  const [auth, Setauth] = useAuth();
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [OldPassword, SetOldPassword] = useState("");
  const [NewPassword, SetNewPassword] = useState("");
  const [Location, SetLocation] = useState("");
  const [Number, SetNumber] = useState(0);
  const [photo, SetPhoto] = useState("");
  const [Github, SetGithub] = useState("");
  const [LinkedIn, SetLinkedIn] = useState("");
  const [Website, SetWebsite] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { TabPane } = Tabs;
  const [loading, setloading] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handlePersonalSubmit(e) {
    try {
      setloading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("Number", Number);
      formData.append("photo", photo);
      formData.append("Location", Location);

      e.preventDefault();
      const response = await fetch(
        `https://qviptaskbackend.onrender.com/api/v1/auth/profile/${auth.user._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: auth.token,
          },
          body: formData,
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        Setauth({
          ...auth, //spread auth to keep previous values as it is
          user: data.UpdatedUser,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: data.UpdatedUser,
          })
        );
        setloading(false);
        toast.success(data.message);
      } else {
        setloading(false);
        toast(data.message, {
          icon: "❌",
        });
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error("Error Updating Profile");
    }
  }

  async function handlePassword(e) {
    try {
      setloading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append("OldPassword", OldPassword);
      formData.append("NewPassword", NewPassword);

      const response = await fetch(
        `https://qviptaskbackend.onrender.com/api/v1/auth/ProfilePassword/${auth.user._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: auth.token,
          },
          body: formData,
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        Setauth({
          ...auth, //spread auth to keep previous values as it is
          user: data.UpdatedUser,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: data.UpdatedUser,
          })
        );
        SetOldPassword("");
        SetNewPassword("");
        setloading(false);
        toast.success(data.message);
      } else {
        setloading(false);
        toast(data.message, {
          icon: "❌",
        });
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error("Error Updating Profile");
    }
  }

  async function handleLinksSubmit(e) {
    try {
      setloading(true);
      e.preventDefault();

      const response = await fetch(
        `https://qviptaskbackend.onrender.com/api/v1/auth/ProfileLinks/${auth.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Github,
            LinkedIn,
            Website,
          }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        Setauth({
          ...auth, //spread auth to keep previous values as it is
          user: data.UpdatedUser,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            ...auth,
            user: data.UpdatedUser,
          })
        );
        SetGithub("");
        SetWebsite("");
        SetLinkedIn("");
        setloading(false);

        toast.success(data.message);
      } else {
        setloading(false);
        toast(data.message, {
          icon: "❌",
        });
      }
    } catch (error) {
      setloading(false);
      console.log(error);
      toast.error("Error Updating Profile");
    }
  }

  useEffect(() => {
    if (auth?.user) {
      const { Email, Name, Location, MobileNo, Github, LinkedIn, Website } =
        auth.user;

      SetName(Name);
      SetEmail(Email);
      SetLocation(Location);
      SetNumber(MobileNo);
      SetGithub(Github);
      SetWebsite(Website);
      SetLinkedIn(LinkedIn);
    }
  }, [auth?.user]);

  return (
    <Layout>
      <h2 className="w-100 text-center">Update Profile</h2>
      <div className="d-flex justify-content-around tabsparent">
        <Tabs centered style={{ width: "60%" }} className="Tabs">
          <TabPane
            tab="Personal Information"
            key="1"
            className="TabPanePersonalInfo"
          >
            <div className="d-flex flex-column align-items-center " >
              {" "}
              {auth.user && auth.user._id ? (
                <img
                  style={{ height: "10rem", width: "12rem" }}
                  title
                  className="img-circle img-thumbnail isTooltip EditProfileUSerPhoto"
                  src={`https://qviptaskbackend.onrender.com/api/v1/auth/get-userPhoto/${auth.user._id}`}
                  data-original-title="Usuario"
                />
              ) : null}
              <div className="d-flex justify-content-start w-100 border-2 mb-2">
                <label className="btn border border-3  btn-outline-primary ">
                  {photo ? photo.name.substring(0, 20) : "Update Profile Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      SetPhoto(e.target.files[0]);
                    }}
                    hidden
                    required
                  ></input>
                </label>
              </div>
            </div>

            <form
              style={{
                display: "flex",
                justifyContent: "center",
                width: "75%",
              }}
              onSubmit={(e) => {
                handlePersonalSubmit(e);
              }}
            >
              <div
                className="registerformupdate mt-3"
                style={{ width: "100%" }}
              >
                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label
                    htmlFor="exampleInputName w-25 text-start"
                    className="form-label"
                  >
                    <strong>Name:</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control w-75"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={Name}
                    onChange={(e) => {
                      SetName(e.target.value);
                    }}
                  />
                </div>

                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label
                    htmlFor="exampleInputEmail1 w-25"
                    className="form-label"
                  >
                    <b>Email</b>
                  </label>
                  <input
                    type="email"
                    className="form-control w-75"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={Email}
                    onChange={(e) => {
                      SetEmail(e.target.value);
                    }}
                    disabled
                  />
                </div>

                <div className="mb-1  w-100  d-flex align-items-center  justify-content-between">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    <b> Contact Number:</b>
                  </label>
                  <input
                    type="Number"
                    className="form-control w-75"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={Number}
                    onChange={(e) => {
                      SetNumber(e.target.value);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-dark "
                  disabled={loading}
                >
                  Save
                </button>
              </div>
            </form>
          </TabPane>

          <TabPane tab="Change Password" key="2">
            <form
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
              onSubmit={(e) => {
                handlePassword(e);
              }}
            >
              <div
                className="registerformupdatePassword mt-3"
                style={{ width: "100%" }}
              >
                <h3>
                  Change Password{" "}
                  <button
                    className="btn "
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </h3>
                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    <b>Old Password:</b>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control w-75"
                    id="exampleInputPassword1"
                    value={OldPassword}
                    onChange={(e) => {
                      SetOldPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    <b>New Password:</b>
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control w-75"
                    id="exampleInputPassword1"
                    value={NewPassword}
                    onChange={(e) => {
                      SetNewPassword(e.target.value);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-dark "
                  disabled={loading}
                >
                  Save
                </button>
              </div>
            </form>
          </TabPane>

          <TabPane tab="Additional Information" key="3">
            <form
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
              onSubmit={(e) => {
                handleLinksSubmit(e);
              }}
            >
              <div
                className="registerformupdatePassword mt-3"
                style={{ width: "100%" }}
              >
                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    <b>Github:</b>
                  </label>
                  <input
                    className="form-control w-75"
                    id="exampleInputPassword1"
                    value={Github}
                    onChange={(e) => {
                      SetGithub(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    <b>Linked In:</b>
                  </label>
                  <input
                    type="text"
                    className="form-control w-75"
                    id="exampleInputPassword1"
                    value={LinkedIn}
                    onChange={(e) => {
                      SetLinkedIn(e.target.value);
                    }}
                  />
                </div>
                <div className="mb-1 w-100  d-flex align-items-center  justify-content-between">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    <b>Website:</b>
                  </label>
                  <input
                    type="text"
                    className="form-control w-75"
                    id="exampleInputPassword1"
                    value={Website}
                    onChange={(e) => {
                      SetWebsite(e.target.value);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-dark "
                  disabled={loading}
                >
                  Save
                </button>
              </div>
            </form>
          </TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default UpdateProfile;
