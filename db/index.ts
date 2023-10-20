import { sql } from "@vercel/postgres";
import { drizzle as drizzleVercel } from "drizzle-orm/vercel-postgres";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as tables from "./schema/tables";

const db =
  process.env.NODE_ENV === "production"
    ? drizzleVercel(sql, { schema: tables })
    : drizzlePg(postgres(process.env.POSTGRES_URL ?? ""), {
        schema: tables,
      });

export default db;
