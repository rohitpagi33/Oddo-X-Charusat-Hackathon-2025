import React, { useEffect } from 'react';
import '../styles/HomePage.css';
import Header from '../components/header-footer/header';
import HeroSection from '../components/header-footer/HeroSection';
import StatsSection from '../components/header-footer/StatsSection';
import HowItWorksSection from '../components/header-footer/HowItWorksSection';
import ForPartnersSection from '../components/header-footer/ForPartnersSection';
import ForBorrowersSection from '../components/header-footer/ForBorrowersSection';
import TestimonialsSection from '../components/header-footer/TestimonialsSection';
import CTASection from '../components/header-footer/CTASection';
import Footer from '../components/header-footer/footer';

export default function HomePage() {
  
  return (
    <div>
      <Header />
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <ForPartnersSection />
      <ForBorrowersSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}