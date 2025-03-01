import React, { useEffect } from 'react';
import '../styles/HomePage.css';
import { Link, Route } from 'react-router-dom';
import Header from '../components/header-footer/header';
import Footer from '../components/header-footer/footer';

export default function HomePage() {
  useEffect(() => {
    // Animated counter
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

    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    // document.addEventListener('mousemove', (e) => {
    //   cursor.style.left = e.clientX + 'px';
    //   cursor.style.top = e.clientY + 'px';

    //   setTimeout(() => {
    //     follower.style.left = e.clientX + 'px';
    //     follower.style.top = e.clientY + 'px';
    //   }, 100);
    // });

    // Parallax effect
    // window.addEventListener('scroll', () => {
    //   const parallaxBg = document.querySelector('.parallax-bg');
    //   let scrollPosition = window.pageYOffset;
    //   parallaxBg.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
    // });
  }, []);

  return (
    <div>
      <div className="cursor-follower"></div>
      
     <Header></Header>
  
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="gradient-text">Empowering Communities Through Microfinance</h1>
            <p>Connecting partners with borrowers to create opportunities and drive economic growth.</p>
            <div className="hero-cta">
              <a href="#" className="btn btn-primary">Become a partner</a>
              <a href="#" className="btn btn-secondary">Apply for a Loan</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://placeholder.svg?height=400&width=500" alt="People collaborating on microfinance" />
          </div>
        </div>
        <div className="hero-shape"></div>
      </section>
  
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
  
      <section id="investors" className="for-whom investors">
        <div className="container">
          <div className="content">
            <h2 className="section-title gradient-text">For Partners</h2>
            <p className="section-description">Make a difference while growing your portfolio</p>
            <ul className="benefits">
              <li>Start with as little as $25</li>
              <li>Diversify across multiple loans</li>
              <li>Earn competitive returns (5-9% annually)</li>
              <li>Track your impact with detailed reporting</li>
              <li>Automated investing options available</li>
            </ul>
            <a href="#" className="btn btn-primary">Become a partner</a>
          </div>
          <div className="image">
            <img src="https://placeholder.svg?height=400&width=400" alt="Investor using platform" />
          </div>
        </div>
      </section>
  
      <section id="borrowers" className="for-whom borrowers">
        <div className="container">
          <div className="image">
            <img src="https://placeholder.svg?height=400&width=400" alt="Borrower receiving funds" />
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
            <a href="#" className="btn btn-primary">Apply for a Loan</a>
          </div>
        </div>
      </section>
  
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title gradient-text">Success Stories</h2>
          <div className="testimonial-grid">
            <div className="testimonial">
              <div className="quote">"MicroLend helped me expand my small grocery store. The process was simple, and the interest rate was much better than traditional banks."</div>
              <div className="author">
                <img src="https://placeholder.svg?height=60&width=60" alt="Maria S." />
                <div className="author-info">
                  <h4>Maria S.</h4>
                  <p>Small Business Owner</p>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="quote">"I've been investing through MicroLend for 2 years now. Not only am I getting good returns, but I can see the direct impact of my investments."</div>
              <div className="author">
                <img src="https://placeholder.svg?height=60&width=60" alt="James T." />
                <div className="author-info">
                  <h4>James T.</h4>
                  <p>One of our partner</p>
                </div>
              </div>
            </div>
            <div className="testimonial">
              <div className="quote">"The loan I received helped me purchase equipment for my tailoring business. Now I employ three people from my community."</div>
              <div className="author">
                <img src="https://placeholder.svg?height=60&width=60" alt="Ahmed K." />
                <div className="author-info">
                  <h4>Ahmed K.</h4>
                  <p>Entrepreneur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <section className="cta-section">
        <div className="container">
          <h2 className="gradient-text">Ready to Get Started?</h2>
          <p>Join Partners and borrowers creating economic opportunities together.</p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-primary">Create an Account</a>
            <a href="#" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
      </section>
  
      <footer></footer>
    </div>
  );
}