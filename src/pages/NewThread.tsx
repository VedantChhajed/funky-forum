
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CreateThreadForm from '@/components/CreateThreadForm';

const NewThread = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex mb-6 animate-slide-down">
            <Link to="/" className="text-gray-500 hover:text-funky-purple transition-colors">Home</Link>
            <ChevronRight size={16} className="mx-2 text-gray-400 mt-1" />
            <span className="text-funky-purple font-medium">Create New Thread</span>
          </nav>
          
          {/* Page Header */}
          <div className="mb-6 animate-slide-up">
            <h1 className="text-3xl font-bold">Create a New Thread</h1>
            <p className="text-gray-600">Share your thoughts, ask questions, or start a discussion</p>
          </div>
          
          {/* Thread Form */}
          <div className="neubrutal-box p-6 mb-8">
            <CreateThreadForm />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewThread;
