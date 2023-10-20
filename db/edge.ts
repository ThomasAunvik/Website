import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

import * as tables from "./schema/tables";

const db = drizzle(sql, { schema: tables });

export default db;
