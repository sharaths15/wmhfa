import React, { useState } from "react";
import { PostCard } from "@/app/components/Feed/PostCard";
import { type Post } from "@/app/types";
import { SinglePostView } from "@/app/components/Feed/SinglePostView";
import * as Dialog from "@radix-ui/react-dialog";
import { MOCK_POSTS } from "@/app/utils/mock_feed_data";
import { FilePlus, Image, Video } from "lucide-react";

const PostComposer = () => (
  <div className="bg-surface p-5 rounded-xl shadow-soft mb-8">
    <h3 className="font-bold text-lg mb-4 text-text">
      Share something with the community
    </h3>
    <textarea
      className="w-full p-3 border-none bg-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition shadow-sm"
      placeholder="What's on your mind, John?"
      rows={3}
    />
    <div className="mt-4 flex justify-between items-center">
      <div className="flex space-x-4 text-text-light">
        <button className="flex items-center space-x-2 hover:text-primary">
          <Image size={20} />
          <span>Image</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-primary">
          <Video size={20} />
          <span>Video</span>
        </button>
        <button className="flex items-center space-x-2 hover:text-primary">
          <FilePlus size={20} />
          <span>PDF</span>
        </button>
      </div>
      <button className="bg-[#0F121C] text-white font-bold py-2 px-6 rounded-lg hover:bg-primary/90 transition-colors">
        Post
      </button>
    </div>
  </div>
);

export const CommunityFeed = () => {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleInteractionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Interaction button clicked");
  };

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-8">
        <PostComposer />
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onPostClick={() => handlePostClick(post)}
              onInteractionClick={handleInteractionClick}
            />
          ))}
        </div>
      </div>

      <aside className="col-span-12 lg:col-span-4">
        <div className="sticky top-8 bg-surface p-6 rounded-xl shadow-soft">
          <h3 className="font-bold text-lg mb-4">Community Resources</h3>
          <ul className="space-y-3">
            <li className="text-primary hover:underline cursor-pointer">
              Guide to Active Listening
            </li>
            <li className="text-primary hover:underline cursor-pointer">
              De-escalation Techniques PDF
            </li>
            <li className="text-primary hover:underline cursor-pointer">
              Upcoming Webinar: Burnout
            </li>
          </ul>
        </div>
      </aside>

      <Dialog.Root
        open={!!selectedPost}
        onOpenChange={() => setSelectedPost(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-40" />
          <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[90vh] w-[90vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background shadow-lg z-50 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200">
            {selectedPost && <SinglePostView post={selectedPost} />}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
