import db from "@/db/database";
import { UserProperties, Users } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export type ImageFilter =
    | "filter_moderate_gore"
    | "filter_extreme_gore"
    | "filter_body_horror"
    | "filter_moderate_nudity"
    | "filter_extreme_nudity"
    | "filter_suggestive_themes"
    | "filter_eyestrain"
    | "filter_sensitive_content";

export type UserProperty = "show_custom_themes" | "dark_mode" | ImageFilter;

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

export async function updateUserProperty(
    userId: number,
    key: UserProperty,
    value: string
): Promise<void> {
    const records = await db
        .select()
        .from(UserProperties)
        .where((prop) => and(eq(prop.userId, userId), eq(prop.key, key)))
        .limit(1);

    if (records.length > 0) {
        await db
            .update(UserProperties)
            .set({ value })
            .where(eq(UserProperties.id, records[0].id));
    } else {
        await db.insert(UserProperties).values({ userId, key, value });
    }
}

export async function updateUserProperties(
    userId: number | string,
    properties: Partial<{ [key in UserProperty]: string | null }>
): Promise<void> {
    userId = (await getUser(userId)).id;

    for (const key of Object.keys(properties)) {
        const value = properties[key as UserProperty];
        if (!value) continue;
        await updateUserProperty(userId, key as UserProperty, value);
    }
}
