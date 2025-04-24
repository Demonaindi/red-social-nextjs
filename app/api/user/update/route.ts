/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import formidable from "formidable"
import fs from "fs"

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const form = formidable({ multiples: false, uploadDir: "./public/uploads", keepExtensions: true })

  const data: any = await new Promise((resolve, reject) => {
    form.parse(req as any, (err: any, fields: any, files: any) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })

  const name = data.fields.name as string
  const image = data.files.image?.[0]?.newFilename

  if (session.user?.email != null) {
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        image: image ? `/uploads/${image}` : undefined,
      },
    });
  } else {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}

  return NextResponse.json({ success: true })
}
