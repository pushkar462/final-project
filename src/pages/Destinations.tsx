
import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DestinationFilters, { Filters } from '@/components/destinations/DestinationFilters';
import DestinationGrid from '@/components/destinations/DestinationGrid';
import { destinationsData } from '@/data/destinationsData';
import { useSearchParams } from 'react-router-dom';

const Destinations: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredDestinations, setFilteredDestinations] = useState(destinationsData);
  const [filters, setFilters] = useState<Filters>({
    region: "All Regions",
    type: "All Types",
    season: "All Seasons"
  });

  // Get search and type from URL params
  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    const typeFromUrl = searchParams.get('type') || '';
    
    // Map URL type parameter to filter options
    let mappedType = "All Types";
    if (typeFromUrl) {
      mappedType = typeFromUrl;
    }
    
    setFilters(prev => ({
      ...prev,
      type: mappedType
    }));

    // Apply search query if present
    if (searchQuery) {
      const searchResults = destinationsData.filter(destination => 
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDestinations(searchResults);
    }
  }, [searchParams]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    let results = destinationsData;
    
    // Apply region filter
    if (filters.region !== "All Regions") {
      results = results.filter(destination => destination.region === filters.region);
    }
    
    // Apply type filter
    if (filters.type !== "All Types") {
      results = results.filter(destination => destination.type === filters.type);
    }
    
    // Apply season filter
    if (filters.season !== "All Seasons") {
      results = results.filter(destination => destination.season === filters.season);
    }
    
    // Apply search query if present in URL
    const searchQuery = searchParams.get('search') || '';
    if (searchQuery) {
      results = results.filter(destination => 
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredDestinations(results);
  }, [filters, searchParams]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Explore Amazing Destinations</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover beautiful places around the world, from sandy beaches to snow-capped mountains, historic cities to tranquil countryside retreats.
            </p>
          </div>

          <DestinationFilters onFilterChange={handleFilterChange} currentFilters={filters} />
          <DestinationGrid destinations={filteredDestinations} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Destinations;
