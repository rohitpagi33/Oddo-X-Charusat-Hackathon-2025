import React from "react";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="sidebar bg-dark text-light p-3" style={{ width: "250px", height: "100vh" }}>
      <h4>Dashboard</h4>
      <ul className="list-unstyled">
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("dashboard")}
          >
            📊 Dashboard
          </button>
        </li>
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("apply_loan")}
          >
            💰 Apply Loan
          </button>
        </li>
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("settings")}
          >
            ⚙️ Settings
          </button>
        </li>
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("emi")}
          >
            ⚙️ EMI Schedual
          </button>
        </li>
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("cibil")}
          >
            ⚙️ CIBIL Score
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
