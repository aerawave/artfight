import db from "@/db/database";
import { UserProperties, Users } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export type UserProperty = "show_custom_themes" | "dark_mode";

export async function checkUsernameExists(username: string): Promise<boolean> {
    const users = await clerkClient().users.getUserList({
        username: [username],
    });

    return users.totalCount > 0;
}

export async function getUser(userId: number | string) {
    return typeof userId === "string"
        ? (
              await db
                  .select()
                  .from(Users)
                  .where((user) => eq(user.clerkId, userId as string))
          )[0]
        : (
              await db
                  .select()
                  .from(Users)
                  .where((user) => eq(user.id, userId as number))
          )[0];
}

export async function getUserProperties(
    userId: number | string,
    properties: UserProperty[]
): Promise<Partial<{ [key in UserProperty]: string | null }>> {
    userId = (await getUser(userId)).id;

    const records = (
        await db
            .select()
            .from(UserProperties)
            .where((prop) => eq(prop.userId, userId))
    ).filter((prop) => prop.key && (properties as string[]).includes(prop.key));

    const value: Partial<{ [key in UserProperty]: string | null }> = {};

    for (const record of records) {
        value[record.key as UserProperty] = record.value;
    }

    return value;
}
