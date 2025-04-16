
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/data/mockData';

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex mb-6 animate-slide-down">
            <Link to="/" className="text-gray-500 hover:text-funky-purple transition-colors">Home</Link>
            <ChevronRight size={16} className="mx-2 text-gray-400 mt-1" />
            <span className="text-funky-purple font-medium">Categories</span>
          </nav>
          
          {/* Page Header */}
          <div className="mb-6 animate-slide-up">
            <h1 className="text-3xl font-bold">Browse Categories</h1>
            <p className="text-gray-600">Find discussions on topics that interest you</p>
          </div>
          
          {/* Search Box */}
          <div className="mb-8 animate-slide-up">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search categories..." 
                className="w-full p-3 pl-10 border-2 border-black rounded-sm shadow-brutal-sm focus:outline-none focus:shadow-brutal"
              />
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>
          
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
