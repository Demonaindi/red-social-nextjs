"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function AccountSettings() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);  
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("/api/user/me");
      const data = await res.json();
      if (data) {
        setName(data.name || "");
        setUsername(data.username || "");
        setImagePreview(data.image || null);
      }
    };

    if (session?.user) fetchUserData();
  }, [session]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update");

      alert("Perfil actualizado");
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}   className="w-full max-w-md mx-auto space-y-6 px-4 sm:px-0">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="name">Nombre y apellido</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre y apellido"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="username">Nombre de usuario</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Nombre de usuario"
        />
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="image">Foto de perfil</Label>
        <div className="my-2">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Preview"
              width={840}
              height={840}
              className="rounded-2xl w-40 h-40 object-cover"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-full" />
          )}
        </div>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar"}
      </Button>
    </form>
  );
}
