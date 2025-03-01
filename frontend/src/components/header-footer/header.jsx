import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>Micro<span>Fin</span></h1>
        </div>
        <nav>
          <ul>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#investors">For partners</a></li>
            <li><a href="#borrowers">For Borrowers</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
        </nav>
        <div className="cta-buttons">
          <a href="./register" className="btn btn-primary">Sign Up / Login</a>
        </div>
      </div>
    </header>
  );
}
