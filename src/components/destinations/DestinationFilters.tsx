
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface DestinationFiltersProps {
  onFilterChange: (filters: Filters) => void;
  currentFilters?: Filters;
}

export interface Filters {
  region: string;
  type: string;
  season: string;
}

const regions = ["All Regions", "Asia", "Europe", "North America", "South America", "Africa", "Australia"];
const types = ["All Types", "Beach", "Mountain", "City", "Countryside", "Historical", "Honeymoon"];
const seasons = ["All Seasons", "Spring", "Summer", "Fall", "Winter"];

const DestinationFilters: React.FC<DestinationFiltersProps> = ({ onFilterChange, currentFilters }) => {
  const [filters, setFilters] = useState<Filters>({
    region: "All Regions",
    type: "All Types",
    season: "All Seasons"
  });

  // Update local state if currentFilters prop changes
  useEffect(() => {
    if (currentFilters) {
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  const handleFilterChange = (category: keyof Filters, value: string) => {
    const newFilters = { ...filters, [category]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">Filter Destinations</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Region
          </label>
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <Button
                key={region}
                variant={filters.region === region ? "default" : "outline"}
                size="sm"
                className={filters.region === region ? "bg-travel-blue" : ""}
                onClick={() => handleFilterChange("region", region)}
              >
                {region}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <div className="flex flex-wrap gap-2">
            {types.map((type) => (
              <Button
                key={type}
                variant={filters.type === type ? "default" : "outline"}
                size="sm"
                className={filters.type === type ? "bg-travel-blue" : ""}
                onClick={() => handleFilterChange("type", type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Best Season
          </label>
          <div className="flex flex-wrap gap-2">
            {seasons.map((season) => (
              <Button
                key={season}
                variant={filters.season === season ? "default" : "outline"}
                size="sm"
                className={filters.season === season ? "bg-travel-blue" : ""}
                onClick={() => handleFilterChange("season", season)}
              >
                {season}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationFilters;
