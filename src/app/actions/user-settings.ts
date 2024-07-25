import db from "@/db/database";
import { UserProperties, Users } from "@/db/schema";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { ClerkAPIResponseError } from "@clerk/shared/error";
import { eq } from "drizzle-orm";
import { z } from "zod";

type ChangePasswordState = {
    success?: boolean;
    cleared?: boolean;
    errors?: {
        old_password?: string[];
        new_password?: string[];
        verification?: string[];
    };
};

type ChangeAvatarState = {
    success?: boolean;
    cleared?: boolean;
    newImageUrl?: string;
    errors?: {
        image?: string[];
    };
};

type ChangeEmailState = {
    success?: boolean;
    cleared?: boolean;
    errors?: {
        email?: string[];
    };
};

type ChangeSiteThemeState = {
    success?: boolean;
    cleared?: boolean;
    errors?: {
        general?: string[];
    };
};

export async function changePassword(
    state: ChangePasswordState,
    data: FormData
): Promise<ChangePasswordState> {
    const client = clerkClient();
    const { userId } = auth();
    if (!userId) {
        return {
            errors: {
                verification: ["Not authenticated."],
            },
        };
    }

    const [old_password, new_password] = [
        data.get("old_password"),
        data.get("password"),
    ];

    if (!old_password) {
        return {
            errors: {
                old_password: ["Old password not provided."],
            },
        };
    }

    if (!new_password) {
        return {
            errors: {
                new_password: ["New password not provided."],
            },
        };
    }

    const user = await client.users.getUser(userId);

    try {
        const { verified } = await client.users.verifyPassword({
            userId: user.id,
            password: old_password.toString(),
        });

        if (verified) {
            await client.users.updateUser(user.id, {
                password: new_password.toString(),
            });
            return {
                success: true,
            };
        } else {
            return {
                errors: {
                    verification: ["Not successfully verified."],
                },
            };
        }
    } catch (err) {
        console.error(err);
        const erro = err as { errors: { longMessage: string }[] };
        return {
            errors: {
                verification: erro.errors.map((e) => e.longMessage) as string[],
            },
        };
    }
}

export async function getCurrentUser() {
    const { userId } = auth();

    if (!userId) {
        return undefined;
    }
    return await clerkClient().users.getUser(userId);
}

export async function changeAvatar(
    state: ChangeAvatarState,
    data: FormData
): Promise<ChangeAvatarState> {
    const { userId } = auth();
    if (!userId) {
        return {
            errors: {
                image: ["User not authenticated."],
            },
        };
    }

    const file = data.get("image")?.valueOf() as File;

    if (file.size === 0) {
        return {
            errors: {
                image: ["No image uploaded."],
            },
        };
    }
    const client = clerkClient();

    try {
        const { imageUrl } = await client.users.updateUserProfileImage(userId, {
            file,
        });
        return { success: true, newImageUrl: imageUrl };
    } catch (err_) {
        const err = err_ as ClerkAPIResponseError;
        return {
            errors: {
                image: err.errors
                    .map((err) => err.longMessage)
                    .filter((m) => m) as string[],
            },
        };
    }
}

export async function changeEmail(
    state: ChangeEmailState,
    data: FormData
): Promise<ChangeEmailState> {
    const { userId } = auth();
    if (!userId) {
        return {
            errors: {
                email: ["User not authenticated."],
            },
        };
    }

    const validation = z
        .object({
            email: z.string().email(),
        })
        .safeParse({
            email: data.get("email"),
        });

    if (validation.error) {
        return {
            errors: validation.error.flatten().fieldErrors,
        };
    }

    const { email } = validation.data;

    const client = clerkClient();

    try {
        await client.emailAddresses.createEmailAddress({
            userId: userId,
            emailAddress: email,
        });

        return { success: true };
    } catch (err_) {
        const err = err_ as ClerkAPIResponseError;
        return {
            errors: {
                email: err.errors
                    .map((err) => err.longMessage)
                    .filter((m) => m) as string[],
            },
        };
    }
}

export async function changeSiteTheme(
    state: ChangeSiteThemeState,
    data: FormData
): Promise<ChangeSiteThemeState> {
    const { userId: clerkId } = auth();
    if (!clerkId) {
        return {
            errors: {
                general: ["User not authenticated."],
            },
        };
    }

    const userId = (
        await db
            .select()
            .from(Users)
            .where((u) => eq(u.clerkId, clerkId))
            .limit(1)
    )[0].id;

    const validation = z
        .object({
            show_custom_themes: z.boolean(),
            dark_mode: z.string(),
        })
        .safeParse({
            show_custom_themes: data.get("show_custom_themes") === "on",
            dark_mode: data.get("dark_mode"),
        });

    if (validation.error) {
        return {
            errors: {
                general: validation.error.flatten().formErrors,
            },
        };
    }

    const { show_custom_themes, dark_mode } = validation.data;

    await db.insert(UserProperties).values([
        {
            userId,
            key: "show_custom_themes",
            value: show_custom_themes ? "true" : "false",
        },
        {
            userId,
            key: "dark_mode",
            value: dark_mode,
        },
    ]);

    return {
        success: true,
    };
}
