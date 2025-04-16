
import { User, Category, Thread, Post } from "../types/forum";
import { getRandomDate } from "../lib/utils";

export const users: User[] = [
  {
    id: "1",
    username: "funkmaster",
    avatar: "/placeholder.svg",
    joinDate: "2023-01-15",
    postCount: 142,
    bio: "Just here vibing and sharing funky thoughts"
  },
  {
    id: "2",
    username: "neobrutal_designer",
    avatar: "/placeholder.svg",
    joinDate: "2023-03-22",
    postCount: 87,
    bio: "Design enthusiast with a passion for bold colors and shapes"
  },
  {
    id: "3",
    username: "pixelpioneeer",
    avatar: "/placeholder.svg",
    joinDate: "2023-05-10",
    postCount: 53,
    bio: "Creating digital art and exploring the boundaries of design"
  },
  {
    id: "4",
    username: "vibrant_voice",
    avatar: "/placeholder.svg",
    joinDate: "2023-02-28",
    postCount: 112,
    bio: "Outspoken, creative, and always looking for new perspectives"
  },
  {
    id: "5",
    username: "digital_dreamer",
    avatar: "/placeholder.svg",
    joinDate: "2023-04-17",
    postCount: 76,
    bio: "Exploring the intersection of technology and creativity"
  }
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Design Inspiration",
    description: "Share and discover design trends and inspiration",
    slug: "design-inspiration",
    iconName: "Palette",
    threadCount: 24
  },
  {
    id: "2",
    name: "Tech Talk",
    description: "Discussions about the latest in technology",
    slug: "tech-talk",
    iconName: "Cpu",
    threadCount: 18
  },
  {
    id: "3",
    name: "Creative Corner",
    description: "Showcase your creative projects and get feedback",
    slug: "creative-corner",
    iconName: "Paintbrush",
    threadCount: 31
  },
  {
    id: "4",
    name: "Community Chat",
    description: "General discussions and community building",
    slug: "community-chat",
    iconName: "MessagesSquare",
    threadCount: 42
  },
  {
    id: "5",
    name: "Help & Support",
    description: "Ask questions and get help from the community",
    slug: "help-support",
    iconName: "LifeBuoy",
    threadCount: 15
  }
];

export const generateThreads = (categoryId: string): Thread[] => {
  const threadTitles = [
    "What's your favorite design trend of 2025?",
    "How do you approach color theory in your projects?",
    "Show off your latest creative work!",
    "Tips for better UI animations",
    "Neubrutalism vs. Glassmorphism: Let's discuss!",
    "What inspired you to start creating?",
    "How do you stay productive as a designer?",
    "Let's talk about accessibility in modern designs",
    "Your go-to tools for digital creation",
    "The future of web design: predictions and hopes"
  ];
  
  return threadTitles.map((title, index) => {
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomUpvotes = Math.floor(Math.random() * 150);
    const randomPostCount = Math.floor(Math.random() * 50) + 1;
    const slug = title.toLowerCase().replace(/[^\w ]+/g, "").replace(/ +/g, "-");
    
    return {
      id: `${categoryId}-${index + 1}`,
      title,
      slug,
      createdAt: getRandomDate(365).toISOString(),
      updatedAt: getRandomDate(30).toISOString(),
      author: users[randomUserIndex],
      categoryId,
      postCount: randomPostCount,
      upvotes: randomUpvotes,
      isPinned: index === 0,
      tags: ["Design", "Discussion", "2025", "Trends"].slice(0, Math.floor(Math.random() * 3) + 1)
    };
  });
};

export const generatePosts = (threadId: string): Post[] => {
  const postContents = [
    "I've been thinking about this a lot recently. In my opinion, the best approach is to start with small experiments and see what resonates with your audience.",
    "This is such an interesting topic! I've found that combining modern techniques with classic principles often yields the best results.",
    "Has anyone tried the new tools that were released last month? I'm curious about how they compare to the established options.",
    "Great thread! I'd add that consistency is key, no matter which style or technique you choose to follow.",
    "I completely disagree with the previous comment. Innovation requires breaking rules and experimenting outside established norms.",
    "Here's an example from my recent project that might help illustrate this concept better...",
    "Thanks everyone for the insightful comments. I'm learning so much from this discussion!"
  ];
  
  return postContents.map((content, index) => {
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomUpvotes = Math.floor(Math.random() * 30);
    
    return {
      id: `${threadId}-post-${index + 1}`,
      content,
      createdAt: getRandomDate(30).toISOString(),
      updatedAt: getRandomDate(15).toISOString(),
      author: users[randomUserIndex],
      threadId,
      upvotes: randomUpvotes,
      isInitialPost: index === 0
    };
  });
};

export const getThreadsByCategory = (categoryId: string): Thread[] => {
  return generateThreads(categoryId);
};

export const getPostsByThread = (threadId: string): Post[] => {
  return generatePosts(threadId);
};

export const getAllThreads = (): Thread[] => {
  let allThreads: Thread[] = [];
  
  categories.forEach(category => {
    const categoryThreads = generateThreads(category.id);
    allThreads = [...allThreads, ...categoryThreads];
  });
  
  return allThreads.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};
