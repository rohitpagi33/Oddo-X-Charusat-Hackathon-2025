import { FiMessageSquare } from "react-icons/fi"; 
import { BiNotification } from "react-icons/bi"; 
import { CiMoneyCheck1 } from "react-icons/ci"; 
import { SlPeople } from "react-icons/sl"; 
import { IoMdPeople } from "react-icons/io"; 
import { MdOutlineDashboard } from "react-icons/md"; 
import { TiDocumentText } from "react-icons/ti"; 
import { IoDocumentTextOutline } from "react-icons/io"; 
import { CiSettings } from "react-icons/ci"; 
import React from "react";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="sidebar bg-dark text-light p-3" style={{ width: "250px", height: "100vh", top:0, position : "sticky"}}>
      <h4>Dashboard</h4>
      <ul className="list-unstyled">
        <li>
          <button
            className="btn btn-dark w-200 text-start"
            onClick={() => setActiveComponent("dashboard")}
          >
            <MdOutlineDashboard />  Dashboard
            </button>
        </li>
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("loan-application")}
          >
           <TiDocumentText />  Loan Application
          </button>
        </li>
        {/* <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("settings")}
          >
            <CiSettings/>  Settings
          </button>
        </li> */}
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("borrower")}
          >
            <SlPeople />  Borrower
          </button>
        </li>
        <li>
          <button
            className="btn btn-dark w-100 text-start"
            onClick={() => setActiveComponent("transaction")}
          >
            <CiMoneyCheck1 />  Transaction
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
