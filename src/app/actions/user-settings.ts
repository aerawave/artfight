import { auth, clerkClient } from "@clerk/nextjs/server";

type ChangePasswordState = {
    success?: boolean;
    cleared?: boolean;
    errors?: {
        old_password?: string[];
        new_password?: string[];
        verification?: string[];
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
