import db from "@/data/db/database";
import { UserProperties, Users } from "@/data/db/schema";
import { auth, clerkClient, User } from "@clerk/nextjs/server";
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

export type UserProperty = "show_custom_themes" | "site_theme" | ImageFilter;

export async function checkUsernameExists(username: string): Promise<boolean> {
    const users = await clerkClient().users.getUserList({
        username: [username],
    });

    return users.totalCount > 0;
}

export async function getUserByUsername(username: string) {
    const clerk_user = (
        await clerkClient().users.getUserList({
            username: [username],
            limit: 1,
        })
    ).data[0] as User | undefined;

    if (!clerk_user) {
        return undefined;
    }

    const record = (
        await db
            .select()
            .from(Users)
            .where((user) => eq(user.clerkId, clerk_user.id))
            .limit(1)
    )[0] as typeof Users.$inferSelect | undefined;

    if (!record) {
        return undefined;
    }

    return { username: clerk_user.username, ...record };
}

export async function getUser(userId: number | string) {
    const record =
        typeof userId === "string"
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

    const clerk = clerkClient();

    const clerk_user = await clerk.users.getUser(record.clerkId);

    return {
        username: clerk_user.username,
        ...record,
    };
}

export async function authenticateUser() {
    const { userId: clerk_id } = auth();

    if (!clerk_id) {
        throw new Error("Requestor is not authenticated.");
    }

    return await getUser(clerk_id);
}

export async function getUserProperties(
    user_id: number | string,
    properties: UserProperty[]
): Promise<Partial<Record<UserProperty, string | null>>> {
    user_id = (await getUser(user_id)).id;

    const records = (
        await db
            .select()
            .from(UserProperties)
            .where((prop) => eq(prop.userId, user_id))
    ).filter((prop) => prop.key && (properties as string[]).includes(prop.key));

    const value: Partial<Record<UserProperty, string | null>> = {};

    for (const record of records) {
        value[record.key as UserProperty] = record.value;
    }

    return value;
}

export async function getUserProperty(
    user_id: number | string,
    property: UserProperty
): Promise<string | null> {
    user_id = (await getUser(user_id)).id;

    const record = (
        await db
            .select()
            .from(UserProperties)
            .where(
                and(
                    eq(UserProperties.userId, user_id),
                    eq(UserProperties.key, property)
                )
            )
            .limit(1)
    )[0];

    return record?.value;
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
