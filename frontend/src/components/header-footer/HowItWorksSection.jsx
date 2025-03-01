import React from 'react';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="how-it-works">
      <div className="container">
        <h2 className="section-title gradient-text">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create an Account</h3>
            <p>Sign up as an partner or borrower with a simple verification process.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Connect</h3>
            <p>Partners browse loan requests or borrowers submit loan applications.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Fund or Receive</h3>
            <p>Partners fund projects they believe in, borrowers receive the capital they need.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Grow Together</h3>
            <p>Borrowers repay loans with interest, Partners earn returns on their investments.</p>
          </div>
        </div>
      </div>
      <div className="parallax-bg"></div>
    </section>
  );
}