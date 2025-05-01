
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TripItem {
  id: string;
  destination: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  activities: string[];
  accommodation: string;
  transportation: string;
}

const TripPlanner: React.FC = () => {
  const [tripItems, setTripItems] = useState<TripItem[]>([]);
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [activities, setActivities] = useState('');
  const [accommodation, setAccommodation] = useState('hotel');
  const [transportation, setTransportation] = useState('');
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);

  const handleAddDestination = () => {
    if (!destination || !startDate || !endDate) {
      return;
    }

    const activitiesArray = activities
      .split(',')
      .map(activity => activity.trim())
      .filter(activity => activity !== '');
    
    if (currentEditId) {
      // Edit existing item
      setTripItems(items => 
        items.map(item => 
          item.id === currentEditId 
            ? {
                ...item, 
                destination,
                startDate,
                endDate,
                activities: activitiesArray,
                accommodation,
                transportation
              } 
            : item
        )
      );
      setCurrentEditId(null);
    } else {
      // Add new item
      const newItem: TripItem = {
        id: Date.now().toString(),
        destination,
        startDate,
        endDate,
        activities: activitiesArray,
        accommodation,
        transportation
      };
      setTripItems([...tripItems, newItem]);
    }

    // Reset form
    setDestination('');
    setStartDate(undefined);
    setEndDate(undefined);
    setActivities('');
    setAccommodation('hotel');
    setTransportation('');
  };

  const handleEdit = (id: string) => {
    const itemToEdit = tripItems.find(item => item.id === id);
    if (itemToEdit) {
      setDestination(itemToEdit.destination);
      setStartDate(itemToEdit.startDate);
      setEndDate(itemToEdit.endDate);
      setActivities(itemToEdit.activities.join(', '));
      setAccommodation(itemToEdit.accommodation);
      setTransportation(itemToEdit.transportation);
      setCurrentEditId(id);
    }
  };

  const handleRemove = (id: string) => {
    setTripItems(tripItems.filter(item => item.id !== id));
    if (currentEditId === id) {
      setCurrentEditId(null);
      setDestination('');
      setStartDate(undefined);
      setEndDate(undefined);
      setActivities('');
      setAccommodation('hotel');
      setTransportation('');
    }
  };

  const handleSaveItinerary = () => {
    // In a real app, this would save to a database or generate a PDF
    alert('Itinerary saved! In a real app, this would save to your account or download as PDF.');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Plan Your Trip</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create your personalized travel itinerary by adding destinations, activities, and accommodations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">
                {currentEditId ? 'Edit Destination' : 'Add Destination'}
              </h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input 
                    id="destination"
                    type="text" 
                    placeholder="City, Country" 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal mt-1",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <Label htmlFor="activities">Activities (comma separated)</Label>
                  <Input 
                    id="activities"
                    type="text" 
                    placeholder="Sightseeing, Beach day, Hiking..." 
                    value={activities}
                    onChange={(e) => setActivities(e.target.value)}
                    className="w-full mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="transportation">Transportation</Label>
                  <Input 
                    id="transportation"
                    type="text" 
                    placeholder="Flight, Train, Rental Car..." 
                    value={transportation}
                    onChange={(e) => setTransportation(e.target.value)}
                    className="w-full mt-1"
                  />
                </div>

                <div>
                  <Label>Accommodation</Label>
                  <RadioGroup defaultValue="hotel" value={accommodation} onValueChange={setAccommodation} className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hotel" id="hotel" />
                      <Label htmlFor="hotel">Hotel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hostel" id="hostel" />
                      <Label htmlFor="hostel">Hostel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="airbnb" id="airbnb" />
                      <Label htmlFor="airbnb">Airbnb/Rental</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="camping" id="camping" />
                      <Label htmlFor="camping">Camping</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  className="w-full bg-travel-blue hover:bg-blue-600 mt-4" 
                  onClick={handleAddDestination}
                >
                  {currentEditId ? 'Update Destination' : 'Add to Itinerary'}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold flex justify-between items-center">
                    <span>Your Itinerary</span>
                    {tripItems.length > 0 && (
                      <Button 
                        onClick={handleSaveItinerary}
                        className="bg-travel-blue hover:bg-blue-600"
                      >
                        Save Itinerary
                      </Button>
                    )}
                  </h2>
                </div>

                {tripItems.length === 0 ? (
                  <div className="p-10 text-center text-gray-500">
                    <p>Your itinerary is empty. Add destinations to start planning your trip.</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {tripItems.map((item, index) => (
                      <div key={item.id} className="p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                          <h3 className="text-lg font-semibold">
                            {index + 1}. {item.destination}
                          </h3>
                          <div className="mt-2 md:mt-0 text-sm text-gray-600">
                            {item.startDate && item.endDate ? (
                              <>
                                {format(item.startDate, "MMM d, yyyy")} - {format(item.endDate, "MMM d, yyyy")}
                              </>
                            ) : ''}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-gray-700">Activities:</h4>
                            <ul className="list-disc pl-5 mt-1">
                              {item.activities.map((activity, i) => (
                                <li key={i} className="text-gray-600">{activity}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700">Accommodation:</h4>
                            <p className="text-gray-600 capitalize">{item.accommodation}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700">Transportation:</h4>
                            <p className="text-gray-600">{item.transportation}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-red-500 hover:text-white hover:bg-red-500" 
                            onClick={() => handleRemove(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TripPlanner;
