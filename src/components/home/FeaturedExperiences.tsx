
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const experiences = [
  {
    icon: "🏖️",
    title: "Beach Getaways",
    description: "Relax on pristine beaches with crystal-clear waters and soft sand."
  },
  {
    icon: "🏞️",
    title: "Mountain Adventures",
    description: "Challenge yourself with hiking, climbing, and breathtaking views."
  },
  {
    icon: "🏙️",
    title: "City Explorations",
    description: "Discover the culture, history, and vibrant life of world-class cities."
  },
  {
    icon: "🏛️",
    title: "Cultural Experiences",
    description: "Immerse yourself in local traditions, cuisine, and historical sites."
  }
];

const FeaturedExperiences: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Travel Experiences</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from a variety of curated travel experiences tailored to match your travel style and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {experiences.map((experience, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer border-none">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">{experience.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{experience.title}</h3>
                <p className="text-gray-600">{experience.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedExperiences;
