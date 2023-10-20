import dbSchema from "@/db/schema";
import * as tables from "@/db/schema/tables";
import { BuildColumns } from "drizzle-orm";
import { PgColumnBuilderBase, PgTableExtraConfig } from "drizzle-orm/pg-core";

export const pgTableHijack: any = (
  name: string,
  columns: Record<string, PgColumnBuilderBase>,
  extraConfig?: (
    // eslint-disable-next-line unused-imports/no-unused-vars
    self: BuildColumns<string, Record<string, PgColumnBuilderBase>, "pg">,
  ) => PgTableExtraConfig,
) => {
  switch (name) {
    case "user":
      return tables.usersTable;
    case "account":
      return tables.accountsTable;
    case "session":
      return tables.sessionsTable;
    case "verificationToken":
      return tables.verificationTokensTable;
    default:
      return dbSchema.table(name, columns, extraConfig);
  }
};
