
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ArrowBigUp, MessageSquare, Share2, Flag, Bookmark, Reply } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { getAllThreads, getPostsByThread } from '@/data/mockData';
import { Thread, Post } from '@/types/forum';
import { formatDate } from '@/lib/utils';

const ThreadView = () => {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [upvoted, setUpvoted] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  
  useEffect(() => {
    const allThreads = getAllThreads();
    const foundThread = allThreads.find(t => t.id === id);
    
    if (foundThread) {
      setThread(foundThread);
      setUpvotes(foundThread.upvotes);
      const threadPosts = getPostsByThread(foundThread.id);
      setPosts(threadPosts);
    }
    
    setLoading(false);
  }, [id]);
  
  const handleUpvote = () => {
    if (upvoted) {
      setUpvotes(upvotes - 1);
    } else {
      setUpvotes(upvotes + 1);
    }
    
    setUpvoted(!upvoted);
  };
  
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!replyContent.trim()) {
      return;
    }
    
    // In a real app, this would submit to an API
    setReplyContent('');
    setIsReplyOpen(false);
    
    // Simulate adding a new post (in real app, would be done after API response)
    const newPost: Post = {
      id: `temp-${Date.now()}`,
      content: replyContent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: {
        id: 'current-user',
        username: 'You',
        avatar: '/placeholder.svg',
        joinDate: '2023-04-01',
        postCount: 1,
      },
      threadId: thread?.id || '',
      upvotes: 0,
    };
    
    setPosts([...posts, newPost]);
  };
  
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
  
  if (!thread) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 container mx-auto px-4">
          <div className="neubrutal-box p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Thread Not Found</h1>
            <p className="mb-4">The thread you're looking for doesn't exist.</p>
            <Link to="/">
              <Button className="neubrutal-button">Return to Home</Button>
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
            <span className="text-funky-purple font-medium">Thread</span>
          </nav>
          
          {/* Thread Header */}
          <div className="neubrutal-box p-6 mb-6 animate-slide-up">
            <h1 className="text-3xl font-bold mb-2">{thread.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
              <div className="flex items-center mr-4">
                <img 
                  src={thread.author.avatar}
                  alt={thread.author.username}
                  className="w-6 h-6 rounded-sm mr-2 border border-black"
                />
                <span>{thread.author.username}</span>
              </div>
              
              <div className="mr-4">
                Started {formatDate(thread.createdAt)}
              </div>
              
              {thread.tags && thread.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mr-4">
                  {thread.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-funky-blue/10 text-funky-blue rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                className={`border-2 ${upvoted ? 'bg-funky-purple text-white' : 'border-black'} shadow-brutal-sm flex items-center`}
                onClick={handleUpvote}
              >
                <ArrowBigUp size={18} className="mr-1" />
                <span>{upvotes}</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-2 border-black shadow-brutal-sm flex items-center"
              >
                <MessageSquare size={18} className="mr-1" />
                <span>{posts.length} Replies</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-2 border-black shadow-brutal-sm flex items-center"
              >
                <Share2 size={18} className="mr-1" />
                Share
              </Button>
              
              <Button 
                variant="outline" 
                className="border-2 border-black shadow-brutal-sm flex items-center"
              >
                <Bookmark size={18} className="mr-1" />
                Save
              </Button>
              
              <Button 
                variant="outline" 
                className="border-2 border-black shadow-brutal-sm flex items-center"
              >
                <Flag size={18} className="mr-1" />
                Report
              </Button>
            </div>
          </div>
          
          {/* Posts List */}
          <div className="mb-8">
            {posts.map((post, index) => (
              <PostCard key={post.id} post={post} index={index} />
            ))}
          </div>
          
          {/* Reply Box */}
          <div className="neubrutal-box p-6 mb-8 animate-slide-up">
            <h3 className="text-xl font-bold mb-4">Join the Conversation</h3>
            
            {isReplyOpen ? (
              <form onSubmit={handleReplySubmit}>
                <textarea 
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full p-3 border-2 border-black rounded-sm shadow-brutal-sm focus:outline-none focus:shadow-brutal animate-slide-down"
                  rows={5}
                  placeholder="Write your reply..."
                />
                <div className="flex justify-end mt-4">
                  <Button 
                    type="button" 
                    onClick={() => setIsReplyOpen(false)}
                    className="mr-2 neubrutal-button-orange"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="neubrutal-button"
                  >
                    Post Reply
                  </Button>
                </div>
              </form>
            ) : (
              <Button 
                className="w-full neubrutal-button flex items-center justify-center"
                onClick={() => setIsReplyOpen(true)}
              >
                <Reply size={18} className="mr-2" />
                Write a Reply
              </Button>
            )}
          </div>
          
          {/* Thread Stats */}
          <div className="neubrutal-box p-6 animate-slide-up">
            <h3 className="text-lg font-bold mb-4">Thread Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-funky-purple/10 border border-funky-purple p-3 rounded-sm text-center">
                <div className="text-2xl font-bold text-funky-purple">{posts.length}</div>
                <div className="text-xs text-gray-600">Replies</div>
              </div>
              <div className="bg-funky-orange/10 border border-funky-orange p-3 rounded-sm text-center">
                <div className="text-2xl font-bold text-funky-orange">{upvotes}</div>
                <div className="text-xs text-gray-600">Upvotes</div>
              </div>
              <div className="bg-funky-blue/10 border border-funky-blue p-3 rounded-sm text-center">
                <div className="text-2xl font-bold text-funky-blue">
                  {Math.floor(Math.random() * 500) + 50}
                </div>
                <div className="text-xs text-gray-600">Views</div>
              </div>
              <div className="bg-funky-pink/10 border border-funky-pink p-3 rounded-sm text-center">
                <div className="text-2xl font-bold text-funky-pink">
                  {formatDate(thread.updatedAt)}
                </div>
                <div className="text-xs text-gray-600">Last Updated</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThreadView;
