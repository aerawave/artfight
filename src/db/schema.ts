import {
    boolean,
    customType,
    integer,
    pgTable,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
    dataType() {
        return "bytea";
    },
});

export const Users = pgTable("Users", {
    id: serial("id").primaryKey(),
    clerkId: text("clerk_id").notNull().unique(),
    birthdate: timestamp("birthdate").notNull().defaultNow(),
    // password
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const UserProperties = pgTable("UserProperties", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => Users.id),
    key: text("key"),
    value: text("value"),
});

export const Images = pgTable("Images", {
    id: serial("id").primaryKey(),
    image: bytea("image"),
    thumbnail: bytea("thumbnail"),
    containsModerateGore: boolean("contains_moderate_gore"),
    containsExtremeGore: boolean("contains_extreme_gore"),
    containsBodyHorror: boolean("contains_body_horror"),
    containsModerateNudity: boolean("contains_moderate_nudity"),
    containsExtremeNudity: boolean("contains_extreme_nudity"),
    containsSuggestiveThemes: boolean("contains_suggestive_themes"),
    containsEyestrain: boolean("contains_eyestrain"),
    containsSensitiveContent: boolean("contains_sensitive_content"),
});

export const Characters = pgTable("Characters", {
    id: serial("id").primaryKey(),
    ownerId: integer("owner_id")
        .notNull()
        .references(() => Users.id),
    // "Basic Information"
    name: text("name"),
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
    speciesUrl: text("species_url"),
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
    imageId: integer("image_id").references(() => Images.id),
    isArtist: boolean("is_artist"),
    artistName: text("artist_name"),
    artistUrl: text("artist_url"),
    tags: text("tags"),
});
