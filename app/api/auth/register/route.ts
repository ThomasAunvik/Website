import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export const config = {
  runtime: "edge",
};

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  const emailExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const usernameExist = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (emailExist) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 },
    );
  } else if (usernameExist) {
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 400 },
    );
  } else {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: await hash(password, 14),
      },
    });
    return NextResponse.json({ ...user });
  }
}
