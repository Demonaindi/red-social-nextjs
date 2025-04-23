"use client"

import { useSession, signOut, update } from "next-auth/react"
import { useState } from "react"

export default function SettingsPage() {
  const { data: session } = useSession()
  const [name, setName] = useState(session?.user?.name ?? "")
  const [image, setImage] = useState(session?.user?.image ?? "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image }),
    })

    if (res.ok) {
      await update()
      alert("Perfil actualizado")
    } else {
      alert("Error al actualizar perfil")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Configuración</h1>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nombre"
        className="border p-2 w-full"
      />
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
        placeholder="URL de imagen"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Guardar cambios
      </button>
    </form>
  )
}
