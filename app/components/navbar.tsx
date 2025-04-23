"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  const { data: session, status } = useSession()

  if (status === "loading") return null

  return (
    <nav className="flex justify-between items-center p-4 shadow">
      <Link href="/dashboard" className="text-xl font-bold">
        Atypik
      </Link>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="border rounded px-2 py-1"
        />
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="Perfil"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
      </div>
      <Link href="/dashboard/settings" className="ml-4 text-sm">
           Configuration
      </Link>
    </nav>
  )
}
