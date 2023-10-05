import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import crypto from "crypto";
import { generateStoredPassword } from "@/lib/auth_options";

interface PasswordGenerated {
  secretData: {
    value: string;
    salt: string;
  };
  credentialsData: {
    hashIteration: number;
    algorithm: string;
  };
}

const getPasswordDataFromUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      credentials: true,
    },
  });

  return user?.credentials;
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
    const passStore = await generateStoredPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        credentials: {
          create: {
            type: "password",
            userLabel: "",
            secretData: passStore.secretData,
            credentialsData: passStore.credentialsData,
            priority: 0,
          },
        },
      },
    });
    return NextResponse.json({ ...user });
  }
}
