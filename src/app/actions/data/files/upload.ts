import db from "@/data/db/database";
import { Files } from "@/data/db/schema";
import { redis } from "@/data/redis/redis";
import { eq } from "drizzle-orm";
import path from "path";
import { v4 as uuidv4 } from "uuid";

type FileUpload = {
    fileId: number;
};

export const FILE_UPLOAD_MAX_SIZE = Number(process.env.FILE_UPLOAD_MAX_SIZE);

export async function uploadFile(
    owner_id: number,
    name: string,
    type: string,
    data: Buffer
): Promise<FileUpload> {
    if (data.byteLength > FILE_UPLOAD_MAX_SIZE) {
        throw new Error("File is too large.");
    }
    const file_id = (
        await db
            .insert(Files)
            .values({
                ownerId: owner_id,
                name,
                type,
            })
            .returning({ id: Files.id })
    )[0].id;

    const key = `fs/${owner_id}/${file_id}`;

    try {
        await redis.set(key, data);
    } catch (err) {
        await db.delete(Files).where(eq(Files.id, file_id));
        throw err;
    }

    return { fileId: file_id };
}

export async function uploadFileContent(
    owner_id: number,
    file: File
): Promise<FileUpload> {
    const ext = path.extname(file.name);
    const uuid = await getNewFileUUID(ext);
    const file_name = `${uuid}${ext}`;
    const type = file.type;

    return await uploadFile(
        owner_id,
        file_name,
        type,
        Buffer.from(await file.arrayBuffer())
    );
}

async function getNewFileUUID(ext: string, max_attempts: number = 10) {
    let uuid = "";
    let found = false;
    for (let i = 0; !found && i < max_attempts; i++) {
        uuid = uuidv4();
        found =
            (
                await db
                    .select({ id: Files.id, name: Files.name })
                    .from(Files)
                    .where((file) => eq(file.name, `${uuid}${ext}`))
                    .limit(1)
            ).length === 0;
    }

    if (!found) {
        throw {
            error: "No UUID was able to be obtained.",
        };
    }

    return uuid;
}
