import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const Users = pgTable("Users", {
    id: serial("id").primaryKey(),
    clerkId: text("clerk_id").notNull().unique(),
    birthdate: timestamp("birthdate").notNull().defaultNow(),
    // password
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const UserProperties = pgTable("UserProperties", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
});

export const UserPropertyValues = pgTable("UserPropertyValues", {
    id: serial("id").primaryKey(),
    propertyId: integer("property_id").references(() => Users.id),
    value: text("value"),
});
