import { NextResponse } from "next/server";
import db from "@/db/edge";
import { generateStoredPassword } from "@/lib/utils/passwordgen";
import { credentialsTable, usersTable } from "@/db/schema/tables";
import { defaultEdgeLocation } from "@/lib/edge_settings";

export const runtime = "edge"; // 'nodejs' is the default
export const preferredRegion = defaultEdgeLocation; // only execute this function on iad1
export const dynamic = "force-dynamic";

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
      .returning();

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
