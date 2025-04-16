
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, X, User, MessageSquare, Heart, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { timeAgo } from "@/lib/utils";

// Mock notifications for demonstration
const mockNotifications = [
  {
    id: "1",
    type: "reply",
    content: "JaneDoe replied to your thread: 'I totally agree with your point!'",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    isRead: false,
    relatedThreadId: "1",
    relatedPostId: "2",
    actionUser: {
      id: "2",
      username: "JaneDoe",
      avatar: "https://i.pravatar.cc/150?img=5",
      joinDate: "2023-01-15T12:00:00Z",
      postCount: 42
    }
  },
  {
    id: "2",
    type: "upvote",
    content: "JohnSmith upvoted your post",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    isRead: false,
    relatedThreadId: "2",
    relatedPostId: "5",
    actionUser: {
      id: "3",
      username: "JohnSmith",
      avatar: "https://i.pravatar.cc/150?img=8",
      joinDate: "2023-02-22T12:00:00Z",
      postCount: 27
    }
  },
  {
    id: "3",
    type: "mention",
    content: "AlexWong mentioned you in a thread: 'I think @CurrentUser has a great solution'",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    isRead: true,
    relatedThreadId: "3",
    relatedPostId: "12",
    actionUser: {
      id: "4",
      username: "AlexWong",
      avatar: "https://i.pravatar.cc/150?img=12",
      joinDate: "2023-03-10T12:00:00Z", 
      postCount: 89
    }
  },
  {
    id: "4",
    type: "system",
    content: "Welcome to FunkForum! Check out our community guidelines.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    isRead: true
  }
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();
  
  const unreadCount = notifications.filter(notif => !notif.isRead).length;
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({...notif, isRead: true})));
    toast.success("All notifications marked as read");
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? {...notif, isRead: true} : notif
    ));
  };

  const handleNotificationClick = (notif) => {
    markAsRead(notif.id);
    setIsNotificationOpen(false);
    // In a real app, this would navigate to the thread/post
    toast.info(`Navigating to ${notif.type === 'system' ? 'system message' : 'thread #' + notif.relatedThreadId}`);
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'reply': return <MessageSquare className="text-blue-500" size={18} />;
      case 'upvote': return <Heart className="text-red-500" size={18} />;
      case 'mention': return <User className="text-green-500" size={18} />;
      case 'system': return <CheckCircle className="text-funky-purple" size={18} />;
      default: return <Bell className="text-yellow-500" size={18} />;
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 bg-white border-b-2 border-black' : 'py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group animate-fade-in"
          >
            <div className="w-10 h-10 rounded-sm bg-funky-purple border-2 border-black flex items-center justify-center shadow-brutal-sm transition-all group-hover:rotate-12 group-hover:scale-110 duration-300">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-extrabold text-2xl hidden sm:block">
              Funk<span className="text-funky-purple">Forum</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative animate-slide-down">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-sm border-2 border-black shadow-brutal-sm focus:outline-none focus:shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal w-64"
              />
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
            
            <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative neubrutal-button-blue animate-slide-down"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-funky-red rounded-full border-2 border-black text-xs text-white flex items-center justify-center animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 border-2 border-black shadow-brutal" align="end">
                <div className="p-4 border-b-2 border-black bg-funky-purple/10">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold">Notifications</h3>
                    <Button 
                      variant="ghost" 
                      className="h-8 px-2 text-xs neubrutal-button-sm"
                      onClick={markAllAsRead}
                    >
                      Mark all as read
                    </Button>
                  </div>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div>
                      {notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          className={`p-3 border-b border-gray-200 cursor-pointer transition-colors hover:bg-gray-100 ${!notif.isRead ? 'bg-funky-purple/5' : ''}`}
                          onClick={() => handleNotificationClick(notif)}
                        >
                          <div className="flex items-start gap-3">
                            {notif.actionUser ? (
                              <Avatar className="h-8 w-8 border border-black shadow-brutal-sm">
                                <AvatarImage src={notif.actionUser.avatar} alt={notif.actionUser.username} />
                                <AvatarFallback className="bg-funky-purple text-white">
                                  {notif.actionUser.username.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200 border border-black">
                                {getNotificationIcon(notif.type)}
                              </div>
                            )}
                            <div className="space-y-1 flex-1">
                              <p className="text-sm">{notif.content}</p>
                              <p className="text-xs text-gray-500">{timeAgo(notif.createdAt)}</p>
                            </div>
                            {!notif.isRead && (
                              <div className="h-2.5 w-2.5 rounded-full bg-funky-purple" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-gray-500">
                      <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
                      <p>No notifications yet</p>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            
            <Link to="/profile">
              <Button 
                variant="ghost"
                className="neubrutal-button-orange animate-slide-down"
              >
                <Avatar className="h-6 w-6 mr-2 border border-black shadow-brutal-xs">
                  <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="user" />
                  <AvatarFallback className="bg-funky-purple text-white">
                    <User size={14} />
                  </AvatarFallback>
                </Avatar>
                Profile
              </Button>
            </Link>
          </div>
          
          <button 
            className="md:hidden neubrutal-box p-2 animate-slide-down"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-[72px] left-0 right-0 bg-white border-y-2 border-black p-4 shadow-brutal animate-slide-in-right">
          <div className="space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 rounded-sm border-2 border-black shadow-brutal-sm focus:outline-none focus:shadow-brutal"
              />
              <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" size={18} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline"
                className="neubrutal-button-blue flex items-center justify-center p-3"
                onClick={() => {
                  setIsMenuOpen(false);
                  toast.info("Showing notifications");
                }}
              >
                <div className="relative">
                  <Bell size={20} className="mr-2" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-funky-red rounded-full border border-black text-xs text-white flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                Notifications
              </Button>
              
              <Link 
                to="/profile" 
                className="neubrutal-button-orange flex items-center justify-center p-3"
              >
                <Avatar className="h-6 w-6 mr-2 border border-black shadow-brutal-xs">
                  <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="user" />
                  <AvatarFallback className="bg-funky-purple text-white">
                    <User size={14} />
                  </AvatarFallback>
                </Avatar>
                Profile
              </Link>
            </div>
            
            <nav className="space-y-2">
              <Link 
                to="/" 
                className="block neubrutal-box p-2 pl-4 hover:bg-funky-purple hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link 
                to="/categories" 
                className="block neubrutal-box p-2 pl-4 hover:bg-funky-purple hover:text-white transition-colors"
              >
                Categories
              </Link>
              <Link 
                to="/trending" 
                className="block neubrutal-box p-2 pl-4 hover:bg-funky-purple hover:text-white transition-colors"
              >
                Trending
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
