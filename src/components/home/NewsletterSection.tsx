
import React from 'react';
import { Button } from '@/components/ui/button';

const NewsletterSection: React.FC = () => {
  return (
    <section className="py-20 bg-travel-blue text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Travel Tips & Inspiration</h2>
          <p className="text-lg mb-8">
            Join our newsletter and receive the latest travel tips, exclusive deals, and inspiration for your next adventure.
          </p>
          
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 text-gray-800 rounded-md focus:outline-none"
              required
            />
            <Button className="bg-travel-yellow hover:bg-yellow-500 text-gray-900 font-medium">
              Subscribe Now
            </Button>
          </form>
          
          <p className="mt-4 text-sm opacity-80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
