import React from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../hooks/authContext";
function Navbar() {
  const { user, dispatch } = useContext(authContext);

  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Students Details
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div>
            {!user ? (
              <div className="d-flex ">
                <Link to={"/signup"} className="nav-link ">
                           Sign Up
                </Link>
                <Link to="/login" className="nav-link mx-1">
                  Login
                </Link>
              </div>
            ) : null}
          </div>

          {user ? (
            <button className="btn btn-info text-white" onClick={logoutHandler}>
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
