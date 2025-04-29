"use client"

import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, Search, X } from "lucide-react"

export default function Navbar() {
  const { data: session, status } = useSession()
  const [userImage, setUserImage] = useState<string | null>(null)
  const [username, setUsername] = useState<string>("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch("/api/user/me")
      const data = await res.json()
      if (data) {
        setUsername(data.username || "")
        setUserImage(data.image || null)
      }
    }

    if (session?.user) fetchUserData()
  }, [session])

  if (status === "loading") return null

  return (
    <nav className="sticky top-0 z-50 bg-white border-b">
      {/*Desktop Navbar*/}
      <div className="flex justify-between items-center px-4 py-2 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/dashboard" className="text-2xl md:text-3xl font-bold flex items-center">
            Atypik
            <Image
              src="/assets/images/logoSolo.png"
              alt="logo"
              width={40}
              height={40}
              className="md:w-[54px] md:h-[54px]"
            />
          </Link>
        </div>

        {/*Mobile Menu Trigger*/}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} className="relative">
            <Search className="h-5 w-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Configuracion</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle></SheetTitle>
              </SheetHeader>
              <div className="py-4 flex flex-col gap-4">
                {isSearchOpen && (
                  <div className="relative">
                    <Input type="text" placeholder="Buscar..." className="pr-8" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 p-2">
                    {userImage ? (
                      <Image
                        src={userImage || "/placeholder.svg"}
                        alt="Avatar"
                        width={200}
                        height={200}
                        className="rounded-full w-14 h-14 object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300" />
                    )}
                    <span className="font-medium">{username || session?.user?.name}</span>
                  </div>
                  <Link href="/dashboard/settings" className="px-2 py-1.5 hover:bg-gray-100 rounded-md">
                    Ajustes
                  </Link>
                  <Link href="/dashboard/billing" className="px-2 py-1.5 hover:bg-gray-100 rounded-md">
                    Billing
                  </Link>
                  <Link href="/dashboard/team" className="px-2 py-1.5 hover:bg-gray-100 rounded-md">
                    Team
                  </Link>
                  <Button
                    variant="ghost"
                    className="justify-start px-2 py-1.5 h-auto font-normal hover:bg-gray-100"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    Cerrar sesión
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/*Desktop Menu*/}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Input type="text" placeholder="Buscar..." className="w-[200px] lg:w-[300px]" />
            <Button variant="ghost" size="icon" className="absolute right-0 top-0">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                {userImage ? (
                  <Image
                    src={userImage || "/placeholder.svg"}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="rounded-full w-8 h-8"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-300" />
                )}
                <span className="hidden sm:inline">{username || session?.user?.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi Perfil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Ajustes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/billing">Billing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/team">Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/*Mobile Search (when open)*/}
      {isSearchOpen && (
        <div className="p-2 md:hidden border-t">
          <div className="relative">
            <Input type="text" placeholder="Buscar..." className="w-full pr-8" autoFocus />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
