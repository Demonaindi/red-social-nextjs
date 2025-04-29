import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const { email, name, password } = await req.json();

  if (!email || !name || !password) {
    return NextResponse.json({ message: "Rellena todos los campos plis" }, { status: 400 });
  }

  const userExist = await prisma.user.findUnique({ where: { email } });
  if (userExist) {
    return NextResponse.json({ message: "Ya existe un usuario con ese email" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
