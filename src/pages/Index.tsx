
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import PopularDestinations from '@/components/home/PopularDestinations';
import FeaturedExperiences from '@/components/home/FeaturedExperiences';
import Testimonials from '@/components/home/Testimonials';
import NewsletterSection from '@/components/home/NewsletterSection';

const Index: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-grow relative z-10">
        <HeroSection />
        <div className="mx-auto max-w-[1400px]">
          <PopularDestinations />
          <FeaturedExperiences />
          <Testimonials />
        </div>
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
