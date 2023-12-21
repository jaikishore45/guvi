import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { authContext } from "../hooks/authContext";
function Signup() {
  const { dispatch } = useContext(authContext);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const special = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]"];
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

  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState("");
  const [register, setRegister] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");

  const usernameHandler = (event) => {
    setNewUser({ ...newUser, username: event.target.value });
  };

  const emailHandler = (event) => {
    setNewUser({ ...newUser, email: event.target.value });
  };
  const bioHandler = (event) => {
    setNewUser({ ...newUser, bio: event.target.value });
  };
  const passwordHandler = (event) => {
    setNewUser({ ...newUser, password: event.target.value });
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };

  const ageHandler = (event) => {
    setNewUser({...newUser,age:event.target.value});
  };

  const genderHandler = (event) => {
    setNewUser({...newUser,gender:event.target.value});
  //  setNewUser(event.target.value);
  };

  const dobHandler = (event) => {
    setNewUser({...newUser,dob:event.target.value});
    //setNewUser(event.target.value);
  };

  const mobileHandler = (event) => {
    setNewUser({...newUser,mobile:event.target.value});
    //setNewUser(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    console.log(newUser)

    if (
      newUser.email.length <= 0 ||
      newUser.username.length <= 0 ||
      newUser.password.length <= 0
    ) {
      setMessage("All Fields Must Be Filled");
      setDisplay(true);
      return;
    }

    if (
      !newUser.password.includes(...numbers) ||
      !newUser.password.includes(...special)
    ) {
      setMessage("Password Must Contain Number and Special Characters");
      setDisplay(true);
      return;
    }
    if (newUser.password !== confirmPassword) {
      setMessage("Password Does Not Match Confirm Password");
      setDisplay(true);
      return;
    }

    setSuccessMessage("Registration Successful");

    axios
      .post("http://localhost:7500/signup", {
        ...newUser,
      })
      .then((res) => {
        console.log(`response from server : ${res.data}`);
        if (res) {
          localStorage.setItem("user", JSON.stringify(res.data));
          dispatch({ type: "LOGIN", payload: res.data });
          setRegister(true);
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
      });

    setDisplay(false);
    setNewUser({
      username: "",
      email: "",
      password: "",
      bio: "",
      age: "",
      gender: "",
      dob: "",
      mobile: ""
    });
    setConfirmPassword("");
  };
  return (
    <>
      <div className="container-fluid my-3 mx-2">
        <h3 className="text-center my-3">Sign Up</h3>
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
                type="email"
                placeholder="example@gmail.com"
                value={newUser.email}
                onChange={emailHandler}
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

              <div className="my-1">
              <input
                type="text"
                placeholder="Your Age"
                value={newUser.age}
                className="form-control"
                onChange={ageHandler}
              />
            </div>

            <div className="my-1">
              <input
                type="text"
                placeholder="Your Gender"
                value={newUser.gender}
                className="form-control"
                onChange={genderHandler}
              />
            </div>

            <div className="my-1">
              <input
                type="text"
                placeholder="Your Dob"
                value={newUser.dob}
                className="form-control"
                onChange={dobHandler}
              />
            </div>

            <div className="my-1">
              <input
                type="numeric"
                placeholder="Mobile Number"
                value={newUser.mobile}
                className="form-control"
                onChange={mobileHandler}
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Your Password"
                value={newUser.password}
                onChange={passwordHandler}
                className="form-control"
              />
            </div>
            <div className="my-1">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                className="form-control"
                onChange={confirmPasswordHandler}
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
        {display ? (
          <div className="container-fluid text-center my-1 d-flex justify-content-center align-items-center">
            <div className="bg-danger text-light  w-50 p-4">{message}</div>
          </div>
        ) : null}
        {register ? (
          <div className="container-fluid text-center mx-3 d-flex justify-content-center align-items-center my-3">
            <div className="bg-success text-light  w-75 w-md-50  p-1 p-md-4">
              {successMessage}
              <br />
              You Can Login With Your Email And Password
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Signup;
