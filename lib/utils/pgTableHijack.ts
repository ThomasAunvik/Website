import {
  accountsTable,
  sessionsTable,
  usersTable,
  verificationTokensTable,
} from "@/db";
import { dbSchema } from "@/db/schema/schema";
import { BuildColumns } from "drizzle-orm";
import { PgColumnBuilderBase, PgTableExtraConfig } from "drizzle-orm/pg-core";

export const pgTableHijack: any = (
  name: string,
  columns: Record<string, PgColumnBuilderBase>,
  extraConfig?: (
    self: BuildColumns<string, Record<string, PgColumnBuilderBase>, "pg">,
  ) => PgTableExtraConfig,
) => {
  switch (name) {
    case "user":
      return usersTable;
    case "account":
      return accountsTable;
    case "session":
      return sessionsTable;
    case "verificationToken":
      return verificationTokensTable;
    default:
      return dbSchema.table(name, columns, extraConfig);
  }
};
