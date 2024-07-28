import db from "@/db/database";
import { Files } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";

export async function GET(
    request: NextRequest,
    { params }: { params: { name: string; size: string } }
): Promise<NextResponse> {
    const name: string = params.name;

    const results = await db
        .select({ id: Files.id, name: Files.name, type: Files.type })
        .from(Files)
        .where((file) => eq(file.name, name));

    if (!results.length) {
        return NextResponse.json({
            errors: [`No image found with the name '${name}'.`],
        });
    }

    const { name: file_name, type: file_type } = results[0];

    const file_path = `${process.env.FILE_PATH_BEGIN}/${file_name}`;

    const buffer = await new Promise<Buffer>((resolve, reject) => {
        fs.readFile(file_path, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });

    return new NextResponse(buffer, {
        headers: {
            "Content-Type": file_type,
            "Content-Length": buffer.length.toString(),
        },
    });
}
