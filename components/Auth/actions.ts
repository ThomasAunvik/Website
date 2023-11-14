"use server";

import db from "@/db/edge";
import { RegisterSchema } from "./authvalidate";
import { actionvalidate } from "@/lib/validate";
import { generateStoredPassword } from "@/lib/utils/passwordgen";
import { credentialsTable, usersTable } from "@/db/schema/tables";

import { Logger } from "next-axiom";

export const onRegisterSubmit = actionvalidate(RegisterSchema)(async (data) => {
  const log = new Logger();

  const exists = await db.query.usersTable.findFirst({
    where: (users, { eq }) =>
      eq(users.email, data.email) || eq(users.username, data.username),
    with: {
      credentials: true,
    },
  });

  console.log(exists);

  if (exists) {
    log.info("User attempted to register to new existing account", {
      attemptedEmail: data.email,
      attemptedUsername: data.username,
    });
    await log.flush();
    throw Error("Username or Email already exists");
  }

  const passStore = await generateStoredPassword(data.password);

  const create = await db
    .insert(usersTable)
    .values({
      username: data.username,
      email: data.email,
    })
    .returning();

  if (create.length <= 0) {
    log.error("Failed to create user...", {
      attemptedEmail: data.email,
      attemptedUsername: data.username,
    });
    await log.flush();
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

  log.error("User created", {
    userId: createdUser.id,
    username: createdUser.username,
    email: createdUser.email,
  });
  await log.flush();
});
