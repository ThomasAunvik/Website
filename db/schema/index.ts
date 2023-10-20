import { pgSchema } from "drizzle-orm/pg-core";

const dbSchema = pgSchema("thaun-website");

export default dbSchema;

export type TableFn = typeof dbSchema.table;
