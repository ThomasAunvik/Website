import { timestamp, text, integer, uuid, json } from "drizzle-orm/pg-core";
import { dbSchema } from "./schema";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";

export const credentialsTable = dbSchema.table("UserCredential", {
  credentialId: uuid("credentialId").primaryKey().defaultRandom(),

  type: text("type").notNull(),

  userId: uuid("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  createdDate: timestamp("createdDate").defaultNow(),

  userLabel: text("userLabel").notNull().default(""),

  secretData: json("secretData").notNull(),
  credentialsData: json("credentialsData").notNull(),
  priority: integer("priority").notNull().default(0),
});

export const credentialsRelations = relations(credentialsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [credentialsTable.userId],
    references: [usersTable.id],
  }),
}));

export type Credential = typeof credentialsTable.$inferSelect;
export type NewCredential = typeof credentialsTable.$inferInsert;
