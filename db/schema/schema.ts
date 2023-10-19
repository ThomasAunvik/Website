import { pgSchema } from "drizzle-orm/pg-core";

export const dbSchema = pgSchema("thaun-website");

export type TableFn = typeof dbSchema.table;
