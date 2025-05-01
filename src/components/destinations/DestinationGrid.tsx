
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  region: string;
  type: string;
  season: string;
}

interface DestinationGridProps {
  destinations: Destination[];
}

const DestinationGrid: React.FC<DestinationGridProps> = ({ destinations }) => {
  if (destinations.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold text-gray-600 mb-4">No destinations found</h3>
        <p className="text-gray-500">Try adjusting your filters to find more results.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((destination) => (
        <div key={destination.id} className="destination-card bg-white rounded-lg overflow-hidden shadow-md">
          <Link to={`/destinations/${destination.id}`}>
            <div className="h-56 overflow-hidden">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </Link>
          <div className="p-5">
            <h3 className="text-xl font-semibold mb-2">
              <Link to={`/destinations/${destination.id}`} className="hover:text-travel-blue">
                {destination.name}
              </Link>
            </h3>
            <div className="flex items-center mb-3">
              <svg 
                className="w-5 h-5 text-travel-orange" 
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span className="ml-2 text-gray-600">{destination.location}</span>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {destination.description}
            </p>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-gray-600 text-sm">{destination.rating.toFixed(1)}</span>
              </div>
              <Link to={`/destinations/${destination.id}`}>
                <Button variant="outline" className="text-travel-blue border-travel-blue hover:bg-travel-blue hover:text-white transition-colors">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DestinationGrid;
