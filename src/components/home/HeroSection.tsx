
import React, { useState, useRef, useEffect } from 'react';
import { Search, Mountain, Palmtree, Building, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { destinationsData } from '@/data/destinationsData';

const HeroSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigateToSearch();
  };

  const navigateToSearch = () => {
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) {
      params.append('search', searchQuery.trim());
    }
    
    if (selectedType) {
      params.append('type', selectedType);
    }

    navigate(`/destinations?${params.toString()}`);
    setOpen(false);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(prevType => prevType === type ? '' : type);
  };

  const handleDestinationSelect = (destination: string) => {
    setSearchQuery(destination);
    setOpen(false);
    
    // Focus back on the input after selection
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && event.target instanceof Element && !event.target.closest('[data-dropdown]')) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Get unique destinations
  const destinations = destinationsData
    .slice(0, 100) // Limit to prevent too many items
    .sort((a, b) => {
      const popularityA = a.popularity !== undefined ? a.popularity : 0;
      const popularityB = b.popularity !== undefined ? b.popularity : 0;
      return popularityA > popularityB ? -1 : 1;
    }); // Sort by popularity

  const getTagForDestination = (destination: any) => {
    if (destination.type && destination.type.includes('Honeymoon')) return { text: 'HONEYMOON', color: 'bg-pink-100 text-pink-800' };
    if (destination.popularity !== undefined && destination.popularity > 90) return { text: 'POPULAR', color: 'bg-orange-100 text-orange-800' };
    if (destination.bestSeason === 'Summer' && new Date().getMonth() >= 5 && new Date().getMonth() <= 8) 
      return { text: 'IN SEASON', color: 'bg-green-100 text-green-800' };
    if (destination.budget === 'Budget') return { text: 'BUDGET', color: 'bg-amber-100 text-amber-800' };
    if (destination.popularity !== undefined && destination.popularity > 80) return { text: 'TRENDING', color: 'bg-emerald-100 text-emerald-800' };
    return null;
  };

  return (
    <section className="relative h-[85vh] md:h-screen bg-mountain-image bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-0"></div>

      <div className="relative h-full flex flex-col justify-center items-start container mx-auto px-4 z-10">
        <div className="max-w-xl md:max-w-2xl animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
            <span>What's </span>
            <span className="text-green-400 italic">your pick</span>
            <span> for your next vacation?</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 md:mb-8 drop-shadow-md">
            Find your perfect destination and create unforgettable memories with TravelMate, your ultimate travel companion.
          </p>

          <form onSubmit={handleSearch} className="w-full relative" data-dropdown>
            <div className="bg-white bg-opacity-95 p-2 rounded-lg shadow-lg flex flex-col sm:flex-row w-full">
              <div className="flex-grow mb-2 sm:mb-0 sm:mr-2 relative">
                <div className="flex items-center border rounded px-3 py-2">
                  <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                  
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Input 
                        ref={searchInputRef}
                        type="text" 
                        placeholder="Pick your destination" 
                        className="w-full border-none outline-none p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        onClick={() => setOpen(true)}
                      />
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-[300px] sm:w-[400px]" align="start">
                      <Command>
                        <CommandInput 
                          placeholder="Search destinations..." 
                          value={searchQuery}
                          onValueChange={setSearchQuery}
                        />
                        <CommandList>
                          <CommandEmpty>No destinations found.</CommandEmpty>
                          <CommandGroup>
                            {destinations
                              .filter(dest => 
                                dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                (dest.country && dest.country.toLowerCase().includes(searchQuery.toLowerCase()))
                              )
                              .slice(0, 8)
                              .map((destination) => {
                                const tag = getTagForDestination(destination);
                                return (
                                  <CommandItem
                                    key={destination.id}
                                    value={destination.name}
                                    onSelect={() => handleDestinationSelect(destination.name)}
                                    className="flex justify-between items-center py-3 px-2 cursor-pointer hover:bg-gray-100"
                                  >
                                    <div className="flex-1">
                                      <p className="font-medium">{destination.name}</p>
                                    </div>
                                    {tag && (
                                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${tag.color}`}>
                                        {tag.text}
                                      </span>
                                    )}
                                  </CommandItem>
                                );
                              })}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {searchQuery && (
                    <button 
                      type="button" 
                      className="flex-shrink-0"
                      onClick={() => setSearchQuery('')}
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
              <Button 
                type="submit"
                className="bg-travel-blue hover:bg-blue-600 text-white w-full sm:w-auto"
              >
                {isMobile ? 'Search' : 'Search Destinations'}
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                type="button"
                variant={selectedType === 'Mountain' ? 'default' : 'outline'}
                className={`bg-white text-gray-800 hover:bg-gray-100 border ${selectedType === 'Mountain' ? 'border-travel-blue bg-blue-50 text-travel-blue' : 'border-gray-200'} rounded-full flex items-center px-4 py-2`}
                onClick={() => handleTypeSelect('Mountain')}
              >
                <Mountain className="w-4 h-4 mr-2" />
                Mountains
              </Button>
              <Button
                type="button"
                variant={selectedType === 'Beach' ? 'default' : 'outline'}
                className={`bg-white text-gray-800 hover:bg-gray-100 border ${selectedType === 'Beach' ? 'border-travel-blue bg-blue-50 text-travel-blue' : 'border-gray-200'} rounded-full flex items-center px-4 py-2`}
                onClick={() => handleTypeSelect('Beach')}
              >
                <Palmtree className="w-4 h-4 mr-2" />
                Beaches
              </Button>
              <Button
                type="button"
                variant={selectedType === 'Historical' ? 'default' : 'outline'}
                className={`bg-white text-gray-800 hover:bg-gray-100 border ${selectedType === 'Historical' ? 'border-travel-blue bg-blue-50 text-travel-blue' : 'border-gray-200'} rounded-full flex items-center px-4 py-2`}
                onClick={() => handleTypeSelect('Historical')}
              >
                <Building className="w-4 h-4 mr-2" />
                Historical
              </Button>
              <Button
                type="button"
                variant={selectedType === 'Honeymoon' ? 'default' : 'outline'}
                className={`bg-white text-gray-800 hover:bg-gray-100 border ${selectedType === 'Honeymoon' ? 'border-travel-blue bg-blue-50 text-travel-blue' : 'border-gray-200'} rounded-full flex items-center px-4 py-2`}
                onClick={() => handleTypeSelect('Honeymoon')}
              >
                <Heart className="w-4 h-4 mr-2" />
                Honeymoon
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-10 left-0 right-0 flex justify-center z-10">
        <a 
          href="#popular-destinations" 
          className="flex flex-col items-center text-white animate-bounce"
        >
          <span className="mb-2 text-sm sm:text-base drop-shadow-md">Explore More</span>
          <svg 
            className="w-5 h-5 sm:w-6 sm:h-6 drop-shadow-md" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
