import {
    boolean,
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const characterStatus = pgEnum("status", [
    "active",
    "hidden",
    "archived",
]);

export const Users = pgTable("users", {
    id: serial("id").primaryKey(),
    clerkId: text("clerk_id").notNull().unique(),
    birthdate: timestamp("birthdate").notNull().defaultNow(),
    // password
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const UserProperties = pgTable("user_properties", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => Users.id),
    key: text("key"),
    value: text("value"),
});

export const Files = pgTable("files", {
    id: serial("id").primaryKey(),
    ownerId: integer("owner_id").references(() => Users.id),
    name: text("name").unique().notNull(),
    type: text("type").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const Images = pgTable("images", {
    id: serial("id").primaryKey(),
    imageFileId: integer("image_file_id").references(() => Files.id),
    thumbnailFileId: integer("thumbnail_file_id").references(() => Files.id),
    isArtist: boolean("is_artist"),
    artistName: text("artist_name"),
    artistUrl: text("artist_url"),

    containsModerateGore: boolean("contains_moderate_gore").notNull(),
    containsExtremeGore: boolean("contains_extreme_gore").notNull(),
    containsBodyHorror: boolean("contains_body_horror").notNull(),
    containsModerateNudity: boolean("contains_moderate_nudity").notNull(),
    containsExtremeNudity: boolean("contains_extreme_nudity").notNull(),
    containsSuggestiveThemes: boolean("contains_suggestive_themes").notNull(),
    containsEyestrain: boolean("contains_eyestrain").notNull(),
    containsSensitiveContent: boolean("contains_sensitive_content").notNull(),

    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const Characters = pgTable("characters", {
    id: serial("id").primaryKey(),
    ownerId: integer("owner_id")
        .notNull()
        .references(() => Users.id),
    status: characterStatus("status"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    // "Basic Information"
    name: text("name").notNull(),
    slug: text("slug"),
    description: text("description"),
    permissions: text("permissions"),
    disableGlobalUserPermissions: boolean("disable_global_user_permissions"),
    externalLinkName: text("external_link_name"),
    externalLinkUrl: text("external_link_url"),
    disableComments: boolean("disable_comments"),
    // "Credits"
    isDesigner: boolean("is_designer"),
    designerName: text("designer_name"),
    designerUrl: text("designer_url"),
    doesLinkSpeciesSheet: boolean("does_link_species_sheet"),
    speciesName: text("species_name"),
    speciesSheetUrl: text("species_sheet_url"),
    additionalCredits: text("additional_credits"),
    // "Character Filters"
    containsModerateGore: boolean("contains_moderate_gore"),
    containsExtremeGore: boolean("contains_extreme_gore"),
    containsBodyHorror: boolean("contains_body_horror"),
    containsModerateNudity: boolean("contains_moderate_nudity"),
    containsExtremeNudity: boolean("contains_extreme_nudity"),
    containsSuggestiveThemes: boolean("contains_suggestive_themes"),
    containsEyestrain: boolean("contains_eyestrain"),
    containsSensitiveContent: boolean("contains_sensitive_content"),
    // "Main Image"
    imageId: integer("image_id")
        .notNull()
        .references(() => Images.id),
    // "Tags"
    tags: text("tags"),
});
