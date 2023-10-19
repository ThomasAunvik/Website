import { sql } from "@vercel/postgres";
import { drizzle as drizzleVercel } from "drizzle-orm/vercel-postgres";
import { drizzle as drizzleNode } from "drizzle-orm/node-postgres";

import { Pool } from "pg";

export * from "./schema/users";
export * from "./schema/credentials";
export * from "./schema/posts";

import * as users from "./schema/users";
import * as credentials from "./schema/credentials";
import * as posts from "./schema/posts";

const schemas = { ...users, ...credentials, ...posts };

const db =
  process.env.NODE_ENV === "production"
    ? drizzleVercel(sql, { schema: schemas })
    : drizzleNode(new Pool({ connectionString: process.env.POSTGRES_URL }), {
        schema: schemas,
      });

export default db;
