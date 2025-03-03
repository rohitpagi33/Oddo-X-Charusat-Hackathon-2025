import React from 'react';

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        <h2 className="gradient-text">Ready to Get Started?</h2>
        <p>Join Partners and borrowers creating economic opportunities together.</p>
        <div className="cta-buttons">
          <a href="./register" className="btn btn-primary">Create an Account</a>
        </div>
      </div>
    </section>
  );
}