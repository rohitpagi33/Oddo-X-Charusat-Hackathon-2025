import React from "react";
import "../../styles/header-footer/footer.css";

function footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <ul>
            <li><a href="/terms">Terms & Conditions</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <p>Contact us: support@loanapp.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 LoanApp. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default footer;
