import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../hooks/authContext";
import axios from "axios";

function Signup() {
  const { user, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({
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

    console.log(res.data.res)
      setNewUser(res.data.res);
    });
  }, [user]);

  const usernameHandler = (event) => {
    setNewUser({ ...newUser, username: event.target.value });
  };

  const bioHandler = (event) => {
    setNewUser({ ...newUser, bio: event.target.value });
  };

  const ageHandler = (event) => {
    setNewUser({ ...newUser, age: event.target.value });
  };

  const genderHandler = (event) => {
    setNewUser({ ...newUser, gender: event.target.value });
  };

  const dobHandler = (event) => {
    setNewUser({ ...newUser, dob: event.target.value });
  };

  const mobileHandler = (event) => {
    setNewUser({ ...newUser, mobile: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (newUser.username.length <= 0 || newUser.bio.length <= 0) {
      setError("All Fields Must Be Filled");
      return;
    }

    axios
      .put(`http://localhost:7500/user/${user.user._id}`, {
        ...newUser,
      })
      .then((res) => {})
      .catch((err) => {});
    
    navigate("/");
  };
  return (
    <>
      <div className="container-fluid my-3 mx-2">
        <h3 className="text-center my-3">Edit Details</h3>
        <div className="d-flex justify-content-center align-items-center">
          <form onSubmit={submitHandler} className="border p-5 w-50">
            <div className="my-1">
              <input
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={usernameHandler}
                className="form-control"
              />
            </div>

            <div className="my-1">
              <input
                type="text"
                placeholder="Your Bio"
                value={newUser.bio}
                onChange={bioHandler}
                className="form-control"
              />
            </div>

            <div>
            <input
                type="text"
                placeholder="age"
                value={newUser.age}
                onChange={ageHandler}
                className="form-control"
              />
            </div>

            <div>
            <input
                type="text"
                placeholder="gender"
                value={newUser.gender}
                onChange={genderHandler}
                className="form-control"
              />
            </div>

            <div>
            <input
                type="text"
                placeholder="dob"
                value={newUser.dob}
                onChange={dobHandler}
                className="form-control"
              />
            </div>

            <div>
            <input
                type="text"
                placeholder="mobile"
                value={newUser.mobile}
                onChange={mobileHandler}
                className="form-control"
              />
            </div>



            <div className="text-center my-2">
              <button className="btn btn-primary w-100">Submit</button>
            </div>
            {error ? (
              <p className="lead text-center text-danger">{error}</p>
            ) : null}
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
