"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Post {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    username: string | null;
    image: string | null;
  };
  images: {
    id: string;
    url: string;
  }[];
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/feed");
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-10 text-white">Cargando posts...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 px-4 space-y-6 text-white">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-zinc-800 p-6 rounded-xl shadow-lg border border-zinc-700"
        >
          <div className="flex items-center gap-4 mb-4">
            {post.author.image ? (
              <Image
                src={post.author.image}
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-600" />
            )}
            <div>
              <Link
                href={`/user/${post.author.id}`}
                className="font-bold text-pink-400 hover:underline"
              >
                @{post.author.username || "usuario"}
              </Link>
              <p className="text-xs text-zinc-400">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <p className="mb-4 text-zinc-200">{post.content}</p>

          {post.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {post.images.map((img) => (
                <Image
                  key={img.id}
                  src={img.url}
                  alt="post"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover"
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
