
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface DestinationCardProps {
  id: string;
  image: string;
  name: string;
  location: string;
  rating: number;
}

const destinations: DestinationCardProps[] = [
  {
    id: "bali",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    name: "Bali",
    location: "Indonesia",
    rating: 4.8
  },
  {
    id: "paris",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    name: "Paris",
    location: "France",
    rating: 4.7
  },
  {
    id: "santorini",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    name: "Santorini",
    location: "Greece",
    rating: 4.9
  },
  {
    id: "kyoto",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    name: "Kyoto",
    location: "Japan",
    rating: 4.7
  }
];

const DestinationCard: React.FC<DestinationCardProps> = ({ id, image, name, location, rating }) => {
  return (
    <div className="destination-card bg-white rounded-lg overflow-hidden shadow-md">
      <Link to={`/destinations/${id}`}>
        <div className="h-56 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-1">
          <Link to={`/destinations/${id}`} className="hover:text-travel-blue">
            {name}
          </Link>
        </h3>
        <div className="flex items-center mb-4">
          <svg 
            className="w-5 h-5 text-travel-orange" 
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
          <span className="ml-2 text-gray-600">{location}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {Array(5).fill(0).map((_, i) => (
              <svg 
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-gray-600 text-sm">{rating}</span>
          </div>
          <Link to={`/destinations/${id}`}>
            <Button variant="outline" className="text-travel-blue border-travel-blue hover:bg-travel-blue hover:text-white transition-colors">
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const PopularDestinations: React.FC = () => {
  return (
    <section id="popular-destinations" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked selection of the most popular travel destinations loved by travelers around the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} {...destination} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/destinations">
            <Button className="bg-travel-blue hover:bg-blue-600">
              View All Destinations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
