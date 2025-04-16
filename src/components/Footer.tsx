
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t-2 border-black mt-12 py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="animate-slide-up">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-sm bg-funky-purple border-2 border-black flex items-center justify-center shadow-brutal-sm">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-extrabold text-xl">
                Funk<span className="text-funky-purple">Forum</span>
              </span>
            </Link>
            <p className="text-gray-600 mb-4">
              A vibrant community for funky conversations and creative discussions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-funky-purple transition-colors duration-300">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-funky-purple transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-funky-purple transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-funky-purple transition-colors duration-300">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-bold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="link-underline text-gray-600 hover:text-funky-purple transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="link-underline text-gray-600 hover:text-funky-purple transition-colors duration-300">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/trending" className="link-underline text-gray-600 hover:text-funky-purple transition-colors duration-300">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/new-thread" className="link-underline text-gray-600 hover:text-funky-purple transition-colors duration-300">
                  Create Thread
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="link-underline text-gray-600 hover:text-funky-purple transition-colors duration-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="link-underline text-gray-600 hover:text-funky-purple transition-colors duration-300">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link to="/faq" className="link-underline text-gray-600 hover:text-funky-purple transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="link-underline text-gray-600 hover:text-funky-purple transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-bold text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="link-underline text-gray-600 hover:text-funky-purple transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="link-underline text-gray-600 hover:text-funky-purple transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="link-underline text-gray-600 hover:text-funky-purple transition-colors duration-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} FunkForum. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Link to="/terms" className="text-sm text-gray-600 hover:text-funky-purple transition-colors duration-300">
              Terms
            </Link>
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-funky-purple transition-colors duration-300">
              Privacy
            </Link>
            <Link to="/cookies" className="text-sm text-gray-600 hover:text-funky-purple transition-colors duration-300">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
