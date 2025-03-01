import React from "react";
import { Link } from "react-router-dom";
import "../../styles/header-footer/header.css";

function header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">LoanApp</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/apply">Apply Now</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default header;
