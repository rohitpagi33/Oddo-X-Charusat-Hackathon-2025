// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthPage from "./pages/LoginPage"; // Ensure the correct path

// const Home = () => <h1 className="text-center mt-5">Welcome To MicroFin</h1>;

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<AuthPage type="login" />} />
//         <Route path="/register" element={<AuthPage type="register" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashbaord_user" element={<Dashboard_User />} />
      </Routes>
    </Router>
  );
}

export default App;
