import { type LucideIcon } from "lucide-react";

export interface User {
  id: string;
  fullName: string;
  avatarUrl?: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  replies?: Comment[];
}

export interface Post {
  id: string;
  author: User;
  title: string;
  createdAt: string;
  content: {
    type: "text" | "image" | "video" | "pdf";
    value: string;
  };
  likeCount: number;
  commentCount: number;
  comments: Comment[];
  isLikedByUser: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "Community" | "Learning" | "Milestones";
  icon: LucideIcon; // We store the icon component itself
  earned: boolean;
  earnedDate: string | null;
}
