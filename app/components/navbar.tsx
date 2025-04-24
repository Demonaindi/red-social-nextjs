/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  if (status === "loading") return null;

  return (
    <nav className="flex justify-between items-center px-4 py-2 shadow">
      <div>
        <Link href="/dashboard" className="text-3xl font-bold flex items-center">
          Atypik
        <Image src="/assets/images/logoSolo.png" alt="logo" width={54} height={54} />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Buscar..."
          className="border rounded px-2 py-1"
        />
        <DropdownMenu>
          <DropdownMenuTrigger>{session?.user?.name}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Mi Perfil</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={"/dashboard/settings"}>Ajustes</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>Cerrar sesion</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <div>
          <h2 onClick={() => setShowMenu(!showMenu)} className="cursor-pointer">
            {session?.user?.name}
          </h2>
          {showMenu && (
            <ul className="absolute bg-white border border-gray-300 p-4 w-48">
              <li className="mb-4">
                <Link
                  href="/dashboard/settings"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Configuración
                </Link>
              </li>
            </ul>
          )}
        </div> */}
      </div>
    </nav>
  );
}
