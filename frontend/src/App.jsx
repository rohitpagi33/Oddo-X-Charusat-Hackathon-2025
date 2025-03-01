import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard_Agency from "./pages/Dashboard_Agency";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard_User from "./pages/Dashboard_User";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard_user" element={<Dashboard_User />} />
        <Route path="/dashboard_agency" element={<Dashboard_Agency />} />
      </Routes>
    </Router>
  );
}

export default App;