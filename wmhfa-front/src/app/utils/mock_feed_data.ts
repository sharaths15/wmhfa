import { type Post } from "../types";

export const MOCK_POSTS: Post[] = [
  {
    id: "post-1",
    author: {
      id: "user-1",
      fullName: "Emily Johnson",
      avatarUrl: "https://i.pravatar.cc/150?img=47",
    },
    title: "Mindfulness Techniques That Work for Me",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    content: {
      type: "text",
      value:
        "Lately, I've been struggling with staying present, so I've started practicing box breathing and journaling each morning. It's helped me more than I expected.\n\nAnyone else have mindfulness tips that really work for you?",
    },
    likeCount: 23,
    commentCount: 2,
    comments: [
      {
        id: "comment-1",
        author: {
          id: "user-2",
          fullName: "Carlos Rivera",
          avatarUrl: "https://i.pravatar.cc/150?img=32",
        },
        content:
          "Box breathing helped me through some tough anxiety spells too. Thanks for sharing!",
        createdAt: new Date(Date.now() - 86400000 * 0.8).toISOString(),
      },
      {
        id: "comment-2",
        author: {
          id: "user-3",
          fullName: "Aisha Patel",
          avatarUrl: "https://i.pravatar.cc/150?img=15",
        },
        content: "I use Headspace for guided meditation. Highly recommend!",
        createdAt: new Date(Date.now() - 86400000 * 0.7).toISOString(),
      },
    ],
    isLikedByUser: true,
  },
  {
    id: "post-2",
    author: {
      id: "user-4",
      fullName: "Liam Chen",
      avatarUrl: "https://i.pravatar.cc/150?img=23",
    },
    title: "A calming view I wanted to share 🌅",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    content: {
      type: "image",
      value:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1050&q=80",
    },
    likeCount: 40,
    commentCount: 1,
    comments: [
      {
        id: "comment-3",
        author: {
          id: "user-1",
          fullName: "Emily Johnson",
          avatarUrl: "https://i.pravatar.cc/150?img=47",
        },
        content: "Absolutely beautiful. I could stare at this for hours.",
        createdAt: new Date(Date.now() - 86400000 * 1.5).toISOString(),
      },
    ],
    isLikedByUser: false,
  },
  {
    id: "post-3",
    author: {
      id: "user-5",
      fullName: "Sofia Mendes",
      avatarUrl: "https://i.pravatar.cc/150?img=18",
    },
    title: "My Mental Health Story (PDF)",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    content: {
      type: "pdf",
      value: "sofia-mental-health-story.pdf",
    },
    likeCount: 12,
    commentCount: 0,
    comments: [],
    isLikedByUser: false,
  },
  {
    id: "post-4",
    author: {
      id: "user-6",
      fullName: "Marcus Daniels",
      avatarUrl: "https://i.pravatar.cc/150?img=6",
    },
    title: "Grounding Exercises That Actually Help",
    createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
    content: {
      type: "text",
      value:
        "When I feel panic setting in, I use the 5-4-3-2-1 technique to ground myself.\n\nIt's simple:\n5 things you can see\n4 things you can touch\n3 things you can hear\n2 things you can smell\n1 thing you can taste\n\nGive it a try!",
    },
    likeCount: 17,
    commentCount: 1,
    comments: [
      {
        id: "comment-4",
        author: {
          id: "user-7",
          fullName: "Rachel Green",
          avatarUrl: "https://i.pravatar.cc/150?img=28",
        },
        content: "This is gold. I've bookmarked it. Thanks for posting!",
        createdAt: new Date(Date.now() - 86400000 * 0.4).toISOString(),
      },
    ],
    isLikedByUser: true,
  },
];
