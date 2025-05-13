/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "./glitch.css";

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    image: "",
    bio: "descripcion del mose",
    posts: 0,
    followers: 0,
    following: 0,
  });

  const [userPosts, setUserPosts] = useState<any[]>([]); // MOVER AQUÍ

  const { data: session, status } = useSession(); // también podés usar `status` en lugar de `!session`
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("/api/user/me");
      const data = await res.json();
      setUserData(data);
    };

    if (session?.user) fetchUserData();
  }, [session]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const res = await fetch("/api/user/[username]/posts");
      const data = await res.json();
      console.log(data);
      setUserPosts(data);
    };

    if (session?.user) fetchUserPosts();
  }, [session]);

  if (status === "loading") {
    return <p className="text-center mt-10">Cargando perfil...</p>;
  }

  if (!session) {
    return <p className="text-center mt-10">No estás autenticado.</p>;
  }

  const handleLike = async (postId: string) => {
    try {
      const res = await fetch(`/api/post/${postId}/like`, {
        method: "POST",
      });
      if (res.ok) {
        const updated = await fetch("/api/user/[username]/posts");
        setUserPosts(await updated.json());
      }
    } catch (err) {
      console.error("Error al dar like:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white py-12 px-6 font-mono">
      <div className="max-w-2xl mx-auto bg-zinc-800 rounded-xl shadow-2xl p-8 border border-pink-500/30 relative overflow-hidden">
        <div className="glitch-box absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" />

        <div className="flex flex-col items-center gap-4 relative z-10">
          {userData.image ? (
            <Image
              src={userData.image}
              alt="Foto de perfil"
              width={240}
              height={240}
              className="rounded-2xl h-32 w-32 border-4 shadow-md object-cover"
            />
          ) : (
            <div className="w-28 h-28 bg-gray-700 rounded-full" />
          )}

          <h1 className="text-3xl font-bold glitch-text">
            @{userData.username}
          </h1>
          <p className="text-sm text-pink-200">{userData.name}</p>
          <p className="italic text-center max-w-md text-zinc-400">
            {userData.bio || "Proud to be out of place."}
          </p>

          <div className="flex justify-center gap-6 mt-6 text-center">
            <div>
              <p className="font-bold text-xl text-orange-400">
                {userData.posts}
              </p>
              <p className="text-xs text-zinc-400">Publicaciones</p>
            </div>
            <div>
              <p className="font-bold text-xl text-orange-400">
                {userData.followers}
              </p>
              <p className="text-xs text-zinc-400">Seguidores</p>
            </div>
            <div>
              <p className="font-bold text-xl text-orange-400">
                {userData.following}
              </p>
              <p className="text-xs text-zinc-400">Seguidos</p>
            </div>
          </div>

          {/*Botón para crear nuevo post*/}
          <button
            onClick={() => router.push("/dashboard/postgenerator")}
            className="mt-6 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-500 transition"
          >
            Crear nuevo post
          </button>

          <div className="mt-12 space-y-6 w-full max-w-2xl mx-auto">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-zinc-800 p-4 rounded-xl border border-zinc-700"
                >
                  <p className="mb-2 text-sm text-zinc-300">{post.content}</p>

                  {post.images?.length > 0 && (
                    <div className="flex gap-2 flex-wrap mb-2">
                      {post.images.map((img: any) => (
                        <Image
                          key={img.id}
                          src={img.url}
                          alt="Post image"
                          width={120}
                          height={120}
                          className="rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center text-sm text-zinc-400 gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="hover:text-pink-400 transition"
                    >
                      ❤️ {post.likes}
                    </button>

                    <button
                      onClick={() => alert("Comentarios próximamente")}
                      className="hover:text-pink-400 transition"
                    >
                      💬 Comentar
                    </button>

                    <span className="ml-auto text-xs">
                      {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-zinc-500">
                Este usuario no tiene publicaciones.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
