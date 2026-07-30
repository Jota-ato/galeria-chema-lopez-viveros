import {
    pgTable,
    text,
    uuid
} from "drizzle-orm/pg-core"

export const categories = pgTable("category", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
})