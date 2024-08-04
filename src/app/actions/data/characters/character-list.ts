import db from "@/data/db/database";
import { Characters, Files, Images } from "@/data/db/schema";
//import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export async function getCharacters(userId: number) {
    // TODO: filter based on status
    // const { userId: clerkId } = auth();

    const aliases = {
        character: alias(Characters, "character"),
        mainImage: alias(Images, "mainImage"),
        imageFile: alias(Files, "imageFile"),
        thumbnailFile: alias(Files, "thumbnailFile"),
    };

    return await db
        .select({
            id: aliases.character.id,
            ownerId: aliases.character.ownerId,
            name: aliases.character.name,
            description: aliases.character.description,
            mainImage: aliases.mainImage,
            imageFile: {
                name: aliases.imageFile.name,
                type: aliases.imageFile.type,
            },
            thumbnailFile: {
                name: aliases.thumbnailFile.name,
                type: aliases.thumbnailFile.type,
            },
        })
        .from(aliases.character)
        .where((record) => eq(record.ownerId, userId))
        .leftJoin(
            aliases.mainImage,
            eq(aliases.character.imageId, aliases.mainImage.id)
        )
        .leftJoin(
            aliases.imageFile,
            eq(aliases.mainImage.imageFileId, aliases.imageFile.id)
        )
        .leftJoin(
            aliases.thumbnailFile,
            eq(aliases.mainImage.thumbnailFileId, aliases.thumbnailFile.id)
        )
        .orderBy(aliases.character.id);
}

export function getCharactersSql(userId: number) {
    const aliases = {
        character: alias(Characters, "character"),
        mainImage: alias(Images, "mainImage"),
        imageFile: alias(Files, "imageFile"),
        thumbnailFile: alias(Files, "thumbnailFile"),
    };

    return db
        .select({
            id: aliases.character.id,
            ownerId: aliases.character.ownerId,
            name: aliases.character.name,
            description: aliases.character.description,
            mainImage: aliases.mainImage,
            imageFile: {
                name: aliases.imageFile.name,
                type: aliases.imageFile.type,
            },
            thumbnailFile: {
                name: aliases.thumbnailFile.name,
                type: aliases.thumbnailFile.type,
            },
        })
        .from(aliases.character)
        .where((record) => eq(record.ownerId, userId))
        .leftJoin(
            aliases.mainImage,
            eq(aliases.character.imageId, aliases.mainImage.id)
        )
        .leftJoin(
            aliases.imageFile,
            eq(aliases.mainImage.imageFileId, aliases.imageFile.id)
        )
        .leftJoin(
            aliases.thumbnailFile,
            eq(aliases.mainImage.thumbnailFileId, aliases.thumbnailFile.id)
        )
        .toSQL().sql;
}
