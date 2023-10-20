import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

export * from "./schema/users";
export * from "./schema/credentials";
export * from "./schema/posts";

import * as users from "./schema/users";
import * as credentials from "./schema/credentials";
import * as posts from "./schema/posts";

const schemas = { ...users, ...credentials, ...posts };

const db = drizzle(sql, { schema: schemas });

export default db;
