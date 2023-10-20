import { sql } from "@vercel/postgres";
import { drizzle as drizzleVercel } from "drizzle-orm/vercel-postgres";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as users from "./schema/users";
import * as credentials from "./schema/credentials";
import * as posts from "./schema/posts";

const schemas = { ...users, ...credentials, ...posts };

const db =
  process.env.NODE_ENV === "production"
    ? drizzleVercel(sql, { schema: schemas })
    : drizzlePg(postgres(process.env.POSTGRES_URL ?? ""), {
        schema: schemas,
      });

export default db;
