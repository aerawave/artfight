import db from "@/data/db/database";
import { Characters } from "@/data/db/schema";
import { and, eq } from "drizzle-orm";

type Character = typeof Characters.$inferSelect;

export async function getCharacter(
    ownerId: number,
    characterId: number
): Promise<Character | undefined> {
    const record = (
        await db
            .select({
                id: Characters.id,
                ownerId: Characters.ownerId,
                character: Characters,
            })
            .from(Characters)
            .where((record) =>
                and(eq(record.ownerId, ownerId), eq(record.id, characterId))
            )
            .limit(1)
    )[0];

    if (!record) {
        return undefined;
    }

    return record.character;
}
