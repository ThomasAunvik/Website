import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { exit } from "node:process";
import postgres from "postgres";

const connectionString = process.env.POSTGRES_URL ?? "";
const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

async function main() {
  await migrate(db, { migrationsFolder: "./db/migrations" });

  console.log("Migrations finished...");
  exit();
}
main();
