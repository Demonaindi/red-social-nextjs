"use client";

import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function CreatePostPage() {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImages(Array.from(files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("content", content);
    images.forEach((file) => formData.append("images", file));

    const res = await fetch("/api/post/create", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/"); // O a perfil/feed
    } else {
      alert(data.error || "Error al crear el post");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto mt-8">
      <Textarea
        value={content}
        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setContent(e.target.value)}
        placeholder="Descripción del post"
      />
      <Input type="file" accept="image/*" multiple onChange={handleImageChange} />
      <Button type="submit" disabled={loading}>
        {loading ? "Publicando..." : "Publicar"}
      </Button>
    </form>
  );
}
