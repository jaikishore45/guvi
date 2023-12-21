import { useContext } from "react";
import { authContext } from "./hooks/authContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import PasswordChangePage from "./pages/PasswordChangePage";
function App() {
  const { user } = useContext(authContext);
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />

        <Route
          path="/edit"
          element={user ? <EditPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/edit/password"
          element={user ? <PasswordChangePage /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
