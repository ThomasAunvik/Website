import {
  timestamp,
  text,
  primaryKey,
  integer,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { dbSchema } from "./schema";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";

export const postsTable = dbSchema.table("Post", {
  postId: uuid("postId").primaryKey().defaultRandom(),

  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),

  createdById: uuid("createdById")
    .notNull()
    .references(() => usersTable.id, { onDelete: "no action" }),

  title: text("title").notNull(),
  undertitle: text("undertitle").notNull(),
  content: text("content").notNull(),
});

export const postRelations = relations(postsTable, ({ one, many }) => ({
  createdBy: one(usersTable, {
    fields: [postsTable.createdById],
    references: [usersTable.id],
  }),
  revisions: many(postRevisions),
}));

export type Post = typeof postsTable.$inferSelect;
export type NewPost = typeof postsTable.$inferInsert;

export const postRevisions = dbSchema.table("PostRevision", {
  revisionId: uuid("revisionId").primaryKey().defaultRandom(),

  postId: uuid("postId")
    .notNull()
    .references(() => postsTable.postId, { onDelete: "cascade" }),

  field: text("field").notNull(),
  value: text("value").notNull(),

  description: text("description"),

  createdAt: timestamp("createdAt").defaultNow(),

  createdById: uuid("createdById")
    .notNull()
    .references(() => usersTable.id, { onDelete: "no action" }),
});

export const postRevisionRelations = relations(
  postRevisions,
  ({ one, many }) => ({
    createdBy: one(usersTable, {
      fields: [postRevisions.createdById],
      references: [usersTable.id],
    }),
    post: one(postsTable, {
      fields: [postRevisions.postId],
      references: [postsTable.postId],
    }),
  }),
);

export type PostRevision = typeof postsTable.$inferSelect;
export type NewPostRevision = typeof postsTable.$inferInsert;
