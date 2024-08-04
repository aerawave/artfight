import db from "@/data/db/database";
import { Files } from "@/data/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/data/redis/redis";

export async function GET(
    request: NextRequest,
    { params }: { params: { name: string; size: string } }
): Promise<NextResponse> {
    const name: string = params.name;

    const results = await db
        .select({
            id: Files.id,
            ownerId: Files.ownerId,
            name: Files.name,
            type: Files.type,
        })
        .from(Files)
        .where((file) => eq(file.name, name));

    if (!results.length) {
        return NextResponse.json({
            errors: [`No image found with the name '${name}'.`],
        });
    }

    const { id: file_id, ownerId: owner_id, type: file_type } = results[0];

    const file_path = `fs/${owner_id}/${file_id}`;

    const buffer = await redis.getBuffer(file_path);

    if (!buffer) {
        return NextResponse.json({
            errors: [`No image found with the name '${name}'.`],
        });
    }

    return new NextResponse(buffer, {
        headers: {
            "Content-Type": file_type,
            "Content-Length": buffer.length.toString(),
        },
    });
}
