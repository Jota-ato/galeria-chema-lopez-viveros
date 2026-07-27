import { pgTable, text, timestamp, varchar, uuid } from "drizzle-orm/pg-core";

export const collections = pgTable("collection", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  banner: varchar("banner", { length: 130 }),
});
