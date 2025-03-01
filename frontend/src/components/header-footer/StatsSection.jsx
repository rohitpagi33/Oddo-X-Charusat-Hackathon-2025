import React, { useEffect } from 'react';

export default function StatsSection() {
  useEffect(() => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + inc);
          setTimeout(updateCount, 1);
        } else {
          counter.innerText = target;
        }
      };

      updateCount();
    });
  }, []);

  return (
    <section className="stats">
      <div className="container">
        <div className="stat-item">
          <h2 className="counter" data-target="10">0</h2>
          <p>Million+ Funded</p>
        </div>
        <div className="stat-item">
          <h2 className="counter" data-target="15000">0</h2>
          <p>Active partners</p>
        </div>
        <div className="stat-item">
          <h2 className="counter" data-target="25000">0</h2>
          <p>Borrowers Supported</p>
        </div>
        <div className="stat-item">
          <h2 className="counter" data-target="98">0</h2>
          <p>% Repayment Rate</p>
        </div>
      </div>
    </section>
  );
}