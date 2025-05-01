
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "TravelMate helped me plan the perfect vacation to Bali. The destination guides were so helpful, and the trip was absolutely seamless!",
    author: "Sarah Johnson",
    role: "Adventure Traveler",
    image: "https://randomuser.me/api/portraits/women/11.jpg"
  },
  {
    quote: "I've been using TravelMate for all my trips this year. The detailed itineraries and local tips made my experiences so much more authentic.",
    author: "Michael Chen",
    role: "Digital Nomad",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    quote: "As a solo female traveler, safety is my priority. TravelMate's safety tips and community insights gave me confidence to explore new places.",
    author: "Emma Rodriguez",
    role: "Solo Traveler",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, role, image }) => {
  return (
    <Card className="bg-white border-none shadow-lg h-full">
      <CardContent className="p-8 flex flex-col h-full">
        <div className="mb-6">
          <svg className="text-travel-blue h-8 w-8" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 8c-2.21 0-4 1.79-4 4v10h10V12h-6c0-1.1 0.9-2 2-2h2V8h-4zm12 0c-2.21 0-4 1.79-4 4v10h10V12h-6c0-1.1 0.9-2 2-2h2V8h-4z"/>
          </svg>
        </div>
        <p className="text-gray-700 mb-6 flex-grow">{quote}</p>
        <div className="flex items-center">
          <img 
            src={image} 
            alt={author} 
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h4 className="font-semibold">{author}</h4>
            <p className="text-gray-600 text-sm">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Travelers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from fellow travelers who have used TravelMate to plan their perfect trips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
