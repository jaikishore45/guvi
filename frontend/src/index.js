import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AuthContextprovider } from "./hooks/authContext";  // Updated import

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextprovider>  {/* Updated component name */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextprovider>
  </React.StrictMode>
);
