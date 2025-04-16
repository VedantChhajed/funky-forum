
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, TrendingUp, Award, PlusCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import ThreadCard from '@/components/ThreadCard';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/mockData';
import { getAllThreads } from '@/data/mockData';

const Index = () => {
  const [trendingThreads, setTrendingThreads] = useState(getAllThreads().slice(0, 5));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative bg-white border-b-2 border-black mb-12 overflow-hidden">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 animate-slide-up">
                Welcome to <span className="text-funky-purple">FunkForum</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                A vibrant space for conversations, creativity, and community.
                Discover new ideas or share your own in a fun, engaging environment!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <Link to="/categories">
                  <Button className="neubrutal-button w-full sm:w-auto">
                    <MessageSquare size={18} className="mr-2" />
                    Browse Categories
                  </Button>
                </Link>
                <Link to="/new-thread">
                  <Button className="neubrutal-button-orange w-full sm:w-auto">
                    <PlusCircle size={18} className="mr-2" />
                    Create Thread
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-funky-orange rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-funky-blue rounded-full opacity-30 animate-pulse"></div>
        </section>
        
        {/* Categories Section */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <MessageSquare size={20} className="mr-2 text-funky-purple" />
              Categories
            </h2>
            <Link to="/categories">
              <Button variant="ghost" className="text-funky-purple hover:text-funky-purple/80">
                View All
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 3).map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </section>
        
        {/* Trending Threads Section */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <TrendingUp size={20} className="mr-2 text-funky-purple" />
              Trending Threads
            </h2>
            <Link to="/trending">
              <Button variant="ghost" className="text-funky-purple hover:text-funky-purple/80">
                View All
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {trendingThreads.map((thread, index) => (
              <ThreadCard key={thread.id} thread={thread} showCategory={true} index={index} />
            ))}
          </div>
        </section>
        
        {/* Community Highlights */}
        <section className="container mx-auto px-4 mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Award size={20} className="mr-2 text-funky-purple" />
            Community Highlights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="neubrutal-box p-6 animate-slide-up">
              <h3 className="text-lg font-bold mb-3">Top Contributors</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <img src="/placeholder.svg" alt="User" className="w-8 h-8 rounded-sm border-2 border-black shadow-brutal-sm mr-2" />
                  <div>
                    <div className="font-medium">funkmaster</div>
                    <div className="text-xs text-gray-500">142 posts</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src="/placeholder.svg" alt="User" className="w-8 h-8 rounded-sm border-2 border-black shadow-brutal-sm mr-2" />
                  <div>
                    <div className="font-medium">vibrant_voice</div>
                    <div className="text-xs text-gray-500">112 posts</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src="/placeholder.svg" alt="User" className="w-8 h-8 rounded-sm border-2 border-black shadow-brutal-sm mr-2" />
                  <div>
                    <div className="font-medium">neobrutal_designer</div>
                    <div className="text-xs text-gray-500">87 posts</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="neubrutal-box p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-lg font-bold mb-3">Current Events</h3>
              <div className="space-y-3">
                <div className="border-l-2 border-funky-orange pl-3">
                  <div className="font-medium">Design Challenge</div>
                  <div className="text-sm text-gray-500">Starting May 1st</div>
                </div>
                <div className="border-l-2 border-funky-purple pl-3">
                  <div className="font-medium">Community AMA</div>
                  <div className="text-sm text-gray-500">May 15th, 6:00 PM</div>
                </div>
                <div className="border-l-2 border-funky-blue pl-3">
                  <div className="font-medium">Feature Release</div>
                  <div className="text-sm text-gray-500">Coming May 30th</div>
                </div>
              </div>
            </div>
            
            <div className="neubrutal-box p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-bold mb-3">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-funky-purple/10 border border-funky-purple p-3 rounded-sm">
                  <div className="text-2xl font-bold text-funky-purple">130</div>
                  <div className="text-xs text-gray-600">Threads</div>
                </div>
                <div className="bg-funky-orange/10 border border-funky-orange p-3 rounded-sm">
                  <div className="text-2xl font-bold text-funky-orange">964</div>
                  <div className="text-xs text-gray-600">Posts</div>
                </div>
                <div className="bg-funky-blue/10 border border-funky-blue p-3 rounded-sm">
                  <div className="text-2xl font-bold text-funky-blue">42</div>
                  <div className="text-xs text-gray-600">Users Online</div>
                </div>
                <div className="bg-funky-pink/10 border border-funky-pink p-3 rounded-sm">
                  <div className="text-2xl font-bold text-funky-pink">286</div>
                  <div className="text-xs text-gray-600">Members</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="container mx-auto px-4 mb-12">
          <div className="neubrutal-box p-8 bg-funky-purple text-white text-center">
            <h2 className="text-2xl font-bold mb-4 animate-slide-up">Join the Conversation!</h2>
            <p className="mb-6 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Ready to dive in? Create an account to join discussions, share your thoughts, and connect with others.
            </p>
            <Button className="bg-white text-funky-purple hover:bg-white/90 border-2 border-black shadow-brutal font-bold animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Sign Up Now
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
