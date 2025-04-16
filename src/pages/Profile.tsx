
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, MessageSquare, Heart, Settings, Edit, Calendar, Mail, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThreadCard from '@/components/ThreadCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { users } from '@/data/mockData';
import { getAllThreads } from '@/data/mockData';
import { formatDate } from '@/lib/utils';

const Profile = () => {
  const user = users[0]; // Using the first user as the profile user
  const [activeTab, setActiveTab] = useState('threads');
  const allThreads = getAllThreads();
  
  // Filter threads created by this user
  const userThreads = allThreads.filter(thread => thread.author.id === user.id);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex mb-6 animate-slide-down">
            <Link to="/" className="text-gray-500 hover:text-funky-purple transition-colors">Home</Link>
            <ChevronRight size={16} className="mx-2 text-gray-400 mt-1" />
            <span className="text-funky-purple font-medium">Profile</span>
          </nav>
          
          {/* Profile Header */}
          <div className="neubrutal-box p-6 mb-6 animate-slide-up">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="mb-4 md:mb-0 md:mr-6">
                <Avatar className="w-24 h-24 rounded-sm border-2 border-black shadow-brutal">
                  <AvatarImage 
                    src={user.avatar || "https://i.pravatar.cc/150?img=1"}
                    alt={user.username}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-4xl font-bold bg-funky-purple text-white">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-grow">
                <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                
                <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    Joined {formatDate(user.joinDate)}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare size={16} className="mr-1" />
                    {user.postCount} posts
                  </div>
                </div>
                
                {user.bio && <p className="text-gray-700 mb-4">{user.bio}</p>}
                
                <div className="flex flex-wrap gap-2">
                  <Button className="neubrutal-button-blue flex items-center">
                    <Mail size={16} className="mr-1" />
                    Message
                  </Button>
                  <Button className="neubrutal-button-orange flex items-center">
                    <Settings size={16} className="mr-1" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Tabs */}
          <Tabs defaultValue="threads" className="mb-8 animate-slide-up">
            <TabsList className="grid grid-cols-4 neubrutal-box p-0 border-2 border-black mb-4">
              <TabsTrigger 
                value="threads" 
                className="data-[state=active]:bg-funky-purple data-[state=active]:text-white data-[state=active]:shadow-none rounded-none border-r-2 border-black"
                onClick={() => setActiveTab('threads')}
              >
                Threads
              </TabsTrigger>
              <TabsTrigger 
                value="posts" 
                className="data-[state=active]:bg-funky-purple data-[state=active]:text-white data-[state=active]:shadow-none rounded-none border-r-2 border-black"
                onClick={() => setActiveTab('posts')}
              >
                Posts
              </TabsTrigger>
              <TabsTrigger 
                value="likes" 
                className="data-[state=active]:bg-funky-purple data-[state=active]:text-white data-[state=active]:shadow-none rounded-none border-r-2 border-black"
                onClick={() => setActiveTab('likes')}
              >
                Likes
              </TabsTrigger>
              <TabsTrigger 
                value="bookmarks" 
                className="data-[state=active]:bg-funky-purple data-[state=active]:text-white data-[state=active]:shadow-none rounded-none"
                onClick={() => setActiveTab('bookmarks')}
              >
                Bookmarks
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="threads" className="animate-slide-up">
              {userThreads.length > 0 ? (
                <div className="space-y-4">
                  {userThreads.map((thread, index) => (
                    <ThreadCard key={thread.id} thread={thread} showCategory={true} index={index} />
                  ))}
                </div>
              ) : (
                <div className="neubrutal-box p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">No Threads Yet</h3>
                  <p className="mb-4">You haven't created any threads yet.</p>
                  <Link to="/new-thread">
                    <Button className="neubrutal-button">Create Your First Thread</Button>
                  </Link>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="posts" className="animate-slide-up">
              <div className="neubrutal-box p-8 text-center">
                <MessageSquare size={64} className="mx-auto mb-4 text-funky-purple opacity-50" />
                <h3 className="text-xl font-bold mb-4">Your Recent Posts</h3>
                <p className="mb-4">This is where your recent posts will appear.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="likes" className="animate-slide-up">
              <div className="neubrutal-box p-8 text-center">
                <Heart size={64} className="mx-auto mb-4 text-funky-purple opacity-50" />
                <h3 className="text-xl font-bold mb-4">Content You've Liked</h3>
                <p className="mb-4">Threads and posts you've liked will appear here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="bookmarks" className="animate-slide-up">
              <div className="neubrutal-box p-8 text-center">
                <ExternalLink size={64} className="mx-auto mb-4 text-funky-purple opacity-50" />
                <h3 className="text-xl font-bold mb-4">Your Bookmarks</h3>
                <p className="mb-4">Threads you've saved will appear here for quick access.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
