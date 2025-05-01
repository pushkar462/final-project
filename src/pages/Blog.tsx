
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "top-destinations-2024",
    title: "Top 10 Destinations to Visit in 2024",
    excerpt: "Discover the most exciting and trending destinations that should be on your travel radar this year.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    author: "Emma Rodriguez",
    date: "April 15, 2024",
    category: "Travel Tips"
  },
  {
    id: "budget-travel-guide",
    title: "The Ultimate Budget Travel Guide",
    excerpt: "Learn how to make the most of your travel experiences without breaking the bank with these money-saving tips.",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    author: "Michael Chen",
    date: "March 28, 2024",
    category: "Budget Travel"
  },
  {
    id: "hidden-gems-europe",
    title: "Hidden Gems of Europe You Need to Discover",
    excerpt: "Move beyond the tourist hotspots and discover these lesser-known but equally amazing European destinations.",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    author: "James Wilson",
    date: "March 10, 2024",
    category: "Destinations"
  },
  {
    id: "solo-female-travel",
    title: "Solo Female Travel: Tips for Safe and Rewarding Adventures",
    excerpt: "Essential advice and insights for women traveling alone, focusing on safety, confidence, and maximizing experiences.",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    author: "Sarah Johnson",
    date: "February 22, 2024",
    category: "Solo Travel"
  },
  {
    id: "sustainable-travel",
    title: "How to Be a More Sustainable Traveler in 2024",
    excerpt: "Practical tips for reducing your environmental impact while still enjoying meaningful travel experiences.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    author: "David Nguyen",
    date: "February 8, 2024",
    category: "Sustainable Travel"
  },
  {
    id: "food-tourism-guide",
    title: "A Food Lover's Guide to Culinary Tourism",
    excerpt: "Explore the world through its cuisines and discover how food can be the highlight of your travel experiences.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    author: "Lisa Patel",
    date: "January 25, 2024",
    category: "Food & Drink"
  }
];

const Blog: React.FC = () => {
  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="pt-24 pb-16 flex-grow bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Travel Blog</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover travel tips, destination guides, and inspiring stories to help you plan your next adventure.
            </p>
          </div>

          {/* Featured Post */}
          <div className="bg-white rounded-lg overflow-hidden shadow-md mb-12">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${featuredPost.image})` }}></div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="text-sm text-gray-500 mb-2">
                  {featuredPost.category} • {featuredPost.date}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  <Link to={`/blog/${featuredPost.id}`} className="hover:text-travel-blue transition-colors">
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">{featuredPost.author}</span>
                  </div>
                  <Link to={`/blog/${featuredPost.id}`}>
                    <Button variant="outline" className="text-travel-blue border-travel-blue hover:bg-travel-blue hover:text-white">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Regular Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md destination-card">
                <Link to={`/blog/${post.id}`} className="block">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    {post.category} • {post.date}
                  </div>
                  <h2 className="text-xl font-semibold mb-3">
                    <Link to={`/blog/${post.id}`} className="hover:text-travel-blue transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="outline" size="sm" className="text-travel-blue border-travel-blue hover:bg-travel-blue hover:text-white">
                        Read
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-travel-blue hover:bg-blue-600">
              Load More Articles
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
