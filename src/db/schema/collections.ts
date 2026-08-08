import {
  pgTable,
  text,
  timestamp,
  varchar,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const collectionStatus = pgEnum("collection_status", [
  "draft",
  "published",
  "archived",
]);

export const collections = pgTable("collection", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  status: collectionStatus().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  banner: varchar("banner", { length: 130 }),
});
