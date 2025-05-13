import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    return NextResponse.json(posts);
  }
  