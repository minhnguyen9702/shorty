import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
export const links = pgTable("links", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    slug: varchar({ length: 32 }).notNull().unique(),
    url: text().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;

