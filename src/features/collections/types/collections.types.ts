import { collections } from "@/db/schema";

export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;
