import { NextResponse } from "next/server";
import { generateStoredPassword } from "@/lib/auth_options";
import db, { credentialsTable, usersTable } from "@/db";

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  const exists = await db.query.usersTable.findFirst({
    where: (users, { eq }) =>
      eq(users.email, email) || eq(users.username, username),
    with: {
      credentials: true,
    },
  });

  if (exists) {
    return NextResponse.json(
      { error: "Username or Email already exists" },
      { status: 400 },
    );
  } else {
    const passStore = await generateStoredPassword(password);

    const create = await db
      .insert(usersTable)
      .values({
        username,
        email,
      })
      .returning({ id: usersTable.id });

    if (create.length <= 0) {
      throw Error("Failed to create user...");
    }
    const createdUser = create[0];

    await db.insert(credentialsTable).values({
      userId: createdUser.id,
      type: "password",
      userLabel: "",
      secretData: passStore.secretData,
      credentialsData: passStore.credentialsData,
      priority: 0,
    });

    return NextResponse.json({ id: createdUser.id });
  }
}
