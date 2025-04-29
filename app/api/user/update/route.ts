import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const image = formData.get("image") as File | null;

    let imagePath: string | undefined = undefined;

    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const cleanName = image.name.replace(/\s+/g, "-").toLowerCase();
      const filename = `${Date.now()}-${cleanName}`;
      const filepath = path.join(process.cwd(), "public/uploads", filename);
      await writeFile(filepath, buffer);
      imagePath = `/uploads/${filename}`;
    }

    if (username) {
      const existingUser = await prisma.user.findUnique({ where: { username } });
      if (existingUser && existingUser.email !== session.user.email) {
        return NextResponse.json({ error: "Username already taken" }, { status: 400 });
      }
    }

    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        username,
        image: imagePath,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
