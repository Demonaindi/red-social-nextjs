import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const content = formData.get("content") as string;
  const files = formData.getAll("images") as File[];

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const post = await prisma.post.create({
    data: {
      content,
      authorId: user.id,
    },
  });

  const uploadDir = path.join(process.cwd(), "public", "uploads");

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);

    await writeFile(filePath, buffer);

    await prisma.postImage.create({
      data: {
        url: `/uploads/${filename}`,
        postId: post.id,
      },
    });
  }

  return NextResponse.json({ success: true });
}
