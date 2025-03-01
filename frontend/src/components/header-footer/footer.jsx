import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>MicroFin</h3>
            <p>Connecting Partners and borrowers to create economic opportunities worldwide.</p>
            <div className="social-links">
              <a href="#" className="social-icon">FB</a>
              <a href="#" className="social-icon">TW</a>
              <a href="#" className="social-icon">IG</a>
              <a href="#" className="social-icon">LI</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="./aboutUs">About Us</a></li>
              <li><a href="#">Our Team</a></li>

            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="#">Blog</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#success-stories">Success Stories</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 MicroFin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}