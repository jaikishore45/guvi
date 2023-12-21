import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";
import { authContext } from "../hooks/authContext";
function HomePage() {
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const [u, setUser] = useState({
    username: "",
    email: "",
    bio: "",
    password: "",
    age: "",
    gender: "",
    dob: "",
    mobile: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:7500/user/${user.user._id}`).then((res) => {
      setUser(res.data.res);
    });
  }, [u]);
  return (
    <>
      <div className="text-center">
        <h1>Welcome, {u.username.toUpperCase()}</h1>
      </div>

      <div className="container d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-between  my-1 w-25">
          <h5>Username</h5>

          <p className="lead">
            <i>{u.username}</i>
          </p>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-between w-25">
          <h5>Email</h5>

          <p className="lead">
            <i>{u.email}</i>
          </p>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-between w-25">
          <h5>Bio</h5>

          <p className="lead">
            <i>{u.bio}</i>
          </p>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-between w-25">
          <h5>Age</h5>

          <p className="lead">
            <i>{u.age}</i>
          </p>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-between w-25">
          <h5>Gender</h5>

          <p className="lead">
            <i>{u.gender}</i>
          </p>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-between w-25">
          <h5>DOB</h5>

          <p className="lead">
            <i>{u.dob}</i>
          </p>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-between w-25">
          <h5>Mobile</h5>

          <p className="lead">
            <i>{u.mobile}</i>
          </p>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center">
        <button
          className="btn btn-secondary"
          onClick={() => {
            navigate("/edit");
          }}
        >
          Edit Details
        </button>

        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            navigate("/edit/password");
          }}
        >
          Change Password
        </button>
      </div>
    </>
  );
}

export default HomePage;
