"use client"

import { useState } from "react"

export default function ProfileEditForm() {
  const [name, setName] = useState("")
  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    if (image) formData.append("image", image)

    await fetch("/api/user/update", {
      method: "POST",
      body: formData,
    })
  }

  return (
    <div className="p-8 max-w-200">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nuevo nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded-sm"
        />
        <input
          type="file"
          placeholder="Editar foto de perfil"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="border p-2 rounded-sm"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Guardar
        </button>
      </form>
    </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  )
}
