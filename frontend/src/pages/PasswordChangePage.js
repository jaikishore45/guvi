import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { authContext } from "../hooks/authContext";
function PasswordChangePage() {
  const navigate = useNavigate();
  const { dispatch, user } = useContext(authContext);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const special = ["@", "#", "$", "%", "^", "&", "*", "(", ")", "[", "]"];

  const [message, setMessage] = useState("");

  const [display, setDisplay] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    if (!password.includes(...numbers) || !password.includes(...special)) {
      setMessage("Password Must Contain Number and Special Characters");
      setDisplay(true);
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Password Does Not Match Confirm Password");
      setDisplay(true);
      return;
    }

    axios
      .put(`http://localhost:7500/user/password/${user.user._id}`, {
        password,
      })
      .then((res) => {})
      .catch((err) => {});

    setDisplay(false);
    setPassword("");
    setConfirmPassword("");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <>
      <div className="container-fluid my-3 mx-2">
        <h3 className="text-center my-3">Change Password</h3>
        <div className="d-flex justify-content-center align-items-center">
          <form onSubmit={submitHandler} className="border p-5 w-50">
            <div>
              <input
                type="password"
                placeholder="Your New Password"
                value={password}
                onChange={passwordHandler}
                className="form-control"
              />
            </div>
            <div className="my-1">
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                className="form-control"
                onChange={confirmPasswordHandler}
              />
            </div>

            <div className="text-center my-2">
              <button className="btn btn-primary w-100">Submit</button>
            </div>
          </form>
        </div>
        {display ? (
          <div className="container-fluid text-center my-1 d-flex justify-content-center align-items-center">
            <div className="bg-danger text-light  w-50 p-4">{message}</div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default PasswordChangePage;
