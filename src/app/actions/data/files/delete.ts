import db from "@/data/db/database";
import { Files } from "@/data/db/schema";
import { redis } from "@/data/redis/redis";
import { eq, InferSelectModel } from "drizzle-orm";

export async function deleteFile(id: number, owner_id: number) {
    const record: InferSelectModel<typeof Files> | undefined = (
        await db.select().from(Files).where(eq(Files.id, id)).limit(1)
    )[0];

    if (!record) {
        throw new Error("A file with that ID does not exist.");
    }

    if (record.ownerId !== owner_id) {
        throw new Error("That file is not owned by that user.");
    }

    const file_key = `fs/${owner_id}/${record.id}`;

    await redis.del(file_key);

    await db.delete(Files).where(eq(Files.id, id));
}
