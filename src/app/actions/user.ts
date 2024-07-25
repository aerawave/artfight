import db from "@/db/database";
import { UserProperties, Users } from "@/db/schema";
import { eq } from "drizzle-orm";

export type UserProperty = "show_custom_themes" | "dark_mode";

export async function getUserProperties(
    userId: number | string,
    properties: UserProperty[]
): Promise<Partial<{ [key in UserProperty]: string | null }>> {
    userId =
        typeof userId === "string"
            ? (
                  await db
                      .select()
                      .from(Users)
                      .where((user) => eq(user.clerkId, userId as string))
              )[0].id
            : userId;

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
