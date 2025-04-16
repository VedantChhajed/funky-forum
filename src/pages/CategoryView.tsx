
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, PlusCircle, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThreadCard from '@/components/ThreadCard';
import { Button } from '@/components/ui/button';
import { categories, getThreadsByCategory } from '@/data/mockData';
import { Category, Thread } from '@/types/forum';

const CategoryView = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const foundCategory = categories.find(c => c.slug === slug);
    
    if (foundCategory) {
      setCategory(foundCategory);
      const categoryThreads = getThreadsByCategory(foundCategory.id);
      setThreads(categoryThreads);
    }
    
    setLoading(false);
  }, [slug]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="animate-bounce">Loading...</div>
        </main>
      </div>
    );
  }
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4">
          <div className="neubrutal-box p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="mb-4">The category you're looking for doesn't exist.</p>
            <Link to="/categories">
              <Button className="neubrutal-button">View All Categories</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex mb-6 animate-slide-down">
            <Link to="/" className="text-gray-500 hover:text-funky-purple transition-colors">Home</Link>
            <ChevronRight size={16} className="mx-2 text-gray-400 mt-1" />
            <Link to="/categories" className="text-gray-500 hover:text-funky-purple transition-colors">Categories</Link>
            <ChevronRight size={16} className="mx-2 text-gray-400 mt-1" />
            <span className="text-funky-purple font-medium">{category.name}</span>
          </nav>
          
          {/* Category Header */}
          <div className="neubrutal-box p-6 mb-6 animate-slide-up">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
                <p className="text-gray-600">{category.description}</p>
              </div>
              
              <Link to="/new-thread">
                <Button className="neubrutal-button w-full md:w-auto">
                  <PlusCircle size={18} className="mr-2" />
                  Create Thread
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Thread Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 animate-slide-up">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">{threads.length} Threads</h2>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="border-2 border-black shadow-brutal-sm flex items-center">
                <Filter size={18} className="mr-2" />
                Filter
              </Button>
              
              <select className="border-2 border-black rounded-sm shadow-brutal-sm py-2 px-4 bg-white">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Most Popular</option>
                <option value="active">Most Active</option>
              </select>
            </div>
          </div>
          
          {/* Threads List */}
          <div className="space-y-4 mb-8">
            {threads.length > 0 ? (
              threads.map((thread, index) => (
                <ThreadCard key={thread.id} thread={thread} index={index} />
              ))
            ) : (
              <div className="neubrutal-box p-8 text-center animate-slide-up">
                <h3 className="text-xl font-bold mb-4">No Threads Yet</h3>
                <p className="mb-4">Be the first to start a discussion in this category!</p>
                <Link to="/new-thread">
                  <Button className="neubrutal-button">
                    <PlusCircle size={18} className="mr-2" />
                    Create Thread
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {threads.length > 0 && (
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
          )}
          
          {/* Category Stats */}
          <div className="neubrutal-box p-6 animate-slide-up">
            <h3 className="text-lg font-bold mb-4">Category Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-funky-purple/10 border border-funky-purple p-3 rounded-sm text-center">
                <div className="text-2xl font-bold text-funky-purple">{threads.length}</div>
                <div className="text-xs text-gray-600">Threads</div>
              </div>
              <div className="bg-funky-orange/10 border border-funky-orange p-3 rounded-sm text-center">
                <div className="text-2xl font-bold text-funky-orange">
                  {threads.reduce((sum, thread) => sum + thread.postCount, 0)}
                </div>
                <div className="text-xs text-gray-600">Posts</div>
              </div>
              <div className="bg-funky-blue/10 border border-funky-blue p-3 rounded-sm text-center">
                <div className="text-2xl font-bold text-funky-blue">
                  {Math.floor(Math.random() * 50) + 5}
                </div>
                <div className="text-xs text-gray-600">Active Users</div>
              </div>
              <div className="bg-funky-pink/10 border border-funky-pink p-3 rounded-sm text-center">
                <div className="text-2xl font-bold text-funky-pink">
                  {Math.floor(Math.random() * 24) + 1} hrs
                </div>
                <div className="text-xs text-gray-600">Last Activity</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryView;
