import React from 'react';

export default function ForBorrowersSection() {
  return (
    <section id="borrowers" className="for-whom borrowers">
      <div className="container">
        <div className="image">
          <img src="data:image/png;base64,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" alt="Borrower receiving funds" />
        </div>
        <div className="content">
          <h2 className="section-title gradient-text">For Borrowers</h2>
          <p className="section-description">Access affordable capital to grow your business</p>
          <ul className="benefits">
            <li>Loans from $500 to $50,000</li>
            <li>Competitive interest rates</li>
            <li>Flexible repayment terms</li>
            <li>No collateral required for many loans</li>
            <li>Quick application and approval process</li>
          </ul>
          <a href="./register" className="btn btn-primary">Apply for a Loan</a>
        </div>
      </div>
    </section>
  );
}