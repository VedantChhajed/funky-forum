
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowBigUp, Clock, Tag, Pin } from 'lucide-react';
import { Thread } from '@/types/forum';
import { formatDate, timeAgo } from '@/lib/utils';

interface ThreadCardProps {
  thread: Thread;
  showCategory?: boolean;
  index: number;
}

const ThreadCard = ({ thread, showCategory = false, index }: ThreadCardProps) => {
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(thread.upvotes);
  
  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (upvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    
    setUpvoted(!upvoted);
  };
  
  const getAnimationDelay = () => {
    return `${index * 0.1}s`;
  };

  return (
    <Link 
      to={`/thread/${thread.id}`}
      className="block group"
    >
      <div 
        className="neubrutal-box p-4 hover:bg-white transition-all duration-300 animate-slide-up"
        style={{ animationDelay: getAnimationDelay() }}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center">
            {thread.isPinned && (
              <div className="mr-2 text-funky-orange flex items-center animate-bounce">
                <Pin size={16} />
              </div>
            )}
            <h3 className="text-lg font-bold group-hover:text-funky-purple transition-colors duration-300">
              {thread.title}
            </h3>
          </div>
          
          <button 
            className={`flex flex-col items-center p-1 rounded-sm transition-all duration-300 ${
              upvoted 
                ? 'bg-funky-purple text-white border-2 border-black shadow-brutal-sm' 
                : 'hover:bg-gray-100 border-2 border-transparent'
            }`}
            onClick={handleUpvote}
          >
            <ArrowBigUp 
              size={20} 
              className={`transition-transform duration-300 ${
                upvoted ? 'transform scale-110' : ''
              }`}
            />
            <span className="text-xs font-bold">{upvotes}</span>
          </button>
        </div>
        
        {thread.tags && thread.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {thread.tags.map((tag) => (
              <div 
                key={tag}
                className="text-xs px-2 py-1 bg-funky-blue/10 text-funky-blue rounded-sm border border-funky-blue flex items-center"
              >
                <Tag size={10} className="mr-1" />
                {tag}
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-center text-sm text-gray-500 mt-3">
          <div className="flex items-center mr-4">
            <img 
              src={thread.author.avatar} 
              alt={thread.author.username}
              className="w-5 h-5 rounded-sm mr-2 border border-black"
            />
            <span>{thread.author.username}</span>
          </div>
          
          {showCategory && (
            <div className="flex items-center mx-4 px-2 py-0.5 bg-funky-purple/10 text-funky-purple rounded-sm">
              <span>Design</span>
            </div>
          )}
          
          <div className="flex items-center mr-4">
            <MessageSquare size={14} className="mr-1" />
            <span>{thread.postCount}</span>
          </div>
          
          <div className="flex items-center opacity-70">
            <Clock size={14} className="mr-1" />
            <span title={formatDate(thread.updatedAt)}>{timeAgo(thread.updatedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ThreadCard;
