import React from 'react';

export default function TestimonialsSection() {
  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title gradient-text">Success Stories</h2>
        <div className="testimonial-grid">
          <div className="testimonial">
            <div className="quote">"MicroLend helped me expand my small grocery store. The process was simple, and the interest rate was much better than traditional banks."</div>
            <div className="author">
              <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid" alt="Maria S." />
              <div className="author-info">
                <h4>Marcus S.</h4>
                <p>Small Business Owner</p>
              </div>
            </div>
          </div>
          <div className="testimonial">
            <div className="quote">"I've been investing through MicroLend for 2 years now. Not only am I getting good returns, but I can see the direct impact of my investments."</div>
            <div className="author">
              <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid" alt="James T." />
              <div className="author-info">
                <h4>James T.</h4>
                <p>One of our partner</p>
              </div>
            </div>
          </div>
          <div className="testimonial">
            <div className="quote">"The loan I received helped me purchase equipment for my tailoring business. Now I employ three people from my community."</div>
            <div className="author">
              <img src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid" alt="Ahmed K." />
              <div className="author-info">
                <h4>Ahmed K.</h4>
                <p>Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}