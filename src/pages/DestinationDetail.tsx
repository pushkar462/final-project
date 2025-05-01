
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { destinationsData } from '@/data/destinationsData';

const DestinationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [destination, setDestination] = useState(destinationsData.find(d => d.id === id));
  
  useEffect(() => {
    setDestination(destinationsData.find(d => d.id === id));
    window.scrollTo(0, 0);
  }, [id]);

  if (!destination) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="pt-24 pb-16 flex-grow">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
            <p className="mb-8">Sorry, we couldn't find the destination you're looking for.</p>
            <Link to="/destinations">
              <Button>Back to All Destinations</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Mock data for the destination details
  const details = {
    description: `${destination.name} is a breathtaking destination that offers a unique blend of natural beauty, rich culture, and unforgettable experiences. Located in ${destination.location}, it attracts visitors from around the world who come to experience its charm and distinctive character. Whether you're seeking adventure, relaxation, or cultural immersion, ${destination.name} has something special to offer every traveler.`,
    bestTimeToVisit: `The best time to visit ${destination.name} is during ${destination.season}, when the weather is ideal and you can fully enjoy all the activities and attractions. The high season offers vibrant energy and full access to attractions, while shoulder seasons may provide better deals and fewer crowds.`,
    thingsToDo: [
      "Explore the local markets and immerse yourself in the culture",
      "Visit historical landmarks and architectural wonders",
      "Enjoy outdoor activities such as hiking, swimming, or snorkeling",
      "Experience the local cuisine through food tours and cooking classes",
      "Relax and unwind at popular beaches or scenic viewpoints"
    ],
    accommodations: [
      {
        name: "Luxury Resort & Spa",
        description: "5-star accommodation with premium amenities and stunning views.",
        priceRange: "$$$"
      },
      {
        name: "Boutique Hotel",
        description: "Charming mid-range hotel with personalized service and local character.",
        priceRange: "$$"
      },
      {
        name: "Traveler's Hostel",
        description: "Budget-friendly option with shared facilities and a social atmosphere.",
        priceRange: "$"
      }
    ],
    reviews: [
      {
        name: "Jennifer L.",
        date: "October 2024",
        rating: 5,
        comment: `My trip to ${destination.name} was absolutely incredible! The scenery was breathtaking and the local people were so welcoming. I can't wait to return!`
      },
      {
        name: "Michael T.",
        date: "August 2024",
        rating: 4,
        comment: `${destination.name} offers so much to see and do. The food was amazing and the cultural experiences were unforgettable. Highly recommend a guided tour to get the most out of your visit.`
      },
      {
        name: "Sarah R.",
        date: "July 2024",
        rating: 5,
        comment: "One of the best travel experiences I've ever had. The natural beauty is unmatched and there are activities for every type of traveler."
      }
    ],
    gallery: [
      destination.image,
      "https://source.unsplash.com/random/600x400/?travel",
      "https://source.unsplash.com/random/600x400/?landmark",
      "https://source.unsplash.com/random/600x400/?landscape",
      "https://source.unsplash.com/random/600x400/?food",
      "https://source.unsplash.com/random/600x400/?culture"
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-16 pb-16 flex-grow">
        {/* Hero Banner */}
        <div className="relative h-[50vh] mb-8">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${destination.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
          <div className="relative h-full flex flex-col justify-center items-start container mx-auto px-4">
            <Link to="/destinations" className="bg-white bg-opacity-80 text-gray-800 px-4 py-2 rounded-full mb-4 hover:bg-opacity-100 transition-colors">
              &larr; Back to Destinations
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {destination.name}
            </h1>
            <div className="flex items-center mb-4">
              <svg 
                className="w-5 h-5 text-white" 
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
              <span className="ml-2 text-white font-medium">{destination.location}</span>
              <div className="ml-4 flex items-center">
                {Array(5).fill(0).map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-white">{destination.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="attractions">Attractions</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-semibold mb-4">About {destination.name}</h2>
                  <p className="text-gray-700 mb-6">{details.description}</p>
                  
                  <h3 className="text-xl font-semibold mb-3">Best Time to Visit</h3>
                  <p className="text-gray-700 mb-6">{details.bestTimeToVisit}</p>
                  
                  <h3 className="text-xl font-semibold mb-3">Things to Do</h3>
                  <ul className="list-disc pl-6 mb-6">
                    {details.thingsToDo.map((item, index) => (
                      <li key={index} className="text-gray-700 mb-2">{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Where to Stay</h3>
                      <div className="space-y-4">
                        {details.accommodations.map((accommodation, index) => (
                          <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{accommodation.name}</h4>
                              <span className="text-gray-600">{accommodation.priceRange}</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{accommodation.description}</p>
                          </div>
                        ))}
                      </div>
                      
                      <Button className="w-full mt-6 bg-travel-blue hover:bg-blue-600">
                        Find Accommodation
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="mt-6">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Plan Your Trip</h3>
                      <p className="text-gray-600 mb-6">
                        Ready to explore {destination.name}? Add it to your travel itinerary!
                      </p>
                      <Button className="w-full bg-travel-green hover:bg-green-600">
                        Add to Trip Planner
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="attractions" className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6">Popular Attractions in {destination.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <Card key={index}>
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={`https://source.unsplash.com/random/400x300/?attraction,${destination.name},${index}`}
                        alt={`Attraction in ${destination.name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">
                        {["Historical Monument", "Natural Wonder", "Cultural Site", "Local Market", "Scenic Viewpoint", "Architectural Marvel"][index-1]}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-gray-600">{(4 + (index % 2) * 0.5).toFixed(1)}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {Math.floor(Math.random() * 10) + 1} km away
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="gallery" className="animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6">Gallery of {destination.name}</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {details.gallery.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-md">
                    <img 
                      src={image} 
                      alt={`${destination.name} gallery image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="animate-fade-in">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-semibold mb-6">Traveler Reviews</h2>
                  
                  <div className="space-y-6">
                    {details.reviews.map((review, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold">{review.name}</h4>
                            <span className="text-gray-500 text-sm">{review.date}</span>
                          </div>
                          <div className="flex items-center">
                            {Array(5).fill(0).map((_, i) => (
                              <svg 
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="mt-6 bg-travel-blue hover:bg-blue-600">
                    See All Reviews
                  </Button>
                </div>
                
                <div className="md:w-1/3">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                      <p className="text-gray-600 mb-6">
                        Share your experience at {destination.name} with other travelers.
                      </p>
                      <Button className="w-full">
                        Write a Review
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DestinationDetail;
