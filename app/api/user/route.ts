import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { name, image } = await req.json()

  const updated = await prisma.user.update({
    where: { email: session.user?.email ?? "" },
    data: { name, image },
  })

  return NextResponse.json(updated)
}
