import { eq, InferSelectModel } from "drizzle-orm";
import { Images } from "@/data/db/schema";
import db from "@/data/db/database";
import { deleteFile } from "../files/delete";

export async function deleteImage(id: number, owner_id: number) {
    const record: InferSelectModel<typeof Images> | undefined = (
        await db.select().from(Images).where(eq(Images.id, id)).limit(1)
    )[0];

    if (!record) {
        throw new Error("An image with that ID does not exist.");
    }

    await db.delete(Images).where(eq(Images.id, id));

    const delete_main_image_file = record.imageFileId
        ? deleteFile(record.imageFileId, owner_id)
        : Promise.resolve();

    const delete_thumbnail_file = record.thumbnailFileId
        ? deleteFile(record.thumbnailFileId, owner_id)
        : Promise.resolve();

    await Promise.allSettled([delete_main_image_file, delete_thumbnail_file]);
}
