
export interface User {
  id: string;
  username: string;
  avatar: string;
  joinDate: string;
  postCount: number;
  bio?: string;
  notifications?: Notification[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  iconName: string;
  threadCount: number;
  threads?: Thread[];
}

export interface Thread {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  categoryId: string;
  postCount: number;
  upvotes: number;
  posts?: Post[];
  isPinned?: boolean;
  tags?: string[];
}

export interface Post {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: User;
  threadId: string;
  upvotes: number;
  isInitialPost?: boolean;
}

export interface Notification {
  id: string;
  type: 'mention' | 'reply' | 'upvote' | 'system';
  content: string;
  createdAt: string;
  isRead: boolean;
  relatedThreadId?: string;
  relatedPostId?: string;
  actionUser?: User;
}
