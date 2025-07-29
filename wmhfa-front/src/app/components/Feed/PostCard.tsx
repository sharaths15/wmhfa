import React from "react";
import { type Post } from "@/app/types";
import { Heart, MessageCircle, Share2, FileText } from "lucide-react";

interface PostCardProps {
  post: Post;
  onPostClick: (post: Post) => void;
  onInteractionClick: (e: React.MouseEvent) => void;
}

const PostContent: React.FC<{ content: Post["content"] }> = ({ content }) => {
  switch (content.type) {
    case "image":
      return (
        <img
          src={content.value}
          alt="Post content"
          className="w-full h-auto object-cover rounded-lg mt-4 max-h-[500px]"
        />
      );
    case "video":
      return (
        <video
          src={content.value}
          controls
          className="w-full h-auto rounded-lg mt-4"
        />
      );
    case "pdf":
      return (
        <div className="mt-4 p-4 border-dashed border-2 border-border rounded-lg bg-subtle text-left flex items-center space-x-4">
          <FileText className="text-primary" size={40} />
          <div>
            <p className="font-semibold text-primary">PDF Document Attached</p>
            <p className="text-sm text-text-light">{content.value}</p>
          </div>
        </div>
      );
    case "text":
    default:
      const isLongText = content.value.length > 300;
      const previewText = isLongText
        ? `${content.value.substring(0, 300)}...`
        : content.value;
      return (
        <p className="mt-2 text-text-light text-base whitespace-pre-wrap leading-relaxed">
          {previewText}
          {isLongText && (
            <span className="text-primary font-semibold ml-1">See more</span>
          )}
        </p>
      );
  }
};

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onPostClick,
  onInteractionClick,
}) => {
  return (
    <article className="bg-surface rounded-xl shadow-soft transition-shadow hover:shadow-lg">
      <div className="p-6 cursor-pointer" onClick={() => onPostClick(post)}>
        <header className="flex items-center mb-4">
          <img
            src={post.author.avatarUrl}
            alt={post.author.fullName}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="font-bold text-text">{post.author.fullName}</p>
            <p className="text-sm text-text-light">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </header>
        <div className="content">
          <h2 className="text-2xl font-bold mb-2 text-text">{post.title}</h2>
          <PostContent content={post.content} />
        </div>
      </div>

      <footer className="mt-2 px-6 pb-5 border-t border-border pt-4 flex items-center justify-between text-text-light">
        <div className="flex items-center space-x-8">
          <button
            onClick={onInteractionClick}
            className={`flex items-center space-x-2 hover:text-red-500 transition-colors ${
              post.isLikedByUser ? "text-red-500" : ""
            }`}
          >
            <Heart
              size={22}
              className={post.isLikedByUser ? "fill-current" : ""}
            />
            <span className="font-medium">{post.likeCount}</span>
          </button>
          <button
            onClick={() => onPostClick(post)}
            className="flex items-center space-x-2 hover:text-primary transition-colors"
          >
            <MessageCircle size={22} />
            <span className="font-medium">{post.commentCount} Comments</span>
          </button>
        </div>
        <button
          onClick={onInteractionClick}
          className="flex items-center space-x-2 hover:text-primary transition-colors"
        >
          <Share2 size={22} />
          <span className="font-medium">Share</span>
        </button>
      </footer>
    </article>
  );
};
