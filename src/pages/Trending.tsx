
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, TrendingUp, Filter, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThreadCard from '@/components/ThreadCard';
import { Button } from '@/components/ui/button';
import { getAllThreads } from '@/data/mockData';
import { Thread } from '@/types/forum';

const Trending = () => {
  const [trendingThreads, setTrendingThreads] = useState<Thread[]>([]);
  const [timeFilter, setTimeFilter] = useState('today');
  
  useEffect(() => {
    const allThreads = getAllThreads();
    const sortedThreads = [...allThreads].sort((a, b) => b.upvotes - a.upvotes);
    setTrendingThreads(sortedThreads.slice(0, 20));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex mb-6 animate-slide-down">
            <Link to="/" className="text-gray-500 hover:text-funky-purple transition-colors">Home</Link>
            <ChevronRight size={16} className="mx-2 text-gray-400 mt-1" />
            <span className="text-funky-purple font-medium">Trending</span>
          </nav>
          
          {/* Page Header */}
          <div className="mb-6 animate-slide-up">
            <h1 className="text-3xl font-bold flex items-center">
              <TrendingUp size={24} className="mr-2 text-funky-purple" />
              Trending Threads
            </h1>
            <p className="text-gray-600">Discover the most popular discussions right now</p>
          </div>
          
          {/* Filter Controls */}
          <div className="mb-6 flex flex-wrap gap-4 items-center animate-slide-up">
            <div className="flex items-center">
              <Filter size={18} className="mr-2 text-gray-500" />
              <span className="text-gray-500">Showing:</span>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={`border-2 ${timeFilter === 'today' ? 'bg-funky-purple text-white border-black' : 'border-black'} shadow-brutal-sm`}
                onClick={() => setTimeFilter('today')}
              >
                Today
              </Button>
              <Button 
                variant="outline" 
                className={`border-2 ${timeFilter === 'week' ? 'bg-funky-purple text-white border-black' : 'border-black'} shadow-brutal-sm`}
                onClick={() => setTimeFilter('week')}
              >
                This Week
              </Button>
              <Button 
                variant="outline" 
                className={`border-2 ${timeFilter === 'month' ? 'bg-funky-purple text-white border-black' : 'border-black'} shadow-brutal-sm`}
                onClick={() => setTimeFilter('month')}
              >
                This Month
              </Button>
              <Button 
                variant="outline" 
                className={`border-2 ${timeFilter === 'all' ? 'bg-funky-purple text-white border-black' : 'border-black'} shadow-brutal-sm`}
                onClick={() => setTimeFilter('all')}
              >
                All Time
              </Button>
            </div>
          </div>
          
          {/* Threads List */}
          <div className="space-y-4 mb-8">
            {trendingThreads.map((thread, index) => (
              <ThreadCard key={thread.id} thread={thread} showCategory={true} index={index} />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center mb-8 animate-slide-up">
            <nav className="flex space-x-1">
              <Button variant="outline" className="neubrutal-box-sm w-10 h-10 p-0 flex items-center justify-center">
                &laquo;
              </Button>
              <Button variant="outline" className="neubrutal-box-sm w-10 h-10 p-0 flex items-center justify-center bg-funky-purple text-white">
                1
              </Button>
              <Button variant="outline" className="neubrutal-box-sm w-10 h-10 p-0 flex items-center justify-center">
                2
              </Button>
              <Button variant="outline" className="neubrutal-box-sm w-10 h-10 p-0 flex items-center justify-center">
                3
              </Button>
              <Button variant="outline" className="neubrutal-box-sm w-10 h-10 p-0 flex items-center justify-center">
                &raquo;
              </Button>
            </nav>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Trending;
