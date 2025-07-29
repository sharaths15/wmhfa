import type { Post, Comment } from "@/app/types";
import { X, Send, MessageCircle } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CommentView: React.FC<{ comment: Comment }> = ({ comment }) => (
  <div className="flex items-start space-x-3">
    <Avatar className="w-9 h-9">
      <AvatarImage src={comment.author.avatarUrl} />
      <AvatarFallback>{comment.author.fullName.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="bg-subtle p-3 rounded-lg flex-1">
      <div className="flex justify-between items-baseline">
        <p className="font-bold text-sm text-text">{comment.author.fullName}</p>
        <p className="text-xs text-text-light">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>
      </div>
      <p className="text-sm text-text-light mt-1">{comment.content}</p>
    </div>
  </div>
);

const FullPostContent: React.FC<{ post: Post }> = ({ post }) => {
  switch (post.content.type) {
    case "image":
      return (
        <img
          src={post.content.value}
          className="w-full rounded-lg max-h-[70vh] object-contain bg-black/10"
        />
      );
    case "pdf":
      return (
        <div className="w-full h-[75vh] bg-subtle rounded-lg overflow-hidden border border-border">
          <iframe
            src={post.content.value}
            title={post.title}
            className="w-full h-full"
          />
        </div>
      );
    default:
      return (
        <p className="text-text-light text-base whitespace-pre-wrap leading-relaxed">
          {post.content.value}
        </p>
      );
  }
};

export const SinglePostView: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="grid grid-cols-5 h-full max-h-[90vh]">
      <div className="col-span-3 bg-surface p-8 overflow-y-auto shadow-soft-inset">
        <h1 className="text-3xl font-extrabold text-text mb-6">{post.title}</h1>
        <FullPostContent post={post} />
      </div>

      <div className="col-span-2 flex flex-col h-full bg-background p-6">
        <Dialog.Close asChild>
          <button
            className="text-text-light hover:bg-subtle absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </Dialog.Close>

        <header className="flex items-center mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={post.author.avatarUrl} />
            <AvatarFallback>{post.author.fullName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <p className="font-bold text-text">{post.author.fullName}</p>
            <p className="text-sm text-text-light">
              Posted on {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </header>

        <hr className="border-border my-4" />

        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <CommentView key={comment.id} comment={comment} />
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-text-light">
              <MessageCircle size={40} className="mb-2" />
              <h4 className="font-semibold">No comments yet</h4>
              <p className="text-sm">Be the first to offer support.</p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-4 border-t border-border">
          <div className="relative">
            <textarea
              placeholder="Write a supportive comment..."
              className="w-full p-3 pr-12 border-border bg-surface border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
              rows={2}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary text-white hover:bg-primary/90">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
