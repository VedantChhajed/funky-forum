
import { useState } from 'react';
import { ArrowBigUp, Reply, Clock, MoreHorizontal, Flag, Trash, Edit } from 'lucide-react';
import { Post } from '@/types/forum';
import { formatDate, timeAgo } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostCardProps {
  post: Post;
  index: number;
}

const PostCard = ({ post, index }: PostCardProps) => {
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [isReplying, setIsReplying] = useState(false);
  
  const handleUpvote = () => {
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
    <div 
      className={`neubrutal-box p-4 mb-4 animate-slide-up ${post.isInitialPost ? 'border-funky-purple' : ''}`}
      style={{ animationDelay: getAnimationDelay() }}
    >
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <img 
            src={post.author.avatar} 
            alt={post.author.username} 
            className="w-10 h-10 rounded-sm mr-3 border-2 border-black shadow-brutal-sm"
          />
          <div>
            <div className="font-bold">{post.author.username}</div>
            <div className="text-xs text-gray-500 flex items-center">
              <Clock size={12} className="mr-1" />
              <span title={formatDate(post.createdAt)}>{timeAgo(post.createdAt)}</span>
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-sm">
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="neubrutal-box p-2 min-w-[120px]">
            <DropdownMenuItem className="flex items-center cursor-pointer hover:bg-funky-purple hover:text-white rounded-sm transition-colors">
              <Flag size={14} className="mr-2" />
              Report
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center cursor-pointer hover:bg-funky-purple hover:text-white rounded-sm transition-colors">
              <Edit size={14} className="mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center cursor-pointer hover:bg-funky-red hover:text-white rounded-sm transition-colors">
              <Trash size={14} className="mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="post-content mb-4 text-gray-800">
        {post.content}
      </div>
      
      <div className="flex items-center mt-4">
        <button
          onClick={handleUpvote}
          className={`flex items-center mr-4 p-1 rounded-sm transition-all duration-300 ${
            upvoted 
              ? 'bg-funky-purple text-white border-2 border-black shadow-brutal-sm' 
              : 'hover:bg-gray-100 border-2 border-transparent'
          }`}
        >
          <ArrowBigUp 
            size={18} 
            className={`transition-transform duration-300 ${upvoted ? 'transform scale-110' : ''}`}
          />
          <span className="ml-1 text-sm font-bold">{upvotes}</span>
        </button>
        
        <button
          onClick={() => setIsReplying(!isReplying)}
          className="flex items-center mr-4 hover:text-funky-purple transition-colors duration-300"
        >
          <Reply size={18} className="mr-1" />
          <span className="text-sm">Reply</span>
        </button>
      </div>
      
      {isReplying && (
        <div className="mt-4 animate-slide-down">
          <textarea 
            className="w-full p-3 border-2 border-black rounded-sm shadow-brutal-sm focus:outline-none focus:shadow-brutal"
            rows={3}
            placeholder="Write your reply..."
          ></textarea>
          <div className="mt-2 flex justify-end">
            <Button onClick={() => setIsReplying(false)} className="mr-2 neubrutal-button-orange">Cancel</Button>
            <Button className="neubrutal-button">Reply</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
