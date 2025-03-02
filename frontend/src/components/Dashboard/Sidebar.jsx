import { RiNumbersFill } from "react-icons/ri"; 
import { MdSchedule } from "react-icons/md"; 
import React from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { FiMessageSquare } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="sidebar bg-dark text-light p-3" style={{ width: "250px", height: "100vh", top:0, position : "sticky"}}>
      <h4>Dashboard</h4>
      <ul className="list-unstyled">
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("dashboard")}
          >
                         <MdOutlineDashboard />  Dashboard
             
          </button>
        </li>
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("apply_loan")}
          >
           <TiDocumentText />  Loan Apply
          </button>
        </li>
        {/* <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("settings")}
          >
            ⚙️ Settings
          </button>
        </li> */}
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("emi")}
          >
            <MdSchedule /> EMI Schedual
          </button>
        </li>
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("cibil")}
          >
           <RiNumbersFill /> CIBIL Score
          </button>
        </li>
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("kyc")}
          >
           <RiNumbersFill /> KYC
          </button>
        </li>
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("messages")}
          >
             <FiMessageSquare />  Notifications 
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
