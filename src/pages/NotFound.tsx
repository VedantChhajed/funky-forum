
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="neubrutal-box p-8 max-w-md mx-auto text-center animate-slide-up">
        <div className="bg-funky-red/10 rounded-sm p-4 mb-6 border-2 border-funky-red animate-pulse">
          <AlertTriangle size={64} className="mx-auto text-funky-red" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 animate-slide-up">
          <span className="text-funky-purple">404</span> Not Found
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Oops! The page you're looking for doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Link to="/">
            <Button className="neubrutal-button w-full sm:w-auto">
              Return Home
            </Button>
          </Link>
          <Link to="/categories">
            <Button className="neubrutal-button-orange w-full sm:w-auto">
              Browse Categories
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
