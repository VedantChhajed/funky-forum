
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Palette, Cpu, Paintbrush, MessagesSquare, LifeBuoy, 
  ArrowRight, ChevronUp, ChevronDown 
} from 'lucide-react';
import { Category } from '@/types/forum';

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getIcon = (iconName: string) => {
    const iconProps = { size: 24, className: "text-funky-purple transition-all duration-300 group-hover:scale-125" };
    
    switch(iconName) {
      case 'Palette':
        return <Palette {...iconProps} />;
      case 'Cpu':
        return <Cpu {...iconProps} />;
      case 'Paintbrush':
        return <Paintbrush {...iconProps} />;
      case 'MessagesSquare':
        return <MessagesSquare {...iconProps} />;
      case 'LifeBuoy':
        return <LifeBuoy {...iconProps} />;
      default:
        return <MessagesSquare {...iconProps} />;
    }
  };
  
  const getAnimationDelay = () => {
    return `${index * 0.1}s`;
  };

  return (
    <Link 
      to={`/category/${category.slug}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="neubrutal-box p-6 group-hover:bg-funky-purple group-hover:text-white transition-all duration-300"
        style={{ animationDelay: getAnimationDelay() }}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-white rounded-sm border-2 border-black shadow-brutal-sm group-hover:bg-funky-orange transition-all duration-300">
            {getIcon(category.iconName)}
          </div>
          <div className="flex items-center text-sm">
            <span className="mr-2">{category.threadCount} threads</span>
            <div className="transform transition-transform duration-300 group-hover:translate-x-1">
              {isHovered ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:underline">{category.name}</h3>
        
        <p className="text-gray-600 group-hover:text-white/80 mb-4 transition-colors duration-300">
          {category.description}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm font-medium opacity-80">
            {Math.floor(Math.random() * 10) + 1} users online
          </span>
          <div className="flex items-center text-sm font-bold transition-transform duration-300 transform group-hover:translate-x-1">
            Browse
            <ArrowRight size={16} className="ml-1 transition-transform duration-300 transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
