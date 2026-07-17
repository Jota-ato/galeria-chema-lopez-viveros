import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const collections = pgTable("collection", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  banner: varchar("banner", { length: 130 }),
});
