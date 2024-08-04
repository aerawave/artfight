import { authenticateUser } from "../../user";
import db from "@/data/db/database";
import { Characters } from "@/data/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";
import { deleteImage } from "../images/delete";

export async function requestDeleteCharacter(id: number) {
    const { id: user_id } = await authenticateUser();

    const record: InferSelectModel<typeof Characters> | undefined = (
        await db.select().from(Characters).where(eq(Characters.id, id)).limit(1)
    )[0];

    if (!record) {
        throw new Error("A character with that ID does not exist.");
    }

    if (record.ownerId !== user_id) {
        throw new Error("Requestor does not own that character.");
    }

    await db.delete(Characters).where(eq(Characters.id, id));
    await deleteImage(record.imageId, user_id);
}
